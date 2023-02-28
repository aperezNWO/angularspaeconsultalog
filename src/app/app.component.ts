import { Component, VERSION           } from '@angular/core';
import { LogInfoViewComponent         } from './loginfoview/loginfoview.component';
import { ConsultaDineroViewComponent  } from './consulta-dinero-view/consulta-dinero-view.component';

//
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
//
export class AppComponent {
  //
  appName           : string = "[SPAE CONSULTAS]"
  appVersion        : string = '1.0.0.23';
  runtimeVersion    : string = VERSION.full;
  //
  readonly LogInfoViewComponent_pageTitle        : string = LogInfoViewComponent.pageTitle();
  readonly ConsultaDineroViewComponent_pageTitle : string = ConsultaDineroViewComponent.pageTitle();
  //
  constructor() {
    //
    console.log('AppComponent');
  }
 }   
