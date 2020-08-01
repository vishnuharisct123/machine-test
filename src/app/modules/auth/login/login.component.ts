import { User } from './../../../core/models/user.model';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/core/http-service/auth.service';
import { takeWhile } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isButtonEnable: boolean;
  userEmailId: string;
  password: string;
  isAlive = true;
  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    public router: Router,
    public formBuilder: FormBuilder
  ) {}

  login() {   //use this  email : eve.holt@reqres.in   password : any 
     ;
    this.authService
      .login({ email: this.userEmailId, password: this.password })
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        (res) => {
          this.toastr.success('Login successfully');
          localStorage.setItem('token', res.token);
          this.router.navigateByUrl('app/home');
        },
        (error) => {
           
          this.toastr.error(error.error.error);
        
        }
      );
  }
  passValueToButtonCom(event: {
    loginFormValues: User;
    validation: boolean;
  }): void {
    this.userEmailId = event.loginFormValues.email;
    this.password = event.loginFormValues.password;
    this.isButtonEnable = event.validation;
  }
  ngOnDestroy(): void {
    this.isAlive = false;
  }
}
