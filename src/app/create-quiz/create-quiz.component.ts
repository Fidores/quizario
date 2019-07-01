import { QuizzesService } from './../services/quizzes/quizzes.service';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { faPlus, faSave } from '@fortawesome/free-solid-svg-icons';
import { Quiz } from '../models/quiz';

@Component({
  selector: 'create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent implements OnInit {

  constructor(
    private readonly _quizzesService: QuizzesService
  ) { }

  faPlus = faPlus;
  faSave = faSave;

  quizForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
    questions: new FormArray([], [Validators.required])
  });

  ngOnInit() {
    this.addQuestion();
  }

  addQuiz(){
    const quiz = this.quizForm.value as Quiz;
    this._quizzesService.addQuiz(quiz).subscribe(console.log);
  }

  addQuestion($event?: Event) {
    if($event) $event.preventDefault();

    const question = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      answers: new FormGroup({
        a: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        b: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        c: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        d: new FormControl('', [Validators.required, Validators.maxLength(50)])
      }),
      rightAnswer: new FormControl('', Validators.required),
      duration: new FormControl('', Validators.min(0))
    });

    this.questions.push(question);
  }

  getQuestionTitle(index: number) {
    return (this.quizForm.get('questions') as FormArray).at(index).get('title');
  }

  getRightAnswer(index: number) {
    return (this.quizForm.get('questions') as FormArray).at(index).get('rightAnswer');
  }

  get questions() {
    return this.quizForm.get('questions') as FormArray;
  }

  get title() {
    return this.quizForm.get('title');
  }
}
