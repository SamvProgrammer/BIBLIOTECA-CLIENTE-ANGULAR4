import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { RolesService } from '../../../../servicios/catalogos/roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  public objRoles: any;
  public contador = 0;
  public titulo: String;
  public mostrarBoton: Boolean;
  public miFormulario: FormGroup;
  public rol;
  public rango;
  public id;
  constructor(private rolesService: RolesService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.rolesService.getlistaRoles().subscribe(respuesta => {
      this.objRoles = respuesta;
    });
     
    this.miFormulario = this.formBuilder.group({
      rol: ['', Validators.required],
      rango: ['', Validators.required]
    });
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
         
          this.rolesService.eliminarRol(id).subscribe(respuesta =>{
            this.rolesService.getlistaRoles().subscribe(respuesta2 => {
              this.objRoles = respuesta2;
            });
            swal('Registro eliminado!', {
              icon: "success",
            });
          });
        }
      });
  }
  public tituloModal(obj, boton) {
    this.titulo = obj;
    this.mostrarBoton = boton;
    this.rol = "";
    this.rango = "";
  }

  public obtenerRegistro(id) {

    this.rolesService.getRol(id).subscribe(respuesta => {
      this.rol = respuesta.rol;
      this.rango = respuesta.rango;
      this.id = id;
    });
  }
  public enviar() {
    const objEnviar = {
      'rol': this.miFormulario.value.rol,
      'rango': this.miFormulario.value.rango
    }
    if (this.mostrarBoton == true) {
      this.rolesService.insertarRol(objEnviar).subscribe(respuesta => {
        $("#myModal").modal("hide");
        this.rolesService.getlistaRoles().subscribe(respuesta2 => {
          this.objRoles = respuesta2;
        });
        swal("Éxito", "Registro insertado!", {
          icon: "success",
        });
      });
    } else {
       this.rolesService.actualizarRol(objEnviar,this.id).subscribe(respuesta => {
        $("#myModal").modal("hide");
        this.rolesService.getlistaRoles().subscribe(respuesta2 => {
          this.objRoles = respuesta2;
        });
        swal("Éxito", "Registro actualizado!", {
          icon: "success",
        });
       });
    }
  }
}
