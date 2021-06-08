/* 
여기에 tweet에 관련된  관련된 data를 다 넣는다 
*/

// 데이터를 옮겨주고 


let tweets = [{

    id:'1',
    text:'쭈니 화이팅',
    createdAt: Date.now().toString(),
    name: 'bob',
    username: 'bob',
    url : 'https://cdn.expcloud.co/life/uploads/2020/04/27135731/Fee-gentry-hed-shot-1.jpg',

},{

    id:'2',
    text:'쭈니 ',
    createdAt: Date.now().toString(),
    name: '쭈니',
    username: '쭈니',
    url : 'https://cdn.expcloud.co/life/uploads/2020/04/27135731/Fee-gentry-hed-shot-1.jpg',

},
];



/*  전체적인 트윗을 읽어로는 게 있다. 
 해당 함수를 만들어 return tweets을 해준다

그럼 router의 tweet.js에서 
*/
export function getALl() {
return tweets;

}

export function getAllByUsername(uername){

    return tweets.filter((tweet) => tweet.username);
}

export function getAllById(id) {

    return tweets.find( (tweet) => tweet.id === id);

}

export function create(text, name, username){
    const tweet = {
        id: Date.now().toString(),
        text,
        createdAt : new Date(),
        name,
        username,
    };
       // tweets.push()
       tweets = [tweet, ...tweets];
       
       return tweet;

}

export function update(id, text) {
    tweets.find( (tweet) => tweet.id === id);

    // tweeet이 undefined 일 수 있으니 tweet이 잇다면 return, 없다면 undefined
    if(tweet){
    tweet.text = text;
    }
    return text;
}


// delete는 delete라는 키워드를 javascript에서 쓰고 있기 때문에 사용불가
export  function remove(id) {
    tweets = tweets.filter((tweet) => tweet.id !== id);
}