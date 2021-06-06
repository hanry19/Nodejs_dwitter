const fs = require('fs').promises;

// read a file

fs.readFile('./text.txt','utf8')// 아무처리 없음
    .then((data) => console.log(data))
    .catch(console.error);

//파일을 읽어 올 때 buffer로 읽어 온다.
// options , 'utf8' 을 해주면 hello encoding되어서 읽을 수 있다.

// writing a file
//write file의 경우 return 타입이 void 이기 때문에 따로then을 안해주고 .catch만 해주면 된다.
fs.writeFile('./file.txt', 'hello dreamcoder!:')
    .catch(console.error); // 항상 에러가 발생할 숭 ㅣㅆ기 대문에

// 이렇게 동일한 파일에 쓸 경우 덮어씌워 진다 그렇기에 append를 이용한다.
fs.writeFile('./file.txt', '안뇽하세용~')
    .catch(console.error); // 항상 에러가 발생할 숭 ㅣㅆ기 대문에


fs.appendFile('./file.txt',"asdasdasd")
    .then(()=> {
        fs.copyFile('./file.txt', './file2.txt')
            .catch(console.error);
    })
    .catch(console.error)

// 파일 복사copy
// 이것도 void return
// 하지만 이대로 실행을 하면 비동기적으로 실행되기 때문에 file2.txt는 내용이 없다.
//그렇기에 appendFile이 끝나고 나면 then.~ 해준다.
/*fs.copyFile('./file.txt', './file2.txt')
    .catch(console.error);*/

// 비동기는 순차적으로 될 수 도 잇고 안될 수고 잇기에 주요해야한다
// 순서가 중요할 경우 promise. then 안에서 하는게 좋다.



// folder
// 이것 또한 return 값이 없다.
fs.mkdir('sub-folder')
    .catch(console.error);
3

// 현재 경로의 파일들의 이름을 읽는 것
// return은 string array tpye이므로 console.log로 출력
fs.readdir('./')
    .then(console.log)
    .catch(console.error);

