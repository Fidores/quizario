import { SectionOfQuizzes } from './../models/quiz';
import { environment } from './../../environments/environment';
import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Element } from '@angular/compiler';
import { SwiperConfigInterface, SwiperNavigationInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'quizzes-slider',
  templateUrl: './quizzes-slider.component.html',
  styleUrls: ['./quizzes-slider.component.scss']
})
export class QuizzesSliderComponent implements OnInit {

  constructor() { }

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  env = environment;

  @Input('section') section: SectionOfQuizzes;
  @ViewChild('prevBtn') prevArrow: ElementRef<Element>;
  @ViewChild('nextBtn') nextArrow: ElementRef<Element>;

  swiperNavigation: SwiperNavigationInterface = {
    prevEl: {} as HTMLElement,
    nextEl: {} as HTMLElement
  }

  sliderConfig: SwiperConfigInterface = {
    slidesPerView: 4,
    slidesPerGroup: 4,
    navigation: this.swiperNavigation,
    spaceBetween: 20
  };

  ngOnInit() {
    this.swiperNavigation.nextEl = this.nextArrow.nativeElement as any;
    this.swiperNavigation.prevEl = this.prevArrow.nativeElement as any;
  }

}
