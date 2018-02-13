// core modules
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// 3rd party modules
import {Angulartics2Module} from 'angulartics2';
import {Angulartics2GoogleAnalytics} from 'angulartics2/ga';
import {ToastModule} from 'ng2-toastr/ng2-toastr';

// app modules
import {AppRoutingModule} from './app-routing.module';
import {DashboardModule} from './dashboard/dashboard.module';

// components
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {SocialMediaComponent} from './social-media/social-media.component';


@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DashboardModule,
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
    ToastModule.forRoot()
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SocialMediaComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
