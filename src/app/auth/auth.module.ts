import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  declarations: [SignupComponent, LoginComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, RouterModule.forChild(routes), SharedModule],
})
export class AuthModule {}
