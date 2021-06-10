import express from 'express';
import {body,param, validationResult} from 'express-validator';

const app = express();
app.use(express.json()) ;

const validate  = (req, res, next) => {

    const errors = validationResult(req); 

    //에러가 잇다면 다음 미들웨어로 넘어가고 
    if(errors.isEmpty()) { 
       return next();

    }
    //에러가 있다면 에러 메시지 
       return  res.status(400).json({message : errors.array()[0].msg}); 

};;


// 새로운 사용자 추가 
app.post('/users', 
[
    body('name').trim().notEmpty().withMessage('이름 입력해').isLength({min:2}).withMessage('이름은 두글자 이상'),
    body('age').notEmpty().isInt().withMessage('숫자 입력해'),
    body('email').isEmail().withMessage('email 입력해').normalizeEmail,
    body('job.name').notEmpty(),
    validate,
    
]
    ,(req, res, next) => {
    console.log(req.body);
   return res.sendStatus(201);
});

app.get('/:email', 
[param('email').isEmail().withMessage('email 입력해'), validate],
    (req, res, next) => {
    res.send('🎁')
});


app.listen(8080);


/* 

sanaitization 이란

사용자 이름은 두글자 이상인데 스페이스를 세번해서 해서 "   " 해서 보내면
이름이 엄밀히따지면 세글자 이상임으로 정상적으로 진행된다. 
그래서 유효성 검사를 할 때 사용자에게 받은 데이터를 sanaitization을 해줘야 한다. 

사용자가 실수로 스페이스나 대문자를 넣고 했을 땐 어떻게 할 수 잇을까?

1. 내가 어떻게 유효성 검사를 하고 어뗗게 데이ㅌ를 nomailize (표준화)할것인지 생각해야한ㄷ.
trim 이라는게 잇다. 문자열로 시작하는 공백이 잇다면 공백을 제공해준다.  
이렇게 하면 공백을 제거하고 표준화 작업을 한 뒤 값을 보내준다.

body('name').trim().notEmpty().withMessage('이름 입력해').isLength({min:2}).withMessage('이름은 두글자 이상')

그래서 순서가 중요하다. 유효성 작업 이전에 trim()을 해줘서 공백을 없앤 뒤 유효성 검사하는게 중요하다.

body('email').isEmail().withMessage('email 입력해').normalizeEmail,

이메일도 이렇게 마지막에 nomalizaEmail을 해주면  대문자로 들어오는 것을 소문자로 바꿔서 보내준다.

자세한건 sanitizers api를 보면 자세히 알 수 있다. 

여기서 포인트는 서버에서 유효성 검사를 해서 클라이언트에게 알려주는것도 중요하고 
데이터 베이스 저장하기전에 일관성잇게 해주는 것도 중요하다. 



*/