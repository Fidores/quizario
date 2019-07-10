import { QuizzesService } from './../services/quizzes/quizzes.service';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { faPlus, faSave, faPen } from '@fortawesome/free-solid-svg-icons';
import { Quiz } from '../models/quiz';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { take, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent implements OnInit {

  constructor(
    private readonly quizzes: QuizzesService,
    private readonly pageTitle: Title,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  faPlus = faPlus;
  faSave = faSave;
  faPen = faPen;
  
  editMode = false;
  id: string;

  quizForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
    questions: new FormArray([], [Validators.required])
  });

  ngOnInit() {
    this.pageTitle.setTitle('Quizario - stwórz quiz');

    this.route.params
      .pipe(take(1), switchMap(params => { return params.id ? this.quizzes.getQuizz(params.id) : of(null) }))
      .subscribe((quiz: Quiz) => {
        if(!quiz) return;

        this.pageTitle.setTitle('Quizario - edytuj quiz');
        this.editMode = true;
        for(let i=0 ; i<=quiz.questions.length - 1 ; i++) this.addQuestion();
        this.quizForm.patchValue(quiz);
      });
    // this.addQuestion();
  }

  addQuiz() {
    const quiz = this.quizForm.value as Quiz;
    this.quizzes.addQuiz(quiz).subscribe((quiz) => this.router.navigate(['/']));
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
      duration: new FormControl(0, Validators.min(0))
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
