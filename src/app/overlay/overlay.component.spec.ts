import { OverlayService } from 'src/app/services/overlay/overlay.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayComponent } from './overlay.component';

describe('OverlayComponent', () => {
  let component: OverlayComponent;
  let fixture: ComponentFixture<OverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  describe('notifyClick', () => {

    it('should emit click on overlay', () => {
      const overlayService = fixture.debugElement.injector.get(OverlayService);
      const spy = spyOn(overlayService, 'emitClickOnFullScreen');

      component.notifyClick();

      expect(spy).toHaveBeenCalled();
    });

  });

  describe('ngOnInit', () => {

    it('should subscribe to add element requests', () => {
      const overlayService = fixture.debugElement.injector.get(OverlayService);
      const spy = spyOn(overlayService.addElementEmitter, 'subscribe');

      component.ngOnInit();

      expect(spy).toHaveBeenCalled();
    });

    it('should subscribe to delete element requests', () => {
      const overlayService = fixture.debugElement.injector.get(OverlayService);
      const spy = spyOn(overlayService.deleteElementEmitter, 'subscribe');

      component.ngOnInit();

      expect(spy).toHaveBeenCalled();
    });

    it('should subscribe to open fullscreen requests', () => {
      const overlayService = fixture.debugElement.injector.get(OverlayService);
      const spy = spyOn(overlayService.fullScreenEmitter, 'subscribe');

      component.ngOnInit();

      expect(spy).toHaveBeenCalled();
    });

  });

});
