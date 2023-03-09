export class LogEntry_
{
    constructor (
        public ID_LOG           : string,
        public DATE_TIME        : string,
        public TEXT_1           : string,
        public TEXT_2           : string,
        public TEXT_3           : string,
        public TEXT_1_WEB       : string,
        public TEXT_2_WEB       : string,
    )
    {
        //
    }  
}
//
export class  p_DataSource
{
    //
    constructor(
        public    M_DATA_SOURCE_ID   : string,
        public    M_DATA_SOURCE_NAME : string
    )
    {
        //
    }
}
//
export class  p_EstadosFormmalizacion
{
    //
    constructor(
        public    M_ID_ESTADO_SOL_FORMALIZACION  : string,
        public    M_DESCRIPCION                  : string
    )
    {
        //
    }
}
//
export class  p_TipoLog
{
    //
    constructor(
        public    M_TIPO_LOG_ID   : string,
        public    M_TIPO_LOG_NAME : string
    )
    {
        //
    }
}
//
export class  searchCriteria
{
    //
    constructor(
        public    P_DATA_SOURCE_ID   : string,
        public    P_ID_TIPO_LOG      : string,
        public    P_ROW_NUM          : string,
        public    P_FECHA_INICIO     : string,
        public    P_FECHA_FIN        : string,
        public    P_FECHA_INICIO_STR : string,
        public    P_FECHA_FIN_STR    : string  
    )
    {
        //
    }
}
//
export class dineroSearchCriteria
 {
    //
    constructor(
        public P_ID_DATA_SOURCE     : string,
        public P_VIGENCIA           : string,
        public P_IDENTIFICACION     : string,
        public P_FUD                : string,
        public P_ID_ESTADO          : string,
        public CHK_P_IDENTIFICACION : boolean,
        public CHK_P_FUD            : boolean
    )
    {
        //
    }
 }
 //
export class DineroSearchResultEntity
 {
    //
    constructor (
        public ID_SOLICITUD              : string,
        public NOMBRE_COMPLETO           : string,
        public FUD                       : string,
        public ESTADO_SOLICITUD          : string,
        public RESPONSABLE_SOLICITUD     : string,
        public DANE_DEPARTAMENTO         : string,
        public DANE_MUNICIPIO            : string,
    	public OBSERVACION_SOLICITUD     : string
    )
    {
        //
    }
    /* 
    --[x] public string VIGENCIA                { get; set; }
    --[x] public string CEDULA                  { get; set; }
	--[_] public string ID_PERSONA              { get; set; }
	--[_] public string ID_HOGAR                { get; set; }
	--[_] public string TELEFONO_1              { get; set; }
	--[_] public string TELEFONO_2              { get; set; }
	--[_] public string TELEFONO_3              { get; set; }
	--[_] public string EMAIL                   { get; set; }
	--[_] public string DIRECCION               { get; set; }
	--[_] public string BARRIO                  { get; set; }
	--[_] public string DANE                    { get; set; }
	--[_] public string ALIMENTACION            { get; set; }
	--[_] public string ALOJAMIENTO             { get; set; }
	--[_] public string ID_ESTADO               { get; set; }
	--[_] public string ID_MUNICIPIO            { get; set; }
	--[_] public string USUARIO                 { get; set; }
	--[_] public string FUNCIONARIO_SOLICITUD   { get; set; } */
 }
//
export class  p_Vigencia
{
    //
    constructor(
        public    M_VIGENCIA_ID   : string,
        public    M_VIGENCIA_NAME : string
    )
    {
        //
    }
}
