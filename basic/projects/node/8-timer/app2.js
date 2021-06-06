console.log('code1')
console.time('timeout 0');

setTimeout(()=> {
    console.timeEnd('timeout 0');
    console.log('setTimeout 0 ');
},0);

// console.log('code2')
// setImmediate( () => {
//     console.log('setImmediate');
// })
//
// console.log('code3')
// process.nextTick(() => {
//     console.log('process.nextTick')
// });

// console.log 123 이것들이 다 찍힌 후에 set timeout 이새끼들이 실행이되는데
// 여기서서process.nextTick이 우선순위가 제일 높다

