import { QuizzesService } from './../services/quizzes/quizzes.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Quiz } from '../models/quiz';
import { environment } from 'src/environments/environment';
import { faTrash, faPen, faPlay, faMinus } from '@fortawesome/free-solid-svg-icons';
import { take } from 'rxjs/operators';

@Component({
  selector: 'quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {

  constructor(
    private readonly _quizzes: QuizzesService
  ) { }

  @Input('quiz') quiz: Quiz;
  @Input('showActions') showActions: boolean = false;
  @Output('onQuizDelete') onQuizDelete = new EventEmitter<Quiz>();

  faTrash = faTrash;
  faPen = faPen;
  faPlay = faPlay;
  faMinus = faMinus;

  env = environment;

  deleteQuiz(id: string) {
    this._quizzes.deleteQuiz(id).pipe(take(1)).subscribe(quiz => this.onQuizDelete.emit(this.quiz));
  }

}
