import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { UserService } from './../services/user/user.service';

import { AccountDetailsComponent } from './account-details.component';
import { User } from '../models/user';

describe('AccountDetailsComponentUnit', () => {
    let component: AccountDetailsComponent;
    let service: UserService;
    let notifications: ToastrService = { success: () => null, error: () => null } as ToastrService;

    const user = {
        name: 'John',
        surname: 'Smith',
        email: 'john.smith@wp.pl',
        password: ''
    } as unknown as User;

    beforeEach(() => {
        service = new UserService(null);
        component = new AccountDetailsComponent(service, notifications);
    });

    describe('OnInit', () => {

        it('should set userDetails property with user data returned from the server', () => {
            spyOn(service, 'getUser').and.callFake(() => of(user));
    
            component.ngOnInit();
    
            expect(component.userDetails).toEqual(user);
        });
    
        it('should patch updateForm with user data returned from the server', () => {
            spyOn(service, 'getUser').and.callFake(() => of(user));
    
            component.ngOnInit();
    
            expect(component.updateForm.value).toEqual(user);
        });

    });

    describe('toggleEdit', () => {

        it('should toggle editMode property', () => {
            component.editMode = false;
            component.toggleEdit();

            expect(component.editMode).toBeTruthy();

            component.toggleEdit();

            expect(component.editMode).toBeFalsy();

            component.toggleEdit();

            expect(component.editMode).toBeTruthy();
        });

    });

    describe('updateUser', () => {
        
        it('should call the server when user updates his data', () => {
            const spy = spyOn(service, 'updateUser').and.callFake(() => of(user));
    
            component.updateUser();
    
            expect(spy).toHaveBeenCalled();
        });

        it('should disable edit mode after user data is retuned from the server', () => {
            component.editMode = true;

            spyOn(service, 'updateUser').and.callFake(() => of(user));
    
            component.updateUser();
    
            expect(component.editMode).toBeFalsy();
        });

        it('should set userDetails property with new data retuned from the server', () => {
            spyOn(service, 'updateUser').and.callFake(() => of(user));
    
            component.updateUser();
    
            expect(component.userDetails).toEqual(user);
        });

    });

});
