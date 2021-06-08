import express from  'express'
const app = express();

//request에 대하여

/* // 1. param / parma을 이용하고 싶을 때 
// http://localhost:8080/sky/ellie?keyword=bts
app.get('/sky/:id',(req, res, next) =>{
    // console.log(req.path);
    // console.log(req.headers);
    console.log(req.params);
    console.log(req.params.id);
    console.log(req.query);
    console.log(req.query.keyword);
    res.send('hi');
}); */



app.get('/sky/:id',(req, res, next) =>{
    // console.log(req.path);
    // console.log(req.headers);
    console.log(req.params);
    console.log(req.params.id);
    console.log(req.query);
    console.log(req.query.keyword);
    
    // send로 보내는 방법도 있고
    // res.send('hi');

    // // json형태로도 보낼 수 있다. 
    // res.json({name : 'ellie'})

    // 데이터 코드 없이 status 만 보낼 수 잇다.
    // res.sendStatus(400);

    //또는 개별적으로 status를 설정하고 send를 이용해서 메세지를 보낼 수도잇다.
    // 처리된 결과에 따라서 적절한 ㅅstatus를 결정하고 원하는 데이터를 보내면 되고 
    // res.status(201).send('create');

    //header에 특정한 것을 설정할 때object로 보내는게 아니라 key, value로 보내야 한다.
    res.setHeader('key', 'value');
    res.status(201).send('create');
    

});

app.listen(8080);

