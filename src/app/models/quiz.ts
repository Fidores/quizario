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
    correctAnswer: string;
    duration: number;
    img?: Image;
    isAnsweredCorrectly?: number;
}

export interface Image {
    binaryData: BinaryData;
    header: string;
}

export interface BinaryData {
    type: string;
    data: ArrayBuffer;
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
