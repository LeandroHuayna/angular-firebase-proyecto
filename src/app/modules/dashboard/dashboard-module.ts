import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BienvenidaUsuario } from './bienvenida-usuario/bienvenida-usuario';
import { BienvenidaAdmin } from './bienvenida-admin/bienvenida-admin';
import { CambiarRol } from './bienvenida-admin/cambiar-rol/cambiar-rol';
import { DesactivarUsuario } from './bienvenida-admin/desactivar-usuario/desactivar-usuario';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    BienvenidaUsuario,
    BienvenidaAdmin,
    CambiarRol,
    DesactivarUsuario
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class DashboardModule { }
