import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from '../app-routing.module';
import { LogoComponent } from './components/logo/logo.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [NotFoundComponent, HeaderComponent, FooterComponent, LogoComponent],
  imports: [CommonModule, AppRoutingModule, MaterialModule],
  exports: [HeaderComponent, FooterComponent, NotFoundComponent, LogoComponent],
})
export class CoreModule {}
