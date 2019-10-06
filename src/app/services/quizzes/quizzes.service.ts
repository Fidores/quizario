import { HttpClient } from '@angular/common/http';
import { arrayBufferToBase64 } from 'src/app/helpers/arrayBufferToBase64';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quiz, APIQuiz, SectionOfQuizzes, Image, APISectionOfQuizzes } from 'src/app/models/quiz';
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

  getHomeSections(): Observable<SectionOfQuizzes[]> {
    return this.http.get<APISectionOfQuizzes[]>(environment.backend)
      .pipe(
        map(sections => 

          sections.map(section => {
            return { title: section.title, quizzes: section.quizzes.map(quiz => this.convertImagesToBase64(quiz)) } as any;
          })

        )
      );
  }

  /**
   * Retrieves quiz from database.
   * @param id Id of quiz to retrieve from database.
   * @returns Quiz.
  */

  getQuizz(id: string, params?): Observable<Quiz> {
    return this.http.get<APIQuiz>(`${this.url}/${id}`, { params }).pipe(map(apiQuiz => this.convertImagesToBase64(apiQuiz)));
  }

  /**
   * This route is made for querying quizzes.
   * In order to query data you should use syntax for mongoose Model.find({}). 
  */

  getAllQuizzes(query): Observable<Quiz[]> {
    return this.http.get<APIQuiz[]>(`${this.url}`, { params: { query: JSON.stringify(query) } })
      .pipe(map(apiQuizzes => apiQuizzes.map(apiQuiz => this.convertImagesToBase64(apiQuiz))));
  }

  /**
   * Adds quiz to database.
   * @param Quiz Quiz that will be saved to database.
  */

  addQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.post<APIQuiz>(`${this.url}`, quiz).pipe(map(apiQuiz => this.convertImagesToBase64(apiQuiz)));
  }

  /**
   * Updates quiz in database.
   * @param id Id of a quiz that will be updated.
   * @param quiz Updated quiz that will be saved in database. 
  */

  updateQuiz(id: string, quiz: Quiz) {
    return this.http.put<APIQuiz>(`${this.url}/${id}`, quiz).pipe(map(apiQuiz => this.convertImagesToBase64(apiQuiz)));
  }

  /**
   * Deletes quiz from database.
   * @param id Id of a quiz that will be deleted. 
  */

  deleteQuiz(id: string): Observable<Quiz> {
    return this.http.delete<APIQuiz>(`${this.url}/${id}`).pipe(map(apiQuiz => this.convertImagesToBase64(apiQuiz)));
  }

  /**
   * Converts quiz images from Buffer type to Base64 type. It converts Quiz.img and Quiz.questions[i].img
   * @param quiz 
  */

  private convertImagesToBase64(quiz: APIQuiz): Quiz {
    if(quiz.img && quiz.img.binaryData) quiz.img = `${quiz.img.header},${arrayBufferToBase64(quiz.img.binaryData.data)}` as unknown as Image;
    
    quiz.questions.forEach((question, index) => {
      if(question.img && question.img.binaryData) quiz.questions[index].img = `${question.img.header},${arrayBufferToBase64(question.img.binaryData.data)}` as unknown as Image;
    });

    return quiz as unknown as Quiz;
  }
  
}
