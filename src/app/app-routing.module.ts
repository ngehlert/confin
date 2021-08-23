/* eslint-disable @typescript-eslint/no-explicit-any */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedInGuard } from './is-logged-in-guard.guard';

const routes: Routes = [
    {
        path: '',
        loadChildren: (): any => import('./home/home.module')
            .then((m: any) => m.HomeModule),
    },
    {
        path: 'login',
        loadChildren: (): any => import('./login/login.module')
            .then((m: any) => m.LoginModule),
    },
    {
        path: 'dashboard',
        loadChildren: (): any => import('./dashboard/dashboard.module')
            .then((m: any) => m.DashboardModule),
        canActivate: [IsLoggedInGuard],
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
