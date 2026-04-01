import { me } from '../controllers/auth-controller.js';

const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('auth-controller → me', () => {

    test('devuelve 200 con id y role cuando req.user existe', () => {
        // verifyToken (middleware) ya ejecutó y puso req.user antes de llegar al controller.
        // Acá simulamos que ese middleware funcionó correctamente.
        const req = { user: { id: 5, role: 'user' } };
        const res = mockRes();

        me(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ user: { id: 5, role: 'user' } });
    });

    test('devuelve 401 cuando req.user no existe (error al desestructurar)', () => {
        // Si req.user es undefined, el destructuring `const { id, role } = req.user`
        // lanza TypeError. El catch lo captura y responde 401.
        const req = {};
        const res = mockRes();

        me(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ message: 'No autorizado' })
        );
    });

    test('el payload de respuesta tiene exactamente las claves id y role', () => {
        // El token JWT decodificado tiene campos extras (iat, exp).
        // Este test asegura que el controller solo expone id y role al cliente,
        // sin filtrar datos internos del token.
        const req = { user: { id: 99, role: 'admin' } };
        const res = mockRes();

        me(req, res);

        const payload = res.json.mock.calls[0][0];
        expect(Object.keys(payload.user)).toEqual(['id', 'role']);
    });
});
