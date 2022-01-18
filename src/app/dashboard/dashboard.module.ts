import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { PipeModule } from "../shared/pipe/pipe.module";
import { DashbordRoutingModule } from "./dashboard-module";
import { HomepageComponent } from "./homepage/homepage.component";


@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashbordRoutingModule,
    PipeModule
  ],
  exports:[
    HomepageComponent
  ]
})
export class DashboardModule { }
