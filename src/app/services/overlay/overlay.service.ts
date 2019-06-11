import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  constructor() { }

  private readonly addElementListener = new Subject();
  private readonly destroyElementListener = new Subject();
  
  appendElement(el: HTMLElement): HTMLElement{
    this.addElementListener.next(el);
    return el;
  }

  deleteElement(el: HTMLElement){
    this.destroyElementListener.next(el);
    return el;
  }

  get addElListener(){
    return this.addElementListener;
  }

  get deleteElListener(){
    return this.destroyElementListener;
  }
}