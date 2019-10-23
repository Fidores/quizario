import { SignUpComponent } from './sign-up.component';
import { UserService } from '../services/user/user.service';

describe('SignUpComponentUnit', () => {
  let component: SignUpComponent;
  let service: UserService;

  beforeEach(() => {
    service = new UserService(null);
    component = new SignUpComponent(service, null);
  });

  it('should create sign up form with 5 controls', () => {
    expect(component.signUpForm.contains('name')).toBeTruthy();
    expect(component.signUpForm.contains('surname')).toBeTruthy();
    expect(component.signUpForm.contains('email')).toBeTruthy();
    expect(component.signUpForm.contains('password')).toBeTruthy();
    expect(component.signUpForm.contains('confirmPassword')).toBeTruthy();
  });

  describe('Form validation tests', () => {

    it('should make the name required', () => {
      const control = component.signUpForm.get('name');

      control.setValue('');
      
      expect(control.valid).toBeFalsy();
    });

    it('should make the name to be more than 3 characters', () => {
      const control = component.signUpForm.get('name');

      control.setValue('a');
      
      expect(control.valid).toBeFalsy();
    });

    it('should make the name to be less than 128 characters', () => {
      const control = component.signUpForm.get('name');

      control.setValue(new Array(129).fill('a').join(''));
      
      expect(control.valid).toBeFalsy();
    });

    it('should make the surname required', () => {
      const control = component.signUpForm.get('surname');

      control.setValue('');
      
      expect(control.valid).toBeFalsy();
    });

    it('should make the surname to be more than 3 characters', () => {
      const control = component.signUpForm.get('surname');

      control.setValue('a');
      
      expect(control.valid).toBeFalsy();
    });

    it('should make the surname to be less than 128 characters', () => {
      const control = component.signUpForm.get('surname');

      control.setValue(new Array(129).fill('a').join(''));
      
      expect(control.valid).toBeFalsy();
    });

    it('should make the email required', () => {
      const control = component.signUpForm.get('email');

      control.setValue('');
      
      expect(control.valid).toBeFalsy();
    });

    it('should make the email to be less than 128 characters', () => {
      const control = component.signUpForm.get('email');

      control.setValue(`${new Array(129).fill('a').join('')}@gmail.com`);
      
      expect(control.valid).toBeFalsy();
    });

    it('should accept only a valid email', () => {
      const control = component.signUpForm.get('email');

      control.setValue(`test`);
      
      expect(control.valid).toBeFalsy();
    });

    it('should make the password required', () => {
      const control = component.signUpForm.get('password');

      control.setValue('');
      
      expect(control.valid).toBeFalsy();
    });

    it('should make the password to be more than 5 characters', () => {
      const control = component.signUpForm.get('password');

      control.setValue('a');
      
      expect(control.valid).toBeFalsy();
    });

    it('should make the password to be less than 255 characters', () => {
      const control = component.signUpForm.get('password');

      control.setValue(new Array(256).fill('a').join(''));
      
      expect(control.valid).toBeFalsy();
    });

    it('should make the confirm password required', () => {
      const control = component.signUpForm.get('confirmPassword');

      control.setValue('');
      
      expect(control.valid).toBeFalsy();
    });

    it('should make the confirm password to be more than 5 characters', () => {
      const control = component.signUpForm.get('confirmPassword');

      control.setValue('a');
      
      expect(control.valid).toBeFalsy();
    });

    it('should make the confirm password to be less than 255 characters', () => {
      const control = component.signUpForm.get('confirmPassword');

      control.setValue(new Array(256).fill('a').join(''));
      
      expect(control.valid).toBeFalsy();
    });

    it('should make password and confirm password to be the same', () => {
      const form = component.signUpForm;

      form.get('name').setValue('adsadasd');
      form.get('email').setValue('aasfasfasf@gmail.com');
      form.get('surname').setValue('afagdsgsdgdsg');
      form.get('password').setValue('afasfsaf');
      form.get('confirmPassword').setValue('afasfsafd');

      expect(form.valid).toBeFalsy();
    });

  });

});
