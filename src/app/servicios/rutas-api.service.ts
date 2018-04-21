import { Injectable } from '@angular/core';

@Injectable()
export class RutasApiService {
  private  rutasApi:any = {
    "login":"/api/login",
    "listaRoles":"/api/catalogos/roles",
    "listaUsuarios":"/api/catalogos/usuarios",
    "listaEditorial":"/api/catalogos/editorial",
    "listaGeneros":"/api/catalogos/generos",
    "listaLibros":"/api/catalogos/libros",
    "listaApartados":"/api/operaciones/apartados",
    "listaPedidos":"/api/operaciones/pedidos",
    "listaHistorico":"/api/operaciones/historico"
  };
  constructor() { }
  public getUri(variable):any{
     return this.rutasApi[variable];
  }
}
