export const isSSR = typeof window === 'undefined';
export const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

export const niceBytes = (x: any) => {
  let l = 0;
  let n = parseInt(x, 10) || 0;
  // eslint-disable-next-line no-plusplus
  while (n >= 1024 && ++l) {
    n /= 1024;
  }
  return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
};
