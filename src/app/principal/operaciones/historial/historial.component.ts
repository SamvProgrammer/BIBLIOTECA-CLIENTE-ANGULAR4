import { Component, OnInit } from '@angular/core';
import { HistorialService } from '../../../servicios/operaciones/historial.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  private historicos:any;

  constructor(private historialService:HistorialService) { }

  ngOnInit() {
    this.historialService.getlista().subscribe(respuesta =>{
      this.historicos = respuesta;
    });
  }

}
