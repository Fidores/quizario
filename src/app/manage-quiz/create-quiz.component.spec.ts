import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageQuizComponent } from './create-quiz.component';

describe('CreateQuizComponent', () => {
  let component: ManageQuizComponent;
  let fixture: ComponentFixture<ManageQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
