import { of } from 'rxjs';
import { QuizzesService } from './../services/quizzes/quizzes.service';
import { Quiz } from './../models/quiz';
import { HttpClientModule } from '@angular/common/http';
import { TooltipDirective } from './../directives/tooltip/tooltip.directive';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizComponent } from './quiz.component';
import { By } from '@angular/platform-browser';

describe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        QuizComponent,
        TooltipDirective
      ],
      imports: [
        FontAwesomeModule,
        RouterModule.forRoot([]),
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should show actions if showActions is set to true', () => {
    component.quiz = {title: 'test'} as Quiz;
    component.showActions = true;
    
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.quiz__actions'));
    const el: HTMLElement = de.nativeElement;

    expect(el).toBeTruthy();
  });

  it('should hide actions if showActions is set to false', () => {
    component.quiz = {title: 'test'} as Quiz;
    component.showActions = false;
    
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.quiz__actions'));

    expect(de).toBeFalsy();
  });

  it('should render quiz title', () => {
    component.quiz = {title: 'QuizName'} as Quiz;

    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.quiz__title'));
    const el: HTMLElement = de.nativeElement;

    expect(el.textContent).toBe('QuizName');
  });

  it('should render quiz image', () => {
    component.quiz = {title: 'QuizName', img: '/test/test.png'} as Quiz;

    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.quiz__image > img'));
    const el: HTMLImageElement = de.nativeElement;

    expect(el.src).toBeTruthy('/test/test.png');
  });

  it('should show image placeholder if the image is not recived', () => {
    component.quiz = {title: 'QuizName'} as Quiz;

    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.quiz__image > img'));
    const el: HTMLImageElement = de.nativeElement;

    expect(el.src).toContain('/assets/faq.png');
  });

  describe('deleteQuiz', () => {

    it('should call server to delete quiz', () => {
      const quiz = { _id: '1' }
      const quizzesService = fixture.debugElement.injector.get(QuizzesService);
      const spy = spyOn(quizzesService, 'deleteQuiz').and.returnValue(of(quiz));

      component.deleteQuiz(quiz._id);

      expect(spy).toHaveBeenCalledWith(quiz._id);
    });

    it('should emit event that a quiz has been deleted', () => {
      const quiz = { _id: '1' }
      const quizzesService = fixture.debugElement.injector.get(QuizzesService);
      const spy = spyOn(component.onQuizDelete, 'emit').and.returnValue(null);
      spyOn(quizzesService, 'deleteQuiz').and.returnValue(of(quiz));

      component.deleteQuiz(quiz._id);

      expect(spy).toHaveBeenCalled();
    });

  });

});
