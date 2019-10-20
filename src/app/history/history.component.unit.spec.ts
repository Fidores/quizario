import { UserService } from '../services/user/user.service';

import { HistoryComponent } from './history.component';
import { of } from 'rxjs';

describe('HistoryComponentUnit', () => {
  let component: HistoryComponent;
  let service: UserService;

  beforeEach(() => {
    service = new UserService(null);
    component = new HistoryComponent(service);
  });

  describe('ngOnInit', () => {

    it('should set history$ property with data returned from server', () => {
    
      const user = { gamesHistory: [1, 2, 3] };
    
      spyOn(service, 'getUser').and.callFake(() => of(user));
  
      component.ngOnInit();
  
      component.history$.toPromise().then(gamesHistory => {
        expect(gamesHistory).toEqual(user.gamesHistory);
      });
  
    });

    it('should call server to get user data', () => {

      const spy = spyOn(service, 'getUser').and.callFake(() => of([1, 2, 3]));
    
      component.ngOnInit();

      expect(spy).toHaveBeenCalled();

    });

  })


});
