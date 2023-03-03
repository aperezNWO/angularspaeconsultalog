import { Component } from '@angular/core';
//
@Component({
  selector: 'app-consultahistoricodinero',
  templateUrl: './consultahistoricodinero.component.html',
  styleUrls: ['./consultahistoricodinero.component.scss']
})
//
export class ConsultahistoricodineroComponent {
  //
  readonly _pageTitle          : string = "[CONSULTA - HISTORICO DE DINERO]";
  //
  static pageTitle()           : string {
    return "[CONSULTA - HISTORICO DE DINERO]";
  }
}
