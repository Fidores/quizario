import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, ErrorHandler, Injector } from "@angular/core";

@Injectable()
export class ErrorsHandler implements ErrorHandler{

    constructor(
        private readonly injector: Injector
    ){}

    handleError(error: Error | HttpErrorResponse){
        console.log('test')
    }
}