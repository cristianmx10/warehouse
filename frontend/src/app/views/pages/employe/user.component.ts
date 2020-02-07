import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/models/login.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit {
  logins: Login[] = [];
  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.getAllLogins();
  }

  getAllLogins() {
    this.loginService.getAllLogins()
      .subscribe(
        (data: Login[]) => this.logins = data,
        (error) => console.error(error));
  }

}
