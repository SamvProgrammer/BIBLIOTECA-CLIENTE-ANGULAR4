import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../servicios/login.service';

@Component({
  selector: 'app-menu-inicio',
  templateUrl: './menu-inicio.component.html',
  styleUrls: ['./menu-inicio.component.css']
})
export class MenuInicioComponent implements OnInit {
  public selectedIndex = -1;
  public usuario:any;
  constructor(private loginService:LoginService) { }

  ngOnInit() {
     const obj = this.loginService.getUsuario();
     this.usuario = obj;
  }
  public seleccionaIndice(numero):void{
    this.selectedIndex = numero;
  }

  public salir(){
    localStorage["acceso"] = "false";
    document.location.href = "/";
  }

}
