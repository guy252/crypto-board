// modules
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {DashboardModule} from './dashboard/dashboard.module';

// components
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    DashboardModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
