import { QuizzesService } from './../services/quizzes/quizzes.service';
import { SearchService } from './../services/search/search.service';
import { Component, OnInit } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { Quiz } from '../models/quiz';
import { of } from 'rxjs';
import { faSearch, faSadTear, faSpinner } from '@fortawesome/free-solid-svg-icons';

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

  faSearch = faSearch;
  faSadTear = faSadTear;
  faSpinner = faSpinner;

  quizzes: Quiz[];
  isLoading = false;

  ngOnInit() {
    this._search.searchListener
      .pipe(
        tap(() => this.isLoading = true),
        switchMap(text => text ? this._quizzes.getAllQuizzes({ title: { $regex: text, $options: 'i' } }) : of(null)),
        tap(() => this.isLoading = false)
      ).subscribe(quizzes => { this.quizzes = quizzes });
      
  }

}
