import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {

  /**
   * This takes an object and transforms it into an array of key and value pairs
   *
   * @param value
   * @param args
   * @returns {any}
   */
  transform(value: any, args?: any): any {
    let keys = [];

    for (let key in value) {
      keys.push({key: key, value: value[key]});
    }

    return keys;
  }

}
