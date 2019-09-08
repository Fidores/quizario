import { UserService } from './../services/user/user.service';
import { QuizzesService } from './../services/quizzes/quizzes.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Quiz } from '../models/quiz';
import { environment } from 'src/environments/environment';
import { faTrash, faPen, faPlay, faBookmark, faMinus } from '@fortawesome/free-solid-svg-icons';
import { take } from 'rxjs/operators';

@Component({
  selector: 'quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  constructor(
    private readonly _quizzes: QuizzesService,
    private readonly _user: UserService
  ) { }

  @Input('quiz') quiz: Quiz;
  @Input('showActions') showActions: boolean = false;
  @Output('onQuizDelete') onQuizDelete = new EventEmitter<Quiz>();

  faTrash = faTrash;
  faPen = faPen;
  faPlay = faPlay;
  faBookmark = faBookmark;
  faMinus = faMinus;

  env = environment;
  isBookmarked: boolean;

  ngOnInit() {
    this.isBookmarked = this.checkBookmark();
  }

  deleteQuiz(id: string) {
    this._quizzes.deleteQuiz(id).pipe(take(1)).subscribe(quiz => this.onQuizDelete.emit(this.quiz));
  }

  bookmark(id: string, $event: Event) {
    $event.stopPropagation();
    this._user.bookmark(id).subscribe();

    if(this.isBookmarked){
      const bookmark = this.bookmarks.find(bookmark => bookmark.quiz === this.quiz._id);
      const index = this.bookmarks.indexOf(bookmark);
      this.bookmarks.splice(index, 1);
    } else
      this.bookmarks.push({ quiz: this.quiz._id });

    this.isBookmarked = this.checkBookmark();
  }

  private checkBookmark() {
    return this.bookmarks.some(bookmark => bookmark.quiz === this.quiz._id);
  }

  private get bookmarks() {
    return this._user.user$.value.bookmarks;
  }

}
