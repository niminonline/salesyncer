import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'twoDecimalDigits'
})
export class TwoDecimalDigitsPipe implements PipeTransform {

 
  transform(value:number):number{

    if(!value) return value;
    return parseFloat(value.toFixed(2))
   }
}
