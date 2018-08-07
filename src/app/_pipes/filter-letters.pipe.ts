import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterLetters'
})
export class FilterLettersPipe implements PipeTransform {
  transform(choices: any): any {
    const b = choices.map(x => x.choiceStr.substr(3));
    console.log(choices);
    console.log(b);
    return b;
  }
}
