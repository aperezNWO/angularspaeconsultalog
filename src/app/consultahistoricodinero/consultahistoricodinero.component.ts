import { Component, ViewChild             } from '@angular/core';
import { FormBuilder, Validators          } from '@angular/forms';
import { MatPaginator                     } from '@angular/material/paginator';
import { MatTableDataSource               } from '@angular/material/table';
import { Observable                       } from 'rxjs';
import { p_EstadosFormmalizacion, p_Vigencia                          } from '../loginfo.model';
import { dineroSearchCriteria, DineroSearchResultEntity, p_DataSource } from '../loginfo.model';
import { LogInfoService                                               } from '../loginfo.service';
//
@Component({
  selector: 'app-consultahistoricodinero',
  templateUrl: './consultahistoricodinero.component.html',
  styleUrls: ['./consultahistoricodinero.component.scss']
})
//
export class ConsultahistoricodineroComponent {
  //--------------------------------------------------------------------------------------
  // campos para busqueda de historico de dinero
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
    CHK_P_CEDULA             : [false               , Validators.required], 
    CHK_P_FUD                : [false               , Validators.required],
  });
  //
  @ViewChild('_paginator',{read: MatPaginator}) _paginator!: MatPaginator;
  //
  _model  = new dineroSearchCriteria( 
          "0"
        , "0"
        , "0"
        , "0"
        , "0"
        ,   false
        ,   false);
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
  // campos para estadisticas
  //--------------------------------------------------------------------------------------
  _table       : any;
  _pieChart    : any;
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
    // funciones para estadisticas
    this.SetYearList_STAT();
    this.SetChart();
  }
  //--------------------------------------------------------------------------------------
  _onSubmit()
  {
      //
      console.warn("[REACTIVE] - (busqueda historico dinero) - (SUBMIT)");
      //
      let _P_DATA_SOURCE_ID    : string  = this._searchForm.value["_P_DATA_SOURCE_ID"] || "0";
      let _P_VIGENCIA          : string  = this._searchForm.value["_P_VIGENCIA"]       || "0";
      let _P_CEDULA            : string  = this._searchForm.value["_P_CEDULA"]         || "0";
      let _P_FUD               : string  = this._searchForm.value["_P_FUD"]            || "0";
      let _P_ID_ESTADO         : string  = this._searchForm.value["_P_ID_ESTADO"]      || "0";
      //
      let CHK_P_CEDULA         : boolean = this._searchForm.value["CHK_P_CEDULA"]      || false;
      let CHK_P_FUD            : boolean = this._searchForm.value["CHK_P_FUD"]         || false;
      //
      console.log("_P_DATA_SOURCE_ID : " + _P_DATA_SOURCE_ID);
      console.log("_P_VIGENCIA       : " + _P_VIGENCIA);  
      console.log("_P_ID_ESTADO      : " + _P_ID_ESTADO);       
      console.log("_P_CEDULA         : " + _P_CEDULA);
      console.log("_P_FUD            : " + _P_FUD);

      //
      this._model  = new dineroSearchCriteria( 
                              _P_DATA_SOURCE_ID
                            , _P_VIGENCIA
                            , _P_CEDULA
                            , _P_FUD
                            , _P_ID_ESTADO
                            , CHK_P_CEDULA
                            , CHK_P_FUD);
      //
      this._textStatus     = "";
      //
      this._formSubmit     = true;
      //
      console.log("[REACTIVE] - (busqueda historico dinero) - Form valid ? : " + this.rf_valid_form());
      //
      if (this.rf_valid_form() == true)
          this._update(this._model);
  }
  //--------------------------------------------------------------------------------------
  // funciones para consulta de dinero
  //--------------------------------------------------------------------------------------
  //
  rf_valid_form() : boolean {
      //
      return  (      
             (                                                    ( this._model.P_ID_DATA_SOURCE != "0") )
          && (                                                    ( this._model.P_VIGENCIA       != "0") )    
          && (                                                    ( this._model.P_ID_ESTADO      != "0") )
          && ( (this._model.CHK_P_IDENTIFICACION == false) || ( (this._model.CHK_P_IDENTIFICACION == true)  &&  (( this._model.P_IDENTIFICACION != "" )   && (this._model.P_IDENTIFICACION !=  null) && (this._model.P_IDENTIFICACION != "0")) ) ) 
          && ( (this._model.CHK_P_FUD            == false) || ( (this._model.CHK_P_FUD            == true)  &&  (( this._model.P_FUD            != "" )   && ( this._model.P_FUD           !=  null) && (this._model.P_FUD            != "0")) ) ) 
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
        this._model               = new dineroSearchCriteria(  "0"
                                                              ,"0"
                                                              ,"0"
                                                              ,"0"
                                                              ,"0"
                                                              , false
                                                              , false);
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
          CHK_P_CEDULA          : [false          , Validators.required], 
          CHK_P_FUD             : [false          , Validators.required],
        });
  }
  //--------------------------------------------------------------------------------------
  // FUNCIONES PARA ESTADITICAS
  //--------------------------------------------------------------------------------------
  //
  SetYearList_STAT(): void {
      //
      console.log("[REACTIVE] - (estadistica historico dinero) - (GENERAR LISTADO DE AÑOS DE VIGENCIAS)");
      /*
      //
      var p_Date     = new Date();
      var year_max   = p_Date.getFullYear();
      var year_min   = 2020;
      var yearList   = [2020,2021,2022];
      //
      var selectOptions = '<option value="0">Seleccione Opción...</option>';
      //
      $("#P_YEAR_STAT").empty().append(selectOptions);
      //
      $.each(yearList, function (index, value) {
          //
          $("#P_YEAR_STAT").append($('<option/>', {
                value    : value
              , text     : value
              , selected : (value == 0) ? true : false
          }));
      });*/
  };
  //
  GetPdf() : void  { 
      //
      console.log("[REACTIVE] - (estadistica historico dinero) - (GENERAR PDF)");
      /*  
      //
      html2canvas($("#pieChart")[0]).then((canvas) => {
          //
          var imgData              = canvas.toDataURL('image/png');
          //
          var p_orientation        = 'p';  // POTRAIT
          var p_measurement_unit   = 'mm'; // MILIMETERS
          var doc                  = new jsPDF(p_orientation, p_measurement_unit );
          //
          doc.addImage(imgData, 'PNG', 1, 5);
          //
          doc.save('sample-file.pdf');
      }); */
  }
  //
  SetChart():void {
      //
      console.log("[REACTIVE] - (estadistica historico dinero) - (GENERAR GRAFICO PASTEL)");
      /*
      //
      console.log("[SI-SPAE-WEB] - GET STAT ");
      //
      var P_ID_DATA_SOURCE = $("#P_ID_DATA_SOURCE_STAT").val();
      var P_ROW_NUM        = $("#txtRecordCount_STAT").val();
      var P_YEAR           = $("#P_YEAR_STAT").val();
      var url_post         = "GetConsultaLogStatPost";
      //
      _ShowProgressBarTimer();
      //
      $.ajax({
          url          : url_post
          , method     : "POST"
          , dataType   : "JSON"
          , async      : true
          , data       :
          {
              P_ID_DATA_SOURCE  : P_ID_DATA_SOURCE
              , P_ROW_NUM       : P_ROW_NUM
              , P_YEAR          : P_YEAR

          }
          , success: function (jsondata) {
              //
              _HideProgressBarTimer();
              //
              const statLabels          = [];
              const statData            = [];
              const statBackgroundColor = [];
              //
              $.each(jsondata, function (index, value) {
                  //
                  console.log("[SI-SPAE-WEB] - GET STAT - RESULT : index [" + index + "] value={"
                      + jsondata[index]["TEXT_1"]
                      + "-" + jsondata[index]["TEXT_2"]
                      + "-" + jsondata[index]["TEXT_3"] + "}");
                  //
                  statLabels.push(jsondata[index]["TEXT_1"] + " - " + jsondata[index]["TEXT_2"]);
                  statData.push(Number(jsondata[index]["TEXT_2"]));
                  statBackgroundColor.push('rgb('
                      + (Number(jsondata[index]["TEXT_2"]) / 4) + ','
                      + (Number(jsondata[index]["TEXT_2"]) / 3) + ','
                      + (Number(jsondata[index]["TEXT_2"]) / 2) + ')');

              });
              //
              const ctx = document.getElementById('pieChart').getContext('2d');
              //
              const data = {
                  labels              : statLabels,
                  datasets: [{
                      label: 'CONTEO DE SESIONES - AÑO ['
                          + $('#P_YEAR_STAT option:selected').text().trim()
                          + '] - ['
                          + $('#P_ID_DATA_SOURCE_STAT option:selected').text().trim() + ']',
                      data            : statData,
                      backgroundColor : statBackgroundColor,
                      hoverOffset     : 4
                  }]
              };
              //
              if (pieChart) {
                  pieChart.destroy();
              }
              pieChart = new Chart(ctx, {
                  type   : 'bar',
                  data   : data
              });
          }
          , error: function (xhr, textStatus, errorThrown) {
              //
              alert("Se presentó un fallo.<br/>Favor comunicarse con el administrador del sistema");
              //
              if (xhr != null) {
                  //
                  console.log(' [SI-SPAE-WEB] - GET STAT - RETURN : ' + xhr.responseText);
              }
              //
              _HideProgressBarTimer();
          }
      });*/
  };
}
