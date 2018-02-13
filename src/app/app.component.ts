import { Component,OnInit } from '@angular/core';
import { LoginService } from './servicios/login.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public habilitar:Boolean = false;
  constructor(private servicioLogin:LoginService){}
  
  ngOnInit(){
    if(localStorage["acceso"] == undefined){
      localStorage["acceso"] = false;
    }
    this.habilitar = localStorage["acceso"] == "true";
  }

}
