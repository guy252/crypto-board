import {Component} from '@angular/core';
import {WALLETS} from '../../constants/const.wallets';

@Component({
  moduleId: module.id,
  selector: 'wallet-details',
  templateUrl: './wallet-details.component.html',
  styleUrls: ['./wallet-details.component.css']
})

export class WalletDetailsComponent {
  wallets = WALLETS;
  wallet = this.wallets.bitcoin;
  modalId = 'walletDetailsModal';

  constructor() {
  }

  showWallet(wallet: any) {
    this.wallet = wallet;
  }
}
