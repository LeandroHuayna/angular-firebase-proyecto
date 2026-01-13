import { Injectable, runInInjectionContext, Injector } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class Usuario {

  constructor(
    private firestore: AngularFirestore,
    private injector: Injector,
  ) { }

  // Crear usuario desde registro Auth
  crearUsuario(uid: string, email: string) {
    return runInInjectionContext(this.injector, () => {
      return this.firestore.collection('Usuarios').doc(uid).set({
        email,
        rol: 'usuario',
        fecha_registro: new Date(),
      });
    });
  }

  // Obtener usuario por uid
  obtenerUsuario(uid: string) {
    return runInInjectionContext(this.injector, () => {
      return this.firestore.collection('Usuarios').doc(uid).valueChanges();
    });
  }

  // Obtener todos los usuarios
  obtenerUsuarios() {
    return runInInjectionContext(this.injector, () => {
      return this.firestore.collection('Usuarios').valueChanges({ idField: 'uid' });
    });
  }

  // Actualizar datos de usuario
  actualizarUsuario(uid: string, data: any) {
    return runInInjectionContext(this.injector, () => {
      return this.firestore.collection('Usuarios').doc(uid).update(data);
    });
  }

  // Agregar usuario manual desde dashboard
  agregarUsuario(
    nombre: string,
    email: string,
    telefono: string,
    tipoMembresia: string,
    fechaInicio: Date,
    fechaVencimiento: Date,
    estadoPago: string
  ) {
    const uid = this.firestore.createId();
    return runInInjectionContext(this.injector, () => {
      return this.firestore.collection('Usuarios').doc(uid).set({
        nombre,
        email,
        telefono,
        tipo_membresia: tipoMembresia,
        fecha_inicio: fechaInicio,
        fecha_vencimiento: fechaVencimiento,
        estado_pago: estadoPago,
        rol: 'usuario',
        fecha_registro: new Date(),
      });

    });
  }
  cambiarRol(uid: string, rol: string) {
    return this.firestore.collection('Usuarios').doc(uid).update({ rol });
  }
}
