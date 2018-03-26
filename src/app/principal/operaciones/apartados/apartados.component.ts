import { Component, OnInit } from '@angular/core';
import { ApartadosService } from '../../../servicios/operaciones/apartados.service';
import { EditorialService } from '../../../servicios/catalogos/editorial.service';
import { GeneroService } from '../../../servicios/catalogos/genero.service';
import { LoginService } from '../../../servicios/login.service';
@Component({
  selector: 'app-apartados',
  templateUrl: './apartados.component.html',
  styleUrls: ['./apartados.component.css']
})
export class ApartadosComponent implements OnInit {

  public opcion:string;
  public apartados:any = [];
  public generos:any = [];
  public editoriales:any=[];
  public codigo:any;
  
  constructor(private apartadosService:ApartadosService,
              private editorialService:EditorialService,
              private generoService:GeneroService,
              private loginService:LoginService) { }

  ngOnInit() {
    let usuarios = this.loginService.getUsuario();
    let objeto = {
      "tipo":"0",
      "codigo":"0",
      "idUsuario":usuarios["codigo"] 
    }
    this.apartadosService.getlista(objeto).subscribe(respuesta => {
        this.apartados = respuesta;
    });
    this.generoService.getlista().subscribe(respuesta => {
        this.generos = respuesta;      
    });
    this.editorialService.getlista().subscribe(respuesta => {
       this.editoriales = respuesta; 

    });
    
  }

  public cambia(id){
    let usuarios = this.loginService.getUsuario();
    let objeto = {
      "tipo":this.opcion,
      "codigo":this.codigo,
      "idUsuario":usuarios["codigo"] 
    }
    this.apartadosService.getlista(objeto).subscribe(respuesta => {
       this.apartados = respuesta;    
    });
  }

  public apartar(id,btn){
     btn.disabled = true;
     btn.childNodes[1].textContent = "apartando..";
     let usuarios = this.loginService.getUsuario();
     let objeto = {
       "codigo":id,
       "idUsuario":usuarios["codigo"],
       "prestado":false
     }
     this.apartadosService.apartar(objeto).subscribe(respuesta => {
       alert("Libro apartado");
      btn.childNodes[1].textContent = "apartado";
     });
  }

}
