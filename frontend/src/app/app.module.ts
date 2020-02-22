import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SharedModule } from './views/shared/shared.module';
import { LoginComponent } from './login/login.component';
import { APP_ROUTES } from './app.routing';
import { PagesModule } from './views/pages/pages.module';
import { LocalSelectComponent } from './login/local-select.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LocalSelectComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    FormsModule,
    PagesModule,
    APP_ROUTES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
