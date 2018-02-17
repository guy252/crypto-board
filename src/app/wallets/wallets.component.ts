import {Component} from '@angular/core';
import {WALLETS} from '../constants/const.wallets';

@Component({
  moduleId: module.id,
  selector: 'wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.css']
})
export class WalletsComponent {
  wallets = WALLETS;

  constructor() {
  }
}
