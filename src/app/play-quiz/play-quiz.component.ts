import { Question, Quiz } from './../models/quiz';
import { switchMap, take } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { faTimes, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { QuizzesService } from '../services/quizzes/quizzes.service';
import { environment } from 'src/environments/environment';
import { timer, Subscription } from 'rxjs';

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

  environment = environment;

  index = 0;
  quiz: Quiz;
  questions: Question[] = [];
  question: Question;
  choosenAnswer: string;
  isFinished = false;
  timeLeft: number;
  questionTimer: Subscription;

  ngOnInit() {
    this.quizzes.getQuizz(this.route.snapshot.params.id)
    .pipe(take(1))
    .subscribe(quiz => {
      this.quiz = quiz;
      this.questions = this.quiz.questions;
      this.question = this.quiz.questions[0];
      this.timeLeft = this.question.duration;
      this.setTimer(this.question.duration);
    });
  }

  ngOnDestroy() {
    if (this.questionTimer) { this.questionTimer.unsubscribe(); }
  }

  next(): void {
    if (this.index + 1 > this.questions.length - 1) {
      this.isFinished = true;
      return;
    }
    this.choosenAnswer = '';
    this.index++;
    this.question = this.questions[this.index];
    if (this.questionTimer) { this.questionTimer.unsubscribe(); }
    this.timeLeft = this.question.duration;
    this.setTimer(this.question.duration);
  }

  setTimer(duration: number): void {
    if (!duration) return;

    const source = timer(1000, 1000);

    this.questionTimer = source.pipe(take(duration + 1))
      .subscribe(time => {
        if (time === duration) { this.next(); }
        this.timeLeft = duration - time;
      });
  }

  chooseAnswer(answer: string) {
    if (this.choosenAnswer) return;
    this.choosenAnswer = answer;
    this.question.isAnsweredCorrectly = this.question.correctAnswer === answer ? 1 : 0;
  }

  calculateScore(): number {
    return (this.numberOfCorrectAnswers / this.questions.length) * 100;
  }

  get numberOfCorrectAnswers(): number {
    return this.questions.reduce((answers, question) => question.isAnsweredCorrectly ? answers + 1 : answers, 0);
  }

}
