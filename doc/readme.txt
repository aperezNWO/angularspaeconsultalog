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
        ,"TEXT_2":" Solicitud creaci??n usuarios SI???SPAE - Departamento=[CAQUETA] - Municipio=[MILAN]"
        ,"TEXT_3":" "
        ,"TEXT_1_WEB":" Jaime.molina@unidadvictimas.gov.co  "
        ,"TEXT_2_WEB":" Solicitud creaci??n usuarios SI???SPAE - Departamento=[CAQUETA] - Municipio=[MILAN]"
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

=============================================================================
--  cedulas consulta historico de Dinero
=============================================================================

x 1006597298

x 18112959

x 18613774

x 1001027726

x 19003255

x 1061776928

x 29181484

x 1085688839

x 1073969030

1125412272

1073971764

1118026425

55154152

1075234436

36308023

1072642441

1075293228

1075260747

1056770576

55163426

1075253612

1005878017

15488792

26260570

1077438028

x 1063294090

x 1061759906

x 1002793005

x 41116130


==========================================================================================
-- STRATEGY
==========================================================================================

--[x] Cambiar dominio aplicativos publicados en SOMEE.COM.
      --[x] angulardemo.somee.com.
--[x] Reducir rango por defecto de fechas en entorno de producci??n.
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
    --[x] Validaciones
        --[x] https://angular.io/guide/forms-overview 
         --[x] Validaciones / reactive        [formControl]. 
              --[x] https://angular.io/guide/form-validation#validating-input-in-reactive-forms 
        --[X] Validaciones / template driven (NgModel).      
              --[x] https://angular.io/guide/form-validation
--[>] [CONSULTA (HISTORICO DE DINERO) / Panel de B??squeda / Validacion / CONSULTA_1 (REACTIVE)]: 
            --[X] P_ID_DATA_SOURCE. 
            --[X] P_VIGENCIA. 
            --[X] P_IDENTIFICACION. 
            --[X] Validaciones.
                        --[X] Field Messages.
                        --[X] Buttons.
                        --[X] Status.
            --[X] Mensajes a Usuario.   
                        --[X] angular change caption button runtime.   
                        --[X] Record count.   
                        --[X] Modal status.
                        --[X] Reset / Default Values. 
            --[x] DataGrid.     
                        --[x] Campos.
                        --[_] Paginaci??n.

--[>] [CONSULTA (HISTORICO DE DINERO)  / Panel de B??squeda / Validacion / CONSULTA_2 (TEMPLATE DRIVEN)]: 
            --[x] P_ID_DATA_SOURCE. 
            --[x] P_VIGENCIA. 
            --[x] P_IDENTIFICACION. 
            --[x] Validaciones.
                        --[x] Field Messages.
                        --[x] Buttons.
                        --[x] Status.
                        --[x] Cedula.
            --[x] Mensajes a Usuario.   
                        --[x] Angular change caption button runtime.   
                        --[x] Record count.   
                        --[x] Reset / Default Values. 
            --[X] Behaviour on Exception.     
                        --[x] Messages.
                        --[x] Buttons.
                        --[x] Status.
            --[>] DataGrid.     
                        --[x] Campos.
                        --[_] Paginaci??n.

--[>] [CONSULTA LOG (PRUEBAS)]: 

      --[x] VALIDACIONES.
            --[x] TEMPLATE DRIVEN.
            --[x] REACTIVE.

--[>] [CONSULTA (HISTORICO DE DINERO)  / NELSON ROJAS ]:
      
      --[x] Verificar filtro por a??o de vigencia.    

      --[x] Checkboxes campos de busqueda (opcionales) / TEMPLATE DRIVEN.   

      --[x] Paginaci??n.  
      
      --[_] Filtro por otros campos.  

            --[_] vigencia.
            --[_] idententificacion.
            --[_] fud.
            --[_] estado.
            --[_] departamento/municipio.
            --[_] nombre solicititante.
            --[_] nombre funcionario/responsable.
            --[_] observaciones.

      --[_] scss / material.  

      --[x] emparejar sp pruebas/producci??n.  

      --[>] Consolidado por Estado (estadistica como en busqueda log).

            --[>] MODIFICACIONES FORMALIZACION.  

            --[>] FUENTES RUV.  

            --[_] scss / material.  

            --[_] ConsultaLog.html.  

--[_] Estilos. 

        --[_] Modal status (POPPER).
        --[_] Install Angular Material. 
        --[_] Bootstrap (mobile).      
        --[_] SCSS.      

--[_] Dynamic Forms.   
--[_] Temario Angular.
      --[_] Hooks.
      --[_] PWA ( Progressive Web Application ).

==========================================================================================


