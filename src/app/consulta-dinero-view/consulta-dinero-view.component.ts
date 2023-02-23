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
[x: string]: any;
  //
  readonly _pageTitle          : string = "[CONSULTA - SOLICITUDES DE DINERO (HISTORICO)]";
  //
  static pageTitle()           : string {
    return "[CONSULTA - SOLICITUDES DE DINERO (HISTORICO)]";
  }
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
    this._formSubmit = false;
    //
    this.model  = new dineroSearchCriteria(  "0"
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
      //_P_FECHA_INICIO     : ["2022-09-01"  , Validators.required],
      //_P_FECHA_FIN        : ["2022-09-30"  , Validators.required],
    });
  }
  //
  _onSubmit() : void {
      //
      console.warn("(SUBMIT 2)");
      //
      this._formSubmit = true;
      //
      let _P_DATA_SOURCE_ID    : string = this._searchForm.value["_P_DATA_SOURCE_ID"] || "";
      let _P_CEDULA            : string = this._searchForm.value["_P_CEDULA"]         || "";
      let _P_VIGENCIA          : string = this._searchForm.value["_P_VIGENCIA"]       || "";
      //let _P_FECHA_INICIO    : string = this._searchForm.value["_P_FECHA_INICIO"]   || "";      
      //let _P_FECHA_FIN       : string = this._searchForm.value["_P_FECHA_FIN"]      || "";
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
      this._searchForm.value["_P_DATA_SOURCE_ID"]
      this._searchForm.valid                           
      //
      if (this._searchForm.status == 'VALID')
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
