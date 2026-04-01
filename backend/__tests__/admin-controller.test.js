jest.mock('../repository/admin-repository.js', () => ({
    loginAdmin: jest.fn(),
    getAdminById: jest.fn(),
}));

jest.mock('bcryptjs', () => ({
    compare: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
}));

import adminController from '../controllers/admin-controller.js';
import adminRepository from '../repository/admin-repository.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

process.env.JWT_SECRET = 'test_secret';
process.env.NODE_ENV = 'test';

// res encadenado: status(200).json({}) funciona porque status() devuelve res.
const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.cookie = jest.fn().mockReturnValue(res);
    return res;
};

beforeEach(() => {
    // Resetea contadores y valores entre tests para evitar contaminación cruzada.
    jest.clearAllMocks();
});

// ─── loginAdmin ───────────────────────────────────────────────────────────────

describe('adminController → loginAdmin', () => {

    test('devuelve 404 si el admin no existe en la DB', async () => {
        // loginAdmin busca por username y role='admin'. null → no encontrado.
        adminRepository.loginAdmin.mockResolvedValue(null);

        const req = { body: { username: 'noexiste', password: '1234' } };
        const res = mockRes();

        await adminController.loginAdmin(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ message: 'Administrador no encontrado.' })
        );
    });

    test('devuelve 401 si la contraseña del admin es incorrecta', async () => {
        // El admin existe en la DB pero bcrypt.compare devuelve false → contraseña incorrecta.
        adminRepository.loginAdmin.mockResolvedValue({ id: 1, password: 'hashed', role: 'admin' });
        bcrypt.compare.mockResolvedValue(false);

        const req = { body: { username: 'admin', password: 'wrongpass' } };
        const res = mockRes();

        await adminController.loginAdmin(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ message: 'Contraseña incorrecta.' })
        );
    });

    test('devuelve 200 con datos del admin y setea cookie httpOnly en login exitoso', async () => {
        // Happy path: admin encontrado, contraseña correcta.
        // El JWT se guarda en cookie httpOnly igual que con el login de usuario.
        adminRepository.loginAdmin.mockResolvedValue({ id: 1, password: 'hashed', role: 'admin' });
        bcrypt.compare.mockResolvedValue(true);
        jwt.sign.mockReturnValue('admin_token');

        const req = { body: { username: 'admin', password: 'correctpass' } };
        const res = mockRes();

        await adminController.loginAdmin(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        // La cookie httpOnly impide que el JS del browser acceda al token
        expect(res.cookie).toHaveBeenCalledWith('token', 'admin_token', expect.objectContaining({ httpOnly: true }));
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ admin: { id: 1, role: 'admin' } })
        );
    });
});

// ─── dashboardAdmin ───────────────────────────────────────────────────────────

describe('adminController → dashboardAdmin', () => {

    test('devuelve 401 si el admin no se encuentra en la DB', async () => {
        // req.user viene del verifyToken middleware. Si el id del token no
        // corresponde a ningún admin en la DB, se rechaza la solicitud.
        adminRepository.getAdminById.mockResolvedValue(null);

        const req = { user: { id: 99 } };
        const res = mockRes();

        await adminController.dashboardAdmin(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ message: 'Administrador no autorizado.' })
        );
    });

    test('devuelve 200 con los datos del admin autenticado', async () => {
        // Happy path: el id del token corresponde a un admin válido en la DB.
        // La respuesta incluye username, id y role (sin exponer la contraseña hasheada).
        adminRepository.getAdminById.mockResolvedValue({ id: 1, username: 'admin', role: 'admin' });

        const req = { user: { id: 1 } };
        const res = mockRes();

        await adminController.dashboardAdmin(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            admin: { username: 'admin', id: 1, role: 'admin' }
        });
    });
});
