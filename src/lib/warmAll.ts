import { abort } from '@src/lib/abort';
import { PromiseAsyncLike } from './types';

interface PromiseLimitWarmAllOptions {
  limit?: number;
  // 开启超时reject的时间
  race?: number;
}

/**
 * 轻量级错误提示all 每个promise单独处理 支持最大并发数 支持每个promise的最大超时时间
 * @param taskArray promise数组
 * @param options 配置 其
 * @param options.limit 配置 其中limit用于限制最大并发数
 * @param options.race 配置 promise请求最大超时时间
 */
export function warmAll<U>(
  taskArray: PromiseAsyncLike<U>[],
  options?: PromiseLimitWarmAllOptions,
): Promise<(U | Error)[]> {
  if (!Array.isArray(taskArray)) {
    throw new Error('task必须为数组类型');
  }
  if (!taskArray.length) {
    return Promise.resolve([]);
  }
  const { limit = taskArray.length, race = 0 } = options || {};
  const sliceTaskArray = taskArray.slice();
  const taskLength = taskArray.length;
  return new Promise((resolve) => {
    const resArray: (U | Error)[] = Array.from<Error>({
      length: taskArray.length,
    }).fill(new Error('空数据'));

    let completeTaskLength = 0;

    function next() {
      if (!sliceTaskArray.length) {
        return;
      }
      const currentIndex = taskLength - sliceTaskArray.length;
      const nextTask = sliceTaskArray.shift();
      if (!nextTask) {
        return;
      }
      const taskFnPromise = race ? abort(nextTask, { time: race }) : nextTask();
      taskFnPromise
        // 成功
        .then((res) => {
          resArray[currentIndex] = res as U;
        })
        .catch((error) => {
          resArray[currentIndex] = error;
        })
        .finally(() => {
          completeTaskLength += 1;
          if (completeTaskLength >= taskArray.length) {
            resolve(resArray);
          } else {
            next();
          }
        });
    }

    for (let i = 0; i < limit; i++) {
      next();
    }
  });
}
