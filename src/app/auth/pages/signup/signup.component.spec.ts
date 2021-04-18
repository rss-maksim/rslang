import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SignupComponent } from './signup.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let store: MockStore;
  let initialState = {};
  let usernameInput: HTMLInputElement;
  let emailInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;
  let passwordConfirmInput: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [RouterTestingModule, ReactiveFormsModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    usernameInput = fixture.debugElement.query(By.css('.signup__form-username')).nativeElement;
    emailInput = fixture.debugElement.query(By.css('.signup__form-email')).nativeElement;
    passwordInput = fixture.debugElement.query(By.css('.signup__form-password')).nativeElement;
    passwordConfirmInput = fixture.debugElement.query(By.css('.signup__form-password-confirm')).nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('empty username should return error message', () => {
    usernameInput.value = '';
    usernameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.query(By.css('.signup__username-error')).nativeElement.innerHTML;
    expect(errorMessage).toContain('Имя пользователя обязательно');
  });

  it('empty username should return error message', () => {
    usernameInput.value = 'a';
    usernameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.query(By.css('.signup__username-error')).nativeElement.innerHTML;
    expect(errorMessage).toContain('Имя должно содержать не менее 3 символов');
  });

  it('empty email should return error message', () => {
    emailInput.value = '';
    emailInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.query(By.css('.signup__email-error')).nativeElement.innerHTML;
    expect(errorMessage).toContain('обязателен');
  });

  it('invalid email should return error message', () => {
    emailInput.value = 'qwerty';
    emailInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.query(By.css('.signup__email-error')).nativeElement.innerHTML;
    expect(errorMessage).toContain('Введите валидный email');
  });

  it('empty password should return error message', () => {
    passwordInput.value = '';
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.query(By.css('.signup__password-error')).nativeElement.innerHTML;
    expect(errorMessage).toContain('Пароль обязателен');
  });

  it('invalid password should return error message', () => {
    passwordInput.value = 'qwerty';
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.query(By.css('.signup__password-error')).nativeElement.innerHTML;
    expect(errorMessage).toContain('не менее 8 символов');
  });

  it('invalid confirmation password should return error message', () => {
    passwordInput.value = 'Qwerty1!';
    passwordInput.dispatchEvent(new Event('input'));
    passwordConfirmInput.value = 'Qwerty1!!';
    passwordConfirmInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.query(By.css('.signup__password-confirm-error')).nativeElement.innerHTML;
    expect(errorMessage).toContain('Пароли не совпадают');
  });
});
