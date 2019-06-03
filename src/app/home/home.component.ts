import { QuizzesService } from './../services/quizzes/quizzes.service';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private readonly quizzesService: QuizzesService
  ) { }

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  sections;

  ngOnInit() {
    this.sections = this.quizzesService.getHomeSections();
  }

  getSliderConfig(prevArr: ElementRef, nextArr: ElementRef){
    return {
      slidesToShow: 3,
      slidesToScroll: 3,
      prevArrow: prevArr,
      nextArrow: nextArr
    }
  }

}
