import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

/**
 * Gives access to the route if the user is logged in.
 */

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private readonly router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(localStorage.getItem('auth-token')){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }  }
  
}
