import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginAuthService } from '../service/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor( private routes: Router, private authService:LoginAuthService ){}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('----hii----');
      if (this.authService.isLoggedIn()) {
        console.log('----true-----');
        
        return true;
      } else {
        console.log('----false-----');
        this.routes.navigate(['/']);
        
        return false;
      }
  }

  


  
}
