const fs = require('fs');
//노드에서 제공하는압축할 수 잇는 함수
const zlib = require('zlib');


const readStream = fs.createReadStream('./file.txt');

const zlibStream = zlib.createGzip();

const writeStream = fs.createWriteStream('./file4.zip');

// stream의 데이터를 읽어오면어 그대로 연결 하는 것
//파이프 관을 연결해서 물처럼 흘러가게 만들어주는것

// 읽는 스트림을 압축하느 스트림과 파이프로 연결하고 쓰는 스트림과 연결함
// 그럼 압축된 결과를 얻을 수 있다. 그래서 확장자를 zip으로 받는다고 생각하면 된다.
const piping = readStream.pipe(zlibStream).pipe(writeStream);
piping.on('finish', () => {
    console.log('done!');
});

// 파이핑은 나중에 서버를 만들 떄도 도움이된다.

const http = require('http');
const server = http.createServer((req,res)=> {
// 방법 1
    /*    fs.readFile('file.txt', (err, data) => {
        res.end(data);    });*/

// 방법 2
    const stream = fs.createReadStream('./file.txt');
    stream.pipe(res);
});
server.listen(3000);