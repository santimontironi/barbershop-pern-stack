jest.mock('../repository/user-repository.js', () => ({
    findUserByEmail: jest.fn(),
    registerUser: jest.fn(),
    loginUser: jest.fn(),
    checkConfirmation: jest.fn(),
    getUserById: jest.fn(),
    confirmRegistration: jest.fn(),
}));

jest.mock('bcrypt', () => ({
    hash: jest.fn(),
    compare: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
    verify: jest.fn(),
}));

// Cloudinary: evita hacer una subida real a la nube en cada test.
// upload() siempre devuelve una URL falsa controlada por nosotros.
jest.mock('../config/cloudinary.js', () => ({
    uploader: {
        upload: jest.fn(),
    }
}));

// Nodemailer: sendMail usa un callback (no es una Promise).
// Lo mockeamos para que llame al callback con éxito sin enviar emails reales.
jest.mock('../config/mailConfig.js', () => ({
    sendMail: jest.fn((options, callback) => {
        if (callback) callback(null, { response: 'ok' });
    })
}));

jest.mock('dotenv', () => ({ config: jest.fn() }));

import userController from '../controllers/user-controller.js';
import userRepository from '../repository/user-repository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cloudinary from '../config/cloudinary.js';

// Variables de entorno mínimas para que el controller no rompa al arrancar.
process.env.JWT_SECRET = 'test_secret';
process.env.FRONTEND_URL = 'http://localhost:5173';
process.env.EMAIL_USER = 'test@test.com';
process.env.NODE_ENV = 'test';

// res encadenado: status(200).json({}) funciona porque status() devuelve res.
const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.cookie = jest.fn().mockReturnValue(res);
    res.clearCookie = jest.fn().mockReturnValue(res);
    return res;
};

beforeEach(() => {
    // Resetea los contadores y valores de todos los mocks antes de cada test.
    // Sin esto, un mock.mockResolvedValue() de un test anterior podría contaminar el siguiente.
    jest.clearAllMocks();
});

// ─── registerUser ────────────────────────────────────────────────────────────

describe('userController → registerUser', () => {

    test('devuelve 400 si falta algún campo obligatorio', async () => {
        // La validación de campos ocurre antes de cualquier consulta a la DB.
        // Omitimos "phone" para disparar el guard de campos obligatorios.
        const req = {
            body: { name: 'Juan', surname: 'Perez', email: 'j@j.com', password: '1234' },
            file: null,
        };
        const res = mockRes();

        await userController.registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ message: 'Todos los campos son obligatorios.' })
        );
    });

    test('devuelve 400 si el email ya está en uso', async () => {
        // findUserByEmail devuelve un usuario → el email ya está registrado.
        // El controller debe cortar acá sin llegar a crear nada en la DB.
        userRepository.findUserByEmail.mockResolvedValue({ id: 1, email: 'j@j.com' });

        const req = {
            body: { name: 'Juan', surname: 'Perez', email: 'j@j.com', password: '1234', phone: '123' },
            file: { mimetype: 'image/jpeg', buffer: Buffer.from('') },
        };
        const res = mockRes();

        await userController.registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ message: 'El correo electrónico ya está en uso.' })
        );
    });

    test('devuelve 400 si no se adjunta foto de perfil', async () => {
        // Multer no encontró archivo → req.file es null.
        // El controller lo verifica explícitamente antes de subir a Cloudinary.
        userRepository.findUserByEmail.mockResolvedValue(null);

        const req = {
            body: { name: 'Juan', surname: 'Perez', email: 'j@j.com', password: '1234', phone: '123' },
            file: null,
        };
        const res = mockRes();

        await userController.registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ message: 'La foto de perfil es obligatoria.' })
        );
    });

    test('devuelve 201 en registro exitoso y envía email de confirmación', async () => {
        // Happy path: email libre, foto adjunta, Cloudinary responde OK,
        // bcrypt hashea la contraseña, la DB inserta el usuario y se genera el token de confirmación.
        userRepository.findUserByEmail.mockResolvedValue(null);
        cloudinary.uploader.upload.mockResolvedValue({ secure_url: 'http://cloudinary.com/foto.jpg' });
        bcrypt.hash.mockResolvedValue('hashed_password');
        userRepository.registerUser.mockResolvedValue({ id: 10 });
        jwt.sign.mockReturnValue('token_confirmacion');

        const req = {
            body: { name: 'Juan', surname: 'Perez', email: 'j@j.com', password: '1234', phone: '123' },
            file: { mimetype: 'image/jpeg', buffer: Buffer.from('fake_image') },
        };
        const res = mockRes();

        await userController.registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ message: expect.stringContaining('registrado exitosamente') })
        );
    });
});

// ─── loginUser ───────────────────────────────────────────────────────────────

describe('userController → loginUser', () => {

    test('devuelve 404 si el usuario no existe en la DB', async () => {
        // loginUser busca por email y role='user'. Si no lo encuentra devuelve undefined/null.
        userRepository.loginUser.mockResolvedValue(null);

        const req = { body: { email: 'noexiste@j.com', password: '1234' } };
        const res = mockRes();

        await userController.loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ message: 'Usuario no encontrado.' })
        );
    });

    test('devuelve 401 si la contraseña es incorrecta', async () => {
        // El usuario existe pero bcrypt.compare devuelve false → contraseña no coincide.
        userRepository.loginUser.mockResolvedValue({ id: 1, password: 'hash', role: 'user' });
        bcrypt.compare.mockResolvedValue(false);

        const req = { body: { email: 'j@j.com', password: 'wrongpass' } };
        const res = mockRes();

        await userController.loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ message: 'Contraseña incorrecta.' })
        );
    });

    test('devuelve 403 si la cuenta no está confirmada por email', async () => {
        // Usuario existe y la contraseña es correcta, pero is_confirmed = false.
        // El usuario debe confirmar su email antes de poder iniciar sesión.
        userRepository.loginUser.mockResolvedValue({ id: 1, password: 'hash', role: 'user' });
        bcrypt.compare.mockResolvedValue(true);
        userRepository.checkConfirmation.mockResolvedValue({ is_confirmed: false });

        const req = { body: { email: 'j@j.com', password: '1234' } };
        const res = mockRes();

        await userController.loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ message: expect.stringContaining('confirmado') })
        );
    });

    test('devuelve 200 con datos del usuario y setea cookie httpOnly en login exitoso', async () => {
        // Happy path: usuario existe, contraseña correcta, cuenta confirmada.
        // El JWT se guarda en cookie httpOnly → nunca accesible desde JavaScript del browser.
        userRepository.loginUser.mockResolvedValue({ id: 1, password: 'hash', role: 'user' });
        bcrypt.compare.mockResolvedValue(true);
        userRepository.checkConfirmation.mockResolvedValue({ is_confirmed: true });
        jwt.sign.mockReturnValue('jwt_token');

        const req = { body: { email: 'j@j.com', password: '1234' } };
        const res = mockRes();

        await userController.loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.cookie).toHaveBeenCalledWith('token', 'jwt_token', expect.objectContaining({ httpOnly: true }));
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ user: { id: 1, role: 'user' } })
        );
    });
});

// ─── confirmRegistration ─────────────────────────────────────────────────────

describe('userController → confirmRegistration', () => {

    test('devuelve 200 en confirmación exitosa', async () => {
        // jwt.verify decodifica el token del link de email y devuelve el id del usuario.
        // confirmRegistration actualiza is_confirmed = true en la DB.
        jwt.verify.mockReturnValue({ id: 10 });
        userRepository.confirmRegistration.mockResolvedValue({ id: 10, is_confirmed: true });

        const req = { params: { token: 'valid_token' } };
        const res = mockRes();

        await userController.confirmRegistration(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ message: 'Registro confirmado exitosamente.' })
        );
    });

    test('devuelve 404 si el usuario del token no existe en la DB', async () => {
        // Token válido pero el id dentro no corresponde a ningún usuario (ej: fue eliminado).
        jwt.verify.mockReturnValue({ id: 999 });
        userRepository.confirmRegistration.mockResolvedValue(null);

        const req = { params: { token: 'valid_token' } };
        const res = mockRes();

        await userController.confirmRegistration(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
    });

    test('devuelve 500 si el token es inválido o está expirado', async () => {
        // Los tokens de confirmación expiran en 1h. Si jwt.verify lanza, cae en el catch → 500.
        jwt.verify.mockImplementation(() => { throw new Error('jwt expired'); });

        const req = { params: { token: 'expired_token' } };
        const res = mockRes();

        await userController.confirmRegistration(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
    });
});

// ─── dashboardUser ───────────────────────────────────────────────────────────

describe('userController → dashboardUser', () => {

    test('devuelve 404 si el usuario no existe en la DB', async () => {
        // Puede pasar si el usuario fue eliminado pero aún tiene un JWT válido en la cookie.
        userRepository.getUserById.mockResolvedValue(null);

        const req = { user: { id: 1 } };
        const res = mockRes();

        await userController.dashboardUser(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
    });

    test('devuelve 200 con los datos del perfil del usuario', async () => {
        // Happy path: getUserById devuelve el perfil completo.
        // El controller no filtra los campos, los devuelve todos tal cual los recibe.
        const fakeUser = { id: 1, role: 'user', name: 'Juan', surname: 'Perez', email: 'j@j.com', phone: '123', photo: 'http://foto.jpg' };
        userRepository.getUserById.mockResolvedValue(fakeUser);

        const req = { user: { id: 1 } };
        const res = mockRes();

        await userController.dashboardUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ user: fakeUser });
    });
});

// ─── logoutUser ───────────────────────────────────────────────────────────────

describe('userController → logoutUser', () => {

    test('devuelve 200 y limpia la cookie de sesión', () => {
        // clearCookie elimina la cookie del browser. Sin esto el usuario
        // seguiría autenticado aunque haga logout desde el frontend.
        const req = {};
        const res = mockRes();

        userController.logoutUser(req, res);

        expect(res.clearCookie).toHaveBeenCalledWith('token', expect.any(Object));
        expect(res.status).toHaveBeenCalledWith(200);
    });
});
