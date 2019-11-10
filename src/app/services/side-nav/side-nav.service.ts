import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { OverlayService } from '../overlay/overlay.service';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {

  constructor(
    private readonly overlay: OverlayService
  ) { }

  private readonly _openEmitter$ = new Subject();
  private readonly _closeEmitter$ = new Subject();

  close() {
    this._openEmitter$.next();
    this.overlay.closeFullScreen();
  }

  open() {
    this._openEmitter$.next();
    this.overlay.openFullScreen();
  }

  get openListeaner() {
    return this._openEmitter$;
  }

  get closeListeaner() {
    return this._closeEmitter$;
  }
}
