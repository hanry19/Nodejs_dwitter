console.log('logging...')

console.clear();


//log level
// 레벨에 따라 구분되는 이유는 배포 시 서버의 심각성을 알 수 잇다
// 레벨별로 출력 조정 가능
console.log('log'); // 개발시 사용
console.info('info'); // 중요한 정보에 대해
console.warn('wars'); // 발생하면 안되지만 치명적이지 않음 => 경보
console.error('error');     // 심각한 에러, 사용자 에허, 시스템 에러에 사용

// assert == 참이 아닐 경우에만 출력
console.assert(2 ==3 , 'not same')
console.assert(2 ==3 , 'same')

//print object
const student = {name : 'lele',age :20, company : {name :'ac' ,loca: 'busasn'}}
console.log(student)
console.table(student)
console.dir(student, {showHidden :true , colors: false, depth:0})

// measuring time  : 같은 레이블이 시작하고 끝나는데 걸리는 시간을 측적함
console.time('for loop')        // 시작
for (let i = 0; i < 10; i++) {
    i++;
}
console.timeEnd('for loop')  //끝, 걸리는 시간은?

// counting  : 몇번 호출ㅇ되었는지 궁금할 때 ㅅ용
function a() {
    console.count('a function')
}
a();
a();

/*
//result
a function: 1
a function: 2
*/


//  trace : 디버깅할 때 유용하다
function  f1() {
    f2();
}
function f2(){
    f3();
}
function f3() {
    console.log('f3');
    console.trace(); // 누가 호출햇고 어떻게 호출햇는지 볼때 사용한다.

}
f1();