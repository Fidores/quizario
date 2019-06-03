import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizzesService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getHomeSections(){
    return of([
      {
        title: 'Najnowsze',
        quizzes: [
          { title: 'Jak dobrze znasz JavaScript 1', img: 'https://image.flaticon.com/icons/svg/919/919828.svg' },
          { title: 'Jak dobrze znasz CSS3 1', img: 'https://image.flaticon.com/icons/svg/732/732190.svg' },
          { title: 'Jak dobrze znasz HTML5 1', img: 'https://image.flaticon.com/icons/svg/174/174854.svg' },
          { title: 'Jak dobrze znasz JavaScript 2', img: 'https://image.flaticon.com/icons/svg/919/919828.svg' },
          { title: 'Jak dobrze znasz CSS3 2', img: 'https://image.flaticon.com/icons/svg/732/732190.svg' },
          { title: 'Jak dobrze znasz CSS3 2', img: 'https://image.flaticon.com/icons/svg/732/732190.svg' },
          { title: 'Jak dobrze znasz HTML5 2', img: 'https://image.flaticon.com/icons/svg/174/174854.svg' }
        ]
      },
      {
        title: 'Najpopularniejsze',
        quizzes: [
          { title: 'Jak dobrze znasz JavaScript 1', img: 'https://image.flaticon.com/icons/svg/919/919828.svg' },
          { title: 'Jak dobrze znasz CSS3 1', img: 'https://image.flaticon.com/icons/svg/732/732190.svg' },
          { title: 'Jak dobrze znasz HTML5 1', img: 'https://image.flaticon.com/icons/svg/174/174854.svg' },
          { title: 'Jak dobrze znasz JavaScript 2', img: 'https://image.flaticon.com/icons/svg/919/919828.svg' },
          { title: 'Jak dobrze znasz CSS3 2', img: 'https://image.flaticon.com/icons/svg/732/732190.svg' },
          { title: 'Jak dobrze znasz CSS3 2', img: 'https://image.flaticon.com/icons/svg/732/732190.svg' },
          { title: 'Jak dobrze znasz HTML5 2', img: 'https://image.flaticon.com/icons/svg/174/174854.svg' }
        ]
      },
      {
        title: 'Najbardziej lubiane',
        quizzes: [
          { title: 'Jak dobrze znasz JavaScript 1', img: 'https://image.flaticon.com/icons/svg/919/919828.svg' },
          { title: 'Jak dobrze znasz CSS3 1', img: 'https://image.flaticon.com/icons/svg/732/732190.svg' },
          { title: 'Jak dobrze znasz HTML5 1', img: 'https://image.flaticon.com/icons/svg/174/174854.svg' },
          { title: 'Jak dobrze znasz JavaScript 2', img: 'https://image.flaticon.com/icons/svg/919/919828.svg' },
          { title: 'Jak dobrze znasz CSS3 2', img: 'https://image.flaticon.com/icons/svg/732/732190.svg' },
          { title: 'Jak dobrze znasz CSS3 2', img: 'https://image.flaticon.com/icons/svg/732/732190.svg' },
          { title: 'Jak dobrze znasz HTML5 2', img: 'https://image.flaticon.com/icons/svg/174/174854.svg' }
        ]
      }
    ]);
  }
}