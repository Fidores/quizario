import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Quiz } from 'src/app/models/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizzesService {

  constructor(
    private readonly http: HttpClient
  ) { }

  url = 'http://localhost:3000';

  getHomeSections(){
    return of([
      {
        title: 'Najnowsze',
        quizzes: [
          { id: 1, title: 'Jak dobrze znasz JavaScript 1', img: 'https://image.flaticon.com/icons/svg/919/919828.svg' },
          { id: 2, title: 'Jak dobrze znasz CSS3 1', img: 'https://image.flaticon.com/icons/svg/732/732190.svg' },
          { id: 3, title: 'Jak dobrze znasz HTML5 1', img: 'https://image.flaticon.com/icons/svg/174/174854.svg' },
          { id: 4, title: 'Jak dobrze znasz JavaScript 2', img: 'https://image.flaticon.com/icons/svg/919/919828.svg' },
          { id: 5, title: 'Jak dobrze znasz CSS3 2', img: 'https://image.flaticon.com/icons/svg/732/732190.svg' },
          { id: 6, title: 'Jak dobrze znasz CSS3 2', img: 'https://image.flaticon.com/icons/svg/732/732190.svg' },
          { id: 7, title: 'Jak dobrze znasz HTML5 2', img: 'https://image.flaticon.com/icons/svg/174/174854.svg' }
        ]
      },
      {
        title: 'Najpopularniejsze',
        quizzes: [
          { id: 8, title: 'Jak dobrze znasz JavaScript 1', img: 'https://image.flaticon.com/icons/svg/919/919828.svg' },
          { id: 9, title: 'Jak dobrze znasz CSS3 1', img: 'https://image.flaticon.com/icons/svg/732/732190.svg' },
          { id: 10,title: 'Jak dobrze znasz HTML5 1', img: 'https://image.flaticon.com/icons/svg/174/174854.svg' },
          { id: 11, title: 'Jak dobrze znasz JavaScript 2', img: 'https://image.flaticon.com/icons/svg/919/919828.svg' },
          { id: 12, title: 'Jak dobrze znasz CSS3 2', img: 'https://image.flaticon.com/icons/svg/732/732190.svg' },
          { id: 13,title: 'Jak dobrze znasz CSS3 2', img: 'https://image.flaticon.com/icons/svg/732/732190.svg' },
          { id: 14, title: 'Jak dobrze znasz HTML5 2', img: 'https://image.flaticon.com/icons/svg/174/174854.svg' }
        ]
      },
      {
        title: 'Najbardziej lubiane',
        quizzes: [
          { id: 15, title: 'Jak dobrze znasz JavaScript 1', img: 'https://image.flaticon.com/icons/svg/919/919828.svg' },
          { id: 16, title: 'Jak dobrze znasz CSS3 1', img: 'https://image.flaticon.com/icons/svg/732/732190.svg' },
          { id: 17, title: 'Jak dobrze znasz HTML5 1', img: 'https://image.flaticon.com/icons/svg/174/174854.svg' },
          { id: 18, title: 'Jak dobrze znasz JavaScript 2', img: 'https://image.flaticon.com/icons/svg/919/919828.svg' },
          { id: 19, title: 'Jak dobrze znasz CSS3 2', img: 'https://image.flaticon.com/icons/svg/732/732190.svg' },
          { id: 20,title: 'Jak dobrze znasz CSS3 2', img: 'https://image.flaticon.com/icons/svg/732/732190.svg' },
          { id: 21,title: 'Jak dobrze znasz HTML5 2', img: 'https://image.flaticon.com/icons/svg/174/174854.svg' }
        ]
      }
    ]);
  }

  getQuizz(id: string): Observable<Quiz>{
    return this.http.get<Quiz>(`${this.url}/api/quizzes/${id}`);
  }

  getAllQuizzes(): Observable<Quiz[]>{
    return this.http.get<Quiz[]>(`${this.url}/api/quizzes`);
  }
}