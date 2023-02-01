import { Injectable          } from '@angular/core';
import { HttpClient          } from '@angular/common/http';
import { LogEntry_           } from './loginfo.model';

@Injectable({
  providedIn: 'root'
})

export class LogInfoService {
  //
  constructor(    private http: HttpClient  ) {
      //
  }
  //
  //
  getLogLocal_() {
      //
      let url='../assets/loginfo_.json';
      //    
      return this.http.get<LogEntry_[]>(url);
  }
  //
  getLogLocal() {
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
  getLogRemoto_DEPLOY_SPAE(P_ID_DATA_SOURCE : string) {
    // ENTORNO REMOTO (DEPLOY SPAE)
    let url='../home/getconsultalogget?P_ID_DATA_SOURCE=' + P_ID_DATA_SOURCE + '&P_ID_TIPO_LOG=1&P_ID_LOG=0&P_FECHA_INICIO=01/09/2022&P_FECHA_FIN=30/09/2022&P_ROW_NUM=99'
    //    
    return this.http.get<LogEntry_[]>(url);
  }
  // 
  getLogRemoto_DEV(P_ID_DATA_SOURCE : string) {
      //
      // DEV - ENTORNO LOCAL A DATOS REMOTOS (DEPLOY LOCAL), ej:
      // http://localhost/home/getconsultalogget?P_ID_DATA_SOURCE=1&P_ID_TIPO_LOG=1&P_ID_LOG=0&P_FECHA_INICIO=01/09/2022&P_FECHA_FIN=30/09/2022&P_ROW_NUM=999
      let url='http://localhost/home/getconsultalogget?P_ID_DATA_SOURCE=' + P_ID_DATA_SOURCE + '&P_ID_TIPO_LOG=1&P_ID_LOG=0&P_FECHA_INICIO=01/09/2022&P_FECHA_FIN=30/09/2022&P_ROW_NUM=99'
      //    
      return this.http.get<LogEntry_[]>(url);
  }
}

