import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  constructor() { }

  private readonly _addElementListener: Subject<HTMLElement> = new Subject();
  private readonly _destroyElementListener: Subject<HTMLElement> = new Subject();
  private readonly _fullScreenListener: Subject<boolean> = new Subject();
  private readonly _fullScreenClickListener: Subject<null> = new Subject();

  appendElement(el: HTMLElement) {
    this._addElementListener.next(el);
    return el;
  }

  deleteElement(el: HTMLElement) {
    this._destroyElementListener.next(el);
    return el;
  }

  fullScreen(open: boolean) {
    this._fullScreenListener.next(open);
  }

  clickedOnFullScreen() {
    this.fullScreenClickListener.next();
  }

  get addElListener() {
    return this._addElementListener;
  }

  get deleteElListener() {
    return this._destroyElementListener;
  }

  get fullScreenListener() {
    return this._fullScreenListener;
  }

  get fullScreenClickListener() {
    return this._fullScreenClickListener;
  }
}
