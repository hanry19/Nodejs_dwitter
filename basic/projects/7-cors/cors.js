import express from 'express';
import cors from 'cors'; 

const app = express();


app.use(
    cors({
        origin: ['http://127.0.0.1:5500/'],
    }));

/* app.use((req, res, next)=> {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
    res.setHeader(
        'Access-Control-Allow_Methods',
        'OPTIONS, GET, POST, PUT, DELETE'
    );
    
    next();
}) */

app.get('/',(req,res) => {
    res.send("welcococococm");

});

app.listen(8080);





// 같은 폴더 안에 있지만 서버는 8080에서 front는 5500에서 동작하고 있다. 
// 그리고 index.html은 서버에 데이터를 get으로 요청해서 출력하고 있다. 
/*    <script>
       fetch('http://localhost:8080', {method : 'GET'})
       .then(console.log)
       .catch(console.error);

   </script> */

   // 그리고 console을 보게되면 아래와 같은 에러가 발생한다.

//    "fetch에 접근하는 거는 CORS policy에 의해 막혔다"

/* Access to fetch at 'http://localhost:8080/' from origin '
http://localhost:5500' has been blocked by CORS policy: No 
'Access-Control-Allow-Origin' 
header is present on the requested resource. 
If an opaque response serves your needs,
 set the request's mode to '
 no-cors' to fetch the resource with CORS disabled. */


 // CORS 는 브라우저에서만 가지고 잇는 cors 정책이 있다.
 // 클라이언트와 서버가 동일한 IP주소 즉 서버에서 동작한다면 별 문제없이 진행되지만,
 // 만약 클라이언트가 서버와 다른 도메인,ip에 잇다면 원칙적으로 
 // 그 어떤 데이터도 주고받을 수 없다. 주고 받기 위해서는 서버에서 반응을 보낼 때
 // access-control-allow-origin 이라는 부분을 헤더에 추가해줘야지
 // browser에서 서버가 허용 했으니 이 데이터를 가지고 가서 표기해도 된다고 받아들여 
//  클라이언트에서 받을 수 있다.
//기본적으론 다른 ip에서는 데이터 쉐어링이 불가능하다.
// 가능하게 하려면 지정된 것을 header에 표기해야 한다. 
/* 
app.use((req, res, next)=> {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
    res.setHeader(
        'Access-Control-Allow_Methods',
        'OPTIONS, GET, POST, PUT, DELETE'
    );
    
    next();
})
 */

//  이렇게 해주면 정상적으로 데이터를 받을 수 있다.
// 이렇게 햇을때 문제점은 header이름에 대해서 정확히 알아야하고, 오타가 나면 동작이 안되고 
// 시작마다 해야하는 번거로움이 잇다. 이걸 커버치는 미들웨어가 있다. 
// npm i cors

//이렇게 설치해주면 import cors from 'cors'; 해주고 
// app.use(cors()); 이렇게만 해주면 된다. 
// 그리고 network에 localhost의 header를 보면 서버로부터 설정된걸 볼 수 잇다.

// Access-Control-Allow-Origin 이거는 클라이언트에게 어떤 메소드로 접속하든 다 보여줘도 된다는 의미
// 그래서 특정한 도메인에서 ,즉 우리가 배포한 클라이언트에서만 보여질 수 있도록 하는 게 좋다.
// 그래서 cors에 옵션을 줄 수 잇는데 아래와 같이 origin을 해줘서 항상 해당 주소에서만
// 볼수 있도록, 즉 cors policy를 허용할 수잇도록 만들 수 잇다. 


/* app.use(
    cors({
        origin: ['http://127.0.0.1:5500/'],
    }));  */


// 다른 옵션으로는 http options method를 통해 자동으로 200으로 응답하게 할 수있고, 
// 또한 header에 token이나 사용자의 정보를 추가하려는 것을 허용한다면 아래와 같이 한다. 
/* 
app.use(
    cors({
        origin: ['http://127.0.0.1:5500/'],
        optionsSuccessStatus : 200,
        credentials :true,  //Access-Control-Allow-Credentitals : true
    }));  */