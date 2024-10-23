const pick = <TData extends { [key: string]: unknown } = Record<string, never>>(obj: TData, keys: (keyof TData)[]) => {
  return keys.reduce((finalObj: Pick<TData, keyof TData>, key) => {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      finalObj[key] = obj[key];
    }
    return finalObj;
  }, {} as Pick<TData, keyof TData>);
};

export default pick;
