import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { ProductComponent } from './warehouse/product.component';
import { PAGES_ROUTES } from './pages.routing';
import { WarehouseComponent } from './system/warehouse.component';
import { LocalComponent } from './system/local.component';
import { EmployeComponent } from './employe/employe.component';
import { RolComponent } from './employe/rol.component';
import { UserComponent } from './employe/user.component';
import { CategoryComponent } from './warehouse/category.component';
import { EntryComponent } from './warehouse/entry.component';
import { ProductWarehouseComponent } from './warehouse/product-warehouse.component';
import { MiCajaComponent } from './box/mi-caja.component';
@NgModule({
    declarations: [
        PagesComponent,
        ProductComponent,
        WarehouseComponent,
        LocalComponent,
        EmployeComponent,
        RolComponent,
        UserComponent,
        CategoryComponent,
        EntryComponent,
        ProductWarehouseComponent,
        MiCajaComponent],
    exports: [
        PagesComponent
    ],
    imports: [
        SharedModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        PAGES_ROUTES
    ],
    providers: [
    ]
})

export class PagesModule { }
