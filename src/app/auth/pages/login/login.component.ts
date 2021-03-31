import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { regExpEmailPattern } from '../../const/patterns';
import { ErrorsParserService } from '../../services/errors-parser.service';

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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private parser: ErrorsParserService,
  ) {
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
          this.serverError = typeof error === 'string' ? error : this.parser.parseError(error?.error);
          this.loading = false;
        },
        () => {
          this.loading = false;
        },
      );
    }
  }

  onPasswordInput() {
    if (this.passwordFormControl.hasError('pattern')) {
      this.loginForm.setErrors([{ pattern: true }]);
    } else {
      this.loginForm.setErrors(null);
    }
  }

  changeVisibility(): void {
    this.passwordIsVisible = !this.passwordIsVisible;
  }
}
