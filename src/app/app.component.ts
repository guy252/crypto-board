import {Component} from '@angular/core';

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
            margin-top: 3rem;
        }
    `]

})
export class AppComponent {
}
