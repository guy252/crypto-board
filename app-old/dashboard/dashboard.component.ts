import {Component} from '@angular/core';

// Services
import {AppService} from "../app.service";

@Component({
    moduleId: module.id,
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    providers: [AppService]
})
export class DashboardComponent {}