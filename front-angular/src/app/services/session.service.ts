import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  token : any;
  isAdmin : boolean = false;
  isEdit : boolean = false;
  userLogged : any;

  constructor() { }

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
    this.setUserLogged(data.email)
  }

}
