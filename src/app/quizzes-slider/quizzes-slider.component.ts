import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Element } from '@angular/compiler';


@Component({
  selector: 'quizzes-slider',
  templateUrl: './quizzes-slider.component.html',
  styleUrls: ['./quizzes-slider.component.scss']
})
export class QuizzesSliderComponent implements OnInit {

  constructor() { }

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  @Input('section') section;
  @ViewChild('prevBtn') prevArrow: ElementRef<Element>;
  @ViewChild('nextBtn') nextArrow: ElementRef<Element>;

  sliderConfig = {
    slidesToShow: 3,
    slidesToScroll: 3
  }

  ngOnInit() {
    this.sliderConfig['nextArrow'] = this.nextArrow.nativeElement;
    this.sliderConfig['prevArrow'] = this.prevArrow.nativeElement;
  }

}
