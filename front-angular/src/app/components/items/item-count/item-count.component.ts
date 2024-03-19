import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-item-count',
  templateUrl: './item-count.component.html',
  styleUrls: ['./item-count.component.css']
})
export class ItemCountComponent {

  @Input () item : any;

  valor :number = 0;
  isInCart = false;


  constructor(private cartService:CartService){
    
  }

  ngOnInit(){
    console.log(this.item);
    //this.isInCart = this.cartService.isInCart(this.item.id);

    this.cartService.obtenerCart().subscribe(cart =>{
      console.log(cart);
        this.isInCart = cart.some((prod: { id: any; }) => prod.id === this.item.id)
    })
  }

  decrement(){
    if(this.valor >= 1)
      this.valor = this.valor - 1;
  }

  increment(){
    if(this.valor < this.item.stock)
    this.valor = this.valor + 1;
  }

  reset (){
    this.valor = 0;
  }

  handleChange(){

  }

  onAdd(){
    // Codigo Nombre Precio Imagenes Cantidad

    let producto ={
      codigo:this.item.codigo,
      nombre:this.item.nombre,
      precio:this.item.precio,
      imagenes:this.item.imagenes,
      cantidad : this.valor
    }

    console.log(producto);

    this.cartService.addItem(producto, this.valor);
    console.log(this.isInCart);
  }

  eliminarItem(){
    this.cartService.removeItem(this.item.codigo)
  }

  verCarrito(){
    console.log(this.cartService.cart.value);
    
  }
}
