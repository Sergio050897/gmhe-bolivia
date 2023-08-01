import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { User } from '../model/authentication.model';
import { AuthenticationService } from './authentication.service';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  user: User;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenStorageService: TokenStorageService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.user = this.tokenStorageService.getUser();

    console.log('user',this.user);

    if (this.user.username) {
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/auth/sign-in']);

    return false;
  }
}
