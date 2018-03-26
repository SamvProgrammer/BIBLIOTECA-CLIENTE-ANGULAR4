import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { RutasApiService } from './rutas-api.service';

@Injectable()
export class LoginService {
  public usuario: any;
  constructor(private http: Http, private rutas: RutasApiService) { }

  public getLogin(parametroObjeto): any {
    let rutaLogin = this.rutas.getUri("login");
    const peticion: any = JSON.stringify(parametroObjeto);
    const headers = new Headers({
      "Content-Type": "application/json"
    });
    return this.http.post(rutaLogin, peticion, { headers })
      .map(response => response.json());
  }
  public setUsuario(usuario) {
    localStorage["nombre"] = usuario.nombre;
    localStorage["apellido_paterno"] = usuario.apellido_paterno;
    localStorage["apellido_materno"] = usuario.apellido_materno;
    localStorage["fecha_nacimiento"] = usuario.fecha_nacimiento;
    localStorage["codigo"] = usuario.codigo;
    let rolMaximo:any = undefined;
    for (let item of usuario.roles) {
       if(rolMaximo == undefined){
             rolMaximo = item;

       }else{
           if(item.rango < rolMaximo.rango){
                rolMaximo = item;
           }
       }
    }
    localStorage["rol"] = rolMaximo.rol;
    localStorage["rango"] = rolMaximo.rango;
  }

  public getUsuario(){
    const obj = {
      "nombre":localStorage["nombre"],
      "apellido_paterno":localStorage["apellido_paterno"],
      "rol":localStorage["rol"],
      "rango":localStorage["rango"],
      "codigo":localStorage["codigo"]
    }
    return obj;
  }

}
