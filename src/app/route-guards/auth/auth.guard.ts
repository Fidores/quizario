import { UserService } from './../../services/user/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

/**
* If user is logged in, the guard gives access to the route.
* If user isn't logged in, the guard refuses access to the route and redirects to login page.
*/

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private readonly user: UserService,
    private readonly router: Router
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const isAuthorized = this.user.isAuthorized();
      
      if(!isAuthorized) this.router.navigate(['/login']);
      return isAuthorized ? true : false;
  }
  
}
