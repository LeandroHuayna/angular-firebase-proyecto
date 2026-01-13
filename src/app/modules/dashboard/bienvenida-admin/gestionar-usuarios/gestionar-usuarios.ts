import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Para *ngFor y *ngIf
import { FormsModule } from '@angular/forms';   // ✅ Para [(ngModel)]
import { Usuario } from '../../../../services/usuario';

@Component({
  selector: 'app-gestionar-usuarios',
  templateUrl: './gestionar-usuarios.html',
  standalone: true,          // 🔹 Ya era standalone
  imports: [CommonModule, FormsModule] // 🔹 IMPORTANTE
})
export class GestionarUsuarios implements OnInit {

  usuarios: any[] = [];

  // formulario agregar
  nuevoEmail = '';
  nuevoRol = 'usuario';

  // edición
  usuarioEditando: any = null;

  constructor(private usuarioService: Usuario) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe((data: any[]) => {
      this.usuarios = data;
    });
  }

  agregarUsuario() {
    if (!this.nuevoEmail) return;

    this.usuarioService.agregarUsuario(this.nuevoEmail, this.nuevoRol)
      .then(() => {
        this.nuevoEmail = '';
        this.nuevoRol = 'usuario';
      });
  }

  editarUsuario(usuario: any) {
    this.usuarioEditando = { ...usuario };
  }

  guardarEdicion() {
    this.usuarioService.actualizarUsuario(
      this.usuarioEditando.uid,
      {
        email: this.usuarioEditando.email,
        rol: this.usuarioEditando.rol,
      }
    ).then(() => {
      this.usuarioEditando = null;
    });
  }

  cancelarEdicion() {
    this.usuarioEditando = null;
  }
}
