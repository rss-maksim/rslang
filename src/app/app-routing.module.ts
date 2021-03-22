import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { HomeComponent } from './main/components/home/home.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    {
        path: 'dictionary',
        loadChildren: () => import('./dictionary/dictionary.module').then((m) => m.DictionaryModule),
    },
    { path: 'mini-games', loadChildren: () => import('./mini-games/mini-games.module').then((m) => m.MiniGamesModule) },
    {
        path: 'statistics',
        loadChildren: () => import('./statistics/statistics.module').then((m) => m.StatisticsModule),
    },
    { path: 'login', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
    { path: '**', component: NotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
