import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgDatepickerModule } from 'ng2-datepicker';


import { AppComponent } from './app.component';
import { RecordComponent } from './record/record.component';
import { DivisionComponent } from './division/division.component';

import { DataService } from './data.service';
import { KeysPipe } from './keys.pipe';
import { FiltersComponent } from './filters/filters.component';


@NgModule({
  declarations: [
    AppComponent,
    RecordComponent,
    DivisionComponent,
    KeysPipe,
    FiltersComponent
  ],
  imports: [
    BrowserModule,
    NgDatepickerModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
