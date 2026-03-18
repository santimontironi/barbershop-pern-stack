export interface LoadingState {
    register?: boolean;
    login?: boolean;
    dashboard?: boolean;
    confirm?: boolean;
    adminTurns?: boolean;
    userTurns?: boolean;
    createTurn?: boolean;
}

export interface GoBackProps {
    url: string;
}

export interface HeaderDashboardUserProps {
    photo?: string;
    name?: string;
    logout: () => void;
}

export interface HeaderDashboardAdminProps {
    logout: () => void;
}
