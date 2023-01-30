import { AfterViewInit, Component, OnInit, ViewChild  } from '@angular/core';
import { MatTableDataSource                 } from '@angular/material/table';
import { MatPaginator                       } from '@angular/material/paginator';
import { Form, NgModel, NgModelGroup                               } from '@angular/forms';
import { Observable                         } from 'rxjs';
import { LogEntry_                          } from '../loginfo.model';
import { p_DataSource                       } from '../loginfo.model';
import { LogInfoService                     } from '../loginfo.service';
//
@Component({
  selector     : 'loginfoview-app',
  templateUrl  : './loginfoview.component.html',
  styleUrls    : ['./loginfoview.component.scss']
})
//
export class LogInfoViewComponent implements OnInit, AfterViewInit {
  //
  title                              : string = '[SPAE CONSULTA LOG]';
  //
  informeLogRemoto!                  : Observable<LogEntry_[]>;
  //
  dataSource                         = new MatTableDataSource<LogEntry_>();
  // 
  displayedColumns                   : string[]                        = ['ID_LOG','DATE_TIME','TEXT_1_WEB','TEXT_2_WEB'];
  //
  P_DATA_SOURCES                     : p_DataSource[]                  = [{ M_DATA_SOURCE_ID:"1", M_DATA_SOURCE_NAME : "RUV_PRODUCCION"}, { M_DATA_SOURCE_ID : '2' , M_DATA_SOURCE_NAME : "RUV_PRUEBAS" }];
  //
  submitted                          : boolean = false;
  //
  model                              = new p_DataSource("0","(SELECCIONE OPCIÓN...)");
  //
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //
  constructor(private logInfoService: LogInfoService) {
      //
      let p_id_data_source           : number  = 1;
      //
      this.update(p_id_data_source);
  }
  //
  ngOnInit(): void {
      //
  }
  //|
  ngAfterViewInit() {
    //
  }
  //
  update(p_id_data_source : number):void {
    //
    console.log("ID DATA SOURCE (FROM PARAM) : " + p_id_data_source);
    //
    console.log("ID DATA SOURCE (FROM MODEL) : " + this.model.M_DATA_SOURCE_ID);
    // DEPLOY SPAE
    // this.informeLogRemoto = this.logInfoService.getLogRemoto__();
    // DEPLOY LOCAL
    // this.informeLogRemoto = this.logInfoService.getLogRemoto_();
    // ENTORNO LOCAL A DATOS REMOTOS (DEPLOY LOCAL)
    this.informeLogRemoto = this.logInfoService.getLogRemoto_();
    //
    const myObserver = {
      next: (p_logEntry: LogEntry_[])     => { 
        //
        console.log('Observer got a next value: ' + JSON.stringify(p_logEntry));
        //
        this.dataSource           = new MatTableDataSource<LogEntry_>(p_logEntry);
        this.dataSource.paginator = this.paginator;
      },
      error           : (err: Error)      => console.error('Observer got an error: ' + JSON.stringify(err)),
      complete        : () => console.log('Observer got a complete notification'),
    };
    //
    this.informeLogRemoto.subscribe(myObserver);
  }
  //
  onSubmit() 
  { 
      //
      this.submitted = true; 
  }
  //
  newSearch() {
      //
      this.dataSource  = new MatTableDataSource<LogEntry_>();
      this.model       = new p_DataSource("0","(SELECCIONE OPCIÓN...)");
  }
}
