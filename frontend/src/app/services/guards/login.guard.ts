import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  token: string;
  constructor(private router: Router) {
    this.token = localStorage.getItem('token');
   }
  canActivate() {
    if (this.token) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
