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
// Imports
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var http_1 = require("@angular/common/http");
var API_BASE_URL = 'https://api.coinmarketcap.com/v1/';
var AppService = /** @class */ (function () {
    function AppService(http) {
        this.http = http;
        this.filter = [];
        // we initialize our subjects
        this.coinsSubject = new Subject_1.Subject();
        this.filteredCoinsSubject = new Subject_1.Subject();
        this.apiSubject = new Subject_1.Subject();
        this.fiatSubject = new Subject_1.Subject();
    }
    // this method loads market cap data from the API
    AppService.prototype.loadMarketCaps = function (fiat) {
        var _this = this;
        this.fiatSubject.next(fiat);
        var url = API_BASE_URL + 'ticker/';
        var params = new http_1.HttpParams();
        // params = params.append('limit', '25');
        if (fiat !== 'usd') {
            // TODO: check if fiat is valid
            params = params.append('convert', fiat);
        }
        this.apiSubject.next('loading...');
        this.http
            .get(url, { params: params })
            .subscribe(function (data) {
            console.log(data);
            _this.allCoins = data; // store returned data
            _this.announceCoins(); // trigger announcements
            _this.filterMarketCaps();
        });
    };
    AppService.prototype.filterMarketCaps = function () {
        var _this = this;
        this.filteredCoins = [];
        if (this.filter.length === 0) {
            this.allCoins.forEach(function (coin) { return _this.filteredCoins.push(coin); });
        }
        if (this.filter.length > 0) {
            this.filter.forEach(function (i) {
                _this.filteredCoins.push(_this.allCoins[i]);
            });
        }
        this.announceFilteredCoins();
    };
    AppService.prototype.announceCoins = function () {
        this.coinsSubject.next(this.allCoins);
    };
    AppService.prototype.announceFilteredCoins = function () {
        this.filteredCoinsSubject.next(this.filteredCoins);
    };
    AppService.prototype.updateFilter = function (filter) {
        var _this = this;
        this.filter = [];
        filter.forEach(function (elem) {
            _this.filter.push(elem);
        });
        this.filterMarketCaps();
    };
    AppService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [typeof (_a = typeof http_1.HttpClient !== "undefined" && http_1.HttpClient) === "function" && _a || Object])
    ], AppService);
    return AppService;
    var _a;
}());
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map