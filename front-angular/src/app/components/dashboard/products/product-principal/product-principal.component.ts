import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-principal',
  templateUrl: './product-principal.component.html',
  styleUrls: ['./product-principal.component.css']
})
export class ProductPrincipalComponent {

  productsDB :any;

  constructor(private productServ: ProductsService){

  }
  ngOnInit(){
    this.productServ.getProducts().subscribe(data =>{
      this.productsDB = data.content;
    })
  }
}
