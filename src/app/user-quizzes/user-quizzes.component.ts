import { UserService } from './../services/user/user.service';
import { QuizzesService } from './../services/quizzes/quizzes.service';
import { Component, OnInit } from '@angular/core';
import { switchMap, take } from 'rxjs/operators';
import { Quiz } from '../models/quiz';

@Component({
  selector: 'app-user-quizzes',
  templateUrl: './user-quizzes.component.html',
  styleUrls: ['./user-quizzes.component.scss']
})
export class UserQuizzesComponent implements OnInit {

  constructor(
    private readonly _quizzes: QuizzesService,
    private readonly user: UserService
  ) { }

  quizzes: Quiz[];

  ngOnInit() {
    this.user.getUser().pipe(take(1), switchMap(user => this._quizzes.getAllQuizzes({ author: user._id }))).subscribe(quizzes => this.quizzes = quizzes);
  }

  onQuizDelete(quiz: Quiz) {
    this.quizzes.splice(this.quizzes.indexOf(quiz), 1);
  }

}
