import { Component, ViewChild            } from '@angular/core';
import { FormBuilder, Validators          } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { dineroSearchCriteria, DineroSearchResultEntity, p_DataSource, p_EstadosFormmalizacion, p_Vigencia } from '../loginfo.model';
import { LogInfoService       } from '../loginfo.service';
//
@Component({
  selector: 'app-consultahistoricodinero',
  templateUrl: './consultahistoricodinero.component.html',
  styleUrls: ['./consultahistoricodinero.component.scss']
})
//
export class ConsultahistoricodineroComponent {
  //--------------------------------------------------------------------------------------
  // campos
  //--------------------------------------------------------------------------------------
  //
  readonly _pageTitle          : string  = "[CONSULTA - HISTORICO DE DINERO]";
  //
  _buttonCaption               : string  = "[Buscar]"; 
  _textStatus                  : string  = "";
  _formSubmit                  : boolean = false;
  //
  _searchForm   = this.formBuilder.group({
    _P_DATA_SOURCE_ID     : ["0"            , Validators.required],
    _P_CEDULA             : ["0"            , Validators.required], 
    _P_VIGENCIA           : ["0"            , Validators.required],
    _P_FUD                : ["0"            , Validators.required],
    _P_ID_ESTADO          : ["0"            , Validators.required],  
  });
  //
  @ViewChild('_paginator',{read: MatPaginator}) _paginator!: MatPaginator;
  //
  _model  = new dineroSearchCriteria( 
          "0"
        , "0"
        , "0"
        , "0"
        , "0");
  //
  _dataSource                  = new MatTableDataSource<DineroSearchResultEntity>();
  //
  displayedColumns                   : string[]                = ['ID_SOLICITUD','NOMBRE_COMPLETO','FUD','ESTADO_SOLICITUD','RESPONSABLE_SOLICITUD', 'DANE_DEPARTAMENTO','DANE_MUNICIPIO','OBSERVACION_SOLICITUD'];
  //
  P_DATA_SOURCES                     : p_DataSource[]          = [{ M_DATA_SOURCE_ID : "0"  , M_DATA_SOURCE_NAME : "(SELECCIONE OPCION...)"},
  { M_DATA_SOURCE_ID : "1"  , M_DATA_SOURCE_NAME : "RUV_PRODUCCION"},
  { M_DATA_SOURCE_ID : "2"  , M_DATA_SOURCE_NAME : "RUV_PRUEBAS"   }];

  //
  P_VIGENCIAS                        : p_Vigencia[]            = [{ M_VIGENCIA_ID : "0"  , M_VIGENCIA_NAME : "(SELECCIONE OPCION...)"},
  { M_VIGENCIA_ID : "2019"  , M_VIGENCIA_NAME : "2019"   },
  { M_VIGENCIA_ID : "2020"  , M_VIGENCIA_NAME : "2020"   },
  { M_VIGENCIA_ID : "2021"  , M_VIGENCIA_NAME : "2021"   },
  { M_VIGENCIA_ID : "2022"  , M_VIGENCIA_NAME : "2022"   },
  { M_VIGENCIA_ID : "2023"  , M_VIGENCIA_NAME : "2023"   }]; 
  //
  P_ESTADOS_FORMALIZACION : p_EstadosFormmalizacion[]         = [ { M_ID_ESTADO_SOL_FORMALIZACION : "0", M_DESCRIPCION : "(SELECCIONE OPCION...)"}, 
  { M_ID_ESTADO_SOL_FORMALIZACION : "1", M_DESCRIPCION : "En creación"}, 
  { M_ID_ESTADO_SOL_FORMALIZACION : "2", M_DESCRIPCION : "Enviada a direccion territorial"}, 
  { M_ID_ESTADO_SOL_FORMALIZACION : "3", M_DESCRIPCION : "Devuelta al municipio por direccion territorial"}, 
  { M_ID_ESTADO_SOL_FORMALIZACION : "4", M_DESCRIPCION : "Enviada al nivel central"},
  { M_ID_ESTADO_SOL_FORMALIZACION : "5", M_DESCRIPCION : "Devuelta al municipio por nivel central"}, 
  { M_ID_ESTADO_SOL_FORMALIZACION : "6", M_DESCRIPCION : "Aceptada por nivel central"},
  { M_ID_ESTADO_SOL_FORMALIZACION : "7", M_DESCRIPCION : "Anulada"},
];

  //--------------------------------------------------------------------------------------
  // propiedades
  //--------------------------------------------------------------------------------------
  static pageTitle()           : string {
    //
    return "[CONSULTA - HISTORICO DE DINERO]";
  }
  //--------------------------------------------------------------------------------------
  // event handlers
  //--------------------------------------------------------------------------------------
  constructor(private logInfoService : LogInfoService, private formBuilder: FormBuilder) {
    //
  }
  //--------------------------------------------------------------------------------------
  _onSubmit()
  {
      //
      console.warn("[REACTIVE] - (busqueda historico dinero) - (SUBMIT)");
      //
      let _P_DATA_SOURCE_ID    : string = this._searchForm.value["_P_DATA_SOURCE_ID"] || "0";
      let _P_VIGENCIA          : string = this._searchForm.value["_P_VIGENCIA"]       || "0";
      let _P_CEDULA            : string = this._searchForm.value["_P_CEDULA"]         || "0";
      let _P_FUD               : string = this._searchForm.value["_P_FUD"]            || "0";
      let _P_ID_ESTADO         : string = this._searchForm.value["_P_ID_ESTADO"]      || "0";
      //
      console.log("_P_DATA_SOURCE_ID : " + _P_DATA_SOURCE_ID);
      console.log("_P_CEDULA         : " + _P_CEDULA);
      console.log("_P_VIGENCIA       : " + _P_VIGENCIA);        
      console.log("_P_FUD            : " + _P_FUD);
      console.log("_P_ID_ESTADO      : " + _P_ID_ESTADO);
      //
      this._model  = new dineroSearchCriteria( 
                              _P_DATA_SOURCE_ID
                            , _P_VIGENCIA
                            , _P_CEDULA
                            , _P_FUD
                            , _P_ID_ESTADO);
      //
      this._textStatus     = "";
      //
      this._formSubmit     = true;
      //
      console.log("[REACTIVE] - (busqueda historico dinero) - Form valid ? : " + this.td_valid_form());
      //
      if (this.td_valid_form() == true)
          this._update(this._model);
  }
  //--------------------------------------------------------------------------------------
  // methods
  //--------------------------------------------------------------------------------------
  //
  td_valid_form() : boolean {
      return  (      
           ( this._model.P_ID_DATA_SOURCE != "0") 
      && ( ( this._model.P_IDENTIFICACION != "" ) && (this._model.P_IDENTIFICACION !=  null) && (this._model.P_IDENTIFICACION != "0") ) 
      && ( ( this._model.P_VIGENCIA       != "0"))    
      && ( ( this._model.P_FUD            != "" ) && (this._model.P_FUD            !=  null) && (this._model.P_FUD            != "0") ) 
      &&   ( this._model.P_ID_ESTADO      != "0") 
              );
  }
  //--------------------------------------------------------------------------------------
  private _update(_searchCriteria: dineroSearchCriteria) 
  {
    //
    this._buttonCaption              = "[Buscando, por favor espere...]";
    //
    let _informeDineroRemotoSTR!     : Observable<string>;
    _informeDineroRemotoSTR!         = this.logInfoService.getConsultaDineroRemoto_DEV_STR(_searchCriteria);
    //
      const _rfobserver = {
        next: (p_dineroSearchResult : string)     => { 
          //
          let jsonParseResult        : [] =  JSON.parse(p_dineroSearchResult);
          //
          let recordCount            : string = jsonParseResult.length.toString();
          //
          console.log('[REACTIVE] - (busqueda historico dinero) - RECORD COUNT   : '  +  recordCount);
          //
          console.log('[REACTIVE] - (busqueda historico dinero) - RETURN VALUES  : '  +  p_dineroSearchResult);
          //
          this._dataSource           = new MatTableDataSource<DineroSearchResultEntity>(jsonParseResult);
          this._dataSource.paginator = this._paginator;
          //
          this._textStatus           = "Se encontraron [" + recordCount + "] registatros";
        },
        error           : (err: Error)      => {
            //
            this._textStatus      = "Ha ocurrido un error. Favor intente de nuevo";
            //
            this._buttonCaption   = "[Buscar]";  
            //
            this._formSubmit      = false;
            //
            console.error('[REACTIVE] - (busqueda historico dinero) - error : ' + JSON.stringify(err.message));
        },
        complete        : ()                => {
            //
            this._buttonCaption  = "[Buscar]";
            //
            this._formSubmit     = false;
            //
            console.log('[REACTIVE] - (busqueda historico dinero) - (SEARCH END)');
        },
      };
      //
      _informeDineroRemotoSTR.subscribe(_rfobserver);
  }
  //--------------------------------------------------------------------------------------
  _newSearch()
  {
    //
    console.log('[REACTIVE] - (busqueda historico dinero) - (NEW SEARCH)');
        //
        this._textStatus    = "";
        //
        this._formSubmit    = false;
        //
        this._buttonCaption = "[Buscar]";
        //
        this._model          = new dineroSearchCriteria(  "0"
                                                         ,"0"
                                                         ,"0"
                                                         ,"0"
                                                         ,"0");
        //                                            
        this._dataSource           = new MatTableDataSource<DineroSearchResultEntity>();
        this._dataSource.paginator = this._paginator;
        //
        this._searchForm   = this.formBuilder.group({
          _P_DATA_SOURCE_ID     : ["0"            , Validators.required],
          _P_CEDULA             : ["0"            , Validators.required], 
          _P_VIGENCIA           : ["0"            , Validators.required],
          _P_FUD                : ["0"            , Validators.required],
          _P_ID_ESTADO          : ["0"            , Validators.required],  
        });;
  }
  //--------------------------------------------------------------------------------------
}
