import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { ColorsService } from 'src/app/services/colors.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-abm',
  templateUrl: './product-abm.component.html',
  styleUrls: ['./product-abm.component.css']
})
export class ProductAbmComponent {

  products : any;
  categorias : any;
  colores : any;
  abmForm : FormGroup;

  codProd: any;
  constructor(private productsService :ProductsService,private categoriesService:CategoriesService, private fb:FormBuilder,
              private colorService: ColorsService) {
    this.abmForm = fb.group({
      codigoProd: ['',Validators.required],
      nombre:['',Validators.required],
      descripcion:['',Validators.required],
      precio:['',Validators.required],
      stock:['',Validators.required],
      codigoColor:[[],Validators.required],
      codigoCategoria:[[],Validators.required],
      imagenes:[[],Validators.required]

    })
  }

  ngOnInit(){
    // this.productsService.getProductsDB(this.codProd).subscribe(prods =>{
    //   this.products = prods.content;
    // })

    this.categoriesService.getCategories().subscribe(cats =>{
      this.categorias = cats.content
      console.log(this.categorias);
    })

    this.colorService.getColors().subscribe(cols =>{
      this.colores = cols.content;
      console.log(this.colores);
    })


  }

  handleChangeValue(){

  }

  submitForm(){
    if(this.codProd){
      this.editarProducto();
    }
    else{
      this.crearProducto();
    }
  }

  crearProducto(){

  }

  editarProducto(){

  }

}
