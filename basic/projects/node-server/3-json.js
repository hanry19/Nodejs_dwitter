const http = require('http');


const courses = [
  { name: 'HTML' },
  { name: 'CSS' },
  { name: 'JS' },
  { name: 'Node' },
  { name: 'Frontend' },
];

const server = http.createServer((req, res) => {
    const url = req.url; // WHAT ? : 클라이언트가 어떤 데이터를 원하는지
    const method = req.method;  // how & action : 그것으로 어떤 것을 하고 싶은지 해당하는 일들을 해줄거다.
    if(url ==='/courses'){
        if(method === 'GET'){ // 서버는 메모리에 데이터를 보관하고 있다가 클라이언트가 원할때 보내줄거다.
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(courses));
        }else if(method === 'POST'){ // 서버에서 데이터를 보내주는게 아니라 클라이언트에서 데이터를 받아서 새로운 코스를 만들어야 한다. 
        //처리하는 방법은 여러가지지만  예전에 배운 buffer를 하게되면
          const body = []; // 텅텅빈 body하나를 만들고
          // 사용자가 새로운 courses 를 만들고 싶다면 data 라는event가 발생하면
          // 받은 덩어리 자체를 log로 출력해보고 body라는 배열에 계속해서 추가한다. 
          req.on('data',chunk => {
            console.log(chunk);
            body.push(chunk);
            
          });

          // 그리고requst event에 \모든 데이터가 다 받아지는end 라는 이벤트가 발생하면
          // const 새로운 course는 json.parse를 이용해서 받은 json을 object 형태로 parse해준다.
          // 그리고 body 부분은 받은 우리가 계속 받은 데이터를 body 배열에 저장했으므로
          // buffer 에있는 concat, join을 이용해서 묶은 다음에 toString으로 변환해서 json으로 바꿔본다.
          // 이 부분이 해깔린다면. boydyStr 따로 출력해보고 cousrses 배열에 넣는 course도 출력해본다
          req.on('end', () => {
            // const course = JSON.parse(Buffer.concat(body).toString());

            const bodyStr = Buffer.concat(body).toString();
            const course = JSON.parse(bodyStr);
            courses.push(course);
            console.log(course);

            // 추가하고나서 무시하면 클라이언트에서는 계속 기다리고 있다. 
            // 그래서 서버는 무조건 응답해줘야한다.
            res.writeHead(201);
            res.end();
            
            // 이걸 확인하기 위해서 postman을 이용한다. 브라우저에서는 post를 확인하기 어렵다


          
          })

        }
    }
});

server.listen(8080);



