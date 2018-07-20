import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
    templateUrl: './login.component.html',
    styles: [`
        em { float: right; color: #E05C65; padding-left: 10px }
    `]
})
export class LoginComponent {
    userName;
    password;
    mouseOverLogin;

    constructor(private authService: AuthService, private router: Router) {

    }

    login(formValues) {
        this.authService.loginUser(formValues.userName, formValues.password);
        this.router.navigate(['events']);
    }

    cancel() {
        console.log('ppp');
        this.router.navigate(['events']);
    }
}
