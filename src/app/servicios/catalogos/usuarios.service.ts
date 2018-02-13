import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { RutasApiService } from '../../servicios/rutas-api.service';

@Injectable()
export class UsuariosService {

  constructor(private http:Http,private rutas:RutasApiService) { }

  public getlista(){
    let ruta= this.rutas.getUri("listaUsuarios");
    return this.http.get(ruta).map(respuesta => respuesta.json());
  }
  public getUsuario(id){
    let ruta= this.rutas.getUri("listaUsuarios") +"/"+ id;
    return this.http.get(ruta).map(respuesta => respuesta.json());
  }
  
  public insertarUsuario(roles){
    let ruta = this.rutas.getUri("listaUsuarios");
    const peticion: any = JSON.stringify(roles);
    const headers = new Headers({
      "Content-Type": "application/json"
    });
    return this.http.post(ruta, peticion, { headers })
      .map(response => response.json());
  }

  public actualizarUsuario(roles,id){
    let ruta = this.rutas.getUri("listaUsuarios")+"/"+id;
    const peticion: any = JSON.stringify(roles);
    const headers = new Headers({
      "Content-Type": "application/json"
    });
    return this.http.put(ruta, peticion, { headers })
      .map(response => response.json());
  }

  public eliminarUsuario(id){
    let ruta = this.rutas.getUri("listaUsuarios")+"/"+id;
    return this.http.delete(ruta).map(respuesta => respuesta.json());
  }

}
