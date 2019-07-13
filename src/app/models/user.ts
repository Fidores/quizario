export interface User {
    _id: string;
    name: string;
    surname: string;
    email: string;
    registrationTime: Date;
    isAdmin: boolean;
    password?: string;
}
