import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../../services/usuario';
import { UsuarioModelo } from '../../../../models/usuario.model';

@Component({
  selector: 'app-cambiar-rol',
  templateUrl: './cambiar-rol.html',
  styleUrls: ['./cambiar-rol.css'],
  standalone: false,
})
export class CambiarRol implements OnInit {

  usuarios: UsuarioModelo[] = [];
  rolSeleccionado: { [uid: string]: string } = {};

  constructor(private usuarioService: Usuario) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (usuarios: UsuarioModelo[]) => {
        console.log('Usuarios recibidos:', usuarios);
        this.usuarios = usuarios;

        usuarios.forEach(usuario => {
          if (usuario.uid) {
            this.rolSeleccionado[usuario.uid] = usuario.rol;
          }
        });
      },
      error: (err) => {
        console.error('Error Firestore:', err);
      }
    });
  }

  cambiarRol(uid: string): void {
    const rolNuevo = this.rolSeleccionado[uid];
    this.usuarioService.cambiarRol(uid, rolNuevo);
  }
}
