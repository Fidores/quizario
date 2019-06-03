import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzesSliderComponent } from './quizzes-slider.component';

describe('QuizzesSliderComponent', () => {
  let component: QuizzesSliderComponent;
  let fixture: ComponentFixture<QuizzesSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzesSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzesSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
