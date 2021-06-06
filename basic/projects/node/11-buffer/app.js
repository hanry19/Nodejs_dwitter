// Fixed-size chuck of memory
// array of integer, byte of data

const buf = Buffer.from('Hi');
console.log(buf);       // 배열로 출력하면 유니코드로 출력되지만
console.log(buf.length);
console.log(buf[0]);    // 하나씩 출력하면 aski 코드로 출력된다.
console.log(buf[1]);
console.log(buf.toString('utf-8')); // 문자열로 출력하고 싶을 때
// toString의 api => bufferEncoding을 보게 되면 어떤 encoding을 할건지 선택 가능
// 하지만 기본이 utf-8이라서 생략 가능


// result
// <Buffer 48 69>  => 유니코드 이며 h = 48, i = 69
// 2  => 버퍼의 길이
// 72 => 아스키 h
// 105 = > 아스키 i
// Hi


// create
const buf2 = Buffer.alloc(2); // 메모리에서 사용간으한 메모리 덩어리를 찾아서 초기화 한다.
const buf3 = Buffer.allocUnsafe(2);
buf2[0] = 72;
buf2[1] = 105;

// buf 2에 잇는걸 3으로 가져가고 싶으면
buf2.copy(buf3);

console.log(buf2.toString());
console.log(buf3.toString());
    //기존의 다른 데이터가 있으나, 사용되지않는 메모리라면 공간을 확보하지만 초기화 하지 않는다.
    //하지만 데이터가 항상잇을 수 있으니가 초기화 하는게 조다.


//concat 여러가지 buffer를 모을 수 잇다.

const newBuf = Buffer.concat([buf, buf, buf3]);
console.log(newBuf.toString())