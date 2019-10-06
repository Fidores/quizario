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

/**
 * Model of user that is needed to create or update already existing user in database.
*/

export interface UserPayload {
    name: string;
    surname: string;
    email: string;
    password?: string;
}

export interface Game {
    date: Date;
    quizId: string;
    title: string;
}