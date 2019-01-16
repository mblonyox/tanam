import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppAuthService } from 'src/app/services/app-auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly appAuth: AppAuthService,
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.appAuth.isLoggedIn().pipe(map(isLoggedIn => {
      console.log(`[LoginGuard:canActivate] User is logged in: ${isLoggedIn}`);

      // Redirect the user to admin area if already logged in
      return !isLoggedIn || this.router.parseUrl('/_/admin');
    }));
  }
}