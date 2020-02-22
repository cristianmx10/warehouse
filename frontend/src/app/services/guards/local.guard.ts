import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LocalGuard implements CanActivate {
  idLocal: string;
  constructor(private router: Router) {
    this.idLocal = localStorage.getItem('idl');
  }
  canActivate() {
    if (this.idLocal) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
