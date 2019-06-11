import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  constructor() { }

  private readonly _addElementListener = new Subject();
  private readonly _destroyElementListener = new Subject();
  private readonly _fullScreenListener = new Subject();
  
  appendElement(el: HTMLElement): HTMLElement{
    this._addElementListener.next(el);
    return el;
  }

  deleteElement(el: HTMLElement){
    this._destroyElementListener.next(el);
    return el;
  }

  fullScreen(status: boolean) {
    this._fullScreenListener.next(status);
  }

  get addElListener(){
    return this._addElementListener;
  }

  get deleteElListener(){
    return this._destroyElementListener;
  }

  get fullScreenListener() {
    return this._fullScreenListener;
  }
}