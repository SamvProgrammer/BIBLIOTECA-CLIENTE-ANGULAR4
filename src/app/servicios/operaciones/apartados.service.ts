import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { RutasApiService } from '../rutas-api.service';

@Injectable()
export class ApartadosService {

  constructor(private rutas:RutasApiService,private http:Http) { }
  
  public getlista(objeto) {
    let ruta = this.rutas.getUri("listaApartados")+"?tipo="+objeto["tipo"]+"&codigo="+objeto["codigo"]+"&idUsuario="+objeto["idUsuario"];
    return this.http.get(ruta).map(respuesta => respuesta.json());
  }
  public apartar(objeto){
    let ruta = this.rutas.getUri("listaApartados");
    const peticion: any = JSON.stringify(objeto);
    const headers = new Headers({
      "Content-Type": "application/json"
    });
    return this.http.post(ruta, peticion, { headers })
      .map(response => response.json());
  }
}
