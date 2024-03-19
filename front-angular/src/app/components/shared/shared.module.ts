import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerComponent } from './spinner/spinner.component';
import { TablaComponent } from './tabla/tabla.component';
import { MaterialModule } from 'src/app/material/material.module';



@NgModule({
  declarations: [
    CarrouselComponent,
    SpinnerComponent,
    TablaComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    MaterialModule
  ],
  exports:[
    CarrouselComponent,
    TablaComponent,
    SpinnerComponent
  ]
})
export class SharedModule { }
