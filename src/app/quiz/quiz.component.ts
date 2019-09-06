import { QuizzesService } from './../services/quizzes/quizzes.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Quiz } from '../models/quiz';
import { environment } from 'src/environments/environment';
import { faTrash, faPen, faPlay, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { take } from 'rxjs/operators';

@Component({
  selector: 'quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  constructor(
    private readonly quizzes: QuizzesService
  ) { }

  @Input('quiz') quiz: Quiz;
  @Input('showActions') showActions: boolean = false;
  @Output('onQuizDelete') onQuizDelete = new EventEmitter<Quiz>();

  faTrash = faTrash;
  faPen = faPen;
  faPlay = faPlay;
  faBookmark = faBookmark;

  env = environment;

  ngOnInit() {
  }

  deleteQuiz(id: string) {
    this.quizzes.deleteQuiz(id).pipe(take(1)).subscribe(quiz => this.onQuizDelete.emit(this.quiz));
  }

  bookmark($event: Event) {
    $event.cancelBubble = true;
    
  }

}
