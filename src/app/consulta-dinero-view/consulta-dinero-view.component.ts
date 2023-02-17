import { Component } from '@angular/core';

@Component({
  selector: 'app-consulta-dinero-view',
  templateUrl: './consulta-dinero-view.component.html',
  styleUrls: ['./consulta-dinero-view.component.scss']
})
export class ConsultaDineroViewComponent {
  //
  readonly _pageTitle  : string = "[CONSULTA - SOLICITUDES DE DINERO (HISTORICO)]";
  //
  static pageTitle(): string {
    return "[CONSULTA - SOLICITUDES DE DINERO (HISTORICO)]";
  }
  //  
  constructor() {
      //
  }
}
