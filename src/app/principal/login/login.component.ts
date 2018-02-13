import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formularioLogin: FormGroup;
  public enviarLogin: any;
  public errorLogeo: String = "";

  erroresForm = {
    'codigo': '',
    'password': ''
  }

  mensajesValidacion = {
    'codigo': {
      'required': 'Código obligatorio'
    },
    'password': {
      'required': 'Contraseña obligatoria'
    }
  }

  constructor(private formBuilder: FormBuilder, private loginService: LoginService) { }

  ngOnInit() {
    this.formularioLogin = this.formBuilder.group({
      codigo: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.formularioLogin.valueChanges.subscribe(error => this.onValueChanged(error));
  }

  public enviar(): void {
    this.enviarLogin = this.getLogin();
    this.errorLogeo = "";
    this.loginService.getLogin(this.enviarLogin).subscribe(respuesta => {
      if (respuesta.acceso == false) {
        localStorage["acceso"] = false;
        this.errorLogeo = respuesta.respuesta;
      } else {
        localStorage["acceso"] = true;
        this.errorLogeo = "";
        this.loginService.setUsuario(respuesta);
        document.location.href = "/inicio";
      }
    });

  }

  public getLogin(): any {
    const auxLogin = {
      codigo: this.formularioLogin.value.codigo,
      password: this.formularioLogin.value.password
    }
    return auxLogin;
  }

  onValueChanged(data?: any) {
    if (!this.formularioLogin) { return; }
    const form = this.formularioLogin;
    for (const field in this.erroresForm) {
      const control = form.get(field);
      this.erroresForm[field] = "";
      if (control && control.dirty && !control.valid) {
        const messages = this.mensajesValidacion[field];
        for (const key in control.errors) {
          this.erroresForm[field] = messages[key] + ' ';
        }
      }
    }
  }

}
