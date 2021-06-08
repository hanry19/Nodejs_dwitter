import express from  'express'
const app = express();

// app.all 과 app.use의 차이점

//all 이라고하면 어떤 메소드로 보내도 항상 callback함수가 실행되고 
// 대신에 api안에 특정한 doc에 접속을 하면 처리가 되지 않는다. 
// 기본적으로 all 이라고 하면 해당 경로에 한해서만 수행된다
// 물로 /api/* 이라고 하면 되기는 한다.

app.all('/api', (req, res, next) => {
    console.log('all');
    next();
});

// use의 경우 어떤 경로를 하더라도 호출이 된다!

app.use('/sky', (req, res, next) => {
    console.log('use');
    next();
});


/* 우리가 등록한 콜백함수는 누가 먼저 등록햇는지가 중요하다. 
동일한 라우터에 대해 특정한 처리를 하는 콜백함수를 동락햇다면
동일한 것에 대해 또 등록할 수가 있다.
그리고 이 콜백함수는 한 경로에 대해 배열 형태로 여러가지를 등록할수 있다.

반응도 , next도 호출하지않아 미들웨이 체인이 연결되어 있는데 이거 \
get 하나 그리고 또 두개가 있다. 젤 처음에 경로가 맞아서 호출되었지만 다음을 호출하지 않는다 
이러면 서버가 중지된 상태가 된다.
그래서 next(); 로 다음으로 넘겨준다. */

// next는 현재 경로에 'route'를 해주면 함께있는 first2를 건너뛰고 다음으로 넘어간다
// 처리하다가 예기치 못한 에러가 발생하면 'error' 를 통해 애러를 전달할 수 있다.

app.get('/',
 (req, res, next) => {
    console.log('first');
    // next('route');
    // 이 콜백 함수 안에서 next로 넘어가더지 처리를 해줘야 한다.
    // 그리고 한번 res를 하면 처리를 햇기에 뒤에 있는건 반응하지 않는다.

    // next(new Error('error'));
    res.send('hello');
     
    
},
(req, res, next) => {

    console.log('first2');
    next();
}
);



app.get('/', (req, res, next) => {

    console.log('second');
});


// 그리고 조건에 따라서 경로를 내보낼 때
// 아래와 같이 한 콜백에서 두번씩 경로를 보내게 되면 에러가 뜬다. 
// 그렇기에 return을 붙혀서 밖으로 나가게 해줘야 한다. 

app.get('/',
 (req, res, next) => {
    console.log('first');
    
    if(true) {
    return res.send('hello');
    }
    res.send('ellie');
    
},
(req, res, next) => {

    console.log('first2');
    next();
}
);






 // 처리할 수 없는 경로에 대해서는 이렇게 처리한다. 
app.use((req, res, next) => {
    res.status(404).send('not available ! @_@')
})
    

// 어떤 메소드, 경로든 상관없이 다받을 수 있는 use
// error handler를 등록하면 내부적으로 서버에있는 서버를 출력하고 사용자에게는 
//친절하게 status(500).send('sorry m try later) 하면 에러가 발생하더라도 이게 에러를 처리한다
// 그래서 미들웨어는 순서가 중요하다.
app.use((error, req, res, next)=> {
    console.log(error);
    res.status(500).send('sorry, try later!');

})
app.listen(8080);
