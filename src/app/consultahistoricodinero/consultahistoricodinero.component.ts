import { Component }      from '@angular/core';
import { FormBuilder }    from '@angular/forms';
import { LogInfoService } from '../loginfo.service';
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
    //
    return "[CONSULTA - HISTORICO DE DINERO]";
  }
  //
  constructor(private logInfoService : LogInfoService, private formBuilder: FormBuilder) {
    //
  }
}
