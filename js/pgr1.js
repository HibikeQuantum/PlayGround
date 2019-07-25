function solution(n, m) {
  var answer = [0, 1];

  let nObj = aliquot(n);
  let mObj = aliquot(m);
  // console.log(nObj,mObj,"이걸 받아왔어요~");

  let max = 0;
  for (let i in nObj) {
    max = 1;
    for (let j in mObj) {
      if (i === j && i > max) {
        max = i;
      }
    }
  }
  answer[0] = Number(max);

  let ansArr = [];
  nObj[1] = 1;
  for (let i in nObj) {
    if (!mObj.hasOwnProperty(i)) {
      ansArr.push(i);
      ansArr.push(nObj[i]);
      delete nObj[i]
    } else if (mObj.hasOwnProperty(i)) {
      if (nObj[i] >= mObj[i]) {
        ansArr.push(i);
        ansArr.push(nObj[i]);
        delete mObj[i]
      } else if (nObj[i] < mObj[i]) {
        ansArr.push(i);
        ansArr.push(mObj[i]);
      }
    }
  }
  for (let i in mObj) {
    ansArr.push(i);
    ansArr.push(mObj[i]);
  }

  for (let i = 0; i < ansArr.length; i += 2) {
    answer[1] = answer[1] * ansArr[i] * ansArr[i + 1];
  }
  return answer;
}

console.log(solution(10, 100));//3,12
console.log(solution(2, 5));//1,10

function aliquot(num) {
  let temp = [0,0];
  for (let i = 2; i <= num; i++) {
    temp[i] = i;
  }

  for (let i = 2; i <= Math.ceil(num/2); i++) {
    if (temp[i] % i === 0  && temp[i] !== 0) {
      for (let j = i + i; j <= num; j = j + i) {
        temp[j] = 0;
      }
    }
  }

  let primeArr = [];

  for (let i in temp) {
    if (temp[i] !== 0 && typeof temp[i] === "number") {
      primeArr.push(temp[i]);
    }
  }

  let nArr = {};

  let isEnd = false
  let numb = num;
  let i = 0;
  while (!isEnd) {
    // console.log("numb",numb,"primeArr[i]",primeArr[i])
    if (numb % primeArr[i] === 0) {
      if (typeof nArr[primeArr[i]] === "undefined") {
        nArr[primeArr[i]] = 1;
      } else {
        nArr[primeArr[i]]++;
      }
      numb = numb / primeArr[i];
    } else {
      i++;
    }

    if (numb === 1) {
      isEnd = true;
    }
  }
  nArr[1] = 1;
  return nArr
}
