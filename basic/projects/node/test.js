/*plus = function(a, b, callback){
    let result = a+b
    callback(result);
}

plus(5,10, function(zz){
    console.log(zz);
})*/

/*pm = function(a, b, callback){
    callback(a+b, a-b);
}

pm(5,10, function(res1, res2){
    console.log(res1, res2);
    // console.log(res2);
})*/


const printString = (string, callback) => {
    setTimeout(() => {
        console.log("printString 호출 : " ,string)
        console.log(callback);
        callback()

    }, Math.floor(Math.random() * 3000) + 1);
}
const printAll = (aaa) => {
    console.log("1:" , aaa)
    printString ("asd", () => {
    console.log("2:" , aaa)
        printString ("Asd", () => {
    console.log("3:" , aaa)
            printString ("asdC", () => {})
    console.log("4:" , aaa)
        })
    })
}
printAll("asd")  // ABC