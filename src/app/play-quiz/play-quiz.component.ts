import { Question, Quiz } from './../models/quiz';
import { switchMap, take } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { faTimes, faArrowRight, faEye } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { QuizzesService } from '../services/quizzes/quizzes.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'play-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.scss']
})
export class PlayQuizComponent implements OnInit {

  constructor(
    private readonly route: ActivatedRoute,
    private readonly quizzes: QuizzesService
  ) { }

  faTimes = faTimes;
  faArrowRight = faArrowRight;
  faEye = faEye;

  environment = environment;

  index = 0;
  quiz: Quiz;
  questions: Question[] = [];
  question: Question;
  choosenAnswer: string;
  isFinished: boolean = true;

  ngOnInit() {
    this.route.params.pipe(switchMap(params => this.quizzes.getQuizz(params.id)))
    .pipe(take(1))
    .subscribe(quiz => {
      this.quiz = quiz;
      this.questions = this.quiz.questions;
      this.question = this.quiz.questions[0];
    });
  }

  next() {
    if(this.index + 1 > this.questions.length - 1) {
      this.isFinished = true;
      return;
    }
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
