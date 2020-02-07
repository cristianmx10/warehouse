import { Component, OnInit } from '@angular/core';
import { Login } from '../models/login.model';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  login: Login = {};
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  // INICIAR SESION
  singIn() {
    this.loginService.singIn(this.login)
      .subscribe((data: string) => console.log(data));
  }
}
