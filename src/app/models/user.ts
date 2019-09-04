export interface User {
    _id: string;
    name: string;
    surname: string;
    email: string;
    registrationTime: Date;
    isAdmin: boolean;
    password?: string;
    gamesHistory: gamesHistory[];
}

export interface UserPayload {
    name: string;
    surname: string;
    email: string;
    password?: string;
}

export interface gamesHistory {
    dateOfGame: Date;
    quizId: string;
    title: string;
}


