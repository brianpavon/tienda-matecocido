import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  token : any;
  isAdmin : boolean = false;
  isEdit : boolean = false;
  userLogged : any;

  user:any;

  usuarioLogueado: BehaviorSubject <any> = new BehaviorSubject<any>(undefined);

  constructor() {

    const token = this.getToken();

    if(token)
      this.setUser(token)

  }

  obtenerUsuarioLogueado(){
    return this.usuarioLogueado.asObservable();
  }

  actualizarUsuarioLogueado(valor: any){
    this.usuarioLogueado.next(valor);
  }

  setToken(token:any){
    localStorage.setItem('token', token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  setRol(rol : number){
    localStorage.setItem('rol', `${rol}`)
  }

  getRol(){
    return localStorage.getItem('rol');
  }

  setUserLogged(data : any){
    this.userLogged = data;
    localStorage.setItem('email',data)
  }

  getUserLogged(){
    //return this.userLogged
    return localStorage.getItem('email');
  }

  isUserLogged(){
    let user = this.getUserLogged()    
    return user ? true : false;
  }
  
  setLocalstorage(data:any){
    this.setToken(data.token);
    this.setRol(data.id_rol);
    this.setUserLogged(data.email);

  }

  setUser(token:string){

    const data = JSON.parse(atob(token.split('.')[1])).data;

    this.user ={
      email : data.email,
      rol : data.rol
    }
    this.actualizarUsuarioLogueado(this.user);
  }

  cerrarSesion(){
    // this.user = {};
    this.actualizarUsuarioLogueado(undefined);
    localStorage.clear();
  }

}
