import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
    declarations: [HomeComponent],
    imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class MainModule {}
