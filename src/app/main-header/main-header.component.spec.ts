import { UserService } from './../services/user/user.service';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './../menu/menu.component';
import { TooltipDirective } from './../directives/tooltip/tooltip.directive';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainHeaderComponent } from './main-header.component';
import { User } from '../models/user';
import { SideNavService } from '../services/side-nav/side-nav.service';

describe('MainHeaderComponent', () => {
  let component: MainHeaderComponent;
  let fixture: ComponentFixture<MainHeaderComponent>;
  let userServiceStub;
  let sideNavServiceStub;

  beforeEach(async(() => {

    userServiceStub = class {
      user$ = of({name: 'aaaa', surname: 'aaaaa'} as unknown as User);
      logOut = jasmine.createSpy('logOut');
    }

    sideNavServiceStub = class {
      open = jasmine.createSpy('open');
    }

    TestBed.configureTestingModule({
      declarations: [ 
        MainHeaderComponent,
        TooltipDirective,
        MenuComponent
      ],
      imports: [
        FontAwesomeModule,
        RouterModule.forRoot([]),
        HttpClientModule
      ],
      providers: [
        { provide: UserService, useClass: userServiceStub },
        { provide: SideNavService, useClass: sideNavServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    it('should set user property with data returned from the server', () => {
      component.ngOnInit();

      expect(component.user).toEqual({name: 'aaaa', surname: 'aaaaa'} as unknown as User);
    });

  });

  describe('openSideNav', () => {

    it('should request side nav to open', () => {
      const sideNav = fixture.debugElement.injector.get(SideNavService);

      component.openSideNav();

      expect(sideNav.open).toHaveBeenCalled();
    });

  })

  describe('signOut', () => {

    it('should request sign out', () => {
      const userService = fixture.debugElement.injector.get(UserService);

      component.signOut();

      expect(userService.logOut).toHaveBeenCalled();
    })

  });

});
