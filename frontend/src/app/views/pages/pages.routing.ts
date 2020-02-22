import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ProductComponent } from './warehouse/product.component';
import { LoginGuard } from 'src/app/services/guards/login.guard';
import { WarehouseComponent } from './system/warehouse.component';
import { LocalComponent } from './system/local.component';
import { EmployeComponent } from './employe/employe.component';
import { RolComponent } from './employe/rol.component';
import { UserComponent } from './employe/user.component';
import { CategoryComponent } from './warehouse/category.component';
import { EntryComponent } from './warehouse/entry.component';
import { ProductWarehouseComponent } from './warehouse/product-warehouse.component';
import { LocalGuard } from 'src/app/services/guards/local.guard';
import { MiCajaComponent } from './box/mi-caja.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuard, LocalGuard],
        children: [
            { path: 'product', component: ProductComponent, data: { title: 'Producto' } },
            { path: 'category', component: CategoryComponent, data: { title: 'Categoria' } },
            { path: 'warehouse', component: WarehouseComponent, data: { title: 'Almacenes' } },
            { path: 'productwarehouse', component: ProductWarehouseComponent, data: { title: 'Producto por almacen' } },
            { path: 'entry', component: EntryComponent, data: { title: 'Entradas' } },
            { path: 'local', component: LocalComponent, data: { title: 'Locales' } },
            { path: 'micaja', component: MiCajaComponent, data: { title: 'Caja' } },
            { path: 'employe', component: EmployeComponent, data: { title: 'Empleados' } },
            { path: 'rol', component: RolComponent, data: { title: 'Roles' } },
            { path: 'user', component: UserComponent, data: { title: 'Usuarios' } },
            { path: '', redirectTo: '/product', pathMatch: 'full' }
        ]
    },

];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
