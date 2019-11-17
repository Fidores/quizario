import { TooltipDirective } from './../directives/tooltip/tooltip.directive';
import { QuizComponent } from './../quiz/quiz.component';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzesSliderComponent } from './quizzes-slider.component';
import { By } from '@angular/platform-browser';

describe('QuizzesSliderComponent', () => {
  let component: QuizzesSliderComponent;
  let fixture: ComponentFixture<QuizzesSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        QuizzesSliderComponent,
        QuizComponent,
        TooltipDirective
      ],
      imports: [ 
        FontAwesomeModule,
        SwiperModule,
        RouterModule.forRoot([])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzesSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    it('should set navigation buttons to swiper config', () => {
      const prevBtn: HTMLElement = fixture.debugElement.query(By.css('.slider__nav-btn--prev')).nativeElement;
      const nextBtn: HTMLElement = fixture.debugElement.query(By.css('.slider__nav-btn--next')).nativeElement;

      component.ngOnInit();

      expect(component.swiperNavigation.prevEl).toEqual(prevBtn);
      expect(component.swiperNavigation.nextEl).toEqual(nextBtn);
    });

  });

});
