import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CargaLoginService } from 'src/app/servicios/carga-login.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {
  public nombrePersonaLogueada!: string | null;

  constructor(private cargaLogin: CargaLoginService, private router: Router) { }

  ngOnInit(): void {
    this.nombrePersonaLogueada = localStorage.getItem('nombrePersonaLogueada');
  }

  hacerLogout(): void {
    this.cargaLogin.logout();
    this.router.navigate(['/login']);
  }
}
