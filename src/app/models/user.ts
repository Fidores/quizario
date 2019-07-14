export interface User {
    _id: string;
    name: string;
    surname: string;
    email: string;
    registrationTime: Date;
    isAdmin: boolean;
    password?: string;
    gamesHistory: gamesHistory;
}

export interface gamesHistory {
    dateOfGame: Date;
    quizId: string;
    title: string;
}


