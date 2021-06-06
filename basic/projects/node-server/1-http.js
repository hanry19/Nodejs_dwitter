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


//서버를 만들기 위해선 
// createServer 는 옵션을 줘서 설정을 할 수잇고, 주지않고 바로 listener를 줄 수 있다. 
// 이 listener는 요청이 오고 반응할 대 사용할 수 잇는 response객체도 전달해준다. 
// 그래서 사용할 때 callback함수는 req, res로 등록해ㅜㄴ다. 
const server  = http.createServer((req, res) =>{
    console.log('incoming...');
    console.log(req.headers);
    console.log(req.httpVersion);
    console.log(req.method);
    console.log(req.url);
//  지금 위에 까지만 작성을 하면 특정시간이 지나면 timeout error가 발생한다. 
    // 이는 서버의 반응(response)가 없기 때문이다.


    // res.. write and end 한 이후에 살 덫 붙이는 것

    const url = req.url;
    if(url ==='/'){
        res.setHeader('Content-Type', 'text/html');
/*         res.write('<html>')
        res.write('<head><title> academy </title> </head>')
        res.write('<body><h1> welcome!!! </h1></body>')
        res.write('</html>') */
        fs.createReadStream('./html/index.html').pipe(res);
    

    } else if(url ==='/courses'){

/*         res.setHeader('Content-Type', 'text/html')
        res.write('<html>')
        res.write('<head><title> academy </title> </head>')
        res.write('<body><h1> courses! </h1></body>')
        res.write('</html>') */
        res.setHeader('Content-Type', 'text/html');
        fs.createReadStream('./html/courses.html').pipe(res);

    }else{
/*     res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head><title> academy </title> </head>')
    res.write('<body><h1> not found </h1></body>') */

    res.setHeader('Content-Type', 'text/html');
    fs.createReadStream('./html/else.html').pipe(res);

    }

    



});

// 만든 서버에 listen을 등록해줘야하나다 그리고 어떤포트에서 들을 건지도 줘야함
// 자바에서는 아파치를 설치하거나 해야하는데 노드에서는 전혀 그런게 필요없다.
server.listen(9090);

