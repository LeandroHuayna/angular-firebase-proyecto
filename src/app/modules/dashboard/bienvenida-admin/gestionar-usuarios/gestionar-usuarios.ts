import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../../../services/usuario';

@Component({
  selector: 'app-gestionar-usuarios',
  templateUrl: './gestionar-usuarios.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class GestionarUsuarios implements OnInit {

  usuarios: any[] = [];

  // Formulario agregar usuario
  nuevoNombre = '';
  nuevoEmail = '';
  nuevoTelefono = '';
  nuevoTipoMembresia = 'mensual';
  nuevoFechaInicio: string = '';
  nuevoFechaVencimiento: string = '';
  nuevoEstadoPago = 'activo';

  // Edición
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
    if (!this.nuevoEmail || !this.nuevoNombre) return;

    this.usuarioService.agregarUsuario(
      this.nuevoNombre,
      this.nuevoEmail,
      this.nuevoTelefono,
      this.nuevoTipoMembresia,
      new Date(this.nuevoFechaInicio),
      new Date(this.nuevoFechaVencimiento),
      this.nuevoEstadoPago
    ).then(() => {
      this.nuevoNombre = '';
      this.nuevoEmail = '';
      this.nuevoTelefono = '';
      this.nuevoTipoMembresia = 'mensual';
      this.nuevoFechaInicio = '';
      this.nuevoFechaVencimiento = '';
      this.nuevoEstadoPago = 'activo';
    });
  }

  editarUsuario(usuario: any) {
    this.usuarioEditando = { ...usuario };
    // Convertir fechas a string para inputs
    this.usuarioEditando.fecha_inicio = new Date(usuario.fecha_inicio).toISOString().substring(0, 10);
    this.usuarioEditando.fecha_vencimiento = new Date(usuario.fecha_vencimiento).toISOString().substring(0, 10);
  }

  guardarEdicion() {
    this.usuarioService.actualizarUsuario(this.usuarioEditando.uid, {
      nombre: this.usuarioEditando.nombre,
      email: this.usuarioEditando.email,
      telefono: this.usuarioEditando.telefono,
      tipo_membresia: this.usuarioEditando.tipo_membresia,
      fecha_inicio: new Date(this.usuarioEditando.fecha_inicio),
      fecha_vencimiento: new Date(this.usuarioEditando.fecha_vencimiento),
      estado_pago: this.usuarioEditando.estado_pago,
    }).then(() => this.usuarioEditando = null);
  }

  cancelarEdicion() {
    this.usuarioEditando = null;
  }
}
