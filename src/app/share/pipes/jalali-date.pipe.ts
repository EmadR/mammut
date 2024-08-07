import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'jalali-moment';

@Pipe({
  name: 'jalaliDate'
})
export class JalaliDatePipe implements PipeTransform {
  transform(value: any, format: string = 'dddd YYYY/MM/DD'): any {
    const MomentDate = moment(value);
    return MomentDate.locale('fa').format(format);
  }
}
