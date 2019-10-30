import { UserService } from './services/user/user.service';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './menu/menu.component';
import { TooltipDirective } from './directives/tooltip/tooltip.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SideNavComponent } from './side-nav/side-nav.component';
import { OverlayComponent } from './overlay/overlay.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  let userServiceStub = class {
    notify = jasmine.createSpy('notify')
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FontAwesomeModule,
        HttpClientModule
      ],
      declarations: [
        AppComponent,
        MainHeaderComponent,
        OverlayComponent,
        SideNavComponent,
        TooltipDirective,
        MenuComponent
      ],
      providers: [
        { provide: UserService, useClass: userServiceStub}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    it('should notify app whether user is logged in or isn`t', () => {
      const userService = fixture.debugElement.injector.get(UserService);
  
      component.ngOnInit();
  
      expect(userService.notify).toHaveBeenCalled();
    });

  });

});
