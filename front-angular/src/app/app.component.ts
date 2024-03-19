import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-angular';

  ruta : any;

  constructor(private route:Router){

    route.events.subscribe((event)=>{
      if(event instanceof NavigationEnd){
        this.ruta = event.url;
      }
    })
  }



}
