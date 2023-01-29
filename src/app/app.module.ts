import { NgModule                 } from '@angular/core';
import { BrowserModule            } from '@angular/platform-browser';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import { HttpClientModule         } from '@angular/common/http';
import { AppRoutingModule         } from './app-routing.module';
import { MatListModule            } from '@angular/material/list';
import { MatTableModule           } from '@angular/material/table';
import { MatPaginatorModule       } from '@angular/material/paginator';
import { AppComponent             } from './app.component';
import { LogInfoViewComponent     } from './loginfoview/loginfoview.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInfoViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
