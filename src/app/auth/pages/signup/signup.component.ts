import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { regExpEmailPattern } from '../../const/patterns';
import { ErrorsParserService } from '../../services/errors-parser.service';

interface MatchingError {
  matchingError: true;
}

interface Visibility {
  passwordIsVisible: boolean;
  confirmPasswordIsVisible: boolean;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signupForm: FormGroup;
  usernameFormControl: FormControl;
  emailFormControl: FormControl;
  passwordFormControl: FormControl;
  confirmPasswordFormControl: FormControl;
  visibility = {
    passwordIsVisible: false,
    confirmPasswordIsVisible: false,
  };
  serverError: string | null = null;
  loading = false;

  static passwordMatch(signupForm: FormGroup): MatchingError | null {
    const password = signupForm.get('password')?.value;
    const confirm = signupForm.get('confirm')?.value;
    return password === confirm ? null : { matchingError: true };
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private parser: ErrorsParserService,
  ) {
    this.usernameFormControl = fb.control('', [Validators.required, Validators.minLength(3)]);
    this.emailFormControl = fb.control('', [Validators.required, Validators.email]);
    this.passwordFormControl = fb.control('', [Validators.required, Validators.pattern(regExpEmailPattern)]);
    this.confirmPasswordFormControl = fb.control('', [Validators.required]);

    this.signupForm = fb.group(
      {
        username: this.usernameFormControl,
        email: this.emailFormControl,
        password: this.passwordFormControl,
        confirm: this.confirmPasswordFormControl,
      },
      { validators: SignupComponent.passwordMatch },
    );

    this.signupForm.valueChanges.subscribe(() => {
      if (this.serverError) {
        this.serverError = null;
      }
    });
  }

  onPasswordInput() {
    if (this.signupForm.hasError('matchingError')) this.confirmPasswordFormControl.setErrors([{ matchingError: true }]);
    else this.confirmPasswordFormControl.setErrors(null);
  }

  changeVisibility(key: keyof Visibility): void {
    this.visibility[key] = !this.visibility[key];
  }

  register(event: Event): void {
    event.preventDefault();
    this.loading = true;
    const { email, password, username } = this.signupForm.value;
    if (this.signupForm.valid) {
      this.authService.register({ email, password, username }).subscribe(
        (payload) => {
          if (payload) {
            this.router.navigate(['/auth/login'], { state: { email } });
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
}
