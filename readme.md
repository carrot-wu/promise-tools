
## 个人通用promise库

### warmAll(task, [options])
+ task: promiseLike函数即可
+ options.race: 最大超时时间 伪取消请求 请求依然会发出正常处理，知识如果等待时间超过超时时间那么返回的res数组就是error类型
+ options.limit: 最大并发数

增强级的`Promise.all`方法。
1. 对每一个promise进行单独的错误处理，单一的task错误不再直接进行reject。
2. 支持最大并发数limit
3. 支持设置promise的超时时间race

```
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

