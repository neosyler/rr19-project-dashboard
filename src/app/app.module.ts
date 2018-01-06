import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { RecordComponent } from './record/record.component';
import { DivisionComponent } from './division/division.component';

import { DataService } from './data.service';
import { KeysPipe } from './keys.pipe';


@NgModule({
  declarations: [
    AppComponent,
    RecordComponent,
    DivisionComponent,
    KeysPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
