'use strict';

var _ = {};

_.newForEach = function newForEach(obj, iterator) {
  for (let key in obj) {
    iterator(obj[key]);
  }
}

_.newForEach({a: 1, b: 2, c: 3}, function (item) {

  console.log(item, '새로운 포이치이 모습을 기대하십시요. 당신에게 최고의 모습만을 기대하는 사람만을 만나는 그 순간입니다.');

});

_.newReduce = function newReduce(obj, iterator, accumulator) {
  _.newForEach(obj, (item) => {
    console.log(accumulator)
    if (accumulator === undefined) {
      console.log('여기 안옴');
      accumulator = item;
      iterator(accumulator, item)
    } else {
      accumulator = iterator(accumulator, item)
    }
  });
  return accumulator;
}

let output10 = _.newReduce(['a', 2, 'b', 3, 'c', 5], (acc, cur, index) => {
  if (typeof cur === 'number') {
    return acc + cur
  } else {
    return acc;
  }
},);

console.log(output10, '리듀스 실험');
console.log('---------------------', ' Lexical Scoping!! 중요하다.', '---------------------')
var i = 5;

function foo() {
  var i = 10;
  bar();
}

function bar() { // 선언된 시점에서의 scope를 갖는다! 얜 호이스팅 되잖아.
  console.log(i);
}

foo(); // ?

console.log('---------------------', 'obj 리컬시브', '---------------------')


Object.prototype.findObjectById = function (id) {
  var result = {}
  find(this);

  function find(obj) {
    for (let i in obj) {
      if (obj[i].id === id) {
        result = obj[i]
      } else if (Object.keys(obj[i]).length >= 2) {
        find(obj[i])
      }
    }
  }

  return result
}


let data = [
  {id: 1},
  {id: 2},
  {id: 3},
  {
    id: 4, children: [
      {id: 6},
      {
        id: 7,
        children: [
          {id: 8},
          {id: 9}
        ]
      }
    ]
  },
  {id: 5}
]

console.log(data.findObjectById(6), '최종') // { id: 6 }
console.log(data.findObjectById(7), '최종') // { id: 7, children: [{id:8}, {id:9}] }

console.log('---------------------', '', '---------------------')
// 아래 함수를 recursion으로 고치시오
var eat = function (meal) {
  console.log('meal before bite:', meal);
  console.log('now eating', meal.pop());
  if (meal.length) {
    eat(meal);
  } else {
    console.log('done with the meal!');
  }

}
var eat2 = function (meal) {
  console.log('meal before bite:', meal);
  console.log('now eating', meal.pop());
  if (meal.length) {
    eat2(meal);
  } else {
    console.log('done with the meal!');
  }
}


eat(['soup', 'potatoes', 'fish']);
eat2(['soup', 'potatoes', 'fish']);
// => meal before bite: ["soup", "potatoes", "fish"]
// => now eating fish
// => meal before bite: ["soup", "potatoes"]
// => now eating potatoes
// => meal before bite: ["soup"]
// => now eating soup
// => done with the meal!

function findId(data, id) {

  let resultObj = {};
  find(data);

  function find(obj) {
    for (let i in obj) {
      if (obj[i].id === id) {
        resultObj = obj[i];
      } else if (Object.keys(obj[i]).length >= 2) {
        find(obj[i]);
      }
    }
  }

  return resultObj;
}

console.log(findId(data, 7));

function fibo(n){
  if ( n === 1|| n === 2){
    return 1
  }
  return fibo(n-2) + fibo(n -1)
}
console.log( fibo(6));
console.log('---------------------','Scope 실험','---------------------')

// anony 에서 anony 로 EC가 옮겨간다.
const suki = 'abc';
let functionReciever = (function IIFE() {
  console.log ( suki,'글로벌 알아요 저도')
  const innerSuki = 'efg'
  var innerVar = 'innerVar'
  debugger;
  return innerSuki;
})()
// IIFE로 하면 바로 실행되서 functionReceiver 가 return을 받는다. 단지이아이도 함수에 불구하다. 글로벌에 접근가능하다.
// console.log(innerSuki, 'variable in IIFE'); => IFFE 안의 것은 const라 해도 접근불가.. 아무리 const를 해도 시행 후 반환만 남기고 사라진다.
//console.log(innerVar); // 실행되고 사라진 함수의 것은 아무리 const, let 상관없이 불가능하다. 둘다 블록스코프 //페일
//const 도 block 스코프를 따른다. 단지 재 정의가 불가능한게 차이다.
let innerSukiReceiver = functionReciever;
debugger;
console.log(innerSukiReceiver); // 안에서 접근한 innerSuki는 접근 불가; 함수안에서 실행후 사라지는듯하다.

function test () {
  //const yameVariable = 'yameVariable' var든 뭘 해도 이건 로컬이고 글로벌에서 이 아이들을 부를 수는 없다.
  var yameVariable = 'yameVariable' //이렇게 호출한것들이 사용가능한건  (선언되지 않은 변수들은 항상 전역변수 입니다) 이걸 이해해라. strict 모드에선 에러발생;
  debugger;
}
test();
debugger;
//console.log(yameVariable);

console.log(test2, '?');
function test2 () {
  var test2 = 'test2'
}
var myObj = [1,2,3,4,5];// like Array 계열만 된다. 객체 x!

for ( let v of myObj){
  console.log(v);
}


function cloX () {
  let val = 0;
  return {
  plus:function () {
    val++;
  },
  minus:function () {
    val--;
  },
  get: function() {
    debugger
    return val;
  }}
}
var myCounter = cloX(); //

myCounter.plus();
console.log(myCounter.get());
// 이렇게 클로져를 호출하면 window > mycounter > 모듈객체 {} 의 스코프를 가진다. 그래서 val을 사용가능한거다.
