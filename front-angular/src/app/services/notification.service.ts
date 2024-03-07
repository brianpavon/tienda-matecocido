import { Injectable } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  notificacionModal(text:string,title:string,icon:any){
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showConfirmButton: true,
      confirmButtonColor: '#bde0f5',
      confirmButtonText: 'Aceptar'
    }) 
  }

  notificationToast (title:string){
    this.Toast.fire({
       icon: 'success',
       title
    })
  }


  async modalDelete (elementToDel:any){
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: `¿Quieres borrar ${elementToDel}?`,
        text: `Esto eliminará definitivamente ${elementToDel}`,
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#d33',
        confirmButtonColor: '#bde0f5',
        confirmButtonText: 'Borrar'
      }).then((result) => {      
        resolve(result.isConfirmed);      
      }).catch((error) => {
        reject(error);
      });
    });
  }
}

