import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../servicios/catalogos/usuarios.service';
import { PedidosService } from '../../../servicios/operaciones/pedidos.service';
import { LibrosService } from '../../../servicios/catalogos/libros.service';
import { LoginService } from '../../../servicios/login.service';
import { ApartadosService } from '../../../servicios/operaciones/apartados.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  public opcion: string;
  public pedidos: any = [];
  public librosArray: any = [];
  public usuariosArray: any = [];
  public codigo: any;
  public fechaFinal: any;
  public miFormulario: FormGroup;
  public txtSolicitante;
  public txtLibro;
  public txtIdLibro;
  public txtIdUsuario;
  public mostrarObservacion: boolean = false;
  public observa: any;

  constructor(private pedidosService: PedidosService,
    private librosService: LibrosService,
    private usuariosService: UsuariosService,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private apartadoService: ApartadosService) { }

  ngOnInit() {
    let usuarios = this.loginService.getUsuario();
    let objeto = {
      "tipo": "0",
      "codigo": "0",
      "idUsuario": usuarios["codigo"]
    }
    this.pedidosService.getlista(objeto).subscribe(respuesta => {
      this.pedidos = respuesta;
    });
    this.librosService.getlista().subscribe(respuesta => {
      this.librosArray = respuesta;
    });
    this.usuariosService.getlista().subscribe(respuesta => {
      this.usuariosArray = respuesta;
    });
    this.miFormulario = this.formBuilder.group({
      fechaFinal: ['', Validators.required],
      txtLibro: '',
      txtSolicitante: '',
      txtIdLibro: '',
      txtIdUsuario: '',
      observaciones: ''
    });
  }

  public cambia(id) {
    let usuarios = this.loginService.getUsuario();
    let objeto = {
      "tipo": this.opcion,
      "codigo": this.codigo,
      "idUsuario": usuarios["codigo"]
    }
    this.pedidosService.getlista(objeto).subscribe(respuesta => {
      this.pedidos = respuesta;
    });
  }
  public abrirModal(libro, solicitante, codigoLibro, codigoUsuario, mostrar) {
    this.txtLibro = libro;
    this.txtSolicitante = solicitante;
    this.fechaFinal = "";
    this.txtIdUsuario = codigoUsuario;
    this.txtIdLibro = codigoLibro;
    this.mostrarObservacion = mostrar;

  }

  public enviar() {
    if (!this.mostrarObservacion) {
      let objeto = {
        "tipo": "0",
        "codigo": this.txtIdLibro,
        "idUsuario": this.txtIdUsuario,
        "prestado": true,
        "fechaFinal": this.fechaFinal
      }
      this.apartadoService.apartar(objeto).subscribe(respuesta => {
        swal("Éxito", respuesta["respuesta"], {
          icon: "success",
        });
        $("#myModal").modal("hide");
        this.pedidosService.getlista(objeto).subscribe(respuesta => {
          this.pedidos = respuesta;
        });
      });
    } else {
      let objeto = {
        "tipo": "0",
        "codigo": this.txtIdLibro,
        "idUsuario": this.txtIdUsuario,
        "observacion": this.observa
      }
      this.pedidosService.devolverLibro(objeto).subscribe(respuesta => {
        swal("Éxito", respuesta["respuesta"], {
          icon: "success",
        });
        $("#myModal").modal("hide");
        let usuarios = this.loginService.getUsuario();
        let objeto1 = {
          "tipo": "0",
          "codigo": "0",
          "idUsuario": usuarios["codigo"]
        }
        this.pedidosService.getlista(objeto1).subscribe(respuesta => {
          this.pedidos = respuesta;
        });
      });
    }
  }
}
