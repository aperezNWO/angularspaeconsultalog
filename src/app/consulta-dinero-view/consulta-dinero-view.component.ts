import { AfterViewInit, Component, OnInit, ViewChild  } from '@angular/core';
import { FormBuilder, Validators                      } from '@angular/forms';
import { MatTableDataSource                           } from '@angular/material/table';
import { MatPaginator                                 } from '@angular/material/paginator';
import { Observable                                   } from 'rxjs';
import { DineroSearchResultEntity, LogEntry_, p_TipoLog                         } from '../loginfo.model';
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
  readonly _pageTitle          : string = "[CONSULTA - SOLICITUDES DE DINERO (HISTORICO)]";
  //
  static pageTitle()   : string {
    return "[CONSULTA - SOLICITUDES DE DINERO (HISTORICO)]";
  }
  //
  _informeDineroRemoto!        : Observable<DineroSearchResultEntity[]>;
  _informeDineroRemotoSTR!     : Observable<string>;
  //
  _dataSource                  = new MatTableDataSource<DineroSearchResultEntity>();
  // 
  displayedColumns                   : string[]                        = ['ID_SOLICITUD'/*,'DATE_TIME','TEXT_1_WEB','TEXT_2_WEB'*/];
  //
  P_DATA_SOURCES                     : p_DataSource[]          = [{ M_DATA_SOURCE_ID : "0"  , M_DATA_SOURCE_NAME : "(SELECCIONE OPCION...)"},
                                                                  { M_DATA_SOURCE_ID : "1"  , M_DATA_SOURCE_NAME : "RUV_PRODUCCION"},
                                                                  { M_DATA_SOURCE_ID : "2"  , M_DATA_SOURCE_NAME : "RUV_PRUEBAS"   }];

  //
  model                              = new dineroSearchCriteria( "0"
                                                                ,"0"
                                                                ,"0");
  
  //
  @ViewChild('_paginator',{read: MatPaginator}) _paginator!: MatPaginator;
  //
  _searchForm   = this.formBuilder.group({
    //_P_ID_TIPO_LOG      : ["0"           , Validators.required], 
    _P_DATA_SOURCE_ID     : ["0"           , Validators.required],
    //_P_ROW_NUM          : ["999"         , Validators.required],
    //_P_FECHA_INICIO     : ["2022-09-01"  , Validators.required],
    //_P_FECHA_FIN        : ["2022-09-30"  , Validators.required],
  });
  //  
  constructor(private logInfoService : LogInfoService, private formBuilder: FormBuilder) {
    //
  }
  //
  ngOnInit(): void {
      //
      this._newSearch();
  }
  //
  ngAfterViewInit() {
    //
  }
  //
  _newSearch() : void {
    //
  }
  //
  _onSubmit() : void {
    //
         //
         console.warn("(SUBMIT 2)");
         //
         let _P_DATA_SOURCE_ID    : string = this._searchForm.value["_P_DATA_SOURCE_ID"] || "";
         //let _P_ID_TIPO_LOG     : string = this._searchForm.value["_P_ID_TIPO_LOG"]    || "";
         //let _P_ROW_NUM         : string = this._searchForm.value["_P_ROW_NUM"]        || "";
         //let _P_FECHA_INICIO    : string = this._searchForm.value["_P_FECHA_INICIO"]   || "";      
         //let _P_FECHA_FIN       : string = this._searchForm.value["_P_FECHA_FIN"]      || "";
   
         //
         let _model  = new dineroSearchCriteria( 
                                 _P_DATA_SOURCE_ID
                               , "2022"
                               , "40626208");
         //
         if (_model.P_ID_DATA_SOURCE != "0")
             this._update(_model);
  }
  //
  private _update(_searchCriteria: dineroSearchCriteria) {
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
        },
        error           : (err: Error)      => console.error('ERROR : ' + JSON.stringify(err.message)),
        complete        : ()                => console.log('(SEARCH END)'),
      };
      //
      this._informeDineroRemotoSTR.subscribe(_myObserver);
  }
}
