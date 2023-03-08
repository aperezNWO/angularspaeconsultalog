import { Component            } from '@angular/core';
import { FormBuilder, Validators          } from '@angular/forms';
import { Observable } from 'rxjs';
import { dineroSearchCriteria } from '../loginfo.model';
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
  });
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
      let _P_CEDULA            : string = this._searchForm.value["_P_CEDULA"]         || "";
      let _P_VIGENCIA          : string = this._searchForm.value["_P_VIGENCIA"]       || "";
      let _P_FUD               : string = "0";
      let _P_ID_ESTADO         : string = "0";
      //
      console.log("_P_DATA_SOURCE_ID : " + _P_DATA_SOURCE_ID);
      console.log("_P_CEDULA         : " + _P_CEDULA);
      console.log("_P_VIGENCIA       : " + _P_VIGENCIA);
      console.log("_P_FUD            : " + _P_FUD);
      console.log("_P_ID_ESTADO      : " + _P_ID_ESTADO);
      //
      let _model  = new dineroSearchCriteria( 
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
      console.log("[REACTIVE] - (busqueda historico dinero) - Form invalid ? : " + this._searchForm.invalid);
      //
      if (this._searchForm.invalid == false)
          this._update(_model);
  }
  //--------------------------------------------------------------------------------------
  // methods
  //--------------------------------------------------------------------------------------
  private _update(_searchCriteria: dineroSearchCriteria) 
  {
    //
    let _informeDineroRemotoSTR!     : Observable<string>;
    this.logInfoService.getConsultaDineroRemoto_DEV_STR(_searchCriteria);
      //
      const _rfobserver = {
        next: (p_dineroSearchResult : string)     => { 
          //
          console.log('[REACTIVE] - (busqueda historico dinero) - RETURN VALUES : '  +  p_dineroSearchResult);
          //
          //let jsonParseResult        : [] =  JSON.parse(p_dineroSearchResult);
          //
          //this._dataSource           = new MatTableDataSource<DineroSearchResultEntity>(jsonParseResult);
          //this._dataSource.paginator = this._paginator;
          //
          let recordCount            : string = p_dineroSearchResult.length.toString();
          //this._textStatus           = "Se encontraron [" + recordCount + "] registatros";
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
