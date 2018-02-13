import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { LibrosService } from '../../../servicios/catalogos/libros.service';
import { EditorialService } from '../../../servicios/catalogos/editorial.service';
import { GeneroService } from '../../../servicios/catalogos/genero.service';


@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {
  public libros: any;
  public generos: any;
  public editoriales: any;
  public contador = 0;
  public titulo: String;
  public mostrarBoton: Boolean;
  public miFormulario: FormGroup;
  public codigo;
  public nombre;
  public total;
  public cantidad;
  public autor;
  public editorial;
  public genero;
  public id;

  constructor(private formBuilder: FormBuilder, private librosService: LibrosService,
              private generoService: GeneroService, private editorialService: EditorialService) { }

  ngOnInit() {
    this.librosService.getlista().subscribe(respuesta => {
      this.libros = (respuesta.length === 0) ? undefined : respuesta;
    });

    this.editorialService.getlista().subscribe(respuesta => {
      this.editoriales = respuesta;
    });

    this.generoService.getlista().subscribe(respuesta => {
       this.generos = respuesta;
    });

    this.miFormulario = this.formBuilder.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      total: ['', Validators.required],
      cantidad: ['', Validators.required],
      autor: ['', Validators.required],
      idEditorial: ['', Validators.required],
      idGenero: ['', Validators.required]
    });
  }

  public tituloModal(obj, boton) {
    this.titulo = obj;
    this.mostrarBoton = boton;
    this.codigo = '';
    this.nombre = '';
    this.total = '';
    this.cantidad = '';
    this.autor = '';
    this.editorial = '';
    this.genero = '';
  }

  public obtenerRegistro(id) {
    this.librosService.get(id).subscribe(respuesta => {
      this.codigo = respuesta.codigo;
      this.nombre = respuesta.nombre;
      this.total = respuesta.total;
      this.cantidad = respuesta.cantidad;
      this.autor = respuesta.autor;
      this.genero = respuesta.idGenero;
      this.editorial = respuesta.idEditorial;
      this.id = id;
    });
  }

  public enviar() {
    const objEnviar = {
      'codigo': this.miFormulario.value.codigo,
      'nombre': this.miFormulario.value.nombre,
      'total': this.miFormulario.value.total,
      'cantidad': this.miFormulario.value.cantidad,
      'autor': this.miFormulario.value.autor,
      'idGenero': this.miFormulario.value.idGenero,
      'idEditorial': this.miFormulario.value.idEditorial
    };
    if (this.mostrarBoton == true) {
      this.librosService.insertar(objEnviar).subscribe(respuesta => {
        $("#myModal").modal("hide");
        this.librosService.getlista().subscribe(respuesta2 => {
          this.libros = respuesta2;
        });
        swal("Éxito", "Registro insertado!", {
          icon: "success",
        });
      });
    } else {
       this.librosService.actualizar(objEnviar, this.id).subscribe(respuesta => {
        $("#myModal").modal("hide");
        this.librosService.getlista().subscribe(respuesta2 => {
          this.libros = respuesta2;
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
         
          this.librosService.eliminar(id).subscribe(respuesta =>{
            this.librosService.getlista().subscribe(respuesta2 => {
              this.libros = respuesta2;
            });
            swal('Registro eliminado!', {
              icon: "success",
            });
          });
        }
      });
  }

}
