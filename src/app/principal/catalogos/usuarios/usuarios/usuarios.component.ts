import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from '../../../../servicios/catalogos/usuarios.service';
import { RolesService } from '../../../../servicios/catalogos/roles.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  public usuarios: any;
  public titulo: String;
  public mostrarBoton: Boolean;
  public miFormulario: FormGroup;
  public listaRoles: any;
  public codigo;
  public nombre;
  public apellido_paterno;
  public apellido_materno;
  public fecha_nacimiento;
  public password;
  public role;
  public id;
  constructor(private usuariosService: UsuariosService, private formBuilder: FormBuilder,
              private rolesService: RolesService) { }

  ngOnInit() {
    this.usuariosService.getlista().subscribe(respuesta => {
      this.usuarios = respuesta;
    });

    this.rolesService.getlistaRoles().subscribe(respuesta => {
      this.listaRoles = respuesta;
    });

    this.miFormulario = this.formBuilder.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido_paterno: ['', Validators.required],
      apellido_materno: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      password: ['', Validators.required],
      rol: ['', Validators.required]
    });
  }
  public tituloModal(obj, boton) {
    this.titulo = obj;
    this.mostrarBoton = boton;
    this.codigo = "";
    this.nombre = "";
    this.apellido_paterno = "";
    this.apellido_materno = "";
    this.fecha_nacimiento = "";
    this.password = "";
    this.role = "";
  }
 
  public obtenerRegistro(id) {

    this.usuariosService.getUsuario(id).subscribe(respuesta => {
      this.codigo = respuesta.codigo;
      this.nombre = respuesta.nombre;
      this.apellido_paterno = respuesta.apellido_paterno;
      this.apellido_materno = respuesta.apellido_materno;
      this.fecha_nacimiento = respuesta.fecha_nacimiento;
      this.password = respuesta.password;
      this.role = respuesta.id;
      this.id = id;
    });
  }

  public enviar() {
    const objEnviar = {
      'codigo': this.miFormulario.value.codigo,
      'nombre': this.miFormulario.value.nombre,
      'apellidoPaterno': this.miFormulario.value.apellido_paterno,
      'apellidoMaterno': this.miFormulario.value.apellido_materno,
      'fechaNacimiento': this.miFormulario.value.fecha_nacimiento,
      'password': this.miFormulario.value.password,
      'id_rol': this.miFormulario.value.rol
    };
    
    if (this.mostrarBoton == true) {
      this.usuariosService.insertarUsuario(objEnviar).subscribe(respuesta => {
        $("#myModal").modal("hide");
        this.usuariosService.getlista().subscribe(respuesta2 => {
          this.usuarios = respuesta2;
        });
        swal("Éxito", "Registro insertado!", {
          icon: "success",
        });
      });
    } else {
      this.usuariosService.actualizarUsuario(objEnviar, this.id).subscribe(respuesta => {
        $("#myModal").modal("hide");
        this.usuariosService.getlista().subscribe(respuesta2 => {
          this.usuarios = respuesta2;
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
         
          this.usuariosService.eliminarUsuario(id).subscribe(respuesta =>{
            this.usuariosService.getlista().subscribe(respuesta2 => {
              this.usuarios = respuesta2;
            });
            swal('Registro eliminado!', {
              icon: "success",
            });
          });
        }
      });
  }
}
