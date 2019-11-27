import { Question } from './../models/quiz';
import { TooltipDirective } from './../directives/tooltip/tooltip.directive';
import { empty, Subscription } from 'rxjs';
import { QuizComponent } from './../quiz/quiz.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { QuizzesService } from './../services/quizzes/quizzes.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayQuizComponent } from './play-quiz.component';

describe('PlayQuizComponent', () => {
  let component: PlayQuizComponent;
  let fixture: ComponentFixture<PlayQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        PlayQuizComponent,
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
    fixture = TestBed.createComponent(PlayQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {

    it('should call server to get quiz', () => {
      const quizzesService = fixture.debugElement.injector.get(QuizzesService);
      const spy = spyOn(quizzesService, 'getQuizz').and.returnValue(empty());

      component.ngOnInit();

      expect(spy).toHaveBeenCalled();
    });

  });

  describe('ngOnInit', () => {

    it('should unsubscribe from the timer if there is set any', () => {
      component.questionTimer = new Subscription;
      const spy = spyOn(component.questionTimer, 'unsubscribe');

      component.ngOnDestroy();

      expect(spy).toHaveBeenCalled();
    });

  });

  describe('next', () => {

    beforeEach(() => {

      component.questions = [ 
        { title: 'teststt', duration: 15 }, 
        { title: 'eaaete', duration: 15 } 
      ] as Question[];

    });

    it('should set isFinished as true if there is no more questions', () => {
      component.currentQuestion = 1;

      component.next();

      expect(component.isFinished).toBeTruthy();
    });

    it('should increment current question index', () => {

      component.next();

      expect(component.currentQuestion).toBe(1);
    });

    it('should set new question to question property', () => {
      component.next();

      expect(component.question).toEqual(component.questions[1]);
    });

    it('should set remaining time', () => {
      component.next();

      expect(component.timeLeft).toBe(15);
    });

    it('should set timer', () => {
      const spy = spyOn(component, 'setTimer');

      component.next();

      expect(spy).toHaveBeenCalledWith(15);
    });

    it('should clear prevous answer', () => {
      component.choosenAnswer = 'a';

      component.next();

      expect(component.choosenAnswer).toBe('');
    });

    it('should unsubscribe from the timer if there is set any', () => {
      component.questionTimer = new Subscription;
      const spy = spyOn(component.questionTimer, 'unsubscribe');

      component.next();

      expect(spy).toHaveBeenCalled();
    });

  });

  describe('chooseAnswer', () => {

    beforeEach(() => {

      component.questions = [ 
        { title: 'teststt', duration: 15, correctAnswer: 'c' }, 
        { title: 'eaaete', duration: 15, correctAnswer: 'd' } 
      ] as Question[];
      component.question = component.questions[0];

    });

    it('should do nothing if answer is already choosen', () => {
      component.choosenAnswer = 'a';

      component.chooseAnswer('b');

      expect(component.choosenAnswer).toBe('a');
    });

    it('should save choosen answer if no answer is choosen', () => {
      component.choosenAnswer = '';

      component.chooseAnswer('a');

      expect(component.choosenAnswer).toBe('a');
    });

    it('should store truthy value in isAnsweredCorrectly propert of question if the correct answer was choosen', () => {
      component.question = { correctAnswer: 'a' } as Question;

      component.chooseAnswer('a');

      expect(component.question.isAnsweredCorrectly).toBeTruthy();
    });

    it('should store falsy value in isAnsweredCorrectly propert of question if the incorrect answer was choosen', () => {
      component.question = { correctAnswer: 'a' } as Question;

      component.chooseAnswer('b');

      expect(component.question.isAnsweredCorrectly).toBeFalsy();
    });

  });

  describe('isLast', () => {

    it('should return false if current question is not last', () => {
      component.questions = new Array(1, 2, 3) as any;
      component.currentQuestion = 1;

      const result = component.isLast();

      expect(result).toBeFalsy();
    });

    it('should return true if current question is last', () => {
      component.questions = new Array(1, 2, 3) as any;
      component.currentQuestion = 2;

      const result = component.isLast();

      expect(result).toBeTruthy();
    });

  });

  describe('showSummary', () => {
    
    it('should set isFinished as true', () => {
      component.endQuiz();

      expect(component.isFinished).toBeTruthy();
    });

  });

  describe('score', () => {

    it('should calculate total score', () => {
      component.questions = new Array(1, 2) as any;
      spyOnProperty(component, 'numberOfCorrectAnswers').and.returnValue(1);

      expect(component.score).toBe(50);
    });

  });

  describe('numberOfCorrectAnswers', () => {

    it('should return number of questions that were answered correcly', () => {
      component.questions = [
        { isAnsweredCorrectly: 1 },
        { isAnsweredCorrectly: 1 }, 
        { isAnsweredCorrectly: 0 }
      ] as any;

      expect(component.numberOfCorrectAnswers).toBe(2);
    });

  });

});
