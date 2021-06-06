

// file system을 가져와야한다.

const fs = require('fs');

// 모든 api는 3가지 형태로 제공된다
// 1. rename 이라고 하면 rename으로 제공되고 그냥 쓰면 비동기이다       //사용을 권하진 않음
//  rename(..., callback(error, data) 으로하면 필요한 일을 다하고 clalback함수를 호출한다.


// 2. renameSync(...) callback함수를 전달하지 않는다. 대신에 이게 잘못되면 에러가 발생한다.
// 그리고 끝날 떄 까지 다음주로 넘어가지 않는다.

// 3. promises.rename().then().catch(0)  : promise안에잇는 rename을 이용하면 promise형태로 보낼ㄹ 수 잇다.


//설명
// 1. 보통 callback함수는 에러가 발생하거나 원하는데이터가 되면 에러인지 성공인지 받아온다
//  rename(..., callback(error, data)
// 2. Sync가 붙은 애는 따로 에러사항을 전달하지 않으므로 항상 try ( renameSync(...)} catch(e)로 감싸줘야한다.
// 이걸 유념해주길바람

//인자는 이전path와 새로운path를 넣어주고 return은 없다.

// 동기 동기 동기
try{

fs.renameSync('./asd.txt','./file-new.txt'); // 이름 변경
}catch (error) {
    console.log(error)
}
console.log('error after')


fs.rename('./file-new.txt', './text.txt',(error) =>{
    console.log(error)
})

console.log('hello')

// hello가 출력이 되고 file이름이 변경이 되면 callback함수가 출력이 되고
// 에러가 발생하지 않아서 null로 출력됨

// 이게 지저분해서 싫으면 아래처럼

fs.promises.rename('./text2.txt', './text-new.txt') //rename이 잘 된다면
    .then(() => console.log('done'))         // 아무런 값도 전달하지 않으므로 done혹은 지워도 됨
    // .catch((error) => console.error(error)); 이걸 요약해서
     .catch(console.error) // 이렇게 쓴다
