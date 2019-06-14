import { Question, Quiz } from './../models/quiz';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { faTimes, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { QuizzesService } from '../services/quizzes/quizzes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'play-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.scss']
})
export class PlayQuizComponent implements OnInit, OnDestroy {

  constructor(
    private readonly route: ActivatedRoute,
    private readonly quizzes: QuizzesService
  ) { }

  faTimes = faTimes;
  faArrowRight = faArrowRight;

  quizSubscription: Subscription;

  index = 0;
  quiz: Quiz;
  questions: Question[] = [];
  question: Question;
  choosenAnswer: string;

  ngOnInit() {
    this.quizSubscription = this.route.params.pipe(switchMap(params => this.quizzes.getQuizz(params.id)))
      .subscribe(quiz => {
        this.quiz = quiz;
        this.questions = this.quiz.questions;
        this.question = this.quiz.questions[0];
      });
  }

  ngOnDestroy() {
    this.quizSubscription.unsubscribe();
  }

  next() {
    if(this.index + 1 > this.questions.length - 1) return;
    this.choosenAnswer = '';
    this.index++;
    this.question = this.questions[this.index];
  }

  chooseAnswer(answer: string) {
    if(this.choosenAnswer) return;
    this.choosenAnswer = answer;
    this.question.answeredCorrectly = this.question.rightAnswer === answer ? 1 : 0;
  }

}
