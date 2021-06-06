const process = require('process');

console.log(process.execPath);
console.log(process.version);
console.log(process.pid);
console.log(process.ppid);
console.log(process.platform);


// 현재 수행이 끝나고나면 0초 잇다가 콜백함수를 수행해줘
setTimeout(() => {
console.log("setTimeout")
},3)

// 현재 수행 코드가 완료된 다음에
// 내가 등록한 callback 함수를 test que 에 넣어달라고 할 때 사용한다.
process.nextTick( () => {
    console.log('nextTick')
})

for (let i = 0; i < 10000; i++) {
    console.log('for loop')
}