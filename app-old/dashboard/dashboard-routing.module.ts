import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {DashboardComponent} from "./dashboard.component";

// Handle app routing
@NgModule({
    imports: [RouterModule.forChild(
        [
            {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            {path: 'dashboard', component: DashboardComponent},
            {path: '**', redirectTo: 'dashboard', pathMatch: 'full'},
        ])
    ],
    exports: [RouterModule]
})

export class DashboardRoutingModule {
}