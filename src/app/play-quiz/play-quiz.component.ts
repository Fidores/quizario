import { Question } from './../models/quiz';
import { take } from 'rxjs/operators';
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

  currentQuestion = 0;
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
      this.questions = quiz.questions;
      this.question = quiz.questions[0];
      this.timeLeft = this.question.duration;
      this.setTimer(this.question.duration);
    });
  }

  ngOnDestroy() {
    if (this.questionTimer) { this.questionTimer.unsubscribe(); }
  }

  next(): void {
    if (this.isLast()) return this.endQuiz();
    
    this.choosenAnswer = '';
    this.currentQuestion++;
    this.question = this.questions[this.currentQuestion];
    if (this.questionTimer) { this.questionTimer.unsubscribe(); }
    this.timeLeft = this.question.duration;
    this.setTimer(this.question.duration);
  }

  setTimer(duration: number): void {
    if (!duration) return;

    timer(1000, 1000).pipe(take(duration + 1))
      .subscribe(time => {
        if (time === duration) { this.next(); }
        this.timeLeft = duration - time;
      });
  }

  chooseAnswer(answer: string): void {
    if (this.choosenAnswer) return;

    this.choosenAnswer = answer;
    this.question.isAnsweredCorrectly = this.question.correctAnswer === answer ? 1 : 0;
  }

  isLast(): boolean {
    return this.currentQuestion + 1 > this.questions.length - 1;
  }

  endQuiz(): void {
    this.isFinished = true;
  }

  get score(): number {
    return (this.numberOfCorrectAnswers / this.questions.length) * 100;
  }

  get numberOfCorrectAnswers(): number {
    return this.questions.filter(question => question.isAnsweredCorrectly === 1).length;
  }

}
