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
export class  searchCriteria
{
    //
    constructor(
        public    P_DATA_SOURCE_ID   : string
    )
    {
        //
    }
}