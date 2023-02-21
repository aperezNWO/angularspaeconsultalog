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
        public P_ID_DATA_SOURCE  : string,
        public P_VIGENCIA        : string,
        public P_IDENTIFICACION  : string
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
        public ID_SOLICITUD : string
    )
    {
        //
    }
    /*
     public string VIGENCIA                { get; set; }
     public string CEDULA                  { get; set; }
     public string NOMBRE_COMPLETO         { get; set; }
     public string ID_PERSONA              { get; set; }
     public string ID_HOGAR                { get; set; }
     public string TELEFONO_1              { get; set; }
     public string TELEFONO_2              { get; set; }
     public string TELEFONO_3              { get; set; }
     public string EMAIL                   { get; set; }
     public string DIRECCION               { get; set; }
     public string BARRIO                  { get; set; }
     public string DANE                    { get; set; }
     public string DANE_DEPARTAMENTO       { get; set; }
     public string DANE_MUNICIPIO          { get; set; }
     public string FUD                     { get; set; }
     public string ALIMENTACION            { get; set; }
     public string ALOJAMIENTO             { get; set; }
     public string ID_ESTADO               { get; set; }
     public string ESTADO_SOLICITUD        { get; set; }
     public string ID_MUNICIPIO            { get; set; }
     public string USUARIO                 { get; set; }
     public string FUNCIONARIO_SOLICITUD   { get; set; }
     public string RESPONSABLE_SOLICITUD   { get; set; }
     public string OBSERVACION_SOLICITUD   { get; set; } */
 }