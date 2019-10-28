import { AuthService } from './../services/auth/auth.service';
import { LoginComponent } from './login.component';

describe('LoginComponentUnit', () => {
  let component: LoginComponent;
  let service: AuthService;

  beforeEach(() => {
    service = new AuthService(null, null);
    component = new LoginComponent(service, null);
  });

});
