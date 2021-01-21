import { PromiseAsyncLike } from './types';

interface RetryOptions {
  time?: number;
}

export class AbortError extends Error {
  originalError: Error;

  constructor(message: string | Error) {
    super();

    if (message instanceof Error) {
      this.originalError = message;
      ({ message } = message);
    } else {
      this.originalError = new Error(message);
      this.originalError.stack = this.stack;
    }

    this.name = 'AbortError';
    this.message = message;
  }
}

// 超时reject
const raceReject = (delay: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(new AbortError('请求超时！'));
    }, delay);
  });

/**
 * 超时返回
 * @param task promiseLike函数
 * @param options 配置
 */
export function abort<U>(task: PromiseAsyncLike<U>, options?: RetryOptions): Promise<U> {
  if (!task) {
    throw new Error('task不能为空');
  }
  const { time = 0 } = options || {};
  return new Promise((resolve, reject) => {
    // @ts-ignore
    Promise.race([task(), raceReject(time)]).then((res: U | AbortError) => {
      if (res instanceof AbortError) {
        reject(res);
      } else {
        resolve(res);
      }
    });
  });
}
