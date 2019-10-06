/**
 * Interface of a quiz that is returned from a service. The difference between Quiz and APIQuiz is that Quiz has converted images to Base64 format.
*/

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
    img?: string;
    [x: string]: any;
}

/**
 * Interface of a quiz that is returned from api call.
*/

export interface APIQuiz extends Omit<Quiz, 'img' | 'questions'> {
    img: Image;
    questions: [ APIQuestion ];
}

export interface APIQuestion extends Omit<Question, 'img'> {
    img: Image
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

export interface APISectionOfQuizzes extends Omit<SectionOfQuizzes, 'quizzes'> {
    quizzes: [ APIQuiz ]
}
