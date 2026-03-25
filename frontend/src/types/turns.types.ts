export interface TurnsUser {
    id: number;
    date_turn: string;
    time_turn: string;
    notes: string | null;
    cancel_reason: string | null;
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

export interface TurnsAdminAll extends TurnsAdmin {}

export interface TurnsAdminResponse {
    turns: TurnsAdmin[];
}

export interface TurnsAdminAllResponse {
    turns: TurnsAdminAll[];
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

export interface ActiveTurn {
    id: number;
    date_turn: string;
    time_turn: string;
    notes: string | null;
    service_name: string;
}

export interface ActiveUserTurnResponse {
    message: string;
    activeTurn: ActiveTurn | null;
}

export interface ActiveTurnProps {
    turn: ActiveTurn | null;
    cancelTurnByUser: () => void;
}

export interface AdminTurnProps {
    turn: TurnsAdmin;
}

export interface AllAdminTurnProps {
    turn: TurnsAdminAll;
}
