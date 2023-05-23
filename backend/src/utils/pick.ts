export const pick = <T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> => {
  const entries = keys.map((k) => [k, obj[k]]);
  return Object.fromEntries(entries);
};
