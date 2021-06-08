import express from 'express';
import fs from 'fs';
import fsAsync from 'fs/promises';
import 'express-async-errors';

const app = express();


// 동기, 비동기적 상황에서 에러를 처리하는 방법
// 예상 안, 밖의 상황에서 에러를 처리하는 게 중요하다. 
// 서버에서는 특히 중요한데 클라이언트의 요청을 처리하는 거기 때문에 
// 

app.use(express.json());


// 비동기 방법 
// 해당 URL을 처리 했을 때 파일이 없으면 erro를 띄운다
app.get('/file', (req, res) => {
    fs.readFile('/file1.txt', (err, data) => {
      if (err) {
        res.sendStatus(404);
      }
    });
  });

// 그래서 동기의 경우 try catch문으로 감싸는게 좋다

app.get('/file1', (req, res) => {
    try {
      const data = fs.readFileSync('/file1.txt');
      res.send(data);
    } catch (error) {
      res.sendStatus(404);
    }
  });

// 동기의 경우 sync라는 것은 파일을 읽을 떄 까지 기다렷다가 파일을 보내준다.
//서버에서 동기처리하는 건 좋지않지만 문제는 에러 발생 시 
// 에러를 처리하지 않았다. 
/* app.get('/file', (req, res) => {
    const data = fs.readFileSync('/file1.txt');
    res.send(data);
}); */


// 그래서 error handler를 통해서 에러를 처리할 수 있도록 만들 수 있다. 
// 하지만 사용자가 요청한 요청에 대해서 어떻게 에러 방생햇는지 적절한 에러 메세지를 보내주는게 더 좋다.
// 그니까 구석구석 !!



// promise 비동기적인 방법을 보면 문제는 에러처리를 하지 않았다.
// 그리고 promise에서 처리하지 않은 에러는 노드 서버에서 중지할 수 있다.
// 근데 app.use로 전체 에러 처리했는데 왜 안될까?
// 이유는 promise는 비동기이다. 미들웨어가 끝나는 순간 promise가 아직 처리되지 않았기에
// callback이 끝난 후 에 promise가 끝나고catch가 되기 때문에(chain으로 이루어 져있어서 ) 
//마지막 에러처리가 되지 않는다. 그래서 항상 catch를 이용해서 적절한 에러를 보내야한다. 

app.get('/file2', async (req, res) => {
    return fsAsync
      .readFile('/file2.txt') //
      .then((data) => res.send(data));
  });

// 보통은 이렇게 async를 붙여주면서 promise, 비동기적이면서 동기적으로 보이도록 하는 방법이 있다.
// promise를 하면 callback함수를 계속 보내야한다. 하지만 비동기적 특성을 유지하면서 
// 동기적으로 보여줄 수 있다. 
// 파일을 다 읽을 때 까지 기다렸다가  읽은데잍러를 전달하지만 함수 자체가 async(비동기) 이므로
// 비동기적으로 처리가 되니까 기다렸다가 처리할 수 있다. 
// 이 또한 문제가 에러 처리가 안됨. 비동기적이기 때문에 에러 핸들링을 해주지 못한다. 
// express에서 자체적으로 에러처리를 해주지 않기에 try catch 해줘야 한다.  
app.get('/file3', async function (req, res) {
    const data = await fsAsync.readFile('/file2.txt');
    res.send(data);
  });

// 항상 처리하고 잇는 미들웨어서 발생할 수 잇는 예상 에러가 있다면
// 에러에 대해 적절히 처리해주는게 좋다. 에러를 사용자에게 적절하게 처리해줄 수 있기 때문이다.

// promise에서 catch를 하지 않을 경우 서버가 죽을 수 있는데, 안정망을 할 수잇는 방법이 없을까?
// 잇지만ㅁ 아직 알파버전이기에 프로젝트할 때만 사용하면 좋다.
// npm i express-async-errors 라는 라이브러리를 사용하면 
// 에러를 잡을 수 있다.  사용하는 방법은 import 'express-async-errors' 를 해준다.


app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  });
  



app.listen(8080);



