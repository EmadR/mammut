import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CeremoniesComponent} from './ceremonies/ceremonies.component';
import {MatStepperModule} from "@angular/material/stepper";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {DateAdapter, MAT_DATE_FORMATS, MatNativeDateModule} from "@angular/material/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSelectModule} from "@angular/material/select";
import {NgxMaskDirective, NgxMaskPipe, provideNgxMask} from "ngx-mask";
import {CUSTOM_DATE_FORMATS, JalaliMomentDateAdapter} from "./data/utils/jalali-adapter";

@NgModule({
  declarations: [
    AppComponent,
    CeremoniesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatSelectModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [
    provideNgxMask(),
    {provide: DateAdapter, useClass: JalaliMomentDateAdapter},
    {provide: MAT_DATE_FORMATS, useClass: CUSTOM_DATE_FORMATS}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
