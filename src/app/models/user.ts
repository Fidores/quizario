/**
 * Model of user that is returned from API call.
*/
export interface User {
    _id: string;
    name: string;
    surname: string;
    email: string;
    registrationTime: Date;
    isAdmin: boolean;
    password?: string;
    gamesHistory: Game[];
}

export interface Game {
    date: Date;
    quizId: string;
    title: string;
}