import { Component, VERSION } from '@angular/core';
//
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
//
export class AppComponent {
  //
  title             : string = '[SPAE]';
  appName           : string = "[SPAE CONSULTA LOG]"
  appVersion        : string = '1.0.0.4';
  runtimeVersion    : string = VERSION.full;
 }   
