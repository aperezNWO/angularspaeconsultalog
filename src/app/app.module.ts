import { NgModule                 } from '@angular/core';
import { FormsModule              } from '@angular/forms';
import { BrowserModule            } from '@angular/platform-browser';
import { RouterModule             } from '@angular/router';
import { ReactiveFormsModule      } from '@angular/forms';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import { HttpClientModule         } from '@angular/common/http';
import { AppRoutingModule         } from './app-routing.module';
import { MatListModule            } from '@angular/material/list';
import { MatTableModule           } from '@angular/material/table';
import { MatPaginatorModule       } from '@angular/material/paginator';
import { MatTabsModule            } from '@angular/material/tabs';
import { AppComponent                     } from './app.component';
import { LogInfoViewComponent             } from './loginfoview/loginfoview.component';
import { ConsultaDineroViewComponent      } from './consulta-dinero-view/consulta-dinero-view.component';
import { ConsultahistoricodineroComponent } from './consultahistoricodinero/consultahistoricodinero.component';

@NgModule({   
  declarations: [
    AppComponent,
    LogInfoViewComponent,
    ConsultaDineroViewComponent,
    ConsultahistoricodineroComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    RouterModule.forRoot([
      {  path: 'consultadineroview'      , component: ConsultaDineroViewComponent               },
      {  path: 'loginfoview'             , component: LogInfoViewComponent                      }, 
      {  path: 'consultadinerohistorico' , component: ConsultahistoricodineroComponent          }, 
    ])    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
