import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LocalSelectComponent } from './login/local-select.component';
import { LoginGuard } from './services/guards/login.guard';


const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'localselect', component: LocalSelectComponent, canActivate: [LoginGuard] },
    { path: '**', component: LoginComponent }
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });
