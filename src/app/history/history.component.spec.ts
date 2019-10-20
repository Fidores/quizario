import { of } from 'rxjs';
import { UserService } from './../services/user/user.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryComponent } from './history.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;
  let gamesHistory = [
    { title: 'Game 1', dateOfGame: new Date('2000-06-04').toString() },
    { title: 'Game 2', dateOfGame: new Date('2000-04-04').toString() },
    { title: 'Game 3', dateOfGame: new Date('2000-07-04').toString() }
  ]

  const userServiceStub: Partial<UserService> = {

    getUser: () => {
      return of({ gamesHistory }) as any;
    }

  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [ { provide: UserService, useValue: userServiceStub } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render games', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const des = fixture.debugElement.queryAll(By.css('.games__game'));
    
    des.forEach((de, index) => {
      const el: HTMLElement = de.nativeElement;
      const date = new DatePipe('en-US').transform(gamesHistory[index].dateOfGame, 'medium');
      expect(el.querySelector('.games__title').textContent).toBe(`Game ${ index + 1 }`);
      expect(el.querySelector('.games__date').textContent).toBe(date);
    });

  });


});
