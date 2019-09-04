import { FullScreenOptions } from './../../models/overlay';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  constructor() { }

  private readonly _addElementEmitter$: Subject<HTMLElement> = new Subject();
  private readonly _destroyElementEmitter$: Subject<HTMLElement> = new Subject();
  private readonly _fullScreenEmitter$: Subject<FullScreenOptions> = new Subject();
  private readonly _fullScreenClickEmitter$: Subject<null> = new Subject();

  /**
   * Appends element to overlay
   * @param el Element to append to overlay 
   * @returns Provided element
  */

  appendElement(el: HTMLElement) {
    this._addElementEmitter$.next(el);
    return el;
  }

  /**
   * Deletes element from overlay
   * @param el Element to delete from overlay 
   * @returns Deleted element
  */

  deleteElement(el: HTMLElement) {
    this._destroyElementEmitter$.next(el);
    return el;
  }

  /**
   * Opens fullscreen that is placed over whole website. Elements placed over it should have z-index greater than 99.
   * It can also open transparent fullscreen in order to disable all interactions on website, it's helpful with elements such as dropdown list, when user can click anyware on page to close it.
   * @param isTransparent Indicates if fullscreen should be transparent. Default value is false.
  */

  openFullScreen(isTransparent: boolean = false) {
    const config: FullScreenOptions = {
      isOpened: true,
      isTransparent
    }
    this._fullScreenEmitter$.next(config);
  }

  /**
   * Closes fullscreen.
  */

  closeFullScreen() {
    this._fullScreenEmitter$.next({ isOpened: false });
  }

  /**
   * Emits event if user clicked on fullscreen.
  */

  emitClickOnFullScreen() {
    this.fullScreenClickEmitter.next();
  }

  /**
   * This function allows overlay component to listen for append element request. 
  */

  get addElementEmitter() {
    return this._addElementEmitter$;
  }

  /**
   * This function allows overlay component to listen for delete element request. 
  */

  get deleteElementEmitter() {
    return this._destroyElementEmitter$;
  }

  /**
   * This function allows overlay component to listen for open fullscreen request. 
  */

  get fullScreenEmitter() {
    return this._fullScreenEmitter$;
  }

  /**
   * This function allows overlay component to listen for click events. 
  */

  get fullScreenClickEmitter() {
    return this._fullScreenClickEmitter$;
  }
}