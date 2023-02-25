import { Injectable                                            } from '@angular/core';
import { HttpClient                                            } from '@angular/common/http';
import { dineroSearchCriteria, DineroSearchResultEntity        } from './loginfo.model';
import { LogEntry_, searchCriteria                             } from './loginfo.model';
//
@Injectable({
  providedIn: 'root'
})
//
export class LogInfoService {
  //
  constructor(    private http: HttpClient  ) {
      //
  }
  //
  getLogLocal_2() {
      //
      let url='../assets/loginfo_.json';
      //    
      return this.http.get<LogEntry_[]>(url);
  }
  //
  getLogLocal_1() {
    //
    let url='../assets/loginfo.json';
    //    
    return this.http.get<LogEntry_[]>(url);
  }
  //
  getLogRemoto_cors_prod(P_ID_DATA_SOURCE : string) {
    // ENTORNO PRODUCCION
    let url='http://vivantov2.unidadvictimas.gov.co/spae/home/getconsultalogget?P_ID_DATA_SOURCE='+ P_ID_DATA_SOURCE +'&P_ID_TIPO_LOG=1&P_ID_LOG=0&P_FECHA_INICIO=%2201-01-2001%22&P_FECHA_FIN=%2231-12-2022%22&P_ROW_NUM=-1'
    // 
    return this.http.get<LogEntry_[]>(url);   
  }
  // 
  getLogRemoto_cors_dev(P_ID_DATA_SOURCE : string ) {
    // SPAE ENTORNO PRUEBAS
    let url='http://vivantopruebas.unidadvictimas.gov.co/spae/home/getconsultalogget?P_ID_DATA_SOURCE=' +  P_ID_DATA_SOURCE +'&P_ID_TIPO_LOG=1&P_ID_LOG=0&P_FECHA_INICIO=%2201-01-2001%22&P_FECHA_FIN=%2231-12-2022%22&P_ROW_NUM=-1'
    //
    return this.http.get<LogEntry_[]>(url);
  }
  // 
  getLogRemoto_DEPLOY_SPAE(_searchCriteria : searchCriteria) {
      // ENTORNO REMOTO (DEPLOY SPAE)
      let prefix = '../' 
      let url    = prefix + 'home/getconsultalogget?P_ID_DATA_SOURCE=' + _searchCriteria.P_DATA_SOURCE_ID + '&P_ID_TIPO_LOG=' + _searchCriteria.P_ID_TIPO_LOG + '&P_ID_LOG=0&P_FECHA_INICIO=' + _searchCriteria.P_FECHA_INICIO_STR +'&P_FECHA_FIN='+ _searchCriteria.P_FECHA_FIN_STR + '&P_ROW_NUM='+_searchCriteria.P_ROW_NUM
      //    
      return this.http.get<LogEntry_[]>(url);
  }
  // 
  getLogRemoto_DEV(_searchCriteria : searchCriteria) {
      //
      // DEV - ENTORNO LOCAL A DATOS REMOTOS (DEPLOY LOCAL), ej:
      // http://localhost/home/getconsultalogget?P_ID_DATA_SOURCE=1&P_ID_TIPO_LOG=1&P_ID_LOG=0&P_FECHA_INICIO=01/09/2022&P_FECHA_FIN=30/09/2022&P_ROW_NUM=999
      let prefix = 'http://localhost:80/';
      let url    = prefix + 'home/getconsultalogget?P_ID_DATA_SOURCE=' + _searchCriteria.P_DATA_SOURCE_ID + '&P_ID_TIPO_LOG=' + _searchCriteria.P_ID_TIPO_LOG + '&P_ID_LOG=0&P_FECHA_INICIO=' + _searchCriteria.P_FECHA_INICIO_STR +'&P_FECHA_FIN='+ _searchCriteria.P_FECHA_FIN_STR + '&P_ROW_NUM='+_searchCriteria.P_ROW_NUM
      //    
      return this.http.get<LogEntry_[]>(url);
  }
  //
  getConsultaDineroRemoto_DEV(_searchCriteria : dineroSearchCriteria) {
    //
    // DEV - ENTORNO LOCAL A DATOS REMOTOS (DEPLOY LOCAL), ej:
    // http://localhost/home/getconsultalogget?P_ID_DATA_SOURCE=1&P_ID_TIPO_LOG=1&P_ID_LOG=0&P_FECHA_INICIO=01/09/2022&P_FECHA_FIN=30/09/2022&P_ROW_NUM=999
    //
    let prefix   = 'http://localhost:80/';
    let url      = prefix + '/HOME/GetConsultaDineroGet?P_ID_DATA_SOURCE=' + _searchCriteria.P_ID_DATA_SOURCE + '&P_VIGENCIA=' + _searchCriteria.P_VIGENCIA + '&p_identificacion=' + _searchCriteria.P_IDENTIFICACION;
    //    
    return this.http.get<DineroSearchResultEntity[]>(url);
  }
  //
  //
  getConsultaDineroRemoto_DEV_STR(_searchCriteria : dineroSearchCriteria) {
    //
    // DEV - ENTORNO LOCAL A DATOS REMOTOS (DEPLOY LOCAL), ej:
    // http://localhost/home/getconsultalogget?P_ID_DATA_SOURCE=1&P_ID_TIPO_LOG=1&P_ID_LOG=0&P_FECHA_INICIO=01/09/2022&P_FECHA_FIN=30/09/2022&P_ROW_NUM=999
    //
    let prefix   = 'http://localhost:80/';
    let url      = prefix + '/HOME/GetConsultaDineroGet?P_ID_DATA_SOURCE=' + _searchCriteria.P_ID_DATA_SOURCE + '&P_VIGENCIA=' + _searchCriteria.P_VIGENCIA + '&p_identificacion=' + _searchCriteria.P_IDENTIFICACION;
    //    
    return this.http.get<string>(url);
  }
}

