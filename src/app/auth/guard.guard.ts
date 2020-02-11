import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // tslint:disable-next-line: max-line-length
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot ): | Observable<boolean | UrlTree>| Promise<boolean | UrlTree>| boolean| UrlTree {
    if (this.authService.geUserLogin() !== null) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
}
  
}
