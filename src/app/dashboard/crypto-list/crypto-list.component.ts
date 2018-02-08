import {Component, OnInit} from '@angular/core';
import {AppService} from '../../app.service';
import {Coin} from '../../model/coin';

@Component({
    moduleId: module.id,
    selector: 'crypto-list',
    templateUrl: './crypto-list.component.html',
    styleUrls: ['./crypto-list.component.css'],
    providers: []
})
export class CryptoListComponent implements OnInit {
    coins: Coin[];
    noDataMsg: string;
    fiat: string;
    constructor(private appService: AppService) {
        this.noDataMsg = 'Select fiat currency to get started';
        this.appService.filteredCoinsSubject.subscribe({
            next: (v) => this.updateCoins(v),
        });
        this.appService.apiSubject.subscribe({
            next: (msg) => this.noDataMsg = msg,
        });
        this.appService.fiatSubject.subscribe({
            next: (newValue) => this.fiat = newValue,
        });
    }
    updateCoins(coins: Coin[]) {
        this.coins = [];
        coins.forEach((coin) => this.coins.push(coin));
    }
    ngOnInit() {
    }
}
