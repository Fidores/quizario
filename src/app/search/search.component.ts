import { QuizzesService } from './../services/quizzes/quizzes.service';
import { SearchService } from './../services/search/search.service';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Quiz } from '../models/quiz';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(
    private readonly _search: SearchService,
    private readonly _quizzes: QuizzesService
  ) { }

  quizzes: Observable<Quiz[]>;

  ngOnInit() {
    this.quizzes = this._search.searchListener.pipe(switchMap(text => this._quizzes.searchAllQuizzes({ pattern: `.*${text}.*`, field: 'title' })));
  }

}
