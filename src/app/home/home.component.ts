import { Observable } from 'rxjs';
import { QuizzesService } from './../services/quizzes/quizzes.service';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SectionOfQuizzes } from '../models/quiz';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private readonly quizzesService: QuizzesService,
    private readonly pageTitle: Title
  ) { }

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  sections: Observable<SectionOfQuizzes[]>;

  ngOnInit() {
    this.pageTitle.setTitle('Quizario');
    this.sections = this.quizzesService.getHomeSections();
  }
}
