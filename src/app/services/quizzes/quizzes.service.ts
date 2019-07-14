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

  url = `${environment.apiOrigin}/quizzes`;

  getHomeSections(): Observable<SectionOfQuizzes> {
    return this.http.get<SectionOfQuizzes>(environment.backendOrigin);
  }

  getQuizz(id: string): Observable<Quiz> {
    return this.http.get<Quiz>(`${this.url}/${id}`);
  }

  getAllQuizzes(params): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.url}`, { params });
  }

  addQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(`${this.url}`, quiz);
  }

  updateQuiz(id: string, quiz: Quiz) {
    return this.http.put<Quiz>(`${this.url}/${id}`, quiz);
  }

  deleteQuiz(id: string): Observable<Quiz> {
    return this.http.delete<Quiz>(`${this.url}/${id}`);
  }
}
