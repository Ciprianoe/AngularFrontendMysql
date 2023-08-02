import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, query, orderBy, deleteDoc, doc, updateDoc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  [x: string]: any;

  //unsub:any;
  Id!: String
  promis: any
  empleado!: [
    nombre: string,
    apellido: string,
    dni: number,
    cargo: string,
    salario: number
  ];
  //firestore: Firestore = inject(Firestore)
  empleados$!: Observable<any[]>;

  constructor(private firestore: Firestore) { }

  agregarEmpleado(empleado: any) {
    const empleadoData = collection(this.firestore, 'empleados');
    return addDoc(empleadoData, empleado);
  }

  getEmpleados(): Observable<any[]> {
    const consultaRef = query(collection(this.firestore, 'empleados'), orderBy("fechaCreate", "asc"));
    return collectionData(consultaRef, { idField: 'id' }) as Observable<any[]>
  }

  eliminarEmpleado(empleadoId: any) {
    const empleadosRef = doc(this.firestore, `empleados/${empleadoId.id}`);
    return deleteDoc(empleadosRef);
  }

  async getEmpleado(empleadoId: String) {
    return ((await (getDoc(doc(this.firestore, `empleados/${empleadoId}`)))).data())
  }


  actualizarEmpleado(empleadoId: String, data: any): Promise<any> {
    const empleadosRef = doc(this.firestore, `empleados/${empleadoId}`);
    return updateDoc(empleadosRef, data);
  }




}





