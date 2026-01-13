import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BienvenidaUsuario } from './bienvenida-usuario/bienvenida-usuario';
import { BienvenidaAdmin } from './bienvenida-admin/bienvenida-admin';
import { CambiarRol } from './bienvenida-admin/cambiar-rol/cambiar-rol';
import { DesactivarUsuario } from './bienvenida-admin/desactivar-usuario/desactivar-usuario';
import { RouterModule } from '@angular/router';
import { GestionarUsuarios } from './bienvenida-admin/gestionar-usuarios/gestionar-usuarios';



@NgModule({
  declarations: [
    BienvenidaUsuario,
    BienvenidaAdmin,
    CambiarRol,
    DesactivarUsuario,
    GestionarUsuarios
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class DashboardModule { }
