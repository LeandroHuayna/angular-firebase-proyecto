import { Auth } from './../../../services/auth';
import { Component } from '@angular/core';
import { Login } from '../../auth/login/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenida-usuario',
  standalone: false,
  templateUrl: './bienvenida-usuario.html',
  styleUrl: './bienvenida-usuario.css',
})
export class BienvenidaUsuario {
  constructor(private AuthService: Auth, private router: Router) { }
  cerrarSesion() {
    this.AuthService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
