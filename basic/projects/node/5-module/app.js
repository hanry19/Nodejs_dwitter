/*
nodejs모듈
규모잇는 플젝을 할땐 모듈을 만들어야 한다.
    콘솔 모듈 http모듈 등등 연관된 아이들은 모듈 관리하는게 좋다.*/

/*
console.log(count);
console.log(getCount());
*/

// 모듈 exprot 하는 방법

// import {increase, getCount} from './counter.js';
import * as counter from './counter.js';


counter.increase();
counter.increase();
counter.increase();
console.log(counter.getCount());
