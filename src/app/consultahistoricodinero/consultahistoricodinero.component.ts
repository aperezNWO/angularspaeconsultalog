import { Component            } from '@angular/core';
import { FormBuilder, Validators          } from '@angular/forms';
import { Observable } from 'rxjs';
import { dineroSearchCriteria, p_DataSource, p_Vigencia } from '../loginfo.model';
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
  readonly _pageTitle          : string = "[CONSULTA - HISTORICO DE DINERO]";
  //
  _buttonCaption               : string = "[Buscar]"; 
  //
  _searchForm   = this.formBuilder.group({
    _P_DATA_SOURCE_ID     : [""            , Validators.required],
    _P_CEDULA             : [""            , Validators.required], 
    _P_VIGENCIA           : [""            , Validators.required],
    _P_FUD                : [""            , Validators.required],
    
  });
  //
  _model  = new dineroSearchCriteria( 
          "0"
        , "0"
        , "0"
        , "0"
        , "0");
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
      let _P_DATA_SOURCE_ID    : string = this._searchForm.value["_P_DATA_SOURCE_ID"] || "";
      let _P_VIGENCIA          : string = this._searchForm.value["_P_VIGENCIA"]       || "";
      let _P_CEDULA            : string = this._searchForm.value["_P_CEDULA"]         || "40626208";
      let _P_FUD               : string = "0";
      let _P_ID_ESTADO         : string = "0";
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
      //this._textStatus     = "";
      //
      //this._formSubmit     = true;
      //
      console.log("[REACTIVE] - (busqueda historico dinero) - Form valid ? : " + this.td_valid_form());
      //
      //if (this.td_valid_form() == true)
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
    let _informeDineroRemotoSTR!     : Observable<string>;
    _informeDineroRemotoSTR!         = this.logInfoService.getConsultaDineroRemoto_DEV_STR(_searchCriteria);
      //
      const _rfobserver = {
        next: (p_dineroSearchResult : string)     => { 
          //
          let jsonParseResult        : [] =  JSON.parse(p_dineroSearchResult);
          //
          let recordCount            : string = jsonParseResult.length.toString();
          //this._textStatus           = "Se encontraron [" + recordCount + "] registatros";
          console.log('[REACTIVE] - (busqueda historico dinero) - RECORD COUNT   : '  +  recordCount);
          //
          console.log('[REACTIVE] - (busqueda historico dinero) - RETURN VALUES  : '  +  p_dineroSearchResult);
          //
          //this._dataSource           = new MatTableDataSource<DineroSearchResultEntity>(jsonParseResult);
          //this._dataSource.paginator = this._paginator;
        },
        error           : (err: Error)      => {
            //
            //this._textStatus     = "Ha ocurrido un error. Favor intente de nuevo";
            //
            //this._buttonCaption  = "[Buscar]";  
            //
            //this._formSubmit      = false;
            //
            console.error('[REACTIVE] - (busqueda historico dinero) - error : ' + JSON.stringify(err.message));
        },
        complete        : ()                => {
            //
            //this._buttonCaption  = "[Buscar]";
            //
            //this._formSubmit     = false;
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
  }
  //--------------------------------------------------------------------------------------
}
