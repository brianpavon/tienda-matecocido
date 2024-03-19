import { Component } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-navbar-dashboard',
  templateUrl: './navbar-dashboard.component.html',
  styleUrls: ['./navbar-dashboard.component.css']
})
export class NavbarDashboardComponent {

  userLogged : boolean = false;
  constructor(private session:SessionService){
    this.userLogged = this.session.isUserLogged();
  }

  closeSession(){
    // this.userLogged = false;
    // localStorage.clear();

    this.session.cerrarSesion();
    //deberia llaamar a un endpoint del back para que cierre la sesión en DB, pero aun no guardamos datos de sesiones activas
  }
}
