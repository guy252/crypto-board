"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var angular_2_dropdown_multiselect_1 = require("angular-2-dropdown-multiselect");
var dashboard_routing_module_1 = require("./dashboard-routing.module");
// Components
var dashboard_component_1 = require("./dashboard.component");
var search_filter_component_1 = require("./search/search-filter.component");
var crypto_list_component_1 = require("./crypto-list/crypto-list.component");
var crypto_card_component_1 = require("./crypto-card/crypto-card.component");
var short_number_pipe_1 = require("../custom-pipe/short-number.pipe");
var DashboardModule = /** @class */ (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                dashboard_routing_module_1.DashboardRoutingModule,
                angular_2_dropdown_multiselect_1.MultiselectDropdownModule
            ],
            declarations: [
                dashboard_component_1.DashboardComponent,
                search_filter_component_1.SearchFilterComponent,
                crypto_list_component_1.CryptoListComponent,
                crypto_card_component_1.CryptoCardComponent,
                short_number_pipe_1.ShortNumberPipe
            ],
            exports: [],
            providers: []
        })
    ], DashboardModule);
    return DashboardModule;
}());
exports.DashboardModule = DashboardModule;
//# sourceMappingURL=dashboard.module.js.map