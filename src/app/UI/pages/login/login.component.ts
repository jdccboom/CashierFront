import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {  AuthResult } from '@models/Auth/gatewey/auth.gateway';
import { LoginUseCase } from '@usecase/auth/login.use-case';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  Login = {
    email: "",
    password: ""
  }

  auth!:Observable<AuthResult>;

  constructor(private loginUseCase:LoginUseCase ,private routes: Router) {
    
  }

  login() {
    console.log("Loggeando")
    this.auth = this.loginUseCase.execute(this.Login.email, this.Login.password);
    this.auth.pipe(take(1)).subscribe(a=>{
      console.log(a.user);
    })

  }
}
