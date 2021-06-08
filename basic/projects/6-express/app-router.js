import express from 'express';
import postRouter from './router/post.js';
import userRouter from './router/user.js';

const app = express();

app.use(express.json()); // rest api, body를 parcing 할 때 쓴다.
//하나 더 잇다. 
// urlencoded 는 바디를 자동으로 parcing 해준다.
// 이건 rest api가 아니라 html에서 form 으로 submit을 하면
// request가 발생하고 그때 전달된 html에서 만든 데이터를 바디로 자동으로 parcing해준다.
// ssr 할 때 사용,  그리고 옵션을 무조건 적어줘야 한다. {extended : false}
app.use(express.urlencoded({extended : false}));

// 정적인 데이터를 불러올 때 사용 
// public에 있는 데이터에 접근이 가능하게 해준다. 
// 이것도 옵션을 전달할 수 있다.
const options = {
    dotfiles: 'ignore', // 숨긴파일 보여지지 않게
    etag: false,        // 자세한거 express 공홈 확인
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
      res.set('x-timestamp', Date.now());
    },
  };

app.use(express.static('public',Options)) 




// express를 통해서 각 메소드별로 callback메소드 형태로 간편하게 등록가능
// 여기서 문제점은 반복되는것이 많다. 이걸 간단하게 하는 방법은 라우트!

// 아래와 같이 정리하면 간편해 지긴 햇지만 
// 복잡한 서버의 경우 여러 경로가 존재하기에 가독성, 모듈성, 유지보수에 어렵다

// start시 app-router가 실행되도록 package.json에 app-router로 바꾸고


// /posts, /user 관련된거는 post/user Router를 이용하게끔  아래와 같이 작성
// 그리고 router 폴더 안에 post.js, user.js를 만든다.
// 각 폴더에 코드 작성이 끝낫다면 import 해온다.

// 여기에 적히는 /posts , /user 같은 것들 적고 router를 연결하면 최상위 url이기 때문에 
//router 폴더 안의 js에서는 안적고 posts/**  뒤에 붙는 것들만 적는다.
app.use('/posts', postRouter);
app.use('/user', userRouter);

app
    .route('/posts')
    .get((req,res,next) => {
        res.status(201).send('GET /posts');
    }).post((req,res) => {
        res.status(201).send('POST /posts');
    });


app
    .route('/posts/:id')
    .put((req,res) => {
        res.status(201).send('PUT /DELETE/:id');
    })
    .delete((req,res) => {
        res.status(201).send('DELETE /posts/:id');
    });



/* 
app.get('/posts', (req,res) => {
    res.status(201).send('GET /posts');
});

app.post('/posts', (req,res) => {
    res.status(201).send('POST /posts');
});

app.put('/posts/:id', (req,res) => {
    res.status(201).send('DELETE /posts/:id');
});

app.delete('/posts/:id', (req,res) => {
    res.status(201).send('DELETE /posts/:id');
});
 */

app.listen(8080);