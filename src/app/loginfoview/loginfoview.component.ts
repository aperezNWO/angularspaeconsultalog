import { AfterViewInit, Component, OnInit, ViewChild  } from '@angular/core';
import { MatTableDataSource                 } from '@angular/material/table';
import { MatPaginator                       } from '@angular/material/paginator';
import { Form, NgModel, NgModelGroup                               } from '@angular/forms';
import { Observable                         } from 'rxjs';
import { LogEntry_, searchCriteria                          } from '../loginfo.model';
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
  title                              : string = '[CONSULTA LOG]';
  //
  informeLogRemoto!                  : Observable<LogEntry_[]>;
  //
  dataSource                         = new MatTableDataSource<LogEntry_>();
  // 
  displayedColumns                   : string[]                        = ['ID_LOG','DATE_TIME','TEXT_1_WEB','TEXT_2_WEB'];
  //
  P_DATA_SOURCES                     : p_DataSource[]                  = [{ M_DATA_SOURCE_ID : "0"  , M_DATA_SOURCE_NAME : "(SELECCIONE OPCION...)"},
                                                                          { M_DATA_SOURCE_ID : "1"  , M_DATA_SOURCE_NAME : "RUV_PRODUCCION"},
                                                                          { M_DATA_SOURCE_ID : "2"  , M_DATA_SOURCE_NAME : "RUV_PRUEBAS"   }];
  //
  submitted                          : boolean = false;
  //
  model                              = new searchCriteria("0","999",new Date("01/09/2022"),new Date("30/09/2022"),"","");
  //
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //
  constructor(private logInfoService : LogInfoService) {
      //
      this.newSearch();
  }
  //
  ngOnInit(): void {
      //
  }
  //
  ngAfterViewInit() {
    //
  }
  //
  update(_searchCriteria : searchCriteria):void {
    //
    _searchCriteria.P_FECHA_INICIO_STR = this.GetFormattedDate(_searchCriteria.P_FECHA_INICIO,0);
    _searchCriteria.P_FECHA_FIN_STR    = this.GetFormattedDate(_searchCriteria.P_FECHA_FIN,0); 
    //
    console.log("(FROM PARAM) : P_DATA_SOURCE_ID                     : " + _searchCriteria.P_DATA_SOURCE_ID);
    console.log("(FROM PARAM) : P_ROW_NUM                            : " + _searchCriteria.P_ROW_NUM);  
    console.log("(FROM PARAM) : P_FECHA_INICIO (origen)              : " + _searchCriteria.P_FECHA_INICIO);
    console.log("(FROM PARAM) : P_FECHA_FIN    (origen)              : " + _searchCriteria.P_FECHA_FIN);  
    console.log("(FROM PARAM) : P_FECHA_INICIO (valid : 01/09/2022)  : " + _searchCriteria.P_FECHA_INICIO_STR);
    console.log("(FROM PARAM) : P_FECHA_FIN    (valid : 30/09/2022)  : " + _searchCriteria.P_FECHA_FIN_STR);
    console.log("(SEARCH INIT)");
    // 
    this.informeLogRemoto = this.logInfoService.getLogRemoto_DEV(_searchCriteria);
    //this.informeLogRemoto = this.logInfoService.getLogRemoto_DEPLOY_SPAE(_searchCriteria);
    //
    const myObserver = {
      next: (p_logEntry: LogEntry_[])     => { 
        //
        console.log('RETURN VALUES (Record Count): ' + p_logEntry.length);
        //
        this.dataSource           = new MatTableDataSource<LogEntry_>(p_logEntry);
        this.dataSource.paginator = this.paginator;
      },
      error           : (err: Error)      => console.error('ERROR : ' + JSON.stringify(err.message)),
      complete        : ()                => console.log('(SEARCH END)'),
    };
    //
    this.informeLogRemoto.subscribe(myObserver);
  }
  //
  onSubmit() 
  { 
      //
      this.submitted = true; 
      //
      console.log("FORM SUBMIT : " + this.submitted);
      //
      if (this.model.P_DATA_SOURCE_ID != "0")
          this.update(this.model);
  }
  //
  newSearch() {
      //
      this.dataSource           = new MatTableDataSource<LogEntry_>();
      this.dataSource.paginator = this.paginator;
      this.model                = new searchCriteria("2"
                                                    ,"99"
                                                    , new Date()
                                                    , new Date()
                                                    ,"","");
  }
  //
  GetFormattedDate(p_date : Date, order : number) {
    //
    var today = '';
    switch (order) {
        case 0:  // FECHA COMPLATIBLE CON ORACLE
            var p_dates = p_date.toString().split('-'); // P_DATE   = 2022-04-09
            var day     = p_dates[2];
            var month   = p_dates[1];
            var year    = p_dates[0];
            today       = day + "/" + month + "/" + year;
            //
            break;
        case 1:  // FECHA COMPATIBLE  CON UIX
            //
            var _day      :number  = p_date.getDate();
            var _month    :number  = p_date.getMonth() + 1;
            var _yearStr  :string  = p_date.getFullYear().toString();
            var _monthStr :string  = "";
            var _dayStr   :string  = "";
            //
            if (_month < 10) _monthStr = "0"   + _month.toString();
            if (_day < 10)   _dayStr   = "0"   + _day.toString();
            //
            today                 = _yearStr  + "-" + _monthStr + "-" + _dayStr;
            //
            break;
    }
    //
    return today;
}  
}
