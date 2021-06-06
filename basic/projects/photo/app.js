const path = require('path');
const os = require('os');
const fs = require('fs');


// 계획
// 1. 사용자가 원하는 폴더의 이름을 받아온다
const folder = process.argv[2];
const workingDir = path.join(os.homedir(), 'Pictures', folder);
if (!folder || !fs.existsSync(workingDir)) {
  console.error('Please enter folder name in Pictures');
  return;
}

// 2. 그 폴더안에 video, captured, duplicated 폴더를 만든다
const videoDir = path.join(workingDir, 'video');
const capturedDir = path.join(workingDir, 'captured');
const duplicatedDir = path.join(workingDir, 'duplicated');

console.log(videoDir);
console.log(capturedDir);
console.log(duplicatedDir);


!fs.existsSync(videoDir) && fs.mkdirSync(videoDir);
!fs.existsSync(capturedDir )&& fs.mkdirSync(capturedDir);
!fs.existsSync(duplicatedDir) && fs.mkdirSync(duplicatedDir);


// 3. 폴더 안에 있는 파일들을 다 돌면서 해당하는 mp4|mob, png|aae, IMG-123 (img_E1234)

fs.promises.readdir(workingDir)
.then(processFiles)
.catch(console.log);


function processFiles(files) {

  files.forEach((file) => {
    // console.log(file); // 출력되는걸 알 수 있다 .
    if(isVideoFile(file)) {
      move(file, videoDir);
    }else if(isCaptureFile (file)){
      move(file, capturedDir);
    }else if(isDuplicatedFile(files, file)) {
      move(file, duplicatedDir);
    }
    
  })
}


function isVideoFile(file) {
  
  // 정규식으로 끝에가 이렇게 끝나면 비디오

  const regExp = /(mp4|mov)$/gm;
  const match = file.match(regExp);

  // match를  출력해보면 배열이 생기고 그렇지 않으면 null이다.
  // match값을 boolean으로 출력하고 싶으면 앞에 !! 을 해준다 
  // 그럼 값이 있으면 true, 아니면false가 된다. 
  return !!match;
}
function isCaptureFile(file) {
  const regExp = /(png|aae)$/gm;
  const match = file.match(regExp);

  return !!match;
}
function isDuplicatedFile(files, file) {
  //IMG_xxx로 시작한다면 - >img_EXXX로 시작하는게 잇는지 확인 필요
  //그래서img로 시작할 경우에만 검사 필요
  // 만약 file이 img로 시작하지 않는 파일이라면 검사할 필요 없고
  // img_e 된거라면 검사안해도 된다.(그대로 유지)
  if(!file.startsWith('IMG_') || file.startsWith('IMG_E')){
    return false;
  }

  const edited = `IMG_E${file.split('_')[1]}`;
  const found = files.find((f) => f.includes(edited));

  return !!found;
}


function move(file, targetDir){
  console.info(`move ${file} to ${path.basename(targetDir)}`)


    const oldPath = path.join(workingDir, file);
    const newPath = path.join(targetDir, file);
  fs.promises
  .rename(oldPath, newPath)
  .catch(console.error)

}