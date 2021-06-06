const EventEmitter = require('events');
const emitter = new EventEmitter();     // emitter는 event안에 있는 클래스
const callback1 = (args) => {
    console.log('fist callbakc - ', args);
};


emitter.on('ellie', callback1);

emitter.on('ellie', (args) => {
    console.log('second callbakc - ', args);

});

emitter.emit('ellie',{ message : 1});
emitter.emit('ellie',{ message : 2});

emitter.removeAllListeners('ellie', callback1)
emitter.emit('ellie',{ message : 3});
