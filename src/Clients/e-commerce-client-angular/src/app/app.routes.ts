import { Routes } from '@angular/router';
import { LoginOidcComponent } from './login-oidc/login-oidc.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './authentication/auth-guard';

export const routes: Routes = [
    { 
        path: '', 
        component: HomeComponent, 
        pathMatch: 'full'
    },
    { 
        path: 'login-oidc', 
        component: LoginOidcComponent, 
        canActivate: [AuthGuard],
        pathMatch: 'full' },
    // { path: '**', component: NotFoundComponent },
];
