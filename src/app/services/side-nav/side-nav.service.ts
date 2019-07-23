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

  private readonly _openListeaner$ = new Subject();
  private readonly _closeListeaner$ = new Subject();

  close(className = 'closed') {
    this._openListeaner$.next(className);
    this.overlay.fullScreen(false);
  }

  open(className = 'opened') {
    this._openListeaner$.next(className);
    this.overlay.fullScreen(true);
  }

  get openListeaner() {
    return this._openListeaner$;
  }

  get closeListeaner() {
    return this._closeListeaner$;
  }
}
