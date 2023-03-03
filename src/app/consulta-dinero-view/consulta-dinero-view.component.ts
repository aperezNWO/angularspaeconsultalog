import { AfterViewInit, Component, OnInit, ViewChild  } from '@angular/core';
import { FormBuilder, Validators                      } from '@angular/forms';
import { MatTableDataSource                           } from '@angular/material/table';
import { MatPaginator                                 } from '@angular/material/paginator';
import { Observable                                   } from 'rxjs';
import { DineroSearchResultEntity, p_Vigencia         } from '../loginfo.model';
import { p_DataSource, dineroSearchCriteria           } from '../loginfo.model';
import { LogInfoService                               } from '../loginfo.service';
//
@Component({
  selector: 'app-consulta-dinero-view',
  templateUrl: './consulta-dinero-view.component.html',
  styleUrls: ['./consulta-dinero-view.component.scss']
})
//
export class ConsultaDineroViewComponent  implements OnInit, AfterViewInit {
  //
  readonly _pageTitle          : string = "[CONSULTA - HISTORICO DE DINERO] (PRUEBAS)";
  //
  static pageTitle()           : string {
    return "[CONSULTA - HISTORICO DE DINERO] (PRUEBAS)";
  }
  //------------------------------------------------------------------------------------------------
  //  REACTIVE FORM
  //------------------------------------------------------------------------------------------------
  //
  _textStatus                  : string = "";
  //
  _buttonCaption               : string = "[Buscar]";
  //
  _formSubmit                  : boolean = false;
  //
  _informeDineroRemoto!        : Observable<DineroSearchResultEntity[]>;
  _informeDineroRemotoSTR!     : Observable<string>;
  //
  _dataSource                  = new MatTableDataSource<DineroSearchResultEntity>();
  // 
  displayedColumns                   : string[]                = ['ID_SOLICITUD','NOMBRE_COMPLETO','FUD','ESTADO_SOLICITUD','RESPONSABLE_SOLICITUD', 'DANE_DEPARTAMENTO','DANE_MUNICIPIO','OBSERVACION_SOLICITUD'];
  //
  P_DATA_SOURCES                     : p_DataSource[]          = [{ M_DATA_SOURCE_ID : "0"  , M_DATA_SOURCE_NAME : "(SELECCIONE OPCION...)"},
                                                                  { M_DATA_SOURCE_ID : "1"  , M_DATA_SOURCE_NAME : "RUV_PRODUCCION"},
                                                                  { M_DATA_SOURCE_ID : "2"  , M_DATA_SOURCE_NAME : "RUV_PRUEBAS"   }];

  //
  P_VIGENCIAS                       : p_Vigencia[]           = [{ M_VIGENCIA_ID : "0"  , M_VIGENCIA_NAME : "(SELECCIONE OPCION...)"},
    { M_VIGENCIA_ID : "2019"  , M_VIGENCIA_NAME : "2019"   },
    { M_VIGENCIA_ID : "2020"  , M_VIGENCIA_NAME : "2020"   },
    { M_VIGENCIA_ID : "2021"  , M_VIGENCIA_NAME : "2021"   },
    { M_VIGENCIA_ID : "2022"  , M_VIGENCIA_NAME : "2022"   },
    { M_VIGENCIA_ID : "2023"  , M_VIGENCIA_NAME : "2023"   }];
  //                                                                 
  model                              = new dineroSearchCriteria( "0"
                                                                ,"0"
                                                                ,"0");
  //
  @ViewChild('_paginator',{read: MatPaginator}) _paginator!: MatPaginator;
  //
  _searchForm   = this.formBuilder.group({
    _P_DATA_SOURCE_ID     : [""            , Validators.required],
    _P_CEDULA             : [""            , Validators.required], 
    _P_VIGENCIA           : [""            , Validators.required],
  });
  //------------------------------------------------------------------------------------------------
  // TEMPLATE DRIVEN FORM
  //------------------------------------------------------------------------------------------------
  //
  td_textStatus                  : string = "";
  //
  td_buttonCaption               : string = "[Buscar]";
  //
  td_formSubmit                  : boolean = false;
  //
  td_dataSource                         = new MatTableDataSource<DineroSearchResultEntity>();
  //
  td_model                              = new dineroSearchCriteria(   "0"
                                                                     ,"0"
                                                                     ,"0");
  //
  td_informeDineroRemotoSTR!            : Observable<string>;
  // 
  td_displayedColumns                   : string[]                = ['ID_SOLICITUD','NOMBRE_COMPLETO','FUD','ESTADO_SOLICITUD','RESPONSABLE_SOLICITUD', 'DANE_DEPARTAMENTO','DANE_MUNICIPIO','OBSERVACION_SOLICITUD'];
  //
  td_valid_form() : boolean {
      return  (      (   this.td_model.P_ID_DATA_SOURCE != "0") 
                  && ( ( this.td_model.P_IDENTIFICACION != "" ) && (this.td_model.P_IDENTIFICACION !=  null) && (this.td_model.P_IDENTIFICACION != "0") ) 
                  && ( ( this.td_model.P_VIGENCIA       != "0"))    );         
  }
  //
  @ViewChild('td_paginator',{read: MatPaginator}) td_paginator!: MatPaginator;
  //                                                                  
  constructor(private logInfoService : LogInfoService, private formBuilder: FormBuilder) {
    //
  }
  //
  ngOnInit(): void {
      // REACTIVE FORM
      this._newSearch();
      // TEMPLATE DRIVEN FORM
      this.td_newSearch();
  }
  //
  ngAfterViewInit() {
    //
  }
  //-----------------------------------------------------
  // REACTIVE FORM
  //-----------------------------------------------------
  _newSearch() : void {
    //
    this._textStatus    = "";
    //
    this._formSubmit    = false;
    //
    this._buttonCaption = "[Buscar]";
    //
    this.model          = new dineroSearchCriteria(   "0"
                                                     ,"0"
                                                     ,"0");
    //                                            
    this._dataSource           = new MatTableDataSource<DineroSearchResultEntity>();
    this._dataSource.paginator = this._paginator;
    //
    this._searchForm   = this.formBuilder.group({
      _P_DATA_SOURCE_ID     : [""            , Validators.required],
      _P_CEDULA             : [""            , Validators.required], 
      _P_VIGENCIA           : [""            , Validators.required],
    });
  }
  //
  _onSubmit() : void {
      //
      console.warn("(SUBMIT 1)");
      //
      let _P_DATA_SOURCE_ID    : string = this._searchForm.value["_P_DATA_SOURCE_ID"] || "";
      let _P_CEDULA            : string = this._searchForm.value["_P_CEDULA"]         || "";
      let _P_VIGENCIA          : string = this._searchForm.value["_P_VIGENCIA"]       || "";
      //
      console.log("_P_DATA_SOURCE_ID : " + _P_DATA_SOURCE_ID);
      console.log("_P_CEDULA         : " + _P_CEDULA);
      console.log("_P_VIGENCIA       : " + _P_VIGENCIA);
      //
      let _model  = new dineroSearchCriteria( 
                              _P_DATA_SOURCE_ID
                            , _P_VIGENCIA
                            , _P_CEDULA);
      //
      this._textStatus     = "";
      //
      this._formSubmit     = true;
      //
      console.log("Form invalid ? : " + this._searchForm.invalid);
      //
      if (this._searchForm.invalid == false)
          this._update(_model);
  }
  //
  private _update(_searchCriteria: dineroSearchCriteria) {
      //
      this._buttonCaption  = "[Favor espere...]";
      // 
      //this._informeDineroRemoto  = this.logInfoService.getConsultaDineroRemoto_DEV(_searchCriteria);
      this._informeDineroRemotoSTR = this.logInfoService.getConsultaDineroRemoto_DEV_STR(_searchCriteria);
      //
      const _myObserver = {
        next: (p_dineroSearchResult : string)     => { 
          //
          console.log('RETURN VALUES : '  +  p_dineroSearchResult);
          //
          let jsonParseResult        : [] =  JSON.parse(p_dineroSearchResult);
          //
          this._dataSource           = new MatTableDataSource<DineroSearchResultEntity>(jsonParseResult);
          this._dataSource.paginator = this._paginator;
          //
          let recordCount            : string = this._dataSource.data.length.toString();
          this._textStatus           = "Se encontraron [" + recordCount + "] registatros";
        },
        error           : (err: Error)      => {
            //
            this._textStatus     = "Ha ocurrido un error. Favor intente de nuevo";
            //
            this._buttonCaption  = "[Buscar]";  
            //
            this._formSubmit      = false;
            //
            console.error('ERROR : ' + JSON.stringify(err.message));
        },
        complete        : ()                => {
            //
            this._buttonCaption  = "[Buscar]";
            //
            this._formSubmit     = false;
            //
            console.log('(SEARCH END)');
        },
      };
      //
      this._informeDineroRemotoSTR.subscribe(_myObserver);
  }
  //-----------------------------------------------------
  // TEMPLATE DRIVEN FORM
  //-----------------------------------------------------
  td_onSubmit()  : void {
    //
    console.warn("(SUBMIT 2)");
    //
    console.log("_P_DATA_SOURCE_ID : " + this.td_model.P_ID_DATA_SOURCE);
    console.log("_P_CEDULA         : " + this.td_model.P_IDENTIFICACION);
    console.log("_P_VIGENCIA       : " + this.td_model.P_VIGENCIA);
    //
    this.td_textStatus     = "";
    //
    this.td_formSubmit     = true;
    //
    console.log("Form valid ? : " + this.td_valid_form());
    //
    if (this.td_valid_form())
       this.td_update(this.td_model);
  }
  //
  td_newSearch() : void {  
    //
    this.td_textStatus    = "";
    //
    this.td_formSubmit    = false;
    //
    this.td_buttonCaption = "[Buscar]";
    //
    this.td_model                = new dineroSearchCriteria(   "0"
                                                              ,"0"
                                                              ,"0");
    //                                            
    this.td_dataSource           = new MatTableDataSource<DineroSearchResultEntity>();
    this.td_dataSource.paginator = this._paginator;
  }
  //
  private td_update(_searchCriteria: dineroSearchCriteria) : void {
      //
      this.td_buttonCaption  = "[Favor espere...]";
      //
      //this._informeDineroRemoto    = this.logInfoService.getConsultaDineroRemoto_DEV(_searchCriteria);
      this.td_informeDineroRemotoSTR = this.logInfoService.getConsultaDineroRemoto_DEV_STR(_searchCriteria);
      //
      const _tdObserver = {
        next: (p_dineroSearchResult : string)     => { 
          //
          console.log('RETURN VALUES : '  +  p_dineroSearchResult);
          //
          let jsonParseResult        : [] =  JSON.parse(p_dineroSearchResult);
          //
          this.td_dataSource           = new MatTableDataSource<DineroSearchResultEntity>(jsonParseResult);
          this.td_dataSource.paginator = this.td_paginator;
          //
          let recordCount            : string = this.td_dataSource.data.length.toString();
          this.td_textStatus         = "Se encontraron [" + recordCount + "] registros";
        },
        error           : (err: Error)      => {
            //
            this.td_textStatus     = "Ha ocurrido un error. Favor intente de nuevo";
            //
            this.td_buttonCaption  = "[Buscar]";    
            //
            this.td_formSubmit     = false;           
            //
            console.error('ERROR : ' + JSON.stringify(err.message));
        },
        complete        : ()                => {
            //
            this.td_buttonCaption  = "[Buscar]";
            //
            this.td_formSubmit     = false;
            //
            console.log('(SEARCH END)');
        },
      };
      //
      this.td_informeDineroRemotoSTR.subscribe(_tdObserver);
  }
}
