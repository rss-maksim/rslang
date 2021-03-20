import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

const routes: Routes = [
    { path: 'home', loadChildren: () => import('./main/main.module').then((m) => m.MainModule) },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
    {
        path: 'statistics',
        loadChildren: () => import('./statistics/statistics.module').then((m) => m.StatisticsModule),
    },
    { path: '**', component: NotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
