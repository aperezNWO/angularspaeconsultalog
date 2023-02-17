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
  appName           : string = "[SPAE CONSULTAS]"
  appVersion        : string = '1.0.0.10';
  runtimeVersion    : string = VERSION.full;
 }   
