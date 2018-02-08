/**
 * Custom pipe to transform large numbers to smaller ones, using a suffix (K, M, B)
 */

import {Pipe, PipeTransform} from "@angular/core";

// Pipe decorator
@Pipe({
    name: "shortNumber"
})

export class ShortNumberPipe implements PipeTransform {
    /**
     * speed is passed as kph, so if unitType is mph, we need to convert.  if unitType is kph, we need to return as is
     *
     * @param {number} amount
     * @returns {string}
     */
    transform(amount: number) {
        let precision: number = 0, min: number = 1000;
        let result: string = "";

        if (isNaN(amount) || amount < 1000) {
            return amount;
        }

        let powerOfTen = Math.floor(Math.log(Math.abs(amount)) * Math.LOG10E)

        switch (powerOfTen) {
            case 3:
            case 4:
            case 5:
                result = (amount / Math.pow(10, 3)).toFixed(precision) + 'K';
                return result
            case 6:
            case 7:
            case 8:
                result = (amount / Math.pow(10, 6)).toFixed(precision) + 'M'
                return result;
            case 9:
            case 10:
            case 11:
                result = (amount / Math.pow(10, 9)).toFixed(precision) + 'B'
                return result;
            case 12:
            case 13:
            case 14:
                result = (amount / Math.pow(10, 12)).toFixed(precision) + 'T'
                return result;
            default :
                return (amount.toFixed(precision));
        }
    }
}