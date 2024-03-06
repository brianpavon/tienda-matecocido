import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css']
})
export class CarrouselComponent {

@Input () imagenes :any;
url:string = environment.apiUrl;

// imagenes : any[] =[
//   {
//     path_img : "https://firebasestorage.googleapis.com/v0/b/tienda-matecocido.appspot.com/o/taza_jengibre.jpg?alt=media&token=fd16c7ff-c4e0-43b7-b381-56727338096d"
//   },
//   {
//     path_img : "https://firebasestorage.googleapis.com/v0/b/tienda-matecocido.appspot.com/o/tazas_matecocido.jpg?alt=media&token=46453dc0-ef4b-4d41-b832-c1c86650c31b"
//   },
//   {
//     path_img : "https://firebasestorage.googleapis.com/v0/b/tienda-matecocido.appspot.com/o/tazas_cafecitas.jpg?alt=media&token=3414f04e-fa71-403d-96df-381b65f4721d"
//   }
// ]


data:string = 'Hola';

}
