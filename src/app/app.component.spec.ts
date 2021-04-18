import { UserService } from './core/services/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let userServiceMock: UserService;
  let storeMock: MockStore;
  let initialState = {};
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideMockStore({ initialState }), UserService],
    }).compileComponents();
    storeMock = TestBed.inject(MockStore);
    userServiceMock = TestBed.inject(UserService);
    spyOn(userServiceMock, 'getUserId').and.returnValue(null);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('application should dispatch action on init', () => {
    spyOn(storeMock, 'dispatch').and.callThrough();
    app.ngOnInit();
    expect(storeMock.dispatch).toHaveBeenCalled();
  });
});
