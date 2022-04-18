import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Administrator } from 'src/app/clases/administrator';
import { Login } from 'src/app/clases/login';
import { Supervisor } from 'src/app/clases/supervisor';
import { User } from 'src/app/clases/user';
import { CargaLoginService } from 'src/app/servicios/carga-login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pantalla-login',
  templateUrl: './pantalla-login.component.html',
  styleUrls: ['./pantalla-login.component.css']
})

export class PantallaLoginComponent implements OnInit {
  public login: Login;
  public administrator!: Administrator;
  public supervisor!: Supervisor;
  public user!: User;
  public estaLogin: boolean = false;
  public nombrePersonaLogueada!: string | null;

  constructor(private titleService: Title, private cargaLogin: CargaLoginService, private router: Router) {
    this.login = new Login('', '', '');
  }

  ngOnInit(): void {
    this.titleService.setTitle('Login');
    this.nombrePersonaLogueada = localStorage.getItem('nombrePersonaLogueada');
  }

  ngDoCheck(): void {
    this.estaLogin = this.cargaLogin.isLoginAdministrator() || this.cargaLogin.isLoginSupervisor() || this.cargaLogin.isLoginUser();
  }

  hacerLogin(): void {
    switch (this.login.role) {
      case 'administrator': {
        this.cargaLogin.loginAdministrator(this.login).subscribe(
          administrator => {
            this.administrator = administrator;
            if (this.administrator !== null) {
              localStorage.setItem('idAdministrador', this.administrator.id.toString());
              localStorage.setItem('nombrePersonaLogueada', this.administrator.name + ' ' + this.administrator.firstName + ' ' + this.administrator.lastName);
              this.router.navigate(['/inicio']);
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Credenciales de acceso incorrectas',
                text: 'Comprueba que has introducido correctamente el usuario, la contraseña y el rol',
              });
            }
            console.log(this.administrator);
          },
          error => console.log(error)
        );
        break;
      }
      case 'supervisor': {
        this.cargaLogin.loginSupervisor(this.login).subscribe(
          supervisor => {
            this.supervisor = supervisor;
            if (this.supervisor !== null) {
              localStorage.setItem('idSupervisor', this.supervisor.id.toString());
              localStorage.setItem('nombrePersonaLogueada', this.supervisor.name + ' ' + this.supervisor.firstName + ' ' + this.supervisor.lastName);
              this.router.navigate(['/inicio']);
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Credenciales de acceso incorrectas',
                text: 'Comprueba que has introducido correctamente el usuario, la contraseña y el rol',
              });
            }
            console.log(this.supervisor);
          },
          error => console.log(error)
        );
        break;
      }
      default: {
        this.cargaLogin.loginUser(this.login).subscribe(
          user => {
            this.user = user;
            if (this.user !== null) {
              localStorage.setItem('idUsuario', this.user.id.toString());
              localStorage.setItem('nombrePersonaLogueada', this.user.name + ' ' + this.user.firstName + ' ' + this.user.lastName);
              this.router.navigate(['/inicio']);
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Credenciales de acceso incorrectas',
                text: 'Comprueba que has introducido correctamente el usuario, la contraseña y el rol',
              });
            }
            console.log(this.user);
          },
          error => console.log(error)
        );
        break;
      }
    }
  }

  hacerLogout(): void {
    this.estaLogin = false;
    this.cargaLogin.logout();
    this.router.navigate(['/login']);
    window.location.reload();
  }
}
