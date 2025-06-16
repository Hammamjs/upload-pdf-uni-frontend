export const getLocalstorage = (key: string) => {
  return localStorage.getItem(key);
};

export const addToLocalstorage = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const isExistInLocalStorage = (key: string): boolean =>
  localStorage.getItem(key) !== null;

export const clearFromLocalstorage = (key: string): void =>
  localStorage.removeItem(key);
