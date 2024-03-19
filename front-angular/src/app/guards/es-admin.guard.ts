import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../services/session.service';




export const esAdminGuard = () => {

  const router = inject(Router);
  const session = inject(SessionService)



  if((session.user && session.user.rol == '1') || (session.user && session.user.rol == '3')){
    return true;
  }
  else{
    console.log('No podes entrar');
    return false;
  }
    



  
};
