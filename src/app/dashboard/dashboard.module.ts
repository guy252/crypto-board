// Modules
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect';
import {DashboardRoutingModule} from './dashboard-routing.module';

// Components
import {DashboardComponent} from './dashboard.component';
import {SearchFilterComponent} from './search/search-filter.component';
import {CryptoListComponent} from './crypto-list/crypto-list.component';
import {CryptoCardComponent} from './crypto-card/crypto-card.component';
import {ShortNumberPipe} from '../custom-pipe/short-number.pipe';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        DashboardRoutingModule,
        MultiselectDropdownModule
    ],
    declarations: [
        DashboardComponent,
        SearchFilterComponent,
        CryptoListComponent,
        CryptoCardComponent,
        ShortNumberPipe
    ],
    exports: [],
    providers: []
})

export class DashboardModule {
}
