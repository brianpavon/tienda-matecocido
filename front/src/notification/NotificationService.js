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
    