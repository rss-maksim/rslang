import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
    declarations: [NotFoundComponent, HeaderComponent, FooterComponent],
    imports: [CommonModule],
    exports: [HeaderComponent, FooterComponent, NotFoundComponent],
})
export class CoreModule {}
