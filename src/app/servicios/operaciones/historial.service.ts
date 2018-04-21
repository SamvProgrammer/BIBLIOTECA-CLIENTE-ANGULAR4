import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { RutasApiService } from '../rutas-api.service';


@Injectable()
export class HistorialService {

  constructor(private rutas:RutasApiService,private http:Http) { }
  public getlista() {
    let ruta = this.rutas.getUri("listaHistorico");
    return this.http.get(ruta).map(respuesta => respuesta.json());
  }
}
