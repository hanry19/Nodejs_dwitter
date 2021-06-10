import express from 'express';
import {body,param, validationResult} from 'express-validator';

const app = express();
app.use(express.json()) ;


// 새로운 사용자 추가 
app.post('/users', 
[
    body('name').notEmpty().withMessage('이름 입력해').isLength({min:2}).withMessage('이름은 두글자 이상'),
    body('age').notEmpty().isInt().withMessage('숫자 입력해'),
    body('email').isEmail().withMessage('email 입력해'),
    body('job.name').notEmpty(),
    
]
    ,(req, res, next) => {
    const errors = validationResult(req); 
    if(!errors.isEmpty()) { 
     return   res.status(400).json({message : errors.array()}); 

    }

    console.log(req.body);
   return res.sendStatus(201);
});

app.get('/:email', param('email').isEmail().withMessage('email 입력해'),
    (req, res, next) => {
        
    const errors = validationResult(req); 
    if(!errors.isEmpty()) { 
       return  res.status(400).json({message : errors.array()}); 

    }

    res.send('🎁')
});


app.listen(8080);

/* 
어떤 유효성 검사를 해야할까?
새로운 사용자를 만들 때 사용자이름,
나이 , 이메일에 대한, 그리고 특정한 { } 가 잇는지, 이메일 유효성 또한 해야함

만약 수동으로 한다면 
if(req.body.email..) {
    res.status(400).sedn({message: 'email wrong'})
}else if() ,.... 해야하는데 

유용한 미들웨어가 있다. 
npm i express-validator

import {body, validationResult} from 'express-validator';


요청을 받아서 처리해야하는  실제로 로직이 발생하는 callback이전에 여러가지 callback을 등록할 수 있다.
handler는 배열 형태로 여러가지를 등록할 수 있다. 

그래서 이전에 body에 특정한 필드에 대해서 검사를 할 수 있다. 

body('특정한 필드 이름').isLength({min:2, max:10})  최소길이가 2 최대 10

app.post('/users', body('name').isLength({min:2,max : 10}),(req, res, next) => {
    const errors = validationResult(req); //에러 = 리쿼스트를 전달해서 해당 req가 등록한 유효성 검사에 에러가 있는지 없는지 확인하고
    if(!errors.isEmpty()) { // errors가 비어잇지 않다면 에러가 발생한것으로 400에러
        // res.status(400).json({message : errors.err})도 되고
    return    res.status(400).json({message : errors.array()}) 배열로도 보낼 수

    }

    console.log(req.body);
   return res.sendStatus(201);
});


// name을 min보다 작은 한글자로 요청 헀을 때
{
    "message": [
        {
            "value": "e",
            "msg": "Invalid value",
            "param": "name",
            "location": "body"
        }
    ]
}

여기서 기본적인 "Invalid value" 대신에 설명적인 메세지를 보내고 싶디면 
withMessage를 이용한다. 

app.post('/users', body('name').isLength({min:2}).withMessage('이름은 두글자 이상'),(req, res, next) => {
    const errors = validationResult(req); 
    if(!errors.isEmpty()) { 
     return   res.status(400).json({message : errors.array()}); 

    }

    console.log(req.body);
  return  res.sendStatus(201);
});

// 결과 
{
    "message": [
        {
            "value": "e",
            "msg": "이름은 두글자 이상",
            "param": "name",
            "location": "body"
        }
    ]
}

또한 chaining이 됨으로 이름이 비어잇다면 "이름 입력해" 메시지를 보낸다면 
두가지 메세지를 받을 수 있다.

app.post('/users', body('name').notEmpty().withMessage('이름 입력해').isLength({min:2}).withMessage('이름은 두글자 이상'),(req, res, next) => {
    const errors = validationResult(req); 
    if(!errors.isEmpty()) { 
    return    res.status(400).json({message : errors.array()}); 

    }

    console.log(req.body);
  return  res.sendStatus(201);
});

//결과 

{
    "message": [
        {
            "msg": "이름 입력해",
            "param": "name",
            "location": "body"
        },
        {
            "msg": "이름은 두글자 이상",
            "param": "name",
            "location": "body"
        }
    ]
}

여러가지에 대해서도 할 수 있다. 
app.post('/users', 
body('name')
    .notEmpty()
    .withMessage('이름 입력해')
    .isLength({min:2})
    .withMessage('이름은 두글자 이상'),,
body('age').notEmpty().isInt().withMessage('숫자 입력해'),
    
    ,(req, res, next) => {
    const errors = validationResult(req); 
    if(!errors.isEmpty()) { 
      return  res.status(400).json({message : errors.array()}); 

    }

    console.log(req.body);
    return res.sendStatus(201);
});

그리고 여러가지 항목들을 배열로 묶어서 관리할 수도 있다. 

app.post('/users', 
[
    body('name').notEmpty().withMessage('이름 입력해').isLength({min:2}).withMessage('이름은 두글자 이상'),
    body('age').notEmpty().isInt().withMessage('숫자 입력해'),
    body('email').isEmail().withMessage('email 입력해'),
    body('job.name').notEmpty(),
    
]
    ,(req, res, next) => {
    const errors = validationResult(req); 
    if(!errors.isEmpty()) { 
     return   res.status(400).json({message : errors.array()}); 

    }

    console.log(req.body);
   return res.sendStatus(201);
});

또한 get요청 시 param에 대해서 검사하고 싶다면 아래와 같이 쓸 수 있다. 


app.get('/:email', param('email').isEmail().withMessage('email 입력해'),
    (req, res, next) => {
        
    const errors = validationResult(req); 
    if(!errors.isEmpty()) { 
       return  res.status(400).json({message : errors.array()}); 

    }

    res.send('🎁')
});


혹은 모든 것들은 check를 쓰면 param, qurey, body등등 다 포함해서 할 수 있다
하지만 check로 하는게 더 좋다. 금전적 문제로 인해 


*/




/* 
{
"name" : "e1",
"age:":1,
"job" : {
    "name" : "dc academy",
    "title" : "instructor"
},
"email": "hanry18@naver.com"

} 
*/