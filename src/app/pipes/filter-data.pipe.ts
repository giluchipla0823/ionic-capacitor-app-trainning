import { Pipe, PipeTransform } from '@angular/core';
import { ArrayUtil } from '@utils/array.util';

@Pipe({
  name: 'filterData',
})
export class FilterDataPipe implements PipeTransform {
  transform(
    data: Array<unknown>,
    keyword: string,
    propertiesFilter: Array<string>
  ): any {
    return ArrayUtil.filterData<unknown>(data, keyword, propertiesFilter);
  }
}
