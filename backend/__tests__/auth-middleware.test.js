jest.mock('jsonwebtoken', () => ({
    verify: jest.fn(),
}));

jest.mock('dotenv', () => ({ config: jest.fn() }));

import { verifyToken } from '../middleware/auth-middleware.js';
import { verifyRole } from '../middleware/role-middleware.js';
import jwt from 'jsonwebtoken';

process.env.JWT_SECRET = 'test_secret';

// res encadenado: status(401).json({}) funciona porque status() devuelve res.
const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

beforeEach(() => {
    jest.clearAllMocks();
});

// ─── verifyToken ──────────────────────────────────────────────────────────────

describe('middleware → verifyToken', () => {

    test('devuelve 401 si no hay cookie de token (usuario no logueado)', () => {
        // Cuando el browser no manda la cookie, req.cookies.token es undefined.
        // El middleware debe cortar la request acá sin llamar a next().
        const req = { cookies: {} };
        const res = mockRes();
        const next = jest.fn();

        verifyToken(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ authorized: false });
        expect(next).not.toHaveBeenCalled();
    });

    test('devuelve 401 si el token es inválido o está expirado', () => {
        // jwt.verify lanza JsonWebTokenError o TokenExpiredError para tokens inválidos.
        // El catch los captura y responde 401 sin exponer detalles del error.
        jwt.verify.mockImplementation(() => { throw new Error('invalid token'); });

        const req = { cookies: { token: 'bad_token' } };
        const res = mockRes();
        const next = jest.fn();

        verifyToken(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(next).not.toHaveBeenCalled();
    });

    test('llama a next() y agrega req.user cuando el token es válido', () => {
        // Token válido: verify devuelve el payload decodificado.
        // El middleware lo mete en req.user para que los controllers lo usen.
        jwt.verify.mockReturnValue({ id: 5, role: 'user' });

        const req = { cookies: { token: 'valid_token' } };
        const res = mockRes();
        const next = jest.fn();

        verifyToken(req, res, next);

        expect(req.user).toEqual({ id: 5, role: 'user' });
        expect(next).toHaveBeenCalled();
        // Si next() fue llamado, no debe haber respondido con error
        expect(res.status).not.toHaveBeenCalled();
    });

    test('el payload de req.user contiene exactamente id y role (sin exponer iat/exp)', () => {
        // jwt.verify devuelve campos extras del token (iat = issued at, exp = expiration).
        // El middleware solo debe pasar id y role al controller, no datos internos del JWT.
        jwt.verify.mockReturnValue({ id: 3, role: 'admin', iat: 12345, exp: 99999 });

        const req = { cookies: { token: 'valid_token' } };
        const res = mockRes();
        const next = jest.fn();

        verifyToken(req, res, next);

        expect(Object.keys(req.user)).toEqual(['id', 'role']);
    });
});

// ─── verifyRole ───────────────────────────────────────────────────────────────

describe('middleware → verifyRole', () => {

    test('devuelve 403 si el role del usuario no coincide con el requerido', () => {
        // Un usuario con role "user" intentando acceder a una ruta exclusiva de "admin".
        // 403 Forbidden: autenticado pero sin permisos suficientes.
        const req = { user: { role: 'user' } };
        const res = mockRes();
        const next = jest.fn();

        verifyRole('admin')(req, res, next);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ authorized: false });
        expect(next).not.toHaveBeenCalled();
    });

    test('llama a next() si el role coincide con el requerido', () => {
        // El admin accede a una ruta de admin → el middleware lo deja pasar.
        const req = { user: { role: 'admin' } };
        const res = mockRes();
        const next = jest.fn();

        verifyRole('admin')(req, res, next);

        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
    });

    test('verifyRole es una factory: genera un middleware independiente por cada role', () => {
        // verifyRole('user') y verifyRole('admin') son funciones distintas e independientes.
        // Este test valida que cada instancia solo permite su propio role.
        const middlewareUser = verifyRole('user');
        const middlewareAdmin = verifyRole('admin');

        expect(typeof middlewareUser).toBe('function');
        expect(typeof middlewareAdmin).toBe('function');

        const req = { user: { role: 'user' } };
        const res = mockRes();
        const next = jest.fn();

        // Con role 'user' → pasa el middleware de user, bloquea el de admin
        middlewareUser(req, res, next);
        expect(next).toHaveBeenCalledTimes(1);

        next.mockClear();
        middlewareAdmin(req, res, next);
        expect(next).not.toHaveBeenCalled();
    });
});
