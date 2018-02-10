import {Component, OnInit} from '@angular/core';
import {AppService} from '../../app.service';

import {IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts} from 'angular-2-dropdown-multiselect';

@Component({
  moduleId: module.id,
  selector: 'search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css'],
  providers: []
})
export class SearchFilterComponent implements OnInit {
  currencies: string[];
  cryptoCurrOptions: IMultiSelectOption[];
  selectedCurrency: string;
  optionsModel: number[];

  // Settings configuration for the multiselect plugin
  mySettings: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'fontawesome',
    buttonClasses: 'form-control btn btn-primary fiat-currencies-select-box',
    dynamicTitleMaxItems: 5,
    displayAllSelectedText: true
  };

  // Text configuration for the multiselect plugin
  myTexts: IMultiSelectTexts = {
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

  constructor(private appService: AppService) {
    this.currencies = ['usd', 'eur', 'gbp']; // fiat currency options
    this.selectedCurrency = ''; // model to store selected fiat

    // array to hold names of cryptos to be used in filtering
    this.cryptoCurrOptions = [];

    // coinsSubject is a RxJs subject in our service that will notify us when the api has gotten data about crypto coins
    this.appService.coinsSubject.subscribe({
      next: (v) => this.updateCryptoOptions(v),
    });
  }

  ngOnInit() {
    this.selectedCurrency = 'usd';

    /**
     * calling this method for the initial load of data, when the component is initialized.
     */
    this.selectCurrency('usd');

    /**
     * after the initial load, we set a timer that loads the data every (n) milliseconds
     * TODO: check if that works when changing the selected currency from the ui.
     */
    let interval = setInterval(() => {
        this.appService.loadTotalMarketCap(this.selectedCurrency);
        this.appService.loadCoinMarketCaps(this.selectedCurrency);
    }, 2 * 60 * 1000);
  }

  selectCurrency(newValue) {
    this.appService.loadTotalMarketCap(newValue);
    this.appService.loadCoinMarketCaps(newValue);
  }

  filterChange(newValue) {
    // BUG method should not be triggered by filter select
    this.appService.updateFilter(newValue);
  }

  // This method creates an array of valid options for the multiselect plugin from an array of crypto coins
  updateCryptoOptions(coins) {
    this.cryptoCurrOptions = [];
    coins.forEach((coin, index) => {
      this.cryptoCurrOptions.push({
        id: index,
        name: coin.id.charAt(0).toUpperCase() + coin.id.slice(1)
      });
    });
  }
}
