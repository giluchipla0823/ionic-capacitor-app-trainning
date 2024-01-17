export class ArrayUtil {
  static filterData<T>(
    data: Array<T>,
    keyword: string,
    properties: Array<string> = []
  ): Array<T> {
    const countProperties = properties?.length || 0;

    if (countProperties === 0 || !keyword) {
      return data;
    }

    return data.filter((item: any) => {
      let itemFound = false;

      for (let i = 0; i < countProperties; i++) {
        if (new RegExp(keyword, 'gi').test(item[properties[i]])) {
          itemFound = true;
          break;
        }
      }
      return itemFound;
    });
  }
}
