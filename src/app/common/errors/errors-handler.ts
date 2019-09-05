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
                    alert('Niepoprawne dane');
                    this.notifications.error('Niepoprawne dane', 'Error 400');
                    break;

                case 401:
                    alert('Wymagany login');
                    this.notifications.error('Wymagane jest zalogowanie się', 'Error 401');
                    break;

                case 403:
                    this.notifications.error('Brak dostępu do żądanych zasobów', 'Error 403');
                    this.zone.run(() => this.router.navigate(['/login'])).then();
                    break;

                case 404:
                    this.notifications.error('Nie znaleziono zażądanych zasobów', 'Error 404');
                    break;
                
                case 500:
                    this.notifications.error('Napotkano błąd po stronie serwera.', 'Error 500');
                    break;
            
                default:
                    console.log(error);
                    break;
            }

        }

        console.log(error);
    }
}
