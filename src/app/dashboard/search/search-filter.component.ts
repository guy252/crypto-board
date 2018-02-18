// core modules
import {Component, OnInit, ViewContainerRef} from '@angular/core';

// 3rd party modules
import {IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts} from 'angular-2-dropdown-multiselect';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {LocalStorageService} from 'ngx-webstorage';

// app modules
import * as globalConstants from '../../constants/const.global';
import {MESSAGES} from '../../constants/const.messages';

// services
import {AppService} from '../../app.service';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  moduleId: module.id,
  selector: 'search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css'],
  providers: [],
})

export class SearchFilterComponent implements OnInit {
  messages = MESSAGES;
  currencies: string[];
  cryptoCurrOptions: IMultiSelectOption[];
  selectedCurrency: string;
  optionsModel: number[];
  savedCoinsFilter: IMultiSelectOption[] = []; // used for saving the selected coins to local storage

  // Settings configuration for the multiselect plugin
  mySettings: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'fontawesome',
    buttonClasses: 'form-control btn btn-primary fiat-currencies-select-box',
    dynamicTitleMaxItems: 1,
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

  constructor(private appService: AppService,
              private localStorageService: LocalStorageService,
              public toastr: ToastsManager,
              vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
    this.currencies = ['usd', 'eur', 'gbp']; // fiat currency options
    this.selectedCurrency = ''; // model to store selected fiat

    // array to hold names of cryptos to be used in filtering
    this.cryptoCurrOptions = [];

    // coinsSubject is a RxJs subject in our service that will notify us when the api has gotten data about crypto coins
    this.appService.coinsSubject.subscribe({
      next: (v) => this.updateCryptoOptions(v),
    });
  }


  initFromLocalStorage(cryptoOptions) {
    this.selectedCurrency = 'usd';
    const pinnedDashboardItems: IMultiSelectOption[] = this.loadDashboard();

    this.cryptoCurrOptions = cryptoOptions;

    // if the user pinned some coins to the dashboard
    if (pinnedDashboardItems && pinnedDashboardItems.length > 0) {

      // we now need to create a new array with objects, based on the currency names in pinnedDashboardItems.
      // we need this because the index (which is actually the currency rank, may have been changed)
      // const pinnedDashboardItemsWithUpdatedRank = cryptoOptions.filter(function (selectboxOption) {
      //   return pinnedDashboardItems.some(function (pinnedSelectboxOption) {
      //     return pinnedSelectboxOption.params === selectboxOption.params ;
      //   });
      // });


      let updatedOptions = [];

      pinnedDashboardItems.forEach((option) => {
        cryptoOptions.forEach((updatedOption) => {
          if (updatedOption.params === option.params) {
            updatedOptions.push(updatedOption);
          }
        });
      });

      this.optionsModel = updatedOptions.map(option => {
        return option.id;
      });

      // console.log('cryptoOptions', cryptoOptions);
      // console.log('pinnedDashboardItems', pinnedDashboardItems);
      // console.log('updatedOptions', updatedOptions);
      // console.log('this.optionsModel', this.optionsModel);
    }
  }

  ngOnInit() {
    this.selectedCurrency = 'usd';
    const pinnedDashboardItems: IMultiSelectOption[] = this.loadDashboard();

    if (pinnedDashboardItems && pinnedDashboardItems.length > 0) {

      // todo : replace  pinnedDashboardItems with pinnedDashboardItemsWithUpdatedRank
      this.optionsModel = pinnedDashboardItems.map(option => {
        return option.id;
      });
    }

    /**
     * calling this method for the initial load of data, when the component is initialized.
     */
    this.selectCurrency('usd');
    /**
     * after the initial load, we set a timer that loads the data every (n) milliseconds
     */
    const interval = setInterval(() => {
      this.appService.loadTotalMarketCap(this.selectedCurrency);
      this.appService.loadCoinMarketCaps(this.selectedCurrency);
    }, 2 * 60 * 1000);
  }

  selectCurrency(newValue) {
    this.appService.loadTotalMarketCap(newValue);
    this.appService.loadCoinMarketCaps(newValue);
  }

  /**
   * Updates the array of filtered coins.
   * this method is called whenever a user selects a coin from the crypto coins selectbox.
   */
  filterChange(newValue: number[]) {
    /**
     * populate the savedCoinsFilter according to the selected options in the currencies selectbox
     * take from cryptoCurrOptions, only the items that have the indexes inside newValue[]
     * its updated here so we can later save it to the local storage.
     * we are using the newValue array which only hold indexes, and find the corresponding option objects in this.cryptoCurrOptions
     */
    this.savedCoinsFilter = this.cryptoCurrOptions.filter(function (item) {
      return newValue.indexOf(item.id) !== -1;
    });

    // BUG method should not be triggered by filter select
    this.appService.updateFilter(newValue);
  }

  // This method creates an array of valid options for the multiselect plugin from an array of crypto coins
  updateCryptoOptions(coins) {
    this.cryptoCurrOptions = [];
    coins.forEach((coin, index) => {
      this.cryptoCurrOptions.push({
        id: index,
        name: coin.id.charAt(0).toUpperCase() + coin.id.slice(1),
        params: coin.id
      });
    });

    /**
     * init required params from local storage
     * very strange but when accessing this.cryptoCurrOptions, from initFromLocalStorage, we get an empty array.
     * this is the reason we are passing it as a parameter
     */
    this.initFromLocalStorage(this.cryptoCurrOptions);
  }


  savedClicked() {
    this.saveDashboard();
    this.toastr.success(MESSAGES.COINS_PINNED, MESSAGES.TITLE_SUCCESS);
  }

  clearClicked() {
    this.clearDashboard();
    this.toastr.success(MESSAGES.COINS_UNPINNED, MESSAGES.TITLE_SUCCESS);
  }

  saveDashboard() {
    if (!this.localStorageService.isStorageAvailable()) {
      this.toastr.warning(MESSAGES.LOCAL_STORAGE_CANT_PIN, MESSAGES.TITLE_NOTE);
    } else {
      this.localStorageService.store(globalConstants.LOCAL_STORAGE_KEY, this.savedCoinsFilter);
    }
  }

  loadDashboard(): any {
    if (this.localStorageService.isStorageAvailable()) {
      return this.localStorageService.retrieve(globalConstants.LOCAL_STORAGE_KEY);
    }
  }

  clearDashboard() {
    if (!this.localStorageService.isStorageAvailable()) {
      this.toastr.warning(MESSAGES.LOCAL_STORAGE_NOT_SUPPORTED, MESSAGES.TITLE_NOTE);
    } else {
      this.localStorageService.clear(globalConstants.LOCAL_STORAGE_KEY);
      // this.savedCoinsFilter = [];
    }
  }
}
