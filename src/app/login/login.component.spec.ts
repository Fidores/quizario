import { of, throwError } from 'rxjs';
import { AuthService } from './../services/auth/auth.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let injector;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot([])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    injector = getTestBed();
    authService = injector.get(AuthService);
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the authorization error', () => {
    const error = 'Invalid email or password';

    component.error = new HttpErrorResponse({ error });
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.log-in-error'));
    const el: HTMLElement = de.nativeElement;
    
    expect(el.textContent).toContain(error);
  });

  describe('logInUser', () => {

    it('should call the server to get user data', () => {
      const spy = spyOn(authService, 'logIn').and.returnValue(of({name: 'aaa', surname: 'aaa'}));

      component.logInUser({value: { email: '', password: '' }} as NgForm);

      expect(spy).toHaveBeenCalled();
    });

    it('should set error property if an error is thrown', () => {
      const error = new HttpErrorResponse({error: 'ERROR'});
      spyOn(authService, 'logIn').and.returnValue(throwError(error));

      component.logInUser({value: { email: '', password: '' }} as NgForm);

      expect(component.error).toEqual(error);
    });

    it('should set error property to falsy value, if no error is thrown', () => {
      spyOn(authService, 'logIn').and.returnValue(of({name: 'aaa', surname: 'aaa'}));
      component.error = new HttpErrorResponse({ error: 'a' });

      component.logInUser({value: { email: '', password: '' }} as NgForm);

      expect(component.error).toBeFalsy();
    });

  });

});
