import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../../services/usuario';

@Component({
  selector: 'app-cambiar-rol',
  templateUrl: './cambiar-rol.html',
  styleUrls: ['./cambiar-rol.css'],
  standalone: false,
})
export class CambiarRol implements OnInit {

  usuarios: any[] = [];
  rolesDisponibles = ['usuario', 'admin'];

  constructor(private usuarioService: Usuario) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe((data: any[]) => {
      this.usuarios = data;
    });
  }

  cambiarRol(uid: string, nuevoRol: string) {
    this.usuarioService.cambiarRol(uid, nuevoRol)
      .then(() => console.log(`Rol del usuario ${uid} actualizado a ${nuevoRol}`))
      .catch(err => console.error(err));
  }
}
