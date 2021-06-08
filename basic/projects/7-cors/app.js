import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import morgan from 'morgan';
import helmet from 'helmet';

const app = express();
2
const corsOption = {
    origin: ['http://127.0.0.1:5500'],
    optionsSuccessStatus : 200,
    credentials :true,  
};

app.use(express.json());
app.use(cookieParser())
app.use(morgan('combined'));
app.use(corsOption); 

app.use(helmet());


app.get('/',(req,res) => {
    console.log(req.body);
    console.log(req.cookies);
    res.send("welcococococm");

});

app.listen(8080);


/* 

커뮤니티 사에서 많이 사용되는 미들웨어  아래 3가지 설치
npm i cookie-parser morgan helmet

requst 안에 있는 바디를 보려면 consol.log(req.body)하고 
npm실행 => re-loading을 하면 undefined로 나왔다. 

body를 보려면 express자체에서 제공하는 json을 을 등록 해야한다. 
app.use(express.json()); 이렇게 해야지  {} 이런식으로 나온다. 

마찬가지로 그냥 consol.log(req.cookies); 를 하면 undefined로 나온다
이거를 제대로 보려면 cookiePaser를 import해주고 
import cookieParser from 'cookie-parser'
app.use(cookieParser());  등록해줘야한다.
등록해주면 token이 나온다. (나는 안나옴)

그러고 postman을 켜고 headers에서 cookie 값을 전달 get으로 전달해주면
전달 값 yummy_cookie=choco; tasty_cookie=strawberry
{ yummy_cookie: 'choco', tasty_cookie: 'strawberry' }
전달 한 값이 콘솔에 찎히는걸 볼 수 있다.


import morgan from 'morgan';


morgan은 사용자에게  요청을 받을 때마다 어떤 요청을 받고, 얼마나 걸렸는지 것들을 log로 남기고 싶다면
console.log('GET' + req.method); 이렇게 해줘야하는데 이것을 자동으로 해준다. 
사용하는 방법은 
app.use(morgan('combined')) 을 해주면 되고 어떤 포멧으로 로그를 남길건지 포멧을 정할 수 잇다. 
기본은 'combined' 이다. 출력해보면

::1 - - [07/Jun/2021:03:56:30 +0000] "GET / HTTP/1.1" 200 13 "http://localhost:5500/" "Mozilla/5.0 (Windows NT 10.0; Win64; 
x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36"

이렇게 나옴. 자세한건 morgan 홈페이지를 통해서 알 수 있다. 
이걸 통해서 어떤 요청이 들어왔는지 관찰을 할 때 유용하게 사용할 수 있다. 


import helmet from 'helmet';
cors에는 클라이언트에게 응답을 보낼 때 header에 해당 주소에 대해서는 내 서버의 데이터를 보여줘도 된다고 허락하는 것이다. 
helmet은 이거랑 비슷하면서 다르다. 
app.use(helmet());

위 와 같이 작성하고 network를 보게 되면 추가적인 head가 helmet에 의해 추가된걸 볼 수 있다.
helmet은 공통적으로 보안에 필요한 것들을 추가 해준다. 


여기까지 사용할 수잇는 유용한 미들웨어를 배움

사용하는 미들웨어를 한눈에 보고 싶으면 옵션들을 다 지우고 
필요한 옵션들은 밖으로 빼준다. 


const corsOption = {
    origin: ['http://127.0.0.1:5500'],
    optionsSuccessStatus : 200,
    credentials :true,  
};


app.use(express.json());
app.use(cookieParser())
app.use(morgan('combined'));
app.use(corsOption); 

    app.use(helmet());


*/