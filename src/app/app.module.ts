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
import { AppComponent             } from './app.component';
import { LogInfoViewComponent     } from './loginfoview/loginfoview.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInfoViewComponent,
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
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
