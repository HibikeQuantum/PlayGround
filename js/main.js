'use strict'

const MY_BEST_CHARACTER = "COCORO PPYONG";

function execute(callback, n) {
  let i = 0, acc;
  if (callback.name === 'makeRanChar') {
    acc = '';
  }
  while (i < n) {
    acc += callback();
    i++
  }
  return acc;
}

if (false || undefined || null || 0 || '' || NaN) {
  console.log("당신의 말은 도달하지 못한다. 천국에");
} else if (9 || false) {
  console.log('10:36', 'main.js/anonyCompare:5', "그리고 나의 승리")
}

const findTrue = (int1, int2) => {
  if (int1 > int2) {
    console.log('10:41', 'main.js/findTrue:10', '카인의 승리');
  } else {
    console.log('10:41', 'main.js/findTrue:12', '아벨의 승리');
  }
};//표현형 함수'는 인터프렛 되면서 실행된다. 선언형은 먼저 읽힌다.

//IIFE
(function fooX() {
  console.log("Here I Am fooX", fooX)
})();
console.log('11:08', 'main.js/findFoo:17', typeof (fooX));

(function () {
  console.log("Here I Am IIFE")
})();
console.log('11:13', 'main.js/findFoo:24', typeof (fooY));


findTrue(null, "logos");
//truthy > falsy => true

let array = [[[3], 2], 1];
for (let i in array) {
  console.log('10:50', 'main.js/anonyF:20', `"${i}": ${array[i]}`);
}

let dio = [];
if ({} || dio) {
  console.log('11:30', 'main.js/refVar:37', "진실을 말해라")
  dio.push(false);
  console.log('11:36', 'main.js/func:40', dio);
  if (dio) {
    console.log('11:37', 'main.js/lastOfDio:42', "그 모든 일에도 여전히 디오다.")
  }
}

let logos = "God save korea, america, japan";
console.log('11:39', 'main.js/saveKorea?:47', logos.includes('korea'));
// String.indexOf, String.lastIndexOf, String.includes, String.spilt, String.substring, String.Slice
// Slice 가 최광 -1 매개변수로 뒤에서 검색이 가능

console.log("스타트\t원탭\n엔터");
console.log('12:07', 'main.js/trim:52', " 고통을 견뎌라. 기꺼이   견디겠다고 선언해라!  ".trim())

//String.replace는 imm이다. regex를 써도되도 문자열을 넣어도된다.
let kickYourEnemy = "I Spelled mAsiC to the enemy, hahaha enemy is Gone!";
console.log(kickYourEnemy.replace('enemy', 'boss'));
let regex1 = /masic/i //i 글로벌검색 replaceALL같은 느낌
console.log(kickYourEnemy.replace(regex1, 'MUSIC'));
let regex2 = /[A-Z]/g //A-Z로 범위표현, g 대소문자 구분안함
console.log(kickYourEnemy.replace(regex2, '뷁'));

console.log([1, 2, 3].map((cur, index, array) => {
  return cur * cur + index + " " + array
}));

// anonyF 처리, 콜백함수를 (cur) => {} 모양으로 구현해주
function square(cur) {
  return cur * cur;
}

console.log([1, 2, 3].map(square))
console.log([1, 2, 3].filter((cur, index, array) => {
  return cur > 1
}));

function greaterThenOne(cur) {
  return cur > 1;
}

console.log([1, 2, 3].filter(greaterThenOne));
// Array.slice, arr.pop, arr.push, arr.splice(start, delete, addItem[..]]);
let myArray = [1, 2, 3];
let output1 = myArray.reduce((acc, cur) => {
  return acc + cur;
}, 0);
console.log(output1);

let callback1 = function (acc, cur, index, array) {
  console.log(acc, cur, index, array);
  return acc + cur;
}
let output2 = myArray.reduce(callback1, 0); // reduce 첫 인자에 callback이 있으면 reduce는 그 함수는 callback에 인자를 던져주는 역할을 한다. init 값으로 싲가하게 해주는 것도;
console.log(output2)
//Array.join(), Array.indexOf(), Array.concat()
console.log(myArray.every((cur) => { // every 는 인자로 받은 데이터에서 값을 콜백으로 던져서 받은걸 가지고 판단한다.
  return cur > 0
}));
console.log(myArray.shift(), myArray); //삭제된 el을 반
console.log(myArray.unshift(1), myArray); // unshift는 전체길이를 반환

// 대망의 sort
let numbers = [4, 2, 11, 5, 101, 3];
console.log("숫자 디폴트 정렬", numbers.sort());   // 내림차순. 유니코드 기준/
numbers = [4, 2, 11, 5, 101, 3];
console.log("INC 오름 정렬", numbers.sort((a, b) => {
  return a - b; // a-b 오름차순
}));
console.log("DEC 내림 정렬", numbers.sort((a, b) => {
  return b - a;
}));

let peoples = [
  {name: "큭큭큭", age: 25},
  {name: "포스트모던타입", age: 20},
  {name: "유쾌한사람", age: 30}
];
console.log(peoples.sort((a, b) => {
  return a.age - b.age      // 오
}));
peoples = [
  {name: "큭큭큭", age: 25},
  {name: "포스트모던타입", age: 20},
  {name: "유쾌한사람", age: 30}
];
console.log(peoples.sort((a, b) => {
  return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
})) // <> 오름차순 이름
peoples = [
  {name: "큭큭큭", age: 25},
  {name: "포스트모던타입", age: 20},
  {name: "유쾌한사람", age: 30}
];
console.log(peoples.sort((a, b) => {
  return a.name > b.name ? -1 : a.name < b.name ? 1 : 0;
})) // 숫자는 a - b; b - a; 또는 문자열의 경우엔 조건식을 세워서 -1, 1 또는 0을 주는것으로 조건문 완성해서 인자로 준다.

console.log(parseInt(Math.ceil(((1 + 12) / 2)), 10), 'What is up!'); // parseInt 쓸 때는 round,fix, ceil 항상 지정
// Math.round(Math.random()* (max-min)) - min 자주쓰는 모양
console.log(Math.round((Math.random() * (10 - 1))) + 1);
// 한글 유니코드 범위 AC00-DA73 by 16bit
console.log(String.fromCharCode(Math.round(Math.random() * (0xDA73 - 0xAC00)) + 0xAC00))
// 한글을 16진법으로 바꾸기

var makeRanChar = () => {
  return String.fromCharCode(Math.round(Math.random() * (0xDA73 - 0xAC00)) + 0xAC00)
}

console.log(execute(makeRanChar, 10));

let myR = "세상을 저주하는 문장은 절대로 적지 마십시요.".split("").map(cur => {
  return cur.charCodeAt(0).toString(16);
});
console.log(myR);
let finalMyR = myR.map(cur => {
  return String.fromCharCode("0x" + cur);
});
console.log(finalMyR);

var int = "global power!"
var methodA = function () {
  var int = 'local lexical'
  console.log("int: ", int)
}
let glovalLet = 'gloval let'
console.log(glovalLet);
console.log(int); // 블록안에껀 영원히 못나온다.


methodA();

function adderA(partA) {
  return function adderB(partB) {
    console.log(partA + partB)
  }
}

let work10 = adderA(10);
work10(8);
let asset = "100원";
var myObj = {
  asset: "1000억",
  aaa: function (y) {
    console.log(y, "이것이 한국의 반란이다!")
  },
  fight: (asset) => console.log(asset, this.asset), //화살표를 쓰면 부모가 아니라 글로벌을 본다.
  fight2: function () {
    console.log(asset, this.asset, "아키타입의 가치!")
  } // 정상적인 모양으로 쓰면 바닐라는 글로벌로 this는 자기부모를 본다.
}
myObj.aaa("알렉산도르!!")
myObj.aaa = (z) => console.log(z, "이것은 일본의 반란이다!")
myObj.aaa("부커티!!");
myObj.fight("만원");
myObj.fight2();

let myVirtue = ['용기', '책임', "창의", "성장"];
let myStats = {"용기": 100, "고기": 20};
if ('용기' in myVirtue) {
  console.log("인덱스로 써라!");
}
if (0 in myVirtue) {
  console.log("우동 사리는 있나보군")
}
console.log('용기' in myStats); //객체는 key값을 지정해서 호출가
myStats.포션 = "100개 드림";
console.log('포션' in myStats);

class Hero {
  constructor(hp, attack, name) {
    this.hp = hp;
    this.attack = attack;
    this.name = name;
  }

  selfIntro() {
    console.log(`${this.name} 체력은 ${this.hp} 공격력은 ${this.attack}이야!`)
  }
}

let hero = new Hero(100, 11, '전사');
hero.selfIntro();
let akuma = new Hero(200, 5, '악마');
akuma.selfIntro();

//ES6 클래스 방식
function deathBattle(A, B) {
  let result = undefined;
  while (!result) {
    A.hp = A.hp - B.eat;
    B.hp = B.hp - A.eat;
    if (A.hp < 0) {
      result = B.name + "의 승리!"
    } else if (B.hp < 0) {
      result = A.name + "의 승리!"
    }
  }
  return result
}

console.log(deathBattle(hero, akuma));

//ES5 펑션, 프로토타입 방식 구현
function Banker(name, asset) {
  this.name = name;
  this.asset = asset;
  Banker.prototype.gogogo = function () {
    console.log(`솔직히 말해 ${name}은행에 ${this.asset}억이 예금되어 있어요.`)
  }

}

let hana = new Banker("hana", 1000);
let center = new Banker("hana");
hana.gogogo()
center.asset = 200 //getter setter 로 private로 고칠 수 있다.
center.gogogo()

let items = [
  {"이름": "캐나다 피자", "치즈": true, "고기": false}
  , {"이름": "미국 피자", "치즈": true, "고기": true}];
for (let key in items) {
  if (items[key]["고기"] === true) {
    delete items[key];
  }
}
console.log('17:25', 'main.js/pizza:273', items);


function Product(name, price) {
  this.name = name;
  this.price = price;

  this.whatIsGood = function () {
    return "재화와 서비스는 현실적 욕망을 충족시킵니다"
  }
}

function Computer(name, price, speed, memory) {
  Product.call(this, name, price);// Muppet 의 생성자를 그대로 빌려쓰겠습니다! 선언 생성자의 메서드도 사용한다.
  this.speed = speed;
  this.memory = memory;

  this.whoAmI = function () {
    return console.log(`I have ${memory}G memory. 메모리 탓하기 전에 집안을 정리하세요.`);
  }
}

let myLaptop = new Computer("logosCPU", 600000, 2.4, 8)
myLaptop.whoAmI();
console.log(`나는 ${myLaptop.price}원짜리 물건입니다. 주인은 나한테 ${myLaptop.name}이란 이름을 지어주었어요. 저는 ${myLaptop.speed}GHz의 속도로 악을 무찌릅니다.`);
console.log(myLaptop.whatIsGood());

Computer.prototype.upgrade = function () {
  console.log("의미는 좋은 환경이나 높은 능력위계에서 나오는게 아니다. 당신이 진실을 위해 혼돈을 정리하기위해 자신을 돕기위해 나아가고 있다는 감각의 지각입니다.")
}
myLaptop.upgrade();
console.log(MY_BEST_CHARACTER);

let letInIIFE2 = 2;
var varInIIFE = "let in IIFE";
let myOut = [1, 2, 3].reduce((all, cur) => {
  let letInFunction3 = 3;

  return all + cur;
}, 10)
for (let key in [1, 2, 3]) {
  console.log("후왁!", key)
  var keyImage = key;
}
console.log(myOut);
// 이건 되지 않는다. console.log(letInFunction3);
//console.log(varInFunction33); fail 익명함수 안에껀 var 취급도 안해주는구만?

console.log(keyImage); //그냥 반복문 안에 스코프의 var는 처리해준다.

function robot(part1, part2) {
  var secretVarInFunction = '길가다가 고양이를 쓰다듬어줘라!';  // 펑션 스코프 var
  console.log(part1, part2, '세상을 비판하기 전에 방을 정리해라!', secretVarInFunction)
}

robot('Maps', 'Of Meaning');
//console.log("너의 비밀은 뭐니..?", secretVarInFunction)    //접근불가능이다. Func 에서 호출된 var


for (var testI = 0; testI < 3; testI++) {
  if (1) {
    var varInFunc = "당신에게 최선을 다하도록 독려하는 사람과 친구가 돼라";
    let testII = "진실만을 말해라,적어도 거짓말은 하지마라!";
    var testIII = "너 자신을 도움이 필요한 사람처럼 대해라!";
    const constInBlock = "어깨를 펴고 세상을 향해 맞서라!";
    console.log(testII);
  }
  console.log(varInFunc);   // for 안의 블럭은 렉시컬 스코프를 생성하지 않아서 호출이 된다. var의 단위는 함수.
  //console.log(testII);  // let 은 오직 {} 블럭 스코프
  console.log(testIII);
  //console.log(constInBlock);    // cost 는 블록단위다!!!!
  console.log(testI, "으엿!"); //=> let testI였다면 undefined; let은 block 안에서 선언된건 안에서마 호출; let은 블록단위다. var면 외부에서도 가능하다. window에 배치되니까.
  //console.log(testII);  // let 은 오직 {} 블럭 스코프
  console.log(testIII);   // var는 일단 함수안에서 선언되면 글로벌함수에서 쓸 수 있다. (오토 호이스팅)
}

{
  console.log('13:50', 'main.js/mosimosi:322', '동작해!')
}

function lastSaying(word) {
  let myWord = word;
  return function (secondWord) {
    console.log(myWord + ' ' + secondWord);
  }
}

var myLast = lastSaying("내 재산은 모두 국고에 귀납하거라");
myLast('open!');

let testCounter = function counter() {
  let counter = 0;
  return {
    increment: function () {
      counter++;
    },
    decrement: function () {
      counter--;
    },
    getValue: function () {
      return counter;
    }
  } // 디자인 패턴에 따른 리터럴 객체 선언법. 클로져 모듈 패턴!
}();
testCounter.increment();
console.log(testCounter.getValue());
testCounter.decrement();
console.log(testCounter.getValue());

var sumNumbers = function (... numbers ){
  return numbers.reduce ( (all, cur)=> {
    return all+cur;
  })
}
var getMaxNumbers = function (... numbers){
  return numbers.reduce ( (max, cur) => {
    if ( max < cur){
      console.log("새로운 챔피언: ", cur );
      return cur
    }else {
      console.log("넌 날 쓰러트릴 수 없다!: ", max );
      return max;
    }
  },arguments[0])
}
console.log('16:00', 'main.js/func:404', getMaxNumbers(2,1,3,4,6))
console.log('15:57', 'main.js/func:395', sumNumbers(1,2,3))
var getFullNmae = function ( familyName = 'Kang', lastName ){
  return familyName +' '+lastName
}
console.log('16:03', 'main.js/func:411', getFullNmae( undefined, 'taehun') )

var obj = {
  aaa : "obj",
  fn: function(a,b) {
    debugger;
    return this.aaa;
  }
};
var obj2 = {
  aaa : "obj2",
  method: obj.fn
};
console.log( obj2.method() === "obj2"); // this 는 자기를 실행시킨 obj2. 이걸 들고 있다.
console.log( obj.fn() === "obj"); // this 는 자기를 실행시킨 obj를 가르키고 있다. 즉. 실행환경! this!

function identify() {
  //let returning = 'WHO AMI'
  let name = 'kkk'// 소용없다.
  return this.name.toUpperCase(); //이렇게 구술을 하면 오직 call bind 수동 지정된것만 읽겠단 소리다.
}
let name = 'jjj' // 이것도 this.name 바인딩되지 않는다.

function speak() {
  var greeting = "Hello, I'm " + identify.call(this);
  console.log(greeting);
}
var me = { name : "Kyle"};
var you = { name: "Reader"};

console.log(identify.call(me));
speak.call(me)
