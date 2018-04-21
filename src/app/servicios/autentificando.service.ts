import { Injectable } from '@angular/core';

@Injectable()
export class AutentificandoService {

  constructor() { }
  public permisos(){
     if(localStorage["rango"] == "1"){
        return true;
     }
     return false;
  }
}
