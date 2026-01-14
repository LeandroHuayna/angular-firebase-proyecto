import { Injectable, Injector, runInInjectionContext } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Usuario {

  constructor(
    private firestore: AngularFirestore,
    private injector: Injector,
  ) {}

  crearUsuario(uid: string, email: string) {
    return runInInjectionContext(this.injector, () => {
      return this.firestore
        .collection('Usuarios')
        .doc(uid)
        .set({
          email,
          rol: 'usuario',
          fecha_registro: new Date(),
        });
    });
  }

  obtenerUsuario(uid: string): Observable<any> {
    return runInInjectionContext(this.injector, () => {
      return this.firestore
        .collection('Usuarios')
        .doc(uid)
        .valueChanges();
    });
  }

  obtenerUsuarios(): Observable<any[]> {
    return runInInjectionContext(this.injector, () => {
      return this.firestore
        .collection('Usuarios')
        .valueChanges({ idField: 'uid' });
    });
  }

  actualizarUsuario(uid: string, data: any) {
    return runInInjectionContext(this.injector, () => {
      return this.firestore
        .collection('Usuarios')
        .doc(uid)
        .update(data);
    });
  }

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
      return this.firestore
        .collection('Usuarios')
        .doc(uid)
        .set({
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
    return runInInjectionContext(this.injector, () => {
      return this.firestore
        .collection('Usuarios')
        .doc(uid)
        .update({ rol });
    });
  }
}
