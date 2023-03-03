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
  //------------------------------------------------------------------------
  // FIELDS - COMMON
  //------------------------------------------------------------------------
  readonly _pageTitle  : string = "[CONSULTA - LOG DE APLICATIVO] (PRUEBAS)";
  //
  static pageTitle()   : string {
    return "[CONSULTA - LOG DE APLICATIVO] (PRUEBAS)";
  }
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

  //-------------------------------------------------------------------------------------
  // FIELDS - TEMPLATE DRIVEN FORM
  //-------------------------------------------------------------------------------------
  //
  td_textStatus           : string = "";
  //
  td_formSubmit           : boolean        = false;
  //
  td_buttonCaption        : string         = "[Buscar]";
  //
  @ViewChild("td_paginator" ,{read:MatPaginator}) td_paginator!:  MatPaginator;
  //
  td_model                  = new searchCriteria( "0"
    ,"0"
    ,"999"
    ,"2022-09-01"
    ,"2022-09-30"
    ,""
    ,"");
  //
  td_dataSource                         = new MatTableDataSource<LogEntry_>();
  //
  //-------------------------------------------------------------------------------------
  // FIELDS  - REACTIVE FORM 
  //-------------------------------------------------------------------------------------
  //
  rf_textStatus           : string          = "";
  //
  rf_formSubmit           : boolean         = false;
  //
  rf_buttonCaption        : string         = "[Buscar]";
  //
  @ViewChild('rf_paginator',{read: MatPaginator}) rf_paginator!: MatPaginator;
  //
  rf_dataSource                                                 = new MatTableDataSource<LogEntry_>();
  //
  rf_searchForm   = this.formBuilder.group({
    _P_ID_TIPO_LOG      : ["0"           , Validators.required], 
    _P_DATA_SOURCE_ID   : ["0"           , Validators.required],
    _P_ROW_NUM          : ["999"         , Validators.required],
    _P_FECHA_INICIO     : ["2022-09-01"  , Validators.required],
    _P_FECHA_FIN        : ["2022-09-30"  , Validators.required],
  });
  //
  //-------------------------------------------------------------------------------------
  // EVENT HANDLERS
  //-------------------------------------------------------------------------------------
  constructor(private logInfoService : LogInfoService,private formBuilder: FormBuilder) {
      //
  }
  //
  ngOnInit(): void {
      //
      this.td_newSearch();
      //
      this.rf_newSearch();
  }
  //
  ngAfterViewInit() {
    //
  }
  //-------------------------------------------------------------------------------------
  // METHODS - COMMON
  //-------------------------------------------------------------------------------------
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
  //-------------------------------------------------------------------------------------
  // METHODS- TEMPLATE DRIVEN FORM
  //-------------------------------------------------------------------------------------
  //
  td_valid_form() : boolean {
    return (     
           (   this.td_model.P_DATA_SOURCE_ID != "0") 
        && (   this.td_model.P_ID_TIPO_LOG    != "0")  
        && ( ( this.td_model.P_ROW_NUM        != "" ) && (this.td_model.P_ROW_NUM       !=  null) && (this.td_model.P_ROW_NUM      != "0") ) 
        && ( ( this.td_model.P_FECHA_INICIO   != "" ) && (this.td_model.P_FECHA_INICIO  !=  null) ) 
        && ( ( this.td_model.P_FECHA_FIN      != "" ) && (this.td_model.P_FECHA_FIN     !=  null) ) 
    );  
  }
  //
  td_onSubmit() 
  { 
      //
      console.warn("TEMPLATE DRIVEN - (SUBMIT)");
      //
      console.warn("TEMPLATE DRIVEN - FORM VALID : " + this.td_valid_form());
      //
      this.td_formSubmit    = true;
      //
      if (this.td_valid_form())
          this.td_update(this.td_model);
  }
  //
  td_update(td_searchCriteria : searchCriteria):void {
    //
    this.td_buttonCaption = "[Favor espere...]";
    //
    this.td_textStatus    = "";
    //
    td_searchCriteria.P_FECHA_INICIO_STR = this.GetFormattedDate(td_searchCriteria.P_FECHA_INICIO,0);
    td_searchCriteria.P_FECHA_FIN_STR    = this.GetFormattedDate(td_searchCriteria.P_FECHA_FIN   ,0); 
    //
    console.log("(FROM PARAM) : P_DATA_SOURCE_ID                     : " + td_searchCriteria.P_DATA_SOURCE_ID);
    console.log("(FROM PARAM) : P_ROW_NUM                            : " + td_searchCriteria.P_ROW_NUM);  
    console.log("(FROM PARAM) : P_FECHA_INICIO (origen)              : " + td_searchCriteria.P_FECHA_INICIO);
    console.log("(FROM PARAM) : P_FECHA_FIN    (origen)              : " + td_searchCriteria.P_FECHA_FIN);  
    console.log("(FROM PARAM) : P_FECHA_INICIO (valid : 01/09/2022)  : " + td_searchCriteria.P_FECHA_INICIO_STR);
    console.log("(FROM PARAM) : P_FECHA_FIN    (valid : 30/09/2022)  : " + td_searchCriteria.P_FECHA_FIN_STR);
    console.log("(SEARCH INIT)");
    // 
    let td_informeLogRemoto!                 : Observable<LogEntry_[]>;
    td_informeLogRemoto                      = this.logInfoService.getLogRemoto_DEV(td_searchCriteria);
    //this._informeLogRemoto                 = this.logInfoService.getLogRemoto_DEPLOY_SPAE(_searchCriteria);
    //
    const td_observer = {
      next: (td_logEntry: LogEntry_[])     => { 
        //
        console.log('TEMPLATE DRIVEN - RETURN VALUES (Record Count): ' + td_logEntry.length);
        //
        this.td_dataSource           = new MatTableDataSource<LogEntry_>(td_logEntry);
        this.td_dataSource.paginator = this.td_paginator;
        //
        this.td_textStatus           = "Se encontraron [" + td_logEntry.length + "] registros ";
        this.td_formSubmit           = false;
      },
      error           : (err: Error)      => {
        //
        console.error('TEMPLATE DRIVEN - (ERROR) : ' + JSON.stringify(err.message));
        //
        this.td_textStatus           = "Ha ocurrido un error. Favor intente de nuevo";
        this.td_formSubmit           = false;
        this.td_buttonCaption        = "[Buscar]";
        //
      },
      complete        : ()                => {
        //
        console.log('TEMPLATE DRIVEN -  (SEARCH END)');
        //
        this.td_formSubmit           = false;
        this.td_buttonCaption        = "[Buscar]";
      },
    };
    //
    td_informeLogRemoto.subscribe(td_observer);
  }
  //
  td_newSearch() {
      //
      console.warn("TEMPLATE DRIVEN - (NEW SEARCH)");
      //
      this.td_textStatus           = "";
      //
      this.td_formSubmit           = false;
      //
      this.td_dataSource           = new MatTableDataSource<LogEntry_>();
      this.td_dataSource.paginator = this.td_paginator;
      this.td_model                = new searchCriteria( "0"
                                                    , "0"
                                                    , "999"
                                                    , "2022-09-01"
                                                    , "2022-09-30"
                                                    , "","");
      //
      console.log("(DEFAULT VALUES - INIT)");
      console.log("P_DATA_SOURCE_ID  : " + this.td_model.P_DATA_SOURCE_ID);
      console.log("P_ID_TIPO_LOG     : " + this.td_model.P_ID_TIPO_LOG);
      console.log("P_ROW_NUM         : " + this.td_model.P_ROW_NUM);
      console.log("P_FECHA_INICIO    : " + this.td_model.P_FECHA_INICIO);      
      console.log("P_FECHA_FIN       : " + this.td_model.P_FECHA_FIN); 
      console.log("(DEFAULT VALUES - END)");
  }
  //-------------------------------------------------------------------------------------
  // METHODS - REACTIVE FORM
  //-------------------------------------------------------------------------------------
  //
  rf_valid_form() : boolean {
    return (     
           (   this.rf_searchForm.value["_P_DATA_SOURCE_ID"]?.toString() != "0") 
        && (   this.rf_searchForm.value["_P_ID_TIPO_LOG"]?.toString()    != "0")  
        && ( ( this.rf_searchForm.value["_P_ROW_NUM"]?.toString()        != "" ) && (this.rf_searchForm.value["_P_ROW_NUM"]       !=  null) && (this.rf_searchForm.value["_P_ROW_NUM"]?.toString() != "0") ) 
        && ( ( this.rf_searchForm.value["_P_FECHA_INICIO"]?.toString()   != "" ) && (this.rf_searchForm.value["_P_FECHA_INICIO"]  !=  null) ) 
        && ( ( this.rf_searchForm.value["_P_FECHA_FIN"]?.toString()      != "" ) && (this.rf_searchForm.value["_P_FECHA_FIN"]     !=  null) ) 
    );  
  }
  //
  rf_onSubmit() 
  { 
        //
        console.warn("REACTIVE FORM (SUBMIT)");
        //
        let _P_DATA_SOURCE_ID  : string = this.rf_searchForm.value["_P_DATA_SOURCE_ID"] || "";
        let _P_ID_TIPO_LOG     : string = this.rf_searchForm.value["_P_ID_TIPO_LOG"]    || "";
        let _P_ROW_NUM         : string = this.rf_searchForm.value["_P_ROW_NUM"]        || "";
        let _P_FECHA_INICIO    : string = this.rf_searchForm.value["_P_FECHA_INICIO"]   || "";      
        let _P_FECHA_FIN       : string = this.rf_searchForm.value["_P_FECHA_FIN"]      || "";
  
        //
        let rf_model  = new searchCriteria( 
                                _P_DATA_SOURCE_ID
                              , _P_ID_TIPO_LOG
                              , _P_ROW_NUM
                              , _P_FECHA_INICIO
                              , _P_FECHA_FIN
                              , "","");
        //
        this.rf_formSubmit    = true;
        //
        console.warn("REACTIVE FORM - (VALID) : " + this.rf_valid_form());
        //
        if (this.rf_valid_form() == true)
            this.rf_update(rf_model);
  }
  //
  rf_update(_searchCriteria : searchCriteria):void {
    //
    this.rf_buttonCaption = "[Favor espere...]";
    //
    this.rf_textStatus    = "";
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
    let rf_informeLogRemoto!                   : Observable<LogEntry_[]>;
    rf_informeLogRemoto                        = this.logInfoService.getLogRemoto_DEV(_searchCriteria);
    //this.informeLogRemoto = this.logInfoService.getLogRemoto_DEPLOY_SPAE(_searchCriteria);
    //
    const rf_observer = {
      next: (rf_logEntry: LogEntry_[])     => { 
        //
        console.log('RETURN VALUES (Record Count): ' + rf_logEntry.length);
        //
        this.rf_dataSource           = new MatTableDataSource<LogEntry_>(rf_logEntry);
        this.rf_dataSource.paginator = this.rf_paginator;
        //
        this.rf_textStatus = "Se encontraron [" + rf_logEntry.length + "] registros ";
      },
      error           : (err: Error)      => {
          //
          console.error('ERROR : ' + JSON.stringify(err.message));
          //
          this.rf_textStatus           = "Ha ocurrido un error";
          //
          this.rf_formSubmit           = false;
          //
          this.rf_buttonCaption        = "[Buscar]";
      },
      complete        : ()                => {
          //
          console.log('(SEARCH END)')
          //
          this.rf_formSubmit           = false;
          //
          this.rf_buttonCaption        = "[Buscar]";
      },
    };
    //
    rf_informeLogRemoto.subscribe(rf_observer);
  }
  //
  rf_newSearch()
  {
    //
    console.warn("REACTIVE FORM - (NEW SEARCH)");
    //
    this.rf_textStatus           = "";
    //
    this.rf_formSubmit           = false;
    //
    this.rf_dataSource           = new MatTableDataSource<LogEntry_>();
    this.rf_dataSource.paginator = this.rf_paginator;
    //
    this.rf_searchForm   = this.formBuilder.group({
      _P_ID_TIPO_LOG      : ["0"           , Validators.required], 
      _P_DATA_SOURCE_ID   : ["0"           , Validators.required],
      _P_ROW_NUM          : ["999"         , Validators.required],
      _P_FECHA_INICIO     : ["2022-09-01"  , Validators.required],
      _P_FECHA_FIN        : ["2022-09-30"  , Validators.required],
    });
    //
    console.log("(DEFAULT VALUES - INIT)");
    console.log("P_DATA_SOURCE_ID  : " + (this.rf_searchForm.value["_P_DATA_SOURCE_ID"] || ""));
    console.log("P_ID_TIPO_LOG     : " + (this.rf_searchForm.value["_P_ID_TIPO_LOG"]    || ""));
    console.log("P_ROW_NUM         : " + (this.rf_searchForm.value["_P_ROW_NUM"]        || ""));
    console.log("P_FECHA_INICIO    : " + (this.rf_searchForm.value["_P_FECHA_INICIO"]   || ""));      
    console.log("P_FECHA_FIN       : " + (this.rf_searchForm.value["_P_FECHA_FIN"]      || "")); 
    console.log("(DEFAULT VALUES - END)");
    //
  }
}
