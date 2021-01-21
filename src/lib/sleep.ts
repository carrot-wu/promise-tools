/**
 * 异步延迟函数
 * @param delay 延迟时间
 */
export const sleep = (delay: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(delay);
    }, delay);
  });
