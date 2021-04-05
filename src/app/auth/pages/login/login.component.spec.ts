import { AuthService } from './../../services/auth.service';
import { Observable, of } from 'rxjs';
import { SigninPayloadModel } from './../../models/signin-payload.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';

class MockAuthService {
  public login(): Observable<SigninPayloadModel> {
    return of({ message: 'string', token: 'string', refreshToken: 'string', userId: 'string', name: 'string' });
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore;
  let initialState = {};
  let emailInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;
  let visibilityIcon: HTMLElement;
  let submitButton: HTMLButtonElement;
  let authMockService: MockAuthService;

  beforeEach(async () => {
    window.history.pushState({ email: 'somevalue' }, '');
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [RouterTestingModule, ReactiveFormsModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideMockStore({ initialState }), { provide: AuthService, useClass: MockAuthService }],
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    emailInput = fixture.debugElement.query(By.css('.login__form-field-email')).nativeElement;
    passwordInput = fixture.debugElement.query(By.css('.login__form-field-password')).nativeElement;
    submitButton = fixture.debugElement.query(By.css('.login__submit-btn')).nativeElement;
    visibilityIcon = fixture.debugElement.query(By.css('.login__visibility-icon')).nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('empty login should return error message', () => {
    emailInput.value = '';
    emailInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.query(By.css('.login__email-error')).nativeElement.innerHTML;
    expect(errorMessage).toContain('обязателен');
  });

  it('invalid login should return error message', () => {
    emailInput.value = 'qwerty';
    emailInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.query(By.css('.login__email-error')).nativeElement.innerHTML;
    expect(errorMessage).toContain('Введите валидный email');
  });

  it('empty password should return error message', () => {
    passwordInput.value = '';
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.query(By.css('.login__password-error')).nativeElement.innerHTML;
    expect(errorMessage).toContain('Пароль обязателен');
  });

  it('invalid password should return error message', () => {
    passwordInput.value = 'qwerty';
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.query(By.css('.login__password-error')).nativeElement.innerHTML;
    expect(errorMessage).toContain('не менее 8 символов');
  });

  it('click on password visibility icon should change visibility variable', () => {
    const firstValue = component.passwordIsVisible;
    visibilityIcon.click();
    expect(component.passwordIsVisible).toEqual(!firstValue);
  });
});
