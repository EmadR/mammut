import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {DateAdapter, MAT_DATE_FORMATS} from "@angular/material/core";
import {JalaliMomentDateAdapter} from "./data/utils/jalali-date-adapter";
import {CeremoniesComponent} from "./ceremonies/ceremonies.component";

export const CUSTOM_DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY/MM/DD',
  },
  display: {
    dateInput: 'YYYY/MM/DD',
    monthYearLabel: 'MMM YYYY',
    monthYearA11yLabel: 'MMM YYYY',
    yearLabel: 'YYYY',
    yearA11yLabel: 'YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CeremoniesComponent
  ],
  providers: [
    {provide: DateAdapter, useClass: JalaliMomentDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
