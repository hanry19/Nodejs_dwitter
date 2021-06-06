const fs = require('fs');
const data = [];

const readStream = fs.createReadStream('./file.txt',{
    highWaterMark: 8, //기본 64kbytes로 되어 있다.
    // encoding: 'utf8',
}).once('data',(chunk) => {
    // console.log(chunk); //s넌무 많이 출력된다.
    data.push(chunk);
    console.count('data'); // 8바이트로 가져와서 오래걸리지만 64로 바꾸면 빠름
}).on('end', () => {
    console.log(data.join(''))
}).on('error', (error) => {
    console.log(error);
})