const { sleep, warmAll, retry, abort } = require('./dist/index.main');

// const testArray = Array.from({ length: 10 })
//   .fill(1)
//   .map((item, index) => async () => {
//     const time = ((index % 5) + 0.5) * 1000;
//     const res = await sleep(time);
//     console.log(`索引${index}`);
//     return res;
//   });
//
// warmAll(testArray, { race: 3000, limit: 5 }).then((res) => console.log(res));

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

abort(
  async () => {
    const delay = Math.random() * 4 * 1000;
    setTimeout(Promise.resolve, delay);
  },
  { time: 2000 },
);
