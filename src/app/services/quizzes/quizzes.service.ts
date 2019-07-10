import { SectionOfQuizzes } from './../../models/quiz';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Quiz } from 'src/app/models/quiz';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizzesService {

  constructor(
    private readonly http: HttpClient
  ) { }

  url = environment.apiOrigin;

  getHomeSections() {
    return this.http.get<SectionOfQuizzes>(environment.backendOrigin);
  }

  getQuizz(id: string): Observable<Quiz> {
    return this.http.get<Quiz>(`${this.url}/quizzes/${id}`);
  }

  getAllQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.url}quizzes`);
  }

  addQuiz(quiz: Quiz) {
    return this.http.post<Quiz>(`${this.url}/quizzes`, quiz);
  }
}
