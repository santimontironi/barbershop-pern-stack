export interface LoadingState {
    register?: boolean;
    login?: boolean;
    dashboard?: boolean;
    confirm?: boolean;
    adminTurns?: boolean;
    allAdminTurns?: boolean;
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

export type AdminPanelView = "turns" | "services" | "newService" | "allTurns"; //type union para las vistas del panel de admin

export interface HeaderDashboardAdminProps {
    logout: () => void;
    selected: AdminPanelView; //vista seleccionada
    onSelect: (item: AdminPanelView) => void; //funcion para cambiar la vista seleccionada, se pasa al header para que pueda cambiar la vista desde el menu. es como un setState
}

export interface ScheduleRowProps {
    day: string
    hours: string
    open: boolean
    isLast: boolean
}

export interface ServiceItemProps {
    icon: string
    title: string
    desc: string
}