// modules
import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";

import {AppRoutingModule} from "./app-routing.module";
import {DashboardModule} from "./dashboard/dashboard.module";

// components
import {AppComponent} from "./app.component";
import {NavbarComponent} from "./navbar/navbar.component";


@NgModule({
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        DashboardModule
    ],
    declarations: [
        AppComponent,
        NavbarComponent
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}