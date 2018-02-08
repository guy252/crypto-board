"use strict";
/**
 * Custom pipe to transform large numbers to smaller ones, using a suffix (K, M, B)
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// Pipe decorator
var ShortNumberPipe = /** @class */ (function () {
    function ShortNumberPipe() {
    }
    /**
     * speed is passed as kph, so if unitType is mph, we need to convert.  if unitType is kph, we need to return as is
     *
     * @param {number} amount
     * @returns {string}
     */
    ShortNumberPipe.prototype.transform = function (amount) {
        var precision = 0, min = 1000;
        var result = '';
        if (isNaN(amount) || amount < 1000) {
            return amount;
        }
        var powerOfTen = Math.floor(Math.log(Math.abs(amount)) * Math.LOG10E);
        switch (powerOfTen) {
            case 3:
            case 4:
            case 5:
                result = (amount / Math.pow(10, 3)).toFixed(precision) + 'K';
                return result;
            case 6:
            case 7:
            case 8:
                result = (amount / Math.pow(10, 6)).toFixed(precision) + 'M';
                return result;
            case 9:
            case 10:
            case 11:
                result = (amount / Math.pow(10, 9)).toFixed(precision) + 'B';
                return result;
            case 12:
            case 13:
            case 14:
                result = (amount / Math.pow(10, 12)).toFixed(precision) + 'T';
                return result;
            default:
                return (amount.toFixed(precision));
        }
    };
    ShortNumberPipe = __decorate([
        core_1.Pipe({
            name: 'shortNumber'
        })
    ], ShortNumberPipe);
    return ShortNumberPipe;
}());
exports.ShortNumberPipe = ShortNumberPipe;
//# sourceMappingURL=short-number.pipe.js.map