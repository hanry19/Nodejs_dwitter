

const jwt = require('jsonwebtoken');

/* 
사인을 만들때는 payload, secret key, option(선택) 을 설정해줘야 한다. 
option에는 알고리즘은 뭘 쓸건지, key id는 뭔지 언제 만료되게 할 것인지 등등 설정해줘야한다. 

payload는 토큰으르 보낼 때 중요한 내용들, 담고 싶은 데이터를 만든다. 
하지만 데이터를 너무 많이 넣으면 데이터를 많이 소모할 수 있으니 정말 필수적인 것만 담는다.

secret key는 중요한 데이터임으로 서버에서만 보관하고 있는 secret key를 만들면된다. 
임의의 문자열을 넣어도 되지만 보다 더 안전한 secrey key를 만들기 위해 secrey key를 만드는 
사이트에서 만드는 것도 좋다. sec

 */
const secret = 'iDontKnowAnything';
const token = jwt.sign({

    id : 'ellie',
    isAdmin: false,
},
secret,
{expiresIn : 2 }

);

setTimeout( ()=> {
    jwt.verify(token, secret, (error, decoded) => {
        console.log(error, decoded)
    });
    
},3000);




console.log(token);