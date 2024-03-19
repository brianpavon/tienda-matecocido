import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart : BehaviorSubject<any> = new BehaviorSubject <any>([]);
  constructor(private notificationService: NotificationService) { }

  obtenerCart(){
    return this.cart.asObservable();
  }

  actualizarCart(valor:any){
    this.cart.next(valor);
  }

  isInCart(id:any){
    return this.cart.value.some((prod: { id: any; }) => prod.id === id)
  }

  addItem(prodToAdd :any, quantity :any){
    console.log(this.cart.value);
    const message = quantity === 1 ? `Se agregó ${quantity} producto al carrito` : `Se agregaron ${quantity} productos al carrito`
    console.log(message);

    this.cart.value.push(prodToAdd);
    this.actualizarCart(this.cart.value);

    console.log(this.cart.value);

  }

  removeItem(id :any){
    const cartUpdated = this.cart.value.filter((prod: { codigo: any; }) => prod.codigo !== id);

    this.actualizarCart(cartUpdated);

    console.log(this.cart.value);
    
  }

  
}
