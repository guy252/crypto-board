import {Component, OnInit} from '@angular/core';
import {Market} from '../../model/market';
import {AppService} from '../../app.service';

@Component({
  moduleId: module.id,
  selector: 'marketcap-strip',
  templateUrl: './marketcap-strip.component.html',
  styleUrls: ['./marketcap-strip.component.css'],
  providers: []
})
export class MarketcapStripComponent implements OnInit {
  marketCapData: Market;
  currentDate: Date;

  constructor(private appService: AppService) {
    this.marketCapData = <any>{};

    this.appService.totalMarketCapSubject.subscribe({
      next: (data) => {
        this.marketCapData = data;
        this.currentDate = new Date();
      }
    });
  }

  ngOnInit() {
  }
}
