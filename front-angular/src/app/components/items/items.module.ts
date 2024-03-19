import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsRoutingModule } from './items-routing.module';
import { ItemListContainerComponent } from './item-list-container/item-list-container.component';
import { ItemComponent } from './item/item.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemCheckoutComponent } from './item-checkout/item-checkout.component';
import { ItemCountComponent } from './item-count/item-count.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ItemDetailContainerComponent } from './item-detail-container/item-detail-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [
    ItemListContainerComponent,
    ItemComponent,
    ItemListComponent,
    ItemCheckoutComponent,
    ItemCountComponent,
    ItemDetailComponent,
    ItemDetailContainerComponent
  ],
  imports: [
    CommonModule,
    ItemsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule
  ],
  exports:[
    ItemListComponent
  ]
})
export class ItemsModule { }
