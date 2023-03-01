==========================================================================================
-- BLACK BOX QUERIES
==========================================================================================

//angular pagination?
<ul uib-pagination total-items="filteredData.length" ng-model="currentPage" max-size="maxSize" class="pagination-sm pagination" rotate="false" boundary-links="true" items-per-page="itemsPerPage"></ul>


<uib-pagination total-items="filteredData.length" ng-model="currentPage" max-size="maxSize" class="pagination-sm pagination" rotate="false" boundary-links="true" items-per-page="itemsPerPage"></uib-pagination>


<pagination total-items="filteredData.length" ng-model="currentPage" max-size="maxSize" class="pagination-sm pagination" rotate="false" boundary-links="true" items-per-page="itemsPerPage"></pagination>


$scope.currentPage = 1;
$scope.itemsPerPage = 5;
$scope.maxSize = 5; //Number of pager buttons to show


<tr ng-repeat="cate in filteredData = (categoryList | filter : search:Name) | limitTo:itemsPerPage:itemsPerPage*(currentPage-1) track by $index">
   <td>{{$index+1}}</td>
   <td>{{cate.Name}}</td>
   <td>{{cate.Description}}</td>
</tr>


<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>    
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.6/angular.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.5.0/ui-bootstrap-tpls.js"></script>
<link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" />

undefinedSource: https://stackoverflow.com/questions/44289424

==========================================================================================
// angular reactive forms validation ?
export class AppComponent {
   title    = 'my-app';
   formjson = form
   userDetails:object;

    /** Define your FormGroup here, You have given the same name for, FormGroup and 
        UserDetails variable, which is not correct
     */
    userDetailsForm: FormGroup;

   /** define the getter here, before the constructor gets called */
   get role_name() {
       return this.userDetailsForm.get('role_name');
   }
}

undefinedSource: https://stackoverflow.com/questions/60705004

==========================================================================================
==========================================================================================
-- DATA
==========================================================================================

[{"ID_SOLICITUD":"8951","VIGENCIA":"2022","CEDULA":"40626208","NOMBRE_COMPLETO":"RUBIELA  CARDOZO OLAYA","ID_PERSONA":"58852","ID_HOGAR":"20024","TELEFONO_1":"3223394059","TELEFONO_2":"0579512","TELEFONO_3":"3222339405","EMAIL":"(N/A)","DIRECCION":"barrio CENTRO","BARRIO":"CENTRO","DANE":"50350","DANE_DEPARTAMENTO":"META","DANE_MUNICIPIO":"LA MACARENA","FUD":"CI000476330","ALIMENTACION":"SI","ALOJAMIENTO":"NO","ID_ESTADO":"1","ESTADO_SOLICITUD":"Enlace En creaci\u00f3n","ID_MUNICIPIO":"148","USUARIO":"144239","FUNCIONARIO_SOLICITUD":"BRAYAN ANDRES GUERRERO RAMIREZ","RESPONSABLE_SOLICITUD":"KELLY JOHANNA LEGUIZAMO GUEVARA","OBSERVACION_SOLICITUD":"(N/A)"},{"ID_SOLICITUD":"8911","VIGENCIA":"2022","CEDULA":"40626208","NOMBRE_COMPLETO":"RUBIELA  CARDOZO OLAYA","ID_PERSONA":"58713","ID_HOGAR":"19941","TELEFONO_1":"3223394059","TELEFONO_2":"(N/A)","TELEFONO_3":"3223394059","EMAIL":"(N/A)","DIRECCION":"carrera 7 # 3-34","BARRIO":"CENTRO","DANE":"50350","DANE_DEPARTAMENTO":"META","DANE_MUNICIPIO":"LA MACARENA","FUD":"CI000476330","ALIMENTACION":"SI","ALOJAMIENTO":"NO","ID_ESTADO":"6","ESTADO_SOLICITUD":"Devuelta por Gestion Spae AH\u00cd Nacional","ID_MUNICIPIO":"148","USUARIO":"144239","FUNCIONARIO_SOLICITUD":"BRAYAN ANDRES GUERRERO RAMIREZ","RESPONSABLE_SOLICITUD":"KELLY JOHANNA LEGUIZAMO GUEVARA","OBSERVACION_SOLICITUD":"NO ESTA  LA FIRMA DEL RESPONSABLE DE OFICIO AVAL / quien firma no es el actual responsable."}]

==========================================================================================
-- SCM
==========================================================================================

--[_] URL SPAE:
      
      --[_] http://localhost/HOME/consultalog
      --[_] http://localhost/HOME/getconsultalogget?P_ID_DATA_SOURCE=1&P_ID_TIPO_LOG=1&P_ID_LOG=0&P_FECHA_INICIO="01-01-2001"&P_FECHA_FIN="31-12-2022"&P_ROW_NUM=-1

public JsonResult GetConsultaLogGet
(
     int P_ID_DATA_SOURCE
  ,  int P_ID_TIPO_LOG
  ,  int P_ID_LOG
  ,  string P_FECHA_INICIO
  ,  string P_FECHA_FIN, int P_ROW_NUM
)

  valores de parametro "p_row_num"
  
  0. min
  1. max
  2. count

--[_] 
[
    {
        "ID_LOG":"394611"
        ,"DATE_TIME":"21 de septiembre de 2022 9:36 AM"
        ,"TEXT_1":" Jaime.molina@unidadvictimas.gov.co  "
        ,"TEXT_2":" Solicitud creación usuarios SI–SPAE - Departamento=[CAQUETA] - Municipio=[MILAN]"
        ,"TEXT_3":" "
        ,"TEXT_1_WEB":" Jaime.molina@unidadvictimas.gov.co  "
        ,"TEXT_2_WEB":" Solicitud creación usuarios SI–SPAE - Departamento=[CAQUETA] - Municipio=[MILAN]"
    }
]

--[_] CORS 

<system.web>
  <compilation targetFramework="4.7.2"/>
  <httpRuntime maxRequestLength="12097" executionTimeout="180"/>
  <pages controlRenderingCompatibilityVersion="4.0"/>
</system.web>
<system.webServer>
  <httpProtocol>
    <customHeaders>
      <add name="Access-Control-Allow-Origin" value="*" />
    </customHeaders>
  </httpProtocol>
</system.webServer>

==========================================================================================
-- STRATEGY
==========================================================================================

--[x] Cambiar dominio aplicativos publicados en SOMEE.COM.
      --[x] angulardemo.somee.com.
--[x] Reducir rango por defecto de fechas en entorno de producción.
--[x] Numeros de Versionamiento. 
--[x] Version de Angular en parte inferior. 
      --[_] https://dev.to/nightwolfdev/how-to-display-app-version-in-angular-2ge
--[x] you.ai / chatgpt / https://you.com/code.
--[x] Desbloquear usuario spae.
--[x] [NAVIGATION]: 
      --[x] RouterLink 
      --[x] Consulta Dinero.
      --[x] Consulta Log.
--[>] [FORMS]: 
    --[X] material tab. 
    --[_] Validaciones
        --[_] https://angular.io/guide/forms-overview 
        --[_] https://angular.io/guide/form-validation
        --[x] Validaciones / reactive        [formControl]. 
              --[_] https://angular.io/guide/form-validation#validating-input-in-reactive-forms 
        --[X] Validaciones / template driven (NgModel).      
              --[_] .
--[>] [CONSULTA (HISTORICO DE DINERO) / Panel de Búsqueda / Validacion / CONSULTA_1 (REACTIVE)]: 
            --[>] P_ID_DATA_SOURCE. 
            --[>] P_VIGENCIA. 
            --[>] P_IDENTIFICACION. 
            --[_] Validaciones.
                        --[_] Field Messages.
                        --[_] Buttons.
                        --[_] Status.
            --[_] Mensajes a Usuario.   
                        --[_] angular change caption button runtime.   
                        --[_] Record count.   
                        --[_] Modal status.
                        --[_] Reset / Default Values. 
--[>] [CONSULTA (HISTORICO DE DINERO)  / Panel de Búsqueda / Validacion / CONSULTA_2 (TEMPLATE DRIVEN)]: 
            --[x] P_ID_DATA_SOURCE. 
            --[x] P_VIGENCIA. 
            --[x] P_IDENTIFICACION. 
            --[>] Validaciones.
                        --[_] Field Messages.
                        --[_] Buttons.
                        --[x] Status.
                        --[x] Cedula.
            --[_] Mensajes a Usuario.   
                        --[x] Angular change caption button runtime.   
                        --[x] Record count.   
                        --[x] Reset / Default Values. 
            --[_] Behaviour on Exception.     
                        --[_] Messages.
                        --[_] Buttons.
                        --[_] Status.
            --[_] DataGrid.     
                        --[_] Campos.
                        --[_] Paginación.
  --[_] Informe Excel.      
  --[_] Estilos.      
        --[_] Modal status.
        --[_] Install Angular Material. 
        --[_] Bootstrap (mobile).      
        --[_] SCSS.      
  --[_] Dynamic Forms.   
==========================================================================================


