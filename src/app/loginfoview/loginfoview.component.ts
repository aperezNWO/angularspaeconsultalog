import { AfterViewInit, Component, OnInit, ViewChild  } from '@angular/core';
import { FormBuilder, Validators                      } from '@angular/forms';
import { MatTableDataSource                 } from '@angular/material/table';
import { MatPaginator                       } from '@angular/material/paginator';
import { Observable                         } from 'rxjs';
import { LogEntry_, p_TipoLog               } from '../loginfo.model';
import { p_DataSource, searchCriteria       } from '../loginfo.model';
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
  pageTitle                          : string = "[SPAE CONSULTA - LOG DE APLICATIVO]";
  //
  informeLogRemoto!                  : Observable<LogEntry_[]>;
  _informeLogRemoto!                 : Observable<LogEntry_[]>;
  //
  dataSource                         = new MatTableDataSource<LogEntry_>();
  _dataSource                        = new MatTableDataSource<LogEntry_>();
  // 
  displayedColumns                   : string[]                        = ['ID_LOG','DATE_TIME','TEXT_1_WEB','TEXT_2_WEB'];
  //
  P_DATA_SOURCES                     : p_DataSource[]                  = [{ M_DATA_SOURCE_ID : "0"  , M_DATA_SOURCE_NAME : "(SELECCIONE OPCION...)"},
                                                                          { M_DATA_SOURCE_ID : "1"  , M_DATA_SOURCE_NAME : "RUV_PRODUCCION"},
                                                                          { M_DATA_SOURCE_ID : "2"  , M_DATA_SOURCE_NAME : "RUV_PRUEBAS"   }];
  //
  P_ID_TIPO_LOGS                     : p_TipoLog[]                     = [{ M_TIPO_LOG_ID : "0"  , M_TIPO_LOG_NAME : "(SELECCIONE OPCION...)"},
                                                                          { M_TIPO_LOG_ID : "1"  , M_TIPO_LOG_NAME : "Envio de Emails - Enviados"  },
                                                                          { M_TIPO_LOG_ID : "2"  , M_TIPO_LOG_NAME : "Envio de Emails - Errores"   },
                                                                          { M_TIPO_LOG_ID : "3"  , M_TIPO_LOG_NAME : "General         - Errores"   }];

  //
  model                              = new searchCriteria( "0"
                                                          ,"0"
                                                          ,"999"
                                                          ,"2022-09-01"
                                                          ,"2022-09-30"
                                                          ,""
                                                          ,"");
  //
  @ViewChild("paginator" ,{read:MatPaginator}) paginator!:  MatPaginator;
  
  //
  @ViewChild('_paginator',{read: MatPaginator}) _paginator!: MatPaginator;
  
  //
  _searchForm   = this.formBuilder.group({
    _P_ID_TIPO_LOG      : ["0"           , Validators.required], 
    _P_DATA_SOURCE_ID   : ["0"           , Validators.required],
    _P_ROW_NUM          : ["999"         , Validators.required],
    _P_FECHA_INICIO     : ["2022-09-01"  , Validators.required],
    _P_FECHA_FIN        : ["2022-09-30"  , Validators.required],
  });
  //
  constructor(private logInfoService : LogInfoService,private formBuilder: FormBuilder) {
      //
  }
  //
  ngOnInit(): void {
      //
      this.newSearch();
  }
  //
  ngAfterViewInit() {
    //
  }
  //
  update(_searchCriteria : searchCriteria):void {
    //
    _searchCriteria.P_FECHA_INICIO_STR = this.GetFormattedDate(_searchCriteria.P_FECHA_INICIO,0);
    _searchCriteria.P_FECHA_FIN_STR    = this.GetFormattedDate(_searchCriteria.P_FECHA_FIN   ,0); 
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
  _update(_searchCriteria : searchCriteria):void {
      //
      _searchCriteria.P_FECHA_INICIO_STR = this.GetFormattedDate(_searchCriteria.P_FECHA_INICIO,0);
      _searchCriteria.P_FECHA_FIN_STR    = this.GetFormattedDate(_searchCriteria.P_FECHA_FIN   ,0); 
      //
      console.log("(FROM PARAM) : P_DATA_SOURCE_ID                     : " + _searchCriteria.P_DATA_SOURCE_ID);
      console.log("(FROM PARAM) : P_ROW_NUM                            : " + _searchCriteria.P_ROW_NUM);  
      console.log("(FROM PARAM) : P_FECHA_INICIO (origen)              : " + _searchCriteria.P_FECHA_INICIO);
      console.log("(FROM PARAM) : P_FECHA_FIN    (origen)              : " + _searchCriteria.P_FECHA_FIN);  
      console.log("(FROM PARAM) : P_FECHA_INICIO (valid : 01/09/2022)  : " + _searchCriteria.P_FECHA_INICIO_STR);
      console.log("(FROM PARAM) : P_FECHA_FIN    (valid : 30/09/2022)  : " + _searchCriteria.P_FECHA_FIN_STR);
      console.log("(SEARCH INIT)");
      // 
      this._informeLogRemoto = this.logInfoService.getLogRemoto_DEV(_searchCriteria);
      //this._informeLogRemoto = this.logInfoService.getLogRemoto_DEPLOY_SPAE(_searchCriteria);
      //
      const _myObserver = {
        next: (p_logEntry: LogEntry_[])     => { 
          //
          console.log('RETURN VALUES (Record Count): ' + p_logEntry.length);
          //
          this._dataSource           = new MatTableDataSource<LogEntry_>(p_logEntry);
          this._dataSource.paginator = this._paginator;
        },
        error           : (err: Error)      => console.error('ERROR : ' + JSON.stringify(err.message)),
        complete        : ()                => console.log('(SEARCH END)'),
      };
      //
      this._informeLogRemoto.subscribe(_myObserver);
  }
  //
  onSubmit() 
  { 
      //
      console.warn("(SUBMIT 1)");
      //
      if (this.model.P_DATA_SOURCE_ID != "0")
          this.update(this.model);
  }
  //
  newSearch() {
      //
      console.warn("(NEW SEARCH 1)");
      //
      this.dataSource           = new MatTableDataSource<LogEntry_>();
      this.dataSource.paginator = this.paginator;
      this.model                = new searchCriteria( "0"
                                                    , "0"
                                                    , "999"
                                                    , "2022-09-01"
                                                    , "2022-09-30"
                                                    , "","");
      //
      console.log("(DEFAULT VALUES - INIT)");
      console.log("P_DATA_SOURCE_ID  : " + this.model.P_DATA_SOURCE_ID);
      console.log("P_ID_TIPO_LOG     : " + this.model.P_ID_TIPO_LOG);
      console.log("P_ROW_NUM         : " + this.model.P_ROW_NUM);
      console.log("P_FECHA_INICIO    : " + this.model.P_FECHA_INICIO);      
      console.log("P_FECHA_FIN       : " + this.model.P_FECHA_FIN); 
      console.log("(DEFAULT VALUES - END)");
  }
  //
  GetFormattedDate(p_date : /*Date*/ string, order : number) {
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
            /*
            var _day      :number  = p_date.getDate();
            var _month    :number  = p_date.getMonth() + 1;
            var _yearStr  :string  = p_date.getFullYear().toString();
            var _monthStr :string  = "";
            var _dayStr   :string  = "";
            //
            if (_month < 10) _monthStr = "0"   + _month.toString();
            if (_day < 10)   _dayStr   = "0"   + _day.toString();
            //
            today                 = _yearStr  + "-" + _monthStr + "-" + _dayStr;*/
            //
            break;
    }
    //
    return today;
  } 
  //
  _newSearch()
  {
    //
    console.warn("(NEW SEARCH 2)");
    //
    this._dataSource           = new MatTableDataSource<LogEntry_>();
    this._dataSource.paginator = this._paginator;
    //
    this._searchForm   = this.formBuilder.group({
      _P_ID_TIPO_LOG      : ["0"           , Validators.required], 
      _P_DATA_SOURCE_ID   : ["0"           , Validators.required],
      _P_ROW_NUM          : ["999"         , Validators.required],
      _P_FECHA_INICIO     : ["2022-09-01"  , Validators.required],
      _P_FECHA_FIN        : ["2022-09-30"  , Validators.required],
    });
    //
    console.log("(DEFAULT VALUES - INIT)");
    console.log("P_DATA_SOURCE_ID  : " + (this._searchForm.value["_P_DATA_SOURCE_ID"] || ""));
    console.log("P_ID_TIPO_LOG     : " + (this._searchForm.value["_P_ID_TIPO_LOG"]    || ""));
    console.log("P_ROW_NUM         : " + (this._searchForm.value["_P_ROW_NUM"]        || ""));
    console.log("P_FECHA_INICIO    : " + (this._searchForm.value["_P_FECHA_INICIO"]   || ""));      
    console.log("P_FECHA_FIN       : " + (this._searchForm.value["_P_FECHA_FIN"]      || "")); 
    console.log("(DEFAULT VALUES - END)");
  }
  //
  _onSubmit() 
  { 
      //
      console.warn("(SUBMIT 2)");
      //
      let _P_DATA_SOURCE_ID  : string = this._searchForm.value["_P_DATA_SOURCE_ID"] || "";
      let _P_ID_TIPO_LOG     : string = this._searchForm.value["_P_ID_TIPO_LOG"]    || "";
      let _P_ROW_NUM         : string = this._searchForm.value["_P_ROW_NUM"]        || "";
      let _P_FECHA_INICIO    : string = this._searchForm.value["_P_FECHA_INICIO"]   || "";      
      let _P_FECHA_FIN       : string = this._searchForm.value["_P_FECHA_FIN"]      || "";

      //
      let _model  = new searchCriteria( 
                              _P_DATA_SOURCE_ID
                            , _P_ID_TIPO_LOG
                            , _P_ROW_NUM
                            , _P_FECHA_INICIO
                            , _P_FECHA_FIN
                            , "","");
      //
      if (_model.P_DATA_SOURCE_ID != "0")
          this._update(_model);
  }
}
