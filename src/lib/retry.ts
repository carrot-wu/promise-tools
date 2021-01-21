import { PromiseAsyncLike } from './types';

interface RetryOptions {
  time?: number;
}

/**
 * 返回一个重试的原promise函数
 * @param task promiseLike函数
 * @param options 配置
 */
export function retry<U>(task: PromiseAsyncLike<U>, options?: RetryOptions): Promise<U> {
  if (!task) {
    throw new Error('task不能为空');
  }
  const { time = 1 } = options || {};
  return new Promise((resolve, reject) => {
    let retryTime = 1;

    function taskFn() {
      task()
        .then(resolve)
        .catch((error) => {
          if (retryTime >= time) {
            reject(error);
          } else {
            retryTime += 1;
            taskFn();
          }
        });
    }
    taskFn();
  });
}
