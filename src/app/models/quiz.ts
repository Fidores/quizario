export interface Quiz {
    title: string,
    questions: [ Question ],
    creationTime: Date,
    img: string,
    author: string
}

export interface Question {
    title: string,
    answers: [ Answer ],
    rightAnsert: string,
    img: string 
}

export interface Answer {
    a: string,
    b: string,
    c: string,
    d: string
}

export interface SectionOfQuizzes {
    title: string,
    quizzes: [ Quiz ]
}