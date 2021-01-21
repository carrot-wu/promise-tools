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
