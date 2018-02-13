import { Injectable } from '@angular/core';

@Injectable()
export class RutasApiService {
  private  rutasApi:any = {
    "login":"/api/login",
    "listaRoles":"/api/catalogos/roles",
    "listaUsuarios":"/api/catalogos/usuarios"
  };
  constructor() { }
  public getUri(variable):any{
     return this.rutasApi[variable];
  }
}
