export interface LoginUserDataForm {
    identifier: string; // Puede ser email o username
    password: string;
}

export interface RegisterUserDataForm {
    name: string;
    surname: string;
    username: string;
    email: string;
    password: string;
    phone: string;
}