import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './menu/breadcrumbs.component';
import { SidebarComponent } from './menu/sidebar.component';
import { HeaderComponent } from './menu/header.component';


@NgModule({
    imports: [
        RouterModule,
        CommonModule
    ],
    declarations: [
        BreadcrumbsComponent,
        SidebarComponent,
        HeaderComponent
    ],
    exports: [
        BreadcrumbsComponent,
        SidebarComponent,
        HeaderComponent
    ]
})
export class SharedModule { }
