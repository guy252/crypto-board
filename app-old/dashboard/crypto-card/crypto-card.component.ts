import {Component, Input} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'crypto-card',
    templateUrl: './crypto-card.component.html',
    styleUrls: ['./crypto-card.component.css'],
    providers: []
})
export class CryptoCardComponent {
    @Input() coin;
    @Input() fiat;
}
