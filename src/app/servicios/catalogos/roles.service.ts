import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { RutasApiService } from '../../servicios/rutas-api.service';

@Injectable()
export class RolesService {

  constructor(private http:Http,private rutas:RutasApiService) { }
  
  public getlistaRoles(){
    let ruta= this.rutas.getUri("listaRoles");
    return this.http.get(ruta).map(respuesta => respuesta.json());
  }
  public getRol(id){
    let ruta= this.rutas.getUri("listaRoles") +"/"+ id;
    return this.http.get(ruta).map(respuesta => respuesta.json());
  }
  
  public insertarRol(roles){
    let ruta = this.rutas.getUri("listaRoles");
    const peticion: any = JSON.stringify(roles);
    const headers = new Headers({
      "Content-Type": "application/json"
    });
    return this.http.post(ruta, peticion, { headers })
      .map(response => response.json());
  }

  public actualizarRol(roles,id){
    let ruta = this.rutas.getUri("listaRoles")+"/"+id;
    const peticion: any = JSON.stringify(roles);
    const headers = new Headers({
      "Content-Type": "application/json"
    });
    return this.http.put(ruta, peticion, { headers })
      .map(response => response.json());
  }

  public eliminarRol(id){
    let ruta = this.rutas.getUri("listaRoles")+"/"+id;
    return this.http.delete(ruta).map(respuesta => respuesta.json());
  }

}
