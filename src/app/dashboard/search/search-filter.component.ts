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

@Component({
  moduleId: module.id,
  selector: 'search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css'],
  providers: [],
})

export class SearchFilterComponent implements OnInit {
  currencies: string[];
  cryptoCurrOptions: IMultiSelectOption[];
  selectedCurrency: string;
  optionsModel: number[];
  savedCoinsFilter = [];
  dashboardItemsPinned = false;

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

  ngOnInit() {
    this.selectedCurrency = 'usd';

    const pinnedDashboardItems: number[] = this.loadDashboard();

    if (pinnedDashboardItems && pinnedDashboardItems.length > 0) {
      this.dashboardItemsPinned = true;
      this.optionsModel = pinnedDashboardItems;
    }

    /**
     * calling this method for the initial load of data, when the component is initialized.
     */
    this.selectCurrency('usd');

    /**
     * after the initial load, we set a timer that loads the data every (n) milliseconds
     * TODO: check if that works when changing the selected currency from the ui.
     */
    const interval = setInterval(() => {
      this.appService.loadTotalMarketCap(this.selectedCurrency);
      this.appService.loadCoinMarketCaps(this.selectedCurrency);
    }, 2 * 60 * 1000);
  }

  /**
   * This method handles the aspects of pinning or un-pinning the selected cryptos to the dashboard.
   * Called when the user clicks the pin icon in the ui
   */
  changeDashboardItemsPinnedStatus() {
    this.dashboardItemsPinned = !this.dashboardItemsPinned;

    if (this.dashboardItemsPinned) {
      this.saveDashboard();
      this.toastr.success(MESSAGES.COINS_PINNED, MESSAGES.TITLE_SUCCESS);
    } else {
      this.clearDashboard();
      this.toastr.success(MESSAGES.COINS_UNPINNED, MESSAGES.TITLE_SUCCESS);
    }
  }

  selectCurrency(newValue) {
    this.appService.loadTotalMarketCap(newValue);
    this.appService.loadCoinMarketCaps(newValue);
  }

  filterChange(newValue) {
    // BUG method should not be triggered by filter select
    this.appService.updateFilter(newValue);

    /**
     * if the user decided to pin items to the dashboard, we need to save them every time the filter changes
     */
    if (this.dashboardItemsPinned) {
      this.saveDashboard();
    }
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

  saveDashboard() {
    if (!this.localStorageService.isStorageAvailable()) {
      this.toastr.warning(MESSAGES.LOCAL_STORAGE_CANT_PIN, MESSAGES.TITLE_NOTE);
    } else {
      this.localStorageService.store(globalConstants.LOCAL_STORAGE_KEY, this.optionsModel);
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
      this.savedCoinsFilter = [];
    }
  }
}
