import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ContentElipsisPipe } from "./content-elipsis.pipe";



@NgModule({
  declarations: [ContentElipsisPipe],
  imports: [
    CommonModule
  ],
  exports:[
    ContentElipsisPipe
  ]
})
export class PipeModule { }
