import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JalaliDatePipe } from './pipes/jalali-date.pipe';



@NgModule({
  declarations: [
    JalaliDatePipe
  ],
  imports: [
    CommonModule
  ]
})
export class ShareModule { }
