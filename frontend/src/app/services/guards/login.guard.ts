import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

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

export class LocalGuard implements CanActivate {
  local: string;
  constructor(private router: Router) {
    this.local = localStorage.getItem('local');
  }
  canActivate() {
    if (this.local) {
      return true;
    } else {
      this.router.navigate(['/localselect']);
    }
  }
}
