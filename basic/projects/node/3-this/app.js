function hello () {
    console.log(this);
    console.log(this === global)
}
hello();
//확니해보면 this는 global인걸 볼 수 있다.

class A{
    constructor(num) {
        this.num = num;
    }
    memberFunction() {

        console.log("----class ----")
        console.log(this)
        console.log(this === global)
    }
}

const a  = new A(1);
a.memberFunction();
/*

class에서 this는 자기 자신을 가르키고,  class 외부에서의 this는 global을 가르킨다.

result
true
----class ----
    A { num: 1 }
false
*/

console.log('----------- global scope ---------')
console.log(this)
console.log(this === module.exports);