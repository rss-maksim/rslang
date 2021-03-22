import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { AboutTeamComponent } from './about-team.component';

describe('AboutTeamComponent', () => {
  let component: AboutTeamComponent;
  let fixture: ComponentFixture<AboutTeamComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutTeamComponent],
      providers: [{ provide: provideMockStore, useClass: MockStore }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutTeamComponent);
    store = TestBed.inject(MockStore);
    store.setState([]);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
