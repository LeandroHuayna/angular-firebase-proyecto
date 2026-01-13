import { Injectable, runInInjectionContext, Injector } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root',
})
export class Usuario {
  
  constructor(
    private firestore:AngularFirestore,
    private injector: Injector,
  ) {}
  
  crearUsuario(uid: string, email: String) {
    return runInInjectionContext(this.injector, () => {
        return this.firestore.collection('Usuarios').doc(uid).set({
        email,
        rol:'usuario',
        fecha_registro: new Date(),
      });
    });
  }
  obtenerUsuario(uid:string) {
    return runInInjectionContext(this.injector, () => {
      return this.firestore.collection('Usuarios').doc(uid).valueChanges();     //nombre de la colecion de usuarios XD muy importante
                                                                                // valueChanges mucho mejor que get, mas dinamico
    })
  }
}
