// Imports
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {HttpClient, HttpParams} from '@angular/common/http';

import * as cmcConstants from './constants/const.cmc';

// Import model objects
import {Coin} from './model/coin';
import {Market} from './model/market';


@Injectable()
export class AppService {
  private totalMarketCap: Market;
  private allCoins: Coin[]; // will hold unmodified data returned by the api
  private filteredCoins: Coin[]; // will hold data filtered from this.allCoins
  private filter: number[]; // will hold the array index of data contained in this. allCoins that should not be filtered out

  // A couple of RxJs Subjects very important for communicating across Angular Components
  totalMarketCapSubject: Subject<Market>;
  coinsSubject: Subject<Coin[]>;
  filteredCoinsSubject: Subject<Coin[]>;
  apiSubject: Subject<string>;
  fiatSubject: Subject<string>;

  constructor(private http: HttpClient) {
    this.filter = [];

    // we initialize our subjects
    this.totalMarketCapSubject = new Subject();
    this.coinsSubject = new Subject();
    this.filteredCoinsSubject = new Subject();
    this.apiSubject = new Subject();
    this.fiatSubject = new Subject();
  }

  // this method loads market cap data from the API
  loadCoinMarketCaps(fiat: string) {
    this.fiatSubject.next(fiat);
    const url = cmcConstants.API_BASE_URL + cmcConstants.COINS_END_POINT;
    const timeStamp = +new Date();
    let params = new HttpParams();

    params = params.append('limit', '250').append('tsp', '' + timeStamp);

    if (fiat !== 'usd') {
      // TODO: check if fiat is valid
      params = params.append('convert', fiat);
    }
    this.apiSubject.next('loading...');

    this.http
      .get<Coin[]>(url, {params})
      .subscribe(
        data => {
          console.log(data);
          this.allCoins = data; // store returned data
          this.announceCoins(); // trigger announcements
          this.filterMarketCaps();
        }
      );
  }

  loadTotalMarketCap(fiat) {
    this.fiatSubject.next(fiat);
    const url = cmcConstants.API_BASE_URL + cmcConstants.TOTAL_MARKET_CAP_END_POINT;
    const timeStamp = +new Date();
    let params = new HttpParams();

    params = params.append('tsp', '' + timeStamp);

    if (fiat !== 'usd') {
      // TODO: check if fiat is valid
      params = params.append('convert', fiat);
    }
    this.apiSubject.next('loading...');

    this.http
      .get<Market>(url, {params})
      .subscribe(
        data => {
          this.totalMarketCap = data; // store returned data
          this.announceTotalMarketCap(); // trigger announcements
          // this.filterMarketCaps();
        }
      );
  }

  filterMarketCaps() {
    this.filteredCoins = [];
    if (this.filter.length === 0) {
      this.allCoins.forEach((coin) => this.filteredCoins.push(coin));
    }
    if (this.filter.length > 0) {
      this.filter.forEach((i) => {
        this.filteredCoins.push(this.allCoins[i]);
      });
    }
    this.announceFilteredCoins();
  }

  announceTotalMarketCap() {
    this.totalMarketCapSubject.next(this.totalMarketCap);
  }

  announceCoins() {
    this.coinsSubject.next(this.allCoins);
  }

  announceFilteredCoins() {
    this.filteredCoinsSubject.next(this.filteredCoins);
  }

  /**
   * Update the array of filtered coins.
   * this method is called by whenever filterChange() is triggered
   *  - whenever a user selects a coin from the crypto coins selectbox.
   *  - whenever filterChange() is called
   *
   * @param {number[]} filter
   */
  updateFilter(filter: number[]) {
    this.filter = [];
    filter.forEach((elem) => {
      this.filter.push(elem);
    });

    this.filterMarketCaps();
  }
}
