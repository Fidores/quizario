import { QuizzesService } from './../services/quizzes/quizzes.service';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { faPlus, faSave, faPen } from '@fortawesome/free-solid-svg-icons';
import { Quiz } from '../models/quiz';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

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
    this.id = this.route.snapshot.params.id;
    this.pageTitle.setTitle(this.id ? 'Quizario - edytuj quiz' : 'Quizario - stwórz quiz');

    if(this.id)
      this.quizzes.getQuizz(this.id, { skipHistory: true })
      .pipe(take(1))
      .subscribe((quiz: Quiz) => {
        this.editMode = true;
        for(let i=0 ; i<=quiz.questions.length - 2 ; i++) this.addQuestion();
        this.quizForm.patchValue(quiz);
      });
    
    this.addQuestion();
  }

  addQuiz() {
    const quiz = this.quizForm.value as Quiz;
    this.quizzes.addQuiz(quiz).subscribe((quiz) => this.router.navigate(['/']));
  }
  
  updateQuiz() {
    const quiz = this.quizForm.value as Quiz;
    this.quizzes.updateQuiz(this.id, quiz).subscribe((quiz) => this.router.navigate(['/']));
  }

  addQuestion() {
    const question = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      answers: new FormGroup({
        a: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        b: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        c: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        d: new FormControl('', [Validators.required, Validators.maxLength(50)])
      }),
      rightAnswer: new FormControl('', Validators.required),
      duration: new FormControl('', [Validators.required, Validators.min(0)]),
      img: new FormControl('')
    });

    this.questions.push(question);
  }

  getQuestionTitle(index: number) {
    return (this.quizForm.get('questions') as FormArray).at(index).get('title');
  }

  getRightAnswer(index: number) {
    return (this.quizForm.get('questions') as FormArray).at(index).get('rightAnswer');
  }

  getAnswer(index: number, answer: string) {
    return (this.quizForm.get('questions') as FormArray).at(index).get('answers').get(answer)
  }
  
  getImage(index: number) {
    return (this.quizForm.get('questions') as FormArray).at(index).get('img');
  }

  get questions() {
    return this.quizForm.get('questions') as FormArray;
  }

  get title() {
    return this.quizForm.get('title');
  }
}
