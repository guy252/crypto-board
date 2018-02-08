"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_service_1 = require("../../app.service");
var SearchFilterComponent = /** @class */ (function () {
    function SearchFilterComponent(appService) {
        var _this = this;
        this.appService = appService;
        // Settings configuration for the multiselect plugin
        this.mySettings = {
            enableSearch: true,
            checkedStyle: 'fontawesome',
            buttonClasses: 'form-control btn btn-primary fiat-currencies-select-box',
            dynamicTitleMaxItems: 5,
            displayAllSelectedText: true
        };
        // Text configuration for the multiselect plugin
        this.myTexts = {
            checkAll: 'Select All',
            uncheckAll: 'Unselect All',
            checked: 'Item Selected',
            checkedPlural: 'Items Selected',
            searchPlaceholder: 'Search',
            searchEmptyResult: 'NoResults',
            searchNoRenderText: 'Type in search box to see results...',
            defaultTitle: 'Filter Cryptos',
            allSelected: 'All Selected',
        };
        this.currencies = ['usd', 'eur']; // fiat currency options
        this.selectedCurrency = ''; // model to store selected fiat
        // array to hold names of cryptos to be used in filtering
        this.cryptoCurrOptions = [];
        // coinsSubject is a RxJs subject in our service that will notify us when the api has gotten data about crypto coins
        this.appService.coinsSubject.subscribe({
            next: function (v) { return _this.updateCryptoOptions(v); },
        });
    }
    SearchFilterComponent.prototype.ngOnInit = function () {
    };
    SearchFilterComponent.prototype.selectCurrency = function (newValue) {
        this.appService.loadMarketCaps(newValue);
        // let interval = setInterval(() => {
        //     this.appService.loadMarketCaps(newValue);
        // }, 60000);
    };
    SearchFilterComponent.prototype.filterChange = function (newValue) {
        // BUG method should not be triggered by filter select
        this.appService.updateFilter(newValue);
    };
    // This method creates an array of valid options for the multiselect plugin from an array of crypto coins
    SearchFilterComponent.prototype.updateCryptoOptions = function (coins) {
        var _this = this;
        this.cryptoCurrOptions = [];
        coins.forEach(function (coin, index) {
            _this.cryptoCurrOptions.push({
                id: index,
                name: coin.id.charAt(0).toUpperCase() + coin.id.slice(1)
            });
        });
    };
    SearchFilterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'search-filter',
            templateUrl: './search-filter.component.html',
            styleUrls: ['./search-filter.component.css'],
            providers: []
        }),
        __metadata("design:paramtypes", [app_service_1.AppService])
    ], SearchFilterComponent);
    return SearchFilterComponent;
}());
exports.SearchFilterComponent = SearchFilterComponent;
//# sourceMappingURL=search-filter.component.js.map