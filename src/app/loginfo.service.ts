import { Injectable          } from '@angular/core';
import { HttpClient          } from '@angular/common/http';
import { LogEntry_           } from './loginfo.model';

@Injectable({
  providedIn: 'root'
})

export class LogInfoService {
  //
  //ELEMENT_DATA_LOCAL:  LogEntry[] = [];
  //
  //ELEMENT_DATA_LOCAL_: LogEntry[] = [];
  //
  //private _loginfo = new BehaviorSubject([]);
  //
  constructor(    private http: HttpClient  ) {
      //
  }
  //
  /*
  get loginfo() {
    return this._loginfo.asObservable()
  }*/
  // 
  /*
  updateLogInfo() {
    //
    let url = 'https://learningpath.somee.com/demos/generarinformejson';
    //
    this.http.get<LogEntry[]>(url).forEach(
      p_logInfo =>{
        //this._loginfo.next(p_logInfo);
      }
    )
    //   
    console.log("ELEMENT_DATA_LOCAL from http/json : " + this.ELEMENT_DATA_LOCAL);
  }*/
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
  getLogRemoto() {
    //
    let url = 'https://learningpath.somee.com/demos/generarinformejson';
    // 
    return this.http.get<LogEntry_[]>(url);   
  }
  // ENTORNO REMOTO (DEPLOY SPAE)
  getLogRemoto__() {
    //
    let url='../home/getconsultalogget?P_ID_DATA_SOURCE=2&P_ID_TIPO_LOG=1&P_ID_LOG=0&P_FECHA_INICIO=%2201-01-2001%22&P_FECHA_FIN=%2231-12-2022%22&P_ROW_NUM=-1'
    //    
    return this.http.get<LogEntry_[]>(url);
  }
  // SPAE ENTORNO PRUEBAS
  getLogRemoto___() {
    //
    let url='http://vivantopruebas.unidadvictimas.gov.co/spae/home/getconsultalogget?P_ID_DATA_SOURCE=2&P_ID_TIPO_LOG=1&P_ID_LOG=0&P_FECHA_INICIO=%2201-01-2001%22&P_FECHA_FIN=%2231-12-2022%22&P_ROW_NUM=-1'
    //
    return this.http.get<LogEntry_[]>(url);
  }
  // ENTORNO LOCAL A DATOS REMOTOS (DEPLOY LOCAL)
  getLogRemoto_(P_ID_DATA_SOURCE : string) {
      //
      //let url='http://localhost/home/getconsultalogget?P_ID_DATA_SOURCE=' + P_ID_DATA_SOURCE + ' &P_ID_TIPO_LOG=1&P_ID_LOG=0&P_FECHA_INICIO=%2201-12-2022%22&P_FECHA_FIN=%2231-12-2022%22&P_ROW_NUM=-1'
      let url='../home/getconsultalogget?P_ID_DATA_SOURCE=' + P_ID_DATA_SOURCE + ' &P_ID_TIPO_LOG=1&P_ID_LOG=0&P_FECHA_INICIO=%2201-12-2022%22&P_FECHA_FIN=%2231-12-2022%22&P_ROW_NUM=-1'
      //    
      return this.http.get<LogEntry_[]>(url);
  }
}

