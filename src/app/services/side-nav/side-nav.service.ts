import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {

  constructor() { }

  private readonly _openListeaner$ = new Subject();
  private readonly _closeListeaner$ = new Subject();

  close(className = 'closed') {
    this._openListeaner$.next(className);
  }

  open(className = 'opened') {
    this._openListeaner$.next(className);
  }

  get openListeaner() {
    return this._openListeaner$;
  }

  get closeListeaner() {
    return this._closeListeaner$;
  }
}
