import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { RutasApiService } from '../../servicios/rutas-api.service';

@Injectable()
export class LibrosService {

  constructor(private rutas: RutasApiService, private http: Http) { }

  public getlista() {
    let ruta = this.rutas.getUri("listaLibros");
    return this.http.get(ruta).map(respuesta => respuesta.json());
  }
  public get(id) {
    let ruta = this.rutas.getUri("listaLibros") + "/" + id;
    return this.http.get(ruta).map(respuesta => respuesta.json());
  }

  public insertar(obj) {
    let ruta = this.rutas.getUri("listaLibros");
    const peticion: any = JSON.stringify(obj);
    const headers = new Headers({
      "Content-Type": "application/json"
    });
    return this.http.post(ruta, peticion, { headers })
      .map(response => response.json());
  }

  public actualizar(obj, id) {
    let ruta = this.rutas.getUri("listaLibros") + "/" + id;
    const peticion: any = JSON.stringify(obj);
    const headers = new Headers({
      "Content-Type": "application/json"
    });
    return this.http.put(ruta, peticion, { headers })
      .map(response => response.json());
  }

  public eliminar(id) {
    let ruta = this.rutas.getUri("listaLibros") + "/" + id;
    return this.http.delete(ruta).map(respuesta => respuesta.json());
  }

}
