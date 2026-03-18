export interface TurnsUser {
    id: number;
    date_turn: string;
    time_turn: string;
    notes: string | null;
    service_name: string;
}

export interface TurnsUserResponse {
    turns: TurnsUser[];
}

export interface TurnsAdmin extends TurnsUser {
    user_name: string;
    user_surname: string;
    user_phone: string;
    user_photo: string;
}

export interface TurnsAdminResponse {
    turns: TurnsAdmin[];
}

export interface NewTurnData {
    date: string;
    time: string;
    service: number;
    notes?: string;
}

export interface NewTurnResponse {
    message: string;
    turn: {
        id: number;
        fk_user: number;
        fk_service: number;
        date_turn: string;
        time_turn: string;
        notes: string | null;
        state: string;
    };
}

export interface NextTurn {
    id: number;
    date_turn: string;
    time_turn: string;
    notes: string | null;
    service_name: string;
}

export interface NextUserTurnResponse {
    message: string;
    nextTurn: NextTurn | null;
}

export interface NextTurnProps {
    turn: NextTurn | null;
}

export interface AdminTurnProps {
    turn: TurnsAdmin;
}
