import { UserService } from './../services/user/user.service';
import { of } from 'rxjs';
import { QuizzesService } from './../services/quizzes/quizzes.service';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TooltipDirective } from './../directives/tooltip/tooltip.directive';
import { RouterModule } from '@angular/router';
import { QuizComponent } from './../quiz/quiz.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserQuizzesComponent } from './user-quizzes.component';
import { Quiz } from '../models/quiz';

describe('UserQuizzesComponent', () => {
  let component: UserQuizzesComponent;
  let fixture: ComponentFixture<UserQuizzesComponent>;
  let quizzesService;
  let userService;

  beforeEach(async(() => {
    quizzesService = class implements Partial<QuizzesService> {
      getAllQuizzes = jasmine.createSpy('getAllQuizzes').and.returnValue(of([1, 2 ,3]));
    }

    userService = class implements Partial<UserService> {
      getUser = jasmine.createSpy('getUser').and.returnValue(of({_id: '123456'}));
    }

    TestBed.configureTestingModule({
      declarations: [ 
        UserQuizzesComponent,
        QuizComponent,
        TooltipDirective
      ],
      imports: [
        RouterModule.forRoot([]),
        FontAwesomeModule,
        HttpClientModule
      ],
      providers: [
        { provide: QuizzesService, useClass: quizzesService },
        { provide: UserService, useClass: userService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
      expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    it('should set quizzes property with data retuned from the server', () => {
      component.ngOnInit();

      expect(component.quizzes).toEqual([1, 2, 3] as unknown as Quiz[]);
    });

    it('it should call server to get user`s quizzes', () => {
      const quizzes = fixture.debugElement.injector.get(QuizzesService);

      expect(quizzes.getAllQuizzes).toHaveBeenCalledWith({ author: '123456' });
    });

    it('should call server to get user id', () => {
      const user = fixture.debugElement.injector.get(UserService);

      expect(user.getUser).toHaveBeenCalled();
    })

  });

  describe('onQuizDelete', () => {

    it('should remove quiz from quizzes array', () => {
      component.quizzes = [1, 2, 3, 4, 5] as unknown as Quiz[];

      component.onQuizDelete(component.quizzes[0]);

      expect(component.quizzes).toEqual([2, 3, 4, 5] as unknown as Quiz[]);
    });

  });

});
