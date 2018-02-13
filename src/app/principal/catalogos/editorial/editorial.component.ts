import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { EditorialService } from '../../../servicios/catalogos/editorial.service';

@Component({
  selector: 'app-editorial',
  templateUrl: './editorial.component.html',
  styleUrls: ['./editorial.component.css']
})
export class EditorialComponent implements OnInit {
  public editoriales: any;
  public contador = 0;
  public titulo: String;
  public mostrarBoton: Boolean;
  public miFormulario: FormGroup;
  public editorial;
  public id;

  constructor(private formBuilder: FormBuilder, private editorialService: EditorialService) { }

  ngOnInit() {
    this.editorialService.getlista().subscribe(respuesta => {
      this.editoriales = respuesta;
    });

    this.miFormulario = this.formBuilder.group({
      editorial: ['', Validators.required]
    });
  }

  public tituloModal(obj, boton) {
    this.titulo = obj;
    this.mostrarBoton = boton;
    this.editorial = '';
  }

  public obtenerRegistro(id) {
    this.editorialService.get(id).subscribe(respuesta => {
      this.editorial = respuesta.editorial;
      this.id = id;
    });
  }

  public enviar() {
    const objEnviar = {
      'editorial': this.miFormulario.value.editorial
    };
    if (this.mostrarBoton == true) {
      this.editorialService.insertar(objEnviar).subscribe(respuesta => {
        $("#myModal").modal("hide");
        this.editorialService.getlista().subscribe(respuesta2 => {
          this.editoriales = respuesta2;
        });
        swal("Éxito", "Registro insertado!", {
          icon: "success",
        });
      });
    } else {
       this.editorialService.actualizar(objEnviar, this.id).subscribe(respuesta => {
        $("#myModal").modal("hide");
        this.editorialService.getlista().subscribe(respuesta2 => {
          this.editoriales = respuesta2;
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
         
          this.editorialService.eliminar(id).subscribe(respuesta =>{
            this.editorialService.getlista().subscribe(respuesta2 => {
              this.editoriales = respuesta2;
            });
            swal('Registro eliminado!', {
              icon: "success",
            });
          });
        }
      });
  }

}
