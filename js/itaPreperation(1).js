//Recursion <<1>>

let data = [
  {id: 1},
  {id: 2},
  {id: 3},
  {
    id: 4, children: [
      {id: 6},
      {
        id: 7, children: [
          {id: 8},
          {id: 9}
        ]
      }
    ]
  },
  {id: 5}
];

Array.prototype.findObjectById = function (id) {
  //이안에서 this는 호출 시킨 객체;
  function findRecursion(obj) {
    for (let i in obj) {
      if (obj[i]['id'] === id) {
        outcome = obj[i];
      }
      if (obj[i].children || obj[i].length >= 2) {  // object, array 처리 이터레이블한 like한 애들가 온다면 어떻게 해야할까..
        findRecursion(obj[i])
      }
    }
  }

  let outcome = {};
  findRecursion(this);
  return outcome;
}

console.log(data.findObjectById(6), "find 6"); // { id: 6 }
console.log(data.findObjectById(7), "find 7"); // { id: 7, children: [{id:8}, {id:9}] }
console.log(data.findObjectById(2), "find 2"); // { id: 2 }

console.log('---------------------', '끝!', '---------------------')

// Recursion <<2>>
// 아래 함수를 recursion으로 고치시오
var eat = function (meal) {

  console.log('meal before bite:', meal);
  if (meal.length === 0) {
    console.log('done with the meal!');
    return undefined;
  } else {
    console.log('now eating', meal.pop());
    eat(meal)
  }
}

eat(['soup', 'potatoes', 'fish']);

var arr = [];
console.log(eval(arr === []));
console.log(eval([] === []));
console.log(Object.is(arr, []));

console.log('---------------------', '나중에 답변확인하기!', '---------------------')

var fns = [];
for (var i = 0; i < 3; i++) {
  fns[i] = function () {
    console.log('My value:' + i);
  }
}
// fns 0 1 2 함수가 들어가 있다. i 를 호출하는 모습이 기록되지 i의 값이 기록되는게 아니다.;
for (var j = 0; j < 3; j++) {
  fns[j]();
}
// 이때 호출하는 i는 0-1-2-3이란 역사와 무관하게 i가 기록된다.i 가 호출되면서 333

// var foo = function(j) {
//   console.log('My value:' + j);
// }
// var fns = [];
// for (var i=0; i<3; i++) {
//   fns[i] = foo(i);
// }
// 이렇 하면 1,2,3 은 나오는데 fns[i]에 할당은 아무런 의미없는 undef foo에 return j 넣어줘야 한다.
// IIFE 를 적용해서 풀어보겠습니다

// var fns = [];
// for (var i=0; i<3; i++) {
//   fns[i] = (function(j) {
//     console.log('My value:' + j);
//   })(i);
// }
// 이렇게 되면 fns[i] 는 값을 갖질 기회를 얻긴하는데 IIFE를 하고반환할 값을 정하진 않았으니 undefine이 들어갔고
// for (var j=0; j<3; j++) {
//   //fns[j]();
// }
// fns[j]는 펑션도 아니니 ()를 하면 에러난다.

(function () {
  for (var jjj = 0; i < 2; i++) {
    var x = 'x';
    // 이안에서 console.log 요청하면 실
  }
})();
//console.log(x) //에러발생

console.log('---------------------', '스코프 완료-리커전 시작', '---------------------');

function factorial(n) {
  if (n === 1) {
    return 1;
  } else {
    debugger
    return n * factorial(n - 1) // 자기 호출을 할때는.. 그게 어떻게 끝날지 어떤 모양으로 돌아올지 생각하고 구현해야한다.
  }
}

console.log('5! => ', factorial(5));

function fibonaccci() {
  let prev1 = 0;
  let prev2 = 1;
  return function () {
    console.log(prev2);
    let nextPrev = prev1 + prev2
    prev1 = prev2;
    prev2 = nextPrev;
  }
}

let myFibo = fibonaccci();
myFibo();
myFibo();
myFibo();

// 실행하면 계속 다음 값을 뱉는다.

// 커링
function add(x) {
  return function (y) {
    return x + y;
  }
}

let myadd = add(1);
console.log("커링ADD", myadd(4));
console.log("이렇게도 사용", add(1)(2));

function htmlMaker(tag) {
  let startTag = `<${tag}>`;
  let endTag = `<\/${tag}>`;
  return function (contents) {
    return startTag + contents + endTag
  }
}

let p = htmlMaker('p')

console.log(p("재미있는 코딩!"));

// 클로져 모듈 패턴
console.log('---------------------', '모듈', '---------------------')

function closer() {
  let value = 0;
  return {
    inc: function () {
      value++;
    },
    dec: function () {
      value--;
    },
    get: function () {
      return value;
    }
  }
}

let counter = closer();
console.log(counter.get()); //클로져 모듈패턴을 하면 함수가 들어있는 객체를 받는다. 객체안에 구현된 메서드를 호출해서 실제작업을 하는것.
counter.inc();
console.log(counter.get());

var usefullObj = {
  am: function () {
    console.log("아침은 재빨리 주회 및 퀘스트를 깨고 도서관에 출근합니다.")
  },
  pm: function () {
    console.log("오후에는 마음을 바쳐 인생의 과제를 완수합니다.")
  }
}

usefullObj.am();
usefullObj.pm();

// 호출할때 시간을 말해주는 함수를 만들어보자
function makestopWatch(alertSec) {
  var time = 0;
  var increase = function () {
    time++;
    if (time === alertSec) {
      console.log("삐비비빅! 콜백스택이 처리됬습니다", time);
      clearInterval(id);
    }
  };
  let id = setInterval(increase, 1);
  return function () {
    return time
  };
}

var myWatch = makestopWatch(1);
sleep(1);
console.log(myWatch());

function sleep(delay) {
  var start = new Date().getTime();
  while (new Date().getTime() < start + delay) ;
}

function a() {
  console.log('17:18', 'itaPreperation(1).js/a:221', "여기는 a입니다.", this)
  b();
}

function b() {
  console.log('17:18', 'itaPreperation(1).js/a:221', "여기는 b입니다.", this)
}

b();

const person = {
  birthYear: 1994,
  clacAge: function () {
    console.log(2018 - this.birthYear);
  }
}
person.clacAge();
const calc_clac_Age = person.clacAge;   // 위는 호출되면 this의 컨텍스트가 person이 된다. 하지만
calc_clac_Age();  // 얘는 덩그러니 메서드만 받았고 안에 this가 가리킬 수 있는 birthYear가 없다. (현재 this는 글로벌)
// 허나
let birthYear = 1989;
calc_clac_Age(); // 밖으로 찾지도 못한다. 하지만
console.log('---------------------', 'add2 테스트', '---------------------')

function add2(x, y) {
  this.val = x + y;
  console.log(this.val)
}

let obj = {val: 10};
add2.apply(obj, [2, 8]);
add2.call(obj, 12, 8);

let boundFn = add.bind(obj, 11, 3) // 바인드를 하면 함수를 반환하고 실행할 준비 ready!
boundFn();

console.log("맥스?", Math.max.apply(null, [1, 2, 3]))
//실행환경이 의미가 없으니까. null을 보내도되.

// function getElementId ( ele ) {
//   return ele.id;
// }
// let list = document.querySelectorAll('a')
// console.log(Array.prototype.map.call(list, getElementId));

function Box(w, h) {
  this.width = w;
  this.height = h;

  this.getArea = function () {
    return this.width = this.height;
  }
  this.printArea = function () {
    debugger;
    console.log(this.getArea(), "이게 Box 넓이")
  }
}

let myBox = new Box(100, 50);
myBox.printArea();

// 동기적으로 실행할땐 Box가 실행환경. 비동기로 할땐 Global 그래서 오류가 발생.
//setTimeout(myBox.printArea, 2000);
setTimeout(myBox.printArea.bind(myBox), 2000);
// bind는 함수를 반환한다. 그게 본질. 파라미터를 주거나 this를 지정해놓거나. 전자를 쓰면 커링 및 함수 개조, 뒤를 쓰면 비동기용
// apply, call은 함수를 제대로 호출하는 용도. 그게 본질. 그래서 함수가 없는 없는 자료형에 내함수를 쓸 수 있는점을 유의.


//초기 캐시값과 사용자 정의 함수를 받음
var cacher = function (cache, func) {
  var calculate = function (n) {
    if (typeof (cache[n]) === 'number') {
      console.log("cache 반환")
      result = cache[n];
    } else {
      result = cache[n] = func(calculate, n); //이런 삼단 구조도 가능하구나?
    }
    return result;
  }
  return calculate;
};

//피보나치수열
var fibo = cacher({'0': 0, '1': 1}, function (func, n) {
  return func(n - 1) + func(n - 2);
});

//팩토리얼
var fact = cacher({'0': 1}, function (func, n) {
  return n * func(n - 1);
});
console.log(fibo(1), '피보 퍼스트');
console.log(fact(5), '팩토 퍼스드');
console.log(fact(5), '팩토 세컨드');
// memonize 패턴은 함수를 직접쓰기전에 cache (캐쉬) 를 포함하게끔 정의해서 값을 들고 있으면 그 값을 그냥 바로 반환해준다. 반복되는 계산을 줄여준다.

let oneTwoThree = [1, 2, 3];
let result2 = oneTwoThree.reduce((acc, cur, index) => {
  acc.push(cur % 2 ? '홀수' : '짝수')
  return acc;
}, []);
console.log(result2);
//초기값을 어레이로 하면 acc를 배열처럼 해서 map의 변태적 사용이 가능하다.

console.log([1, 2, 3].filter((item) => {
  return item > 2;
}));


function findMinLengthOfThreeWords(word1, word2, word3) {
  // your code here
  let tempArr = Array.prototype.reduce.call(arguments, (acc, cur) => {
    acc.push(cur);
    return acc;
  }, []);
  let resultWord = tempArr[0];
  for (let key in arguments) {
    if (tempArr[key].length <= resultWord.length) {
      resultWord = tempArr[key]
    }
  }
  return resultWord
}

var output = findMinLengthOfThreeWords('a', 'abc', 'aa');
console.log(output); // --> 1

function computeProductOfAllElements(arr) {
  // your code here
  var result = undefined;
  if (arr.length === 0) {
    return 0;
  }
  result = arr.reduce((acc, cur, i) => {
    if (i === 0) {
      return acc
    } else {
      return acc * cur
    }
  }, arr[0])

  return result;
}

var output = computeProductOfAllElements([2, 5, 6]);
console.log(output); // --> 60


function capitalizeFirstCharacter(sentence) {
  return String.prototype.slice.apply(sentence, [0, 1]).toUpperCase() + sentence.slice(1);
}

let output3 = capitalizeFirstCharacter('i am peter.');
console.log(output3);


function getElementOfArrayProperty(obj, key, index) {

  if (typeof (obj[key]) !== "object") {
    return undefined;
  }
  if (typeof (index) !== "number") {
    return undefined;
  }
  return obj[key][index];
}

let obj5 = {
  key: ['Jamil', 'Albrey'], key2: ['hahaha', 1234]
};

let output4 = getElementOfArrayProperty(obj5, 'key2', 0);
console.log(output4); // --> 'Jamil'

function convertObjectToList(obj) {
  let result = [];
  for (let key in obj) {
    result.push([key, obj[key]])
  }
  return result;
}

let myInfomation = {
  name: 'Holly',
  age: 35,
  role: 'producer'
}
let outcome5 = convertObjectToList(myInfomation);
console.log(outcome5)

function sumDigits(num) {
  let myString = String(num);
  let sum = 0;
  for (let i = 0; i < myString.length; i++) {
    if (myString[i] === '-') {
      sum -= Number(myString[i + 1])
      i++;
    } else {
      sum += Number(myString[i])
    }
  }
  return sum;
}

let output6 = sumDigits(-316);
console.log(output6, '디짓섬'); // --> 4

function modulo(num1, num2) {
  let minus = false;
  let mok;
  let i = 0;
  if (num2 === 0) {
    return NaN
  }
  if (num1 < 0) {
    minus = true;
  }
  num1 = Math.abs(num1);
  num2 = Math.abs(num2);

  while ((num2 * i) <= num1) {
    i++;
  }
  mok = i - 1;
  return minus ? -(num1 - num2 * mok) : num1 - num2 * mok
}

var output = modulo(5, -1.5);
console.log(output); // --> 0.5

console.log('---------------------', '여기서부터 언더바 복습', '---------------------');



