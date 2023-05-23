export const boolPreprocess = (input: unknown) => {
  if (typeof input === 'string') {
    const value = input.toLowerCase();
    if (value === 'true') {
      return true;
    } else if (value === 'false') {
      return false;
    }
  }
  return input;
};

export const numberPreprocess = (input: unknown) => {
  if (typeof input === 'string' && !isNaN(Number(input))) {
    return Number(input);
  }
  return input;
};
