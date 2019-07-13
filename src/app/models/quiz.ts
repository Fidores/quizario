export interface Quiz {
    _id: string;
    title: string;
    questions: [ Question ];
    creationTime: Date;
    img: string;
    author: string;
}

export interface Question {
    title: string;
    answers: [ Answer ];
    rightAnswer: string;
    duration: number;
    img?: string ;
    isAnsweredCorrectly?: number;
}

export interface Answer {
    a: string;
    b: string;
    c: string;
    d: string;
}

export interface SectionOfQuizzes {
    title: string;
    quizzes: [ Quiz ];
}
