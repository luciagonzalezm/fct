import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { CargaLoginService } from './carga-login.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardModificarSupervisorsGuard implements CanActivate {
  
  constructor(private cargaLogin: CargaLoginService, public router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.cargaLogin.isLoginAdministrator() || this.cargaLogin.isLoginSupervisor()) {
      return true;
    }
    this.router.navigate(['/supervisores']);
    Swal.fire({
      icon: 'error',
      title: 'Operación denegada',
      text: 'No tiene permiso para realizar esta tarea',
    });
    return false;
  } 
}
