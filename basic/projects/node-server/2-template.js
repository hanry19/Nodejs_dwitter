// node에서 제공하는 http 모듈을 사용한다 
// http 랑 http2가 있디.

const http = require('http');
// const http2 = require('htt2');

// http는  모든 브라우저에서 https와 함꼐 적용이 됨으로 개발 pc에는 https를 위한 ssl certification이 앖다. 
// 물론 받아서 헤도 되지만 개발 단계에서 하기에는 복잡하기에 
// 나중에 배포할 떄 http2로 변경 하겟다.


// html 문법을 여기다 그대로 쓰기에는 너무 번거로우니까 
// html파일을 가져오는 방법을 쓸거다 . 그러기 위해선 fs 를 import한다.

const fs = require('fs');

const ejs = require('ejs');


const name = 'Ellie';
const courses = [{name: 'html'},
                {name: 'css'},
                {name: 'js'},
                {name: 'node'}];


//서버를 만들기 위해선 
// createServer 는 옵션을 줘서 설정을 할 수잇고, 주지않고 바로 listener를 줄 수 있다. 
// 이 listener는 요청이 오고 반응할 대 사용할 수 잇는 response객체도 전달해준다. 
// 그래서 사용할 때 callback함수는 req, res로 등록해ㅜㄴ다. 
const server  = http.createServer((req, res) =>{
    const url = req.url;
    res.setHeader('content-type', 'text/html')
    if(url ==='/'){
       ejs.renderFile('./template/index.ejs',{name: name}) // key, value 이름이 같으면 {name} 으로 생략가능
        .then(data => res.end(data))

    } else if(url ==='/courses'){
        ejs.renderFile('./template/courses.ejs',{courses}) // key, value 이름이 같으면 {name} 으로 생략가능
        .then(data => res.end(data))

    }else{
        ejs.renderFile('./template/else.ejs',{name: name}) // key, value 이름이 같으면 {name} 으로 생략가능
        .then(data => res.end(data))

    }
});

// 만든 서버에 listen을 등록해줘야하나다 그리고 어떤포트에서 들을 건지도 줘야함
// 자바에서는 아파치를 설치하거나 해야하는데 노드에서는 전혀 그런게 필요없다.
server.listen(8080);

