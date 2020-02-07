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
@NgModule({
    declarations: [
        PagesComponent,
        ProductComponent,
        WarehouseComponent,
        LocalComponent,
        EmployeComponent,
        RolComponent,
        UserComponent],
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
