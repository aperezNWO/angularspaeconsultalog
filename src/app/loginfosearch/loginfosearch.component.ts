import { Component   } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
//
@Component({
  selector: 'app-loginfosearch',
  templateUrl: './loginfosearch.component.html',
  styleUrls: ['./loginfosearch.component.scss']
})
//
export class LoginfosearchComponent {
  //
  searchForm   = this.formBuilder.group({
    P_DATA_SOURCE_ID   : ['2'           , Validators.required],
    P_ROW_NUM          : ['99'          , Validators.required],
    P_FECHA_INICIO     : ['2022-09-01'  , Validators.required],
    P_FECHA_FIN        : ['2022-09-30'  , Validators.required],
  });
  //
  constructor(private formBuilder: FormBuilder)
  {
      //
  }
  //
  onSubmit() 
  { 
      //
      console.warn("(SUBMIT)");
  }
  //
  newSearch()
  {
      //
      this.searchForm   = this.formBuilder.group({
        P_DATA_SOURCE_ID   : ['2'           , Validators.required],
        P_ROW_NUM          : ['99'          , Validators.required],
        P_FECHA_INICIO     : ['2022-09-01'  , Validators.required],
        P_FECHA_FIN        : ['2022-09-30'  , Validators.required],
      });
      //
      console.log("(NEW SEARCH)");
  }
}
