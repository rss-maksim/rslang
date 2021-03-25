import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { serverErrorText } from '../signup/const';
import { regExpEmailPattern } from '../../const/patterns';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  emailFormControl: FormControl;
  passwordFormControl: FormControl;
  serverError: string | null = null;
  passwordIsVisible = false;
  loading = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    const { email } = window.history.state;
    this.emailFormControl = fb.control(email ?? '', [Validators.required, Validators.email]);
    this.passwordFormControl = fb.control('', [Validators.required, Validators.pattern(regExpEmailPattern)]);

    this.loginForm = fb.group({
      email: this.emailFormControl,
      password: this.passwordFormControl,
    });
  }

  login(event: Event): void {
    event.preventDefault();
    this.loading = true;
    const { email, password } = this.loginForm.value;
    if (this.loginForm.valid) {
      this.authService.login(email, password).subscribe(
        (payload) => {
          if (payload) {
            this.router.navigate(['/']);
          }
        },
        ({ error }) => {
          this.serverError = typeof error === 'string' ? error : serverErrorText;
          this.loading = false;
        },
        () => {
          this.loading = false;
        },
      );
    }
  }

  changeVisibility(): void {
    this.passwordIsVisible = !this.passwordIsVisible;
  }
}
