export interface LogEntry_
{
    ID_LOG     : string;
    DATE_TIME  : string;
    TEXT_1     : string;
    TEXT_2     : string;
    TEXT_3     : string;
    TEXT_1_WEB : string;
    TEXT_2_WEB : string;
}

export class  p_DataSource
{
    //
    constructor(
        public    DATA_SOURCE_ID   : string,
        public    DATA_SOURCE_NAME : string
    )
    {
        //
    }
}