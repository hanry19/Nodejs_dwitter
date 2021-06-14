import bcrypt from 'bcrypt';
const password = 'abcd1234';


// const hashed = bcrypt.hashSync(data , salt length)
const hashed = bcrypt.hashSync(password, 10);

console.log(`password : ${password}  , hashed : ${hashed}`);


// 결과를 확인 할 때는 compare를 사용하는데 지금은 동기적으로 하기에 compareSync를 하지마 
// 서버에서 확인할 땐 비동기적으로 하는 게 whgek
const result = bcrypt.compareSync('abcd1234', hashed);
console.log(result);