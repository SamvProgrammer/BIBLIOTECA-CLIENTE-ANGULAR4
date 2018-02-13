import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { GeneroService } from '../../../servicios/catalogos/genero.service';

@Component({
  selector: 'app-generos',
  templateUrl: './generos.component.html',
  styleUrls: ['./generos.component.css']
})
export class GenerosComponent implements OnInit {
  public generos: any;
  public contador = 0;
  public titulo: String;
  public mostrarBoton: Boolean;
  public miFormulario: FormGroup;
  public genero;
  public id;

  constructor(private formBuilder: FormBuilder, private generosService: GeneroService) { }

  ngOnInit() {
    this.generosService.getlista().subscribe(respuesta => {
      this.generos = respuesta;
    });

    this.miFormulario = this.formBuilder.group({
      genero: ['', Validators.required]
    });
  }

  public tituloModal(obj, boton) {
    this.titulo = obj;
    this.mostrarBoton = boton;
    this.genero = '';
  }

  public obtenerRegistro(id) {
    this.generosService.get(id).subscribe(respuesta => {
      this.genero = respuesta.genero;
      this.id = id;
    });
  }

  public enviar() {
    const objEnviar = {
      'genero': this.miFormulario.value.genero
    };
    if (this.mostrarBoton == true) {
      this.generosService.insertar(objEnviar).subscribe(respuesta => {
        $("#myModal").modal("hide");
        this.generosService.getlista().subscribe(respuesta2 => {
          this.generos = respuesta2;
        });
        swal("Éxito", "Registro insertado!", {
          icon: "success",
        });
      });
    } else {
       this.generosService.actualizar(objEnviar, this.id).subscribe(respuesta => {
        $("#myModal").modal("hide");
        this.generosService.getlista().subscribe(respuesta2 => {
          this.generos = respuesta2;
        });
        swal("Éxito", "Registro actualizado!", {
          icon: "success",
        });
       });
    }
  }

  public eliminar(id): void {
    swal({
      title: "¿Seguro eliminar registro?",
      text: "Una vez eliminado, usted no podrá recuperar el registro!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
         
          this.generosService.eliminar(id).subscribe(respuesta =>{
            this.generosService.getlista().subscribe(respuesta2 => {
              this.generos = respuesta2;
            });
            swal('Registro eliminado!', {
              icon: "success",
            });
          });
        }
      });
  }

}
