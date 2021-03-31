import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';

import { ErrorsParserService } from '../../../auth/services/errors-parser.service';
import { AppState } from '../../../redux/models/state.model';
import { selectUser } from '../../../redux/selectors/user.selector';
import { UserModel } from '../../../redux/models/user.model';
import { UserService } from '../../../core/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { updateUser } from '../../../redux/actions/user.actions';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  profileForm: FormGroup;
  usernameFormControl: FormControl;
  emailFormControl: FormControl;
  imageFormControl: FormControl;
  imagePreview!: string | undefined;
  serverError: string | null = null;
  loading = false;
  userId!: string;
  storeSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private parser: ErrorsParserService,
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
  ) {
    this.usernameFormControl = fb.control('', [Validators.required, Validators.minLength(3)]);
    this.emailFormControl = fb.control({ value: '', disabled: true }, [Validators.required, Validators.email]);
    this.imageFormControl = fb.control(null);

    this.profileForm = fb.group({
      username: this.usernameFormControl,
      email: this.emailFormControl,
      image: this.imageFormControl,
    });

    this.profileForm.valueChanges.subscribe(() => {
      if (this.serverError) {
        this.serverError = null;
      }
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params.id;
    this.storeSubscription = this.store.select(selectUser).subscribe((user: UserModel | null): void => {
      if (user) {
        this.profileForm.patchValue(user);
        this.imagePreview = user.image;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }

  updateProfile(event: Event): void {
    event.preventDefault();
    this.loading = true;
    const { email, username, image = '' } = this.profileForm.value;
    if (this.profileForm.valid) {
      this.userService.updateUser(this.userId, { email, username, image }).subscribe(
        (payload) => {
          if (payload) {
            this.store.dispatch(updateUser({ payload }));
            this.snackBar.open('Данные пользователя были успешно обновлены', '', {
              duration: 2000,
            });
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

  onLoadImage(image?: string): void {
    this.imagePreview = image;
    this.profileForm.patchValue({ image });
    this.profileForm.get('image')?.updateValueAndValidity();
  }
}
