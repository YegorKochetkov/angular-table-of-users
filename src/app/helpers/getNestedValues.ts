export const getNestedValues = (data: object, values: string[]) => {
  if (!(data instanceof Array) && typeof data === 'object') {
    Object.values(data).forEach((value: string | Object) => {
      if (!(value instanceof Array) && typeof value === 'object'){
         getNestedValues(value, values);
      } else if (typeof value === 'string') {
        values.push(value);
      }
   });
  }

  return values;
}
