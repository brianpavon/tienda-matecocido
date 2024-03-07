import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent {

  imagenes : any = [];
  url: string = environment.apiUrl;
  @Input () item : any;

  constructor(){
    console.log(this.item)
  }

  ngOnInit(){
    ;
  }
}
