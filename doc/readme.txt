
==========================================================================================
-- STRAREGY
==========================================================================================

--[_] you.ai / chatgpt / https://you.com/code.
--[_] Desbloquear usuario spae.
--[_] Cambiar dominio aplicativos publicados en SOMEE.COM.
--[_] Formulario de búsqueda.
--[_] Modal status.
--[_] Reducir rango por defecto de fechas en entorno de producción.
--[_] Numeros de Versionamiento. 
--[_] Version de Angular en parte inferior. 

==========================================================================================
-- SCM
==========================================================================================

--[_] http://localhost/HOME/consultalog

--[_] http://localhost/HOME/getconsultalogget?P_ID_DATA_SOURCE=1&P_ID_TIPO_LOG=1&P_ID_LOG=0&P_FECHA_INICIO="01-01-2001"&P_FECHA_FIN="31-12-2022"&P_ROW_NUM=-1

--[_] http://localhost/HOME/getconsultalogget?P_ID_DATA_SOURCE=1&P_ID_TIPO_LOG=1&P_ID_LOG=0&P_FECHA_INICIO=%2201-01-2001%22&P_FECHA_FIN=%2231-12-2022%22&P_ROW_NUM=-1

--[_] http://localhost/HOME/getconsultalogget?P_ID_DATA_SOURCE=2&P_ID_TIPO_LOG=1&P_ID_LOG=0&P_FECHA_INICIO=%2201-01-2001%22&P_FECHA_FIN=%2231-12-2022%22&P_ROW_NUM=-1

--[_] http://vivantopruebas.unidadvictimas.gov.co/spae/home/getconsultalogget?P_ID_DATA_SOURCE=2&P_ID_TIPO_LOG=1&P_ID_LOG=0&P_FECHA_INICIO=%2201-01-2001%22&P_FECHA_FIN=%2231-12-2022%22&P_ROW_NUM=-1

--[_] 

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



