import express from 'express';
import 'express-async-errors';

import * as tweetRepository from '../data/tweet.js'


const router = express.Router();

/*
1. tweet과 username 이 전달 됐을 때 안됐을 때를 처리 해볼거다 
*/
// get / tweets
// get / tweets?username =:username

//router에 get이 오면 현재 router가 tweets으로 연결되어 있기 때문에 
// /tweets 는 안적어줘도 됨. 

router.get('/',(req, res, next) => {
    //username이 req쿼리에 으로 값이 있다면 값이 들어있고 없다면 undefind
    const username = req.query.username;
    // 사용자에게 전달해야하는 data는 username이 있다면 현재 가지고 잇는 tweet에서 filter를 해줘야 한다.
    // 가지고 잇는 배열의 아이템이 tweet을 전달받아서 트윗에 잇는 유저 네임이 사용자가 원하는 username과 동일한
    // 아이들만 골라서 전달 해주고 username이 없는 경우 전체적인 트윗으르 할당해주면 된다.
    const data = username 
    ? tweetRepository.getAllByUsername(username)
    : tweetRepository.getAll(); 

    // 그리고 포스트 맨으로 실행시켜 보면 되는걸 볼 수 있다.

    res.status(200).json(data);

})


// get /tweets/:id
/* 
id는 param이 들어오기 때문에 다른 router에서 구현으르 해야한다.

const id =  req.prams에 있는 id를 가져와서 tweets를 찾아야 한다. 
트윗이 있으면 t.id와 우리가 찾는 id와 동일 하다면 (존재한다면)

사용자에게 200을 띄우며 해당 데이터를 보내준다. 
만약 tweet이 없다면 not found(404)와 메세지를 함께 보내준다. 

*/

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    const tweet = tweetRepository.getAllById(id)
    if(tweet) {
        res.status(200).json(tweet);
    }else {
        // res.sendStatus(404);
        res.status(404).json({message : `Tweet id(${id}) not found`});
    }
})

// post /tweets

/* 
새로운 데이터를 만들 때는 먼저 body를 받아와야한다. 
const text = req.body.text ... 이렇게 하나하나 받아도 상관 없지만 
bodt라는 object 그 자체로 받는다. 그리고 그 안에 관심있는 값들을 정의 해준다. 
그리고 이걸 기반으로 새로운 tweet을 만든다. 

그리고 push를 통해 배열에 추가 하는데, push를 할 경우 배열의 제일 뒤로 들어간다.
하지만 tweet은 앞에 제일 앞에 와야 하기 때문에 배열 tweets 배열 자체를 let으로 바꾼다
원래 서버에서 state를 가지고 있는건 안좋다. 하지만 db를 하기전에 잠시 사용한다. 

우리가 만든 tweet을 제일 앞에 넣어주고 기존의 배열에 잇는 것을 추가적으로 넣어주고 
성공적으로 만들어졌다는 201을 보내주고 json으론 사용자에게 만들어진 온전한 데이터를 보내준다.

tweets = [tweet, ... tweets] ;
res.status(201).json(tweet);


*/
router.post('/', (req, res, next) => {
    const {text, name, username} = req.body;
   
    const tweet = tweetRepository.create(text, name, username);
 
    res.status(201).json(tweet);
})


// put /tweets:id
/* 
    id를 받아와서  업데이트하고자하는 text를 req.body에 받아와서
    id로 해당 tweet을 찾아서 업데이트 해주면 된다. 
*/
router.put('/:id',(req, res, next) => {
    const id = req.params.id; 
    const text = req.body.text;
    //update하고자하는 tweet은?
    const tweet = tweetRepository.update(id, text);
    if(tweet){
        
        res.status(200).json(tweet);
    }else {
        res.status(404).json({message : `Tweet id(${id}) not found`});
    }


});


// delete /tweets:id
router.delete('/:id',(req, res, next) => {
    const id = req.params.id; 
    /* 
    새로운 tweets 배열에 기존의 tweets 배열을 뱅뱅 돌면서 filter를 해주면 된다.
    t를 받아와서 t.id가 삭제하고자하는 id가 아닌 것들만 다시 만들면 된다. 
    */
    
    tweetRepository.remove(id);

    // 정상적으로 삭제했고 resouce에 대하나contents는 없다고 보낸다.
    res.sendStatus(204)

});


export default router;