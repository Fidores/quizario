import { Quiz } from './quiz';

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
    gamesHistory: gamesHistory[];
    bookmarks: Bookmark[];
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

export interface gamesHistory {
    dateOfGame: Date;
    quizId: string;
    title: string;
}

export interface Bookmark {
    quiz: string;
}