import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { environment } from './../../environments/environment.prod';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './../services/user/user.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDetailsComponent } from './account-details.component';
import { By } from '@angular/platform-browser';
import { User } from '../models/user';

describe('AccountDetailsComponent', () => {
  let component: AccountDetailsComponent;
  let fixture: ComponentFixture<AccountDetailsComponent>;

  const user = {
    name: 'John',
    surname: 'Smith',
    email: 'john.smith@wp.pl',
    registrationTime: Date.now()
  } as unknown as User;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountDetailsComponent ],
      imports: [ HttpClientModule, ToastrModule.forRoot(environment.notificationsConfig), FontAwesomeModule, ReactiveFormsModule ],
      providers: [ UserService, ToastrService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should render user name', () => {
    component.editMode = false;
    component.userDetails = user;

    fixture.detectChanges();

    const de = fixture.debugElement.queryAll(By.css('.details__value'))[0];
    const el: HTMLElement = de.nativeElement;

    expect(el.innerText).toContain(user.name);

  });

  it('should render user surname', () => {
    component.editMode = false;
    component.userDetails = user;

    fixture.detectChanges();

    const de = fixture.debugElement.queryAll(By.css('.details__value'))[1];
    const el: HTMLElement = de.nativeElement;

    expect(el.innerText).toContain(user.surname);

  });

  it('should render user email', () => {
    component.editMode = false;
    component.userDetails = user;

    fixture.detectChanges();

    const de = fixture.debugElement.queryAll(By.css('.details__value'))[2];
    const el: HTMLElement = de.nativeElement;

    expect(el.innerText).toContain(user.email);

  });

  it('should render user registration time', () => {
    component.editMode = false;
    component.userDetails = user;

    fixture.detectChanges();

    const de = fixture.debugElement.queryAll(By.css('.details__value'))[3];
    const el: HTMLElement = de.nativeElement;

    expect(new Date(el.innerText).toLocaleDateString())
    .toContain(new Date(user.registrationTime).toLocaleDateString());
  });

  it('should hide user details and show form for editing user if edit mode is enabled', () => {
    component.editMode = true;
    component.userDetails = user;

    fixture.detectChanges();

    const detailsElement = fixture.debugElement.query(By.css('.details'));
    const editFormElement = fixture.debugElement.query(By.css('.edit-user'));

    expect(detailsElement).toBeNull();
    expect(editFormElement.nativeElement).toBeTruthy();
  });

  it('should show user details and hide form for editing user if edit mode is disabled', () => {
    component.editMode = false;
    component.userDetails = user;

    fixture.detectChanges();

    const detailsElement = fixture.debugElement.query(By.css('.details'));
    const editFormElement = fixture.debugElement.query(By.css('.edit-user'));

    expect(detailsElement.nativeElement).toBeTruthy();
    expect(editFormElement).toBeNull();
  });

  it('should toggle edit view when clicked', () => {
    component.editMode = false;
    component.userDetails = user;

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('.actions__edit'));
    
    button.triggerEventHandler('click', null);

    expect(component.editMode).toBeTruthy();

    button.triggerEventHandler('click', null);

    expect(component.editMode).toBeFalsy();
  });

});
