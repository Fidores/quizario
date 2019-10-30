import { HttpClientModule } from '@angular/common/http';
import { TooltipDirective } from './../directives/tooltip/tooltip.directive';
import { QuizComponent } from './../quiz/quiz.component';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { QuizzesSliderComponent } from './../quizzes-slider/quizzes-slider.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        HomeComponent,
        QuizzesSliderComponent,
        QuizComponent,
        TooltipDirective
      ],
      imports: [
        FontAwesomeModule,
        SwiperModule,
        RouterModule,
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

});
