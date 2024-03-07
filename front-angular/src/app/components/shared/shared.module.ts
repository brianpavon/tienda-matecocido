import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerComponent } from './spinner/spinner.component';



@NgModule({
  declarations: [
    CarrouselComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports:[
    CarrouselComponent
  ]
})
export class SharedModule { }
