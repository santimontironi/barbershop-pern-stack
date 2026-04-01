jest.mock('../repository/turn-repository.js', () => ({
    createTurn: jest.fn(),
    userHasTurn: jest.fn(),
    invalidDateTimeTurn: jest.fn(),
    userTurns: jest.fn(),
    userActiveTurn: jest.fn(),
    adminTurns: jest.fn(),
    adminAllTurns: jest.fn(),
    cancelTurnByUser: jest.fn(),
    cancelTurnByAdmin: jest.fn(),
    finishTurn: jest.fn(),
}));

jest.mock('../repository/services-repository.js', () => ({
    getServiceById: jest.fn(),
}));

jest.mock('../repository/user-repository.js', () => ({
    getUserById: jest.fn(),
}));

// Nodemailer: sendMail con callback — evita enviar emails reales durante los tests.
jest.mock('../config/mailConfig.js', () => ({
    sendMail: jest.fn((options, callback) => {
        if (callback) callback(null, { response: 'ok' });
    })
}));

// isPastDate es la única función que necesitamos controlar.
// formatDate y formatTime se usan en los emails (no afectan el status code del test).
jest.mock('../utils/formatTurn.js', () => ({
    isPastDate: jest.fn(),
    formatDate: jest.fn().mockReturnValue('lunes, 1 de enero de 2025'),
    formatTime: jest.fn().mockReturnValue('10:00'),
}));

import turnController from '../controllers/turn-controller.js';
import turnRepository from '../repository/turn-repository.js';
import serviceRepository from '../repository/services-repository.js';
import userRepository from '../repository/user-repository.js';
import { isPastDate } from '../utils/formatTurn.js';

// res encadenado: status(200).json({}) funciona porque status() devuelve res.
const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

beforeEach(() => {
    // Resetea todos los mocks entre tests para evitar contaminación cruzada.
    jest.clearAllMocks();
});

// ─── createTurn ───────────────────────────────────────────────────────────────

describe('turnController → createTurn', () => {

    test('devuelve 400 si faltan campos obligatorios (date, time o service)', async () => {
        // La validación ocurre antes de tocar la DB.
        // Omitimos "service" para disparar el guard de campos obligatorios.
        const req = {
            user: { id: 1 },
            body: { date: '2025-06-01', time: '10:00' },
        };
        const res = mockRes();

        await turnController.createTurn(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ message: 'Todos los campos son obligatorios.' })
        );
    });

    test('devuelve 400 si la fecha es pasada (anterior a hoy)', async () => {
        // isPastDate retorna true → la fecha ya pasó, no se puede reservar.
        // Esta validación evita que se creen turnos en fechas ya vencidas.
        isPastDate.mockReturnValue(true);

        const req = {
            user: { id: 1 },
            body: { date: '2020-01-01', time: '10:00', service: 1 },
        };
        const res = mockRes();

        await turnController.createTurn(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ message: expect.stringContaining('fecha') })
        );
    });

    test('devuelve 400 si el horario está fuera del rango permitido (08:00–17:00)', async () => {
        // El negocio atiende de 08:00 a 18:00; el backend valida hasta "17:00"
        // para asegurar que el último turno no exceda el horario de cierre.
        isPastDate.mockReturnValue(false);

        const req = {
            user: { id: 1 },
            body: { date: '2099-06-01', time: '20:00', service: 1 },
        };
        const res = mockRes();

        await turnController.createTurn(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ message: expect.stringContaining('Hora incorrecta') })
        );
    });

    test('devuelve 400 si el usuario ya tiene un turno activo', async () => {
        // Un usuario no puede tener más de un turno activo simultáneamente.
        // userHasTurn devuelve true → ya tiene uno reservado.
        isPastDate.mockReturnValue(false);
        turnRepository.userHasTurn.mockResolvedValue(true);

        const req = {
            user: { id: 1 },
            body: { date: '2099-06-01', time: '10:00', service: 1 },
        };
        const res = mockRes();

        await turnController.createTurn(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ message: expect.stringContaining('turno activo') })
        );
    });

    test('devuelve 400 si el slot de fecha+hora ya está ocupado por otro turno', async () => {
        // Dos usuarios no pueden reservar la misma fecha y hora.
        // invalidDateTimeTurn devuelve true → ese slot ya está tomado.
        isPastDate.mockReturnValue(false);
        turnRepository.userHasTurn.mockResolvedValue(false);
        turnRepository.invalidDateTimeTurn.mockResolvedValue(true);

        const req = {
            user: { id: 1 },
            body: { date: '2099-06-01', time: '10:00', service: 1 },
        };
        const res = mockRes();

        await turnController.createTurn(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ message: expect.stringContaining('ocupadas') })
        );
    });

    test('devuelve 201 con el turno creado en el happy path', async () => {
        // Todas las validaciones pasan: fecha futura, horario válido,
        // sin turno activo previo y slot disponible.
        isPastDate.mockReturnValue(false);
        turnRepository.userHasTurn.mockResolvedValue(false);
        turnRepository.invalidDateTimeTurn.mockResolvedValue(false);
        turnRepository.createTurn.mockResolvedValue({
            id: 10, fk_user: 1, fk_service: 1,
            date_turn: '2099-06-01', time_turn: '10:00', notes: null, state: 'active'
        });

        const req = {
            user: { id: 1 },
            body: { date: '2099-06-01', time: '10:00', service: 1, notes: null },
        };
        const res = mockRes();

        await turnController.createTurn(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ message: expect.stringContaining('exitosamente') })
        );
    });
});

// ─── getAllUserTurns ──────────────────────────────────────────────────────────

describe('turnController → getAllUserTurns', () => {

    test('devuelve 404 si el usuario no tiene turnos en el historial', async () => {
        // userTurns devuelve array vacío → no hay historial para ese usuario.
        turnRepository.userTurns.mockResolvedValue([]);

        const req = { user: { id: 1 } };
        const res = mockRes();

        await turnController.getAllUserTurns(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
    });

    test('devuelve 200 con el array de turnos del usuario', async () => {
        // Simulamos dos turnos en el historial del usuario (cancelados o finalizados).
        const fakeTurns = [
            { id: 1, date_turn: '2025-03-01', time_turn: '10:00', state: 'finished', service_name: 'Corte' },
            { id: 2, date_turn: '2025-04-01', time_turn: '11:00', state: 'cancelled', service_name: 'Barba' },
        ];
        turnRepository.userTurns.mockResolvedValue(fakeTurns);

        const req = { user: { id: 1 } };
        const res = mockRes();

        await turnController.getAllUserTurns(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ turns: fakeTurns });
    });
});

// ─── userActiveTurn ───────────────────────────────────────────────────────────

describe('turnController → userActiveTurn', () => {

    test('devuelve 404 si el usuario no tiene turno activo', async () => {
        // userActiveTurn devuelve undefined cuando no hay turno con state='active'.
        turnRepository.userActiveTurn.mockResolvedValue(undefined);

        const req = { user: { id: 1 } };
        const res = mockRes();

        await turnController.userActiveTurn(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
    });

    test('devuelve 200 con el turno activo del usuario', async () => {
        // Retorna el próximo turno reservado con el nombre del servicio (JOIN con services).
        const fakeTurn = { id: 5, date_turn: '2099-06-01', time_turn: '10:00', notes: null, service_name: 'Corte' };
        turnRepository.userActiveTurn.mockResolvedValue(fakeTurn);

        const req = { user: { id: 1 } };
        const res = mockRes();

        await turnController.userActiveTurn(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ activeTurn: fakeTurn });
    });
});

// ─── getAllAdminTurns ─────────────────────────────────────────────────────────

describe('turnController → getAllAdminTurns', () => {

    test('devuelve 404 si no hay turnos activos para el admin', async () => {
        // adminTurns trae todos los turnos con state='active'. Si no hay, retorna vacío.
        turnRepository.adminTurns.mockResolvedValue([]);

        const req = { user: { id: 1 } };
        const res = mockRes();

        await turnController.getAllAdminTurns(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
    });

    test('devuelve 200 con los turnos activos incluyendo datos del usuario', async () => {
        // adminTurns hace JOIN con users → incluye nombre, apellido, teléfono y foto del cliente.
        const fakeTurns = [
            { id: 1, date_turn: '2099-06-01', time_turn: '10:00', user_name: 'Juan', user_surname: 'Perez', user_phone: '123', user_photo: 'http://foto.jpg', service_name: 'Corte' },
        ];
        turnRepository.adminTurns.mockResolvedValue(fakeTurns);

        const req = { user: { id: 1 } };
        const res = mockRes();

        await turnController.getAllAdminTurns(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ turns: fakeTurns });
    });
});

// ─── getAllAdminAllTurns ───────────────────────────────────────────────────────

describe('turnController → getAllAdminAllTurns (historial)', () => {

    test('devuelve 404 si no hay turnos en el historial', async () => {
        // adminAllTurns trae turnos con state != 'active' (cancelados y finalizados).
        turnRepository.adminAllTurns.mockResolvedValue([]);

        const req = {};
        const res = mockRes();

        await turnController.getAllAdminAllTurns(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
    });

    test('devuelve 200 con el historial completo de turnos', async () => {
        // Incluye cancelados (con cancel_reason) y finalizados, con datos del usuario.
        const fakeTurns = [
            { id: 3, state: 'cancelled', cancel_reason: 'No pudo asistir', user_name: 'Pedro', service_name: 'Barba' },
            { id: 4, state: 'finished', cancel_reason: null, user_name: 'María', service_name: 'Corte' },
        ];
        turnRepository.adminAllTurns.mockResolvedValue(fakeTurns);

        const req = {};
        const res = mockRes();

        await turnController.getAllAdminAllTurns(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ turns: fakeTurns });
    });
});

// ─── turnCancelByUser ─────────────────────────────────────────────────────────

describe('turnController → turnCancelByUser', () => {

    test('devuelve 404 si el turno no existe o no pertenece al usuario', async () => {
        // cancelTurnByUser filtra por fk_user = userId AND id = turnId.
        // Si no coinciden, devuelve null (el usuario no puede cancelar turnos ajenos).
        turnRepository.cancelTurnByUser.mockResolvedValue(null);

        const req = { user: { id: 1 }, params: { turnId: '999' } };
        const res = mockRes();

        await turnController.turnCancelByUser(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
    });

    test('devuelve 200 y envía email de notificación al admin', async () => {
        // Happy path: el turno existe y pertenece al usuario.
        // Tras cancelar, se busca el usuario y el servicio para armar el email al admin.
        const fakeCancelledTurn = { id: 5, fk_user: 1, fk_service: 2, date_turn: '2099-06-01', time_turn: '10:00' };
        turnRepository.cancelTurnByUser.mockResolvedValue(fakeCancelledTurn);
        userRepository.getUserById.mockResolvedValue({ name: 'Juan', surname: 'Perez', email: 'j@j.com' });
        serviceRepository.getServiceById.mockResolvedValue({ name: 'Corte' });

        const req = { user: { id: 1 }, params: { turnId: '5' } };
        const res = mockRes();

        await turnController.turnCancelByUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ message: expect.stringContaining('cancelado exitosamente') })
        );
    });
});

// ─── turnCancelByAdmin ────────────────────────────────────────────────────────

describe('turnController → turnCancelByAdmin', () => {

    test('devuelve 400 si no se proporciona motivo de cancelación', async () => {
        // El motivo es obligatorio: se guarda en cancel_reason y se envía al usuario por email.
        const req = { params: { turnId: '5' }, body: {} };
        const res = mockRes();

        await turnController.turnCancelByAdmin(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ message: expect.stringContaining('cancelación') })
        );
    });

    test('devuelve 404 si el turno no existe en la DB', async () => {
        // cancelTurnByAdmin devuelve null si el turnId no corresponde a ningún turno.
        turnRepository.cancelTurnByAdmin.mockResolvedValue(null);

        const req = { params: { turnId: '999' }, body: { cancel_reason: 'Feriado' } };
        const res = mockRes();

        await turnController.turnCancelByAdmin(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
    });

    test('devuelve 200 y envía email de notificación al usuario con el motivo', async () => {
        // Happy path: el admin cancela con un motivo. Se notifica al usuario por email
        // con los detalles del turno cancelado y el motivo de cancelación.
        const fakeCancelledTurn = { id: 5, fk_user: 1, fk_service: 2, date_turn: '2099-06-01', time_turn: '10:00' };
        turnRepository.cancelTurnByAdmin.mockResolvedValue(fakeCancelledTurn);
        userRepository.getUserById.mockResolvedValue({ name: 'Juan', email: 'j@j.com' });
        serviceRepository.getServiceById.mockResolvedValue({ name: 'Corte' });

        const req = { params: { turnId: '5' }, body: { cancel_reason: 'El barbero no estará disponible' } };
        const res = mockRes();

        await turnController.turnCancelByAdmin(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ message: expect.stringContaining('cancelado exitosamente') })
        );
    });
});

// ─── finishTurn ───────────────────────────────────────────────────────────────

describe('turnController → finishTurn', () => {

    test('devuelve 404 si el turno no existe o ya no está activo', async () => {
        // finishTurn actualiza con WHERE state='active'. Si el turno ya fue cancelado
        // o finalizado, la query no devuelve ninguna fila → null.
        turnRepository.finishTurn.mockResolvedValue(null);

        const req = { params: { turnId: '999' } };
        const res = mockRes();

        await turnController.finishTurn(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
    });

    test('devuelve 200 con el turno finalizado', async () => {
        // Happy path: el turno existía con state='active' y se actualizó a 'finished'.
        const fakeFinishedTurn = { id: 5, state: 'finished', date_turn: '2099-06-01', time_turn: '10:00' };
        turnRepository.finishTurn.mockResolvedValue(fakeFinishedTurn);

        const req = { params: { turnId: '5' } };
        const res = mockRes();

        await turnController.finishTurn(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ message: expect.stringContaining('finalizado exitosamente') })
        );
    });
});
