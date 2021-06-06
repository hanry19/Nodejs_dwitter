function sayHello() {
    console.log('helloffffff ~');
}

function calculate(x, y) {
    console.log('calculating..');
    const result = x + y;
    console.log('result = ' + result);
    sayHello();
    return result;
}

calculate(1, 2);

