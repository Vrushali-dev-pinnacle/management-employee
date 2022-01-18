import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'contentElipsis'
})
export class ContentElipsisPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let len = args[0] || 10;
    if (value !== null) {
      if (value.length > len) {
        return `${value.substring(0, len)}...`;
      } else {
        return value;
      }
    }
  }

}
