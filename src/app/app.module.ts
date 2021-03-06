import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule} from '@angular/forms'; 
import { HttpModule } from '@angular/http';
import {  RouterModule, Routes } from '@angular/router';


import { LoginService } from './servicios/login.service';
import { RutasApiService } from './servicios/rutas-api.service';
import { RolesService } from './servicios/catalogos/roles.service';
import { UsuariosService } from './servicios/catalogos/usuarios.service';
import { EditorialService } from './servicios/catalogos/editorial.service';
import { GeneroService } from './servicios/catalogos/genero.service';
import { LibrosService } from './servicios/catalogos/libros.service';
import { ApartadosService } from './servicios/operaciones/apartados.service';
import { PedidosService } from './servicios/operaciones/pedidos.service';
import { HistorialService } from './servicios/operaciones/historial.service';
import { AutentificandoService } from './servicios/autentificando.service';

import { AppComponent } from './app.component';
import { MenuInicioComponent } from './principal/menu/menu-inicio/menu-inicio.component';
import { LoginComponent } from './principal/login/login.component';
import { HomeComponent } from './principal/home/home/home.component';
import { RolesComponent } from './principal/catalogos/roles/roles/roles.component';
import { UsuariosComponent } from './principal/catalogos/usuarios/usuarios/usuarios.component';
import { EditorialComponent } from './principal/catalogos/editorial/editorial.component';
import { GenerosComponent } from './principal/catalogos/generos/generos.component';
import { LibrosComponent } from './principal/catalogos/libros/libros.component';
import { ApartadosComponent } from './principal/operaciones/apartados/apartados.component';
import { PedidosComponent } from './principal/operaciones/pedidos/pedidos.component';
import { HistorialComponent } from './principal/operaciones/historial/historial.component';

const rutas: Routes = [
  {path: 'inicio', component : HomeComponent},
  {path: 'roles', component : RolesComponent},
  {path: 'usuarios', component : UsuariosComponent},
  {path: 'editorial', component : EditorialComponent},
  {path: 'generos', component : GenerosComponent},
  {path: 'libros', component : LibrosComponent},
  {path: 'apartados',component:ApartadosComponent},
  {path: 'pedidos',component:PedidosComponent},
  {path: 'historico',component:HistorialComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    MenuInicioComponent,
    LoginComponent,
    HomeComponent,
    RolesComponent,
    UsuariosComponent,
    EditorialComponent,
    GenerosComponent,
    LibrosComponent,
    ApartadosComponent,
    PedidosComponent,
    HistorialComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(rutas)
  ],
  providers: [LoginService, RutasApiService, RolesService, UsuariosService,
              EditorialService, GeneroService, LibrosService,ApartadosService,PedidosService,HistorialService,
              AutentificandoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
