import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-item-detail-container',
  templateUrl: './item-detail-container.component.html',
  styleUrls: ['./item-detail-container.component.css']
})
export class ItemDetailContainerComponent {

  product:any = [];
  categoria: any='';
  codCateg:any = '';

  constructor(private productServ: ProductsService, private route: ActivatedRoute){

  }

  ngOnInit(){
    this.route.params.pipe(
      mergeMap(params =>{
        this.codCateg = params['productCode'];
        console.log(this.codCateg);
        return this.productServ.getProductByCode(this.codCateg)
      })
    ).subscribe(product =>{
      this.product= product.content;
      // console.log(this.product);
      // console.log(this.codCateg,this.categoria);
      
    })
  }
}
