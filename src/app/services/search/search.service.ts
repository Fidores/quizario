import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  private _searchListener: Subject<string> = new Subject();

  set searchText(value: string) {
    this._searchListener.next(value);
  }

  get searchListener() {
    return this._searchListener.pipe(debounceTime(600));
  }
}
