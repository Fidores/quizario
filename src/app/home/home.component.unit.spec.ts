import { SectionOfQuizzes } from './../models/quiz';
import { of } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { QuizzesService } from './../services/quizzes/quizzes.service';

import { HomeComponent } from './home.component';

describe('HomeComponentUnit', () => {
  let component: HomeComponent;
  let service: QuizzesService;
  let title: Partial<Title>;

  beforeEach(() => {
    service = new QuizzesService(null);
    title = { setTitle: () => null };
    component = new HomeComponent(service, (title as Title));
  });

  describe('ngOnInit', () => {

    it('should call server to get sections of quizzes', () => {
      const spy = spyOn(service, 'getHomeSections').and.returnValue(of([1, 2 ,3]));

      component.ngOnInit();

      expect(spy).toHaveBeenCalled();
    });

    it('should set section property with data retuned from the server', () => {
      const sections = [1, 2, 3] as unknown as SectionOfQuizzes[];
      spyOn(service, 'getHomeSections').and.returnValue(of(sections));

      component.ngOnInit();

      component.sections.toPromise().then(result => expect(result).toEqual(sections));
    });

  });

});
