import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, mergeMap, takeUntil } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-item-list-container',
  templateUrl: './item-list-container.component.html',
  styleUrls: ['./item-list-container.component.css']
})
export class ItemListContainerComponent {

  productsDB:any = [];
  categoria: any='';
  codCateg:any = '';

  unsubscribeAll = new Subject<void>();
  unsubscribe = new Subject<void>();

  constructor(private route: ActivatedRoute, private productServ: ProductsService, private session:SessionService){
  }

  ngOnInit(){
    // console.log(this.session.user);
    this.route.params.pipe(
      mergeMap(params =>{
        this.codCateg = params['codCateg'];
        this.categoria = this.codCateg ? this.codCateg.replace('-',' & ') : '';
        return this.productServ.getProductsDB(this.categoria)
      })
    ).subscribe(products =>{
      this.productsDB= products.content;
      console.log(this.productsDB);
      // console.log(this.codCateg,this.categoria);
      
    })
    // this.route.params.subscribe(params =>{
    //   const codCateg = params['codCateg'];
    //   this.categoria = codCateg ? codCateg.replace('-',' & ') : '';
    //   console.log(this.categoria);
    // })

    //   this.userService.devolverDataUsuarioDB(this.authService.idUsuarioLogueado).pipe(takeUntil(this.unsubscribeAll),
    //   mergeMap( (res1) => this.mesaSerive.traerMesa(res1?.idMesa)),takeUntil(this.unsubscribe)
    // ).subscribe(res2 =>{
    //   this.usuarioLogueado = res2.cliente;
    //   this.mesa = res2;
    //   console.log(this.mesa);
    //   this.cargando = false;
    // })

    // this.productServ.getProductsDB(this.categoria).subscribe(products =>{
    //   this.productsDB = products.content;

    //   console.log(this.productsDB);
    // })

    
    

  // Ahora puedes encadenar observables usando mergeMap
  // observable1.pipe(
  //   mergeMap(value1 => {
  //     // Haces algo con el resultado del primer observable
  //     console.log(value1);

  //     // Devuelves el segundo observable
  //     return observable2;
  //   })
  // ).subscribe(value2 => {
  //   // Manejas el resultado del segundo observable
  //   console.log(value2);
  // });

    // console.log(this.productsDB);
    // console.log(this.categoria);
  }
}
