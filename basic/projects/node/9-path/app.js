const path = require('path');


console.log(__dirname);
console.log(__filename);

// 운영체제별로 경로가 다르기 때문에 표기법이 달라져도 적용되게 해야한다.
// 그 방법은 아래..


console.log(path.sep); // 경로 구분자는 무엇인지
console.log(path.delimiter);        // 환경변수 구분자는무엇인지


//basename : 파일 정보만 가져올 수 있음. 그리거ㅗ 확장자 제거해서도 볼 수 있다
console.log(path.basename(__filename));
console.log(path.basename(__filename,'.js'));

//dirname   : 디렉토리 이름만 가져올때
console.log(path.dirname(__filename));

//extension  : 확장자만 가져올 때
console.log(path.extname(__filename));

// parse : 전체경로를 하나하나 분리해서 할 수 있다.
const parsed = path.parse(__filename);
console.log(parsed);

const str = path.format(parsed);
console.log(str)

//isAbsolute  : 절대 경로인지 아닌지 에 따라 true, false로 반환함
console.log('isAbsolute?', path.isAbsolute(__dirname)); // /users/ 이건 절대 경로
console.log('isAbsolute?', path.isAbsolute('../')); // 상대 경로


// normalize
console.log(path.normalize('./folder///sub'));

//join

console.log(__dirname + path.sep + 'image');
//개선
console.log(path.join(__dirname,'image'));
