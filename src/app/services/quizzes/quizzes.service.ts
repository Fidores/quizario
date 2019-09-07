import { SectionOfQuizzes } from './../../models/quiz';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Quiz } from 'src/app/models/quiz';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizzesService {

  constructor(
    private readonly http: HttpClient
  ) { }

  url = `${environment.api}/quizzes`;

  /**
   * Retrieves sections of quizzes from database.
   * @returns Array od Sections.
  */

  getHomeSections(): Observable<SectionOfQuizzes> {
    return this.http.get<SectionOfQuizzes>(environment.backend);
  }

  /**
   * Retrieves quiz from database.
   * @param id Id of quiz to retrieve from database.
   * @returns Quiz.
  */

  getQuizz(id: string, params?): Observable<Quiz> {
    return this.http.get<Quiz>(`${this.url}/${id}`, { params });
  }

  /**
   * This route is made for querying quizzes.
   * In order to query data you should use syntax for mongoose Model.find({}). 
  */

  getAllQuizzes(query): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.url}`, { params: { query: JSON.stringify(query) } });
  }

  /**
   * Adds quiz to database.
   * @param Quiz Quiz that will be saved to database.
  */

  addQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(`${this.url}`, quiz);
  }

  /**
   * Updates quiz in database.
   * @param id Id of a quiz that will be updated.
   * @param quiz Updated quiz that will be saved in database. 
  */

  updateQuiz(id: string, quiz: Quiz) {
    return this.http.put<Quiz>(`${this.url}/${id}`, quiz);
  }

  /**
   * Deletes quiz from database.
   * @param id Id of a quiz that will be deleted. 
  */

  deleteQuiz(id: string): Observable<Quiz> {
    return this.http.delete<Quiz>(`${this.url}/${id}`);
  }

  
}
