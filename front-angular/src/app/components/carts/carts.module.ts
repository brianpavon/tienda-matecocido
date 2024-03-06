import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartsRoutingModule } from './carts-routing.module';
import { CartContainerComponent } from './cart-container/cart-container.component';
import { CartDetailComponent } from './cart-detail/cart-detail.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CartWidgetComponent } from './cart-widget/cart-widget.component';


@NgModule({
  declarations: [
    CartContainerComponent,
    CartDetailComponent,
    CartItemComponent,
    CartWidgetComponent
  ],
  imports: [
    CommonModule,
    CartsRoutingModule
  ]
})
export class CartsModule { }
