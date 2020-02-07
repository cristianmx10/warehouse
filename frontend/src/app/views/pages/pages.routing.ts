import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ProductComponent } from './warehouse/product.component';
import { LoginGuard } from 'src/app/services/guards/login.guard';
import { WarehouseComponent } from './system/warehouse.component';
import { LocalComponent } from './system/local.component';
import { EmployeComponent } from './employe/employe.component';
import { RolComponent } from './employe/rol.component';
import { UserComponent } from './employe/user.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuard],
        children: [
            { path: 'product', component: ProductComponent, data: { title: 'Producto' } },
            { path: 'warehouse', component: WarehouseComponent, data: { title: 'Almacenes' } },
            { path: 'local', component: LocalComponent, data: { title: 'Locales' } },
            { path: 'employe', component: EmployeComponent, data: { title: 'Empleados' } },
            { path: 'rol', component: RolComponent, data: { title: 'Roles' } },
            { path: 'user', component: UserComponent, data: { title: 'Usuarios' } },
            { path: '', redirectTo: '/product', pathMatch: 'full' }
        ]
    },

];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
