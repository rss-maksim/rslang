import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TextbookContentComponent, TextbookPageComponent, DictionaryContentComponent } from './components/index';
import { TextbookContentPageComponent } from './components/textbook-content-page/textbook-content-page.component';

const routes: Routes = [
  {
    path: '',
    component: TextbookPageComponent,
    children: [
      { path: '', redirectTo: 'book/groups/0/pages/0', pathMatch: 'full' },
      {
        path: 'book/groups/:group/pages/:page',
        component: TextbookContentComponent,
        pathMatch: 'full',
        children: [
          { path: '', redirectTo: '1', pathMatch: 'full' },
          { path: 'book/:group', component: TextbookContentPageComponent, pathMatch: 'full' },
        ],
      },
      { path: 'dictionary', component: DictionaryContentComponent, pathMatch: 'full' },
      { path: 'dictionary/:id', component: DictionaryContentComponent, pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TextbookRoutingModule {}
