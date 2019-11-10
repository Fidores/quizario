import { OverlayService } from './../services/overlay/overlay.service';
import { SideNavService } from './../services/side-nav/side-nav.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavComponent } from './side-nav.component';

describe('SideNavComponent', () => {
  let component: SideNavComponent;
  let fixture: ComponentFixture<SideNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideNavComponent ],
      imports: [
        FontAwesomeModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    it('should listen for close requests of the side nav', () => {
      const sideNavService = fixture.debugElement.injector.get(SideNavService);
      sideNavService.closeListeaner.subscribe = jasmine.createSpy('subscribe').and.returnValue(null);

      component.ngOnInit()

      expect(sideNavService.closeListeaner.subscribe).toHaveBeenCalled();
    });

    it('should listen for open requests of the side nav', () => {
      const sideNavService = fixture.debugElement.injector.get(SideNavService);
      sideNavService.openListeaner.subscribe = jasmine.createSpy('subscribe').and.returnValue(null);

      component.ngOnInit()

      expect(sideNavService.openListeaner.subscribe).toHaveBeenCalled();
    });

    it('should listen for clicks on overlay', () => {
      const sideNavService = fixture.debugElement.injector.get(OverlayService);
      sideNavService.fullScreenClickEmitter.subscribe = jasmine.createSpy('subscribe').and.returnValue(null);

      component.ngOnInit();

      expect(sideNavService.fullScreenClickEmitter.subscribe).toHaveBeenCalled();
    });

  });

  describe('close', () => {

    it('should set status to closed', () => {
      component.close();

      expect(component.status).toBe('closed');
    });

    it('should close full screen overlay', () => {
      const overlayService = fixture.debugElement.injector.get(OverlayService);
      const spy = spyOn(overlayService, 'closeFullScreen').and.returnValue(null);
      
      component.close();

      expect(spy).toHaveBeenCalled();
    });

  });

  describe('open', () => {

    it('should set status to opened', () => {
      component.open();

      expect(component.status).toBe('opened');
    });

    it('should open full screen overlay', () => {
      const overlayService = fixture.debugElement.injector.get(OverlayService);
      const spy = spyOn(overlayService, 'openFullScreen').and.returnValue(null);
      
      component.open();

      expect(spy).toHaveBeenCalled();
    });

  });

});
