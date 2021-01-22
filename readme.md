
## 个人通用promise库

### warmAll(task, [options])
+ task: promiseLike函数即可
+ options.race: 最大超时时间 伪取消请求 请求依然会发出正常处理，知识如果等待时间超过超时时间那么返回的res数组就是error类型
+ options.limit: 最大并发数

增强级的`Promise.all`方法。
1. 对每一个promise进行单独的错误处理，单一的task错误不再直接进行reject。
2. 支持最大并发数limit
3. 支持设置promise的超时时间race

```js
const { sleep, warmAll } = require('./dist/index.main');

const testArray = Array.from({ length: 10 })
  .fill(1)
  .map((item, index) => async () => {
    const time = ((index % 5) + 0.5) * 1000;
    const res = await sleep(time);
    console.log(`索引${index}`);
    return res
  });

warmAll(testArray, { race: 3000, limit: 5 }).then((res) => console.log(res));
// [500, 1500, 2500, error, error, 500, 1500, 2500, error, error]
```
### retry(task, [options])
+ task: promiseLike函数即可
+ options.time: 抛出错误是支持自动重新发起请求的次数

```js
let time = 0;

retry(
  async () => {
    if (time >= 2) {
      return Promise.resolve('成功');
    }
    time += 1;
    console.log(`第${time}次失败`);
    return Promise.reject(new Error(`第${time}次失败`));
  },
  { time: 3 },
).then((res) => {
  console.log(res);
});

// 第一次失败 第二次失败 成功

```

### sleep(delay)
延迟时间task

```js
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

```

### retry(task, [options])
+ task: promiseLike函数即可
+ options.time: 超时时间
超时时间设置，超过了超时时间并不会abort掉发送的task请求，因为是通过race模拟的所以不推荐在task中写入业务逻辑。

```js
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

```
