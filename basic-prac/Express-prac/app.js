import express from  'express'
const app = express();


// post를 처리한다는 것은 클라이언트가 무언가 만들기 원하기 때문에 
// req에서 body를 읽어와야 한다. 
// 그래서 postman으로 실행시켜보면 undefined가 출력된다.
// express에서 body에 있는 내용을 읽기 위해서는 
// express에서 지원하는 미들웨어를 사용하면 된다 .
// 공식홈페이지 중 express.json() 이라는게 있다. 이걸 이용하면 요청에 들어오는 
// 바디를 parsing 해서 우리에게 보여준다.
// 하는 방법은 app.use(express.json())을 해주면 body가 들어오는 걸 볼 수 있다.

app.use(express.json());
app.post('/', (req, res, next) => {

    console.log(req.body);
});


app.listen(8080);
