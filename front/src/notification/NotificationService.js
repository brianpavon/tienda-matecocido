import Swal from "sweetalert2";

const Toast = Swal.mixin({
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

export const notificationModal = (text,title,icon) => {
    
        Swal.fire({
          title,
          type: 'success',
          text,
          showConfirmButton: true,
          confirmButtonColor: '#bde0f5',
          confirmButtonText:'Aceptar',
          icon: icon ? icon : ''
        });  
    
}
  
export const notificationToast = (title) =>{
    Toast.fire({
       icon: 'success',
       title
     })
}

export const modalDelete = async(elementToDel) =>{
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
    