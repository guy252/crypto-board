import {Component} from '@angular/core';
import {Angulartics2GoogleAnalytics} from 'angulartics2/ga';

@Component({
  selector: 'my-app',
  template: `
    <header-navbar></header-navbar>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
    <footer-navbar></footer-navbar>
  `,
  styles: [`
    .container {
      border: 0px solid;
      margin-top: 1.2rem;
    }
  `]

})
export class AppComponent {
  constructor(angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) {

  }
}
