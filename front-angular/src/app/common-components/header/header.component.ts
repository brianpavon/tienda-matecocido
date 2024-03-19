import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  categories : any[] = [];
  userLogged : boolean = false;

  usuario : any;
  constructor(private catServ : CategoriesService, public session : SessionService){
    this.userLogged = this.session.isUserLogged();

  }
  
  ngOnInit(): void {
    this.catServ.getCategories().subscribe(categs => {
      this.categories = categs.content;
      this.session.obtenerUsuarioLogueado().subscribe(user =>{
        this.usuario = user;
      })
      
    })
  }

  closeSession(){
    // console.log(this.session.user);
    this.session.cerrarSesion()
    this.userLogged = false;
    // console.log(this.session.user);
    // localStorage.clear()
    //deberia llaamar a un endpoint del back para que cierre la sesión en DB, pero aun no guardamos datos de sesiones activas
  }
}
