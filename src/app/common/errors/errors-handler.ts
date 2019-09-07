import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, ErrorHandler, Injector, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorsHandler implements ErrorHandler {

    private get router(): Router {
        return this.injector.get(Router)
    }

    private get zone(): NgZone {
        return this.injector.get(NgZone);
    }
    
    constructor( private readonly injector: Injector, private readonly notifications: ToastrService ) {}


    handleError(error: Error | HttpErrorResponse) {

        if(error instanceof HttpErrorResponse) {

            switch (error.status) {
                case 400:
                    this.notifications.error('Nieprawidłowe dane', `Error ${ error.status }`);
                    break;
                
                case 401:
                    this.notifications.error('Wymagane logowanie', `Error ${ error.status }`);
                    this.zone.run(() => this.router.navigate(['/login'])).then();
                    break;

                case 403:
                    this.notifications.error('Brak uprawnień', `Error ${ error.status }`);
                    break;

                case 404:
                    this.notifications.error('Nie znaleziono zasobów', `Error ${ error.status }`);
                    this.zone.run(() => this.router.navigate(['/not-found'])).then();
                    break;
            }

        }
        
    }
}
