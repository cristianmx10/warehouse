import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  token: string;
  constructor(private router: Router, private loginService: LoginService) {
    this.token = this.loginService.token;
  }
  canActivate() {
    if (this.token) {
      console.log('xd');
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
