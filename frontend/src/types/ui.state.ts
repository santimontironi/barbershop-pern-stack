export interface LoadingState {
    register?: boolean;
    login?: boolean;
    dashboard?: boolean;
    confirm?: boolean;
    adminTurns?: boolean;
    userTurns?: boolean;
    createTurn?: boolean;
    createService?: boolean;
    fetchServices?: boolean;
    cancelTurnByUser?: boolean;
}

export interface GoBackProps {
    url: string;
}

export interface HeaderDashboardUserProps {
    photo?: string;
    name?: string;
    logout: () => void;
}

export type AdminPanelView = "turns" | "services" | "newService"; //type union para las vistas del panel de admin

export interface HeaderDashboardAdminProps {
    logout: () => void;
    selected: AdminPanelView; //vista seleccionada
    onSelect: (item: AdminPanelView) => void; //funcion para cambiar la vista seleccionada, se pasa al header para que pueda cambiar la vista desde el menu. es como un setState
}
