import {Component} from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
        <navbar></navbar>
        <div class="container">
            <router-outlet></router-outlet>
        </div>
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
