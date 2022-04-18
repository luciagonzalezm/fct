import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CargaLoginService } from './carga-login.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardInicioGuard implements CanActivate {

  constructor(private cargaLogin: CargaLoginService, public router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.cargaLogin.isLoginAdministrator() || this.cargaLogin.isLoginSupervisor() || this.cargaLogin.isLoginUser()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}