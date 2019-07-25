let letInGlobal = 'letInGlobal';  // (1)
function test() {
  console.log(letInGlobal, 'letInGlobal 입니다'); // (1)

  var varInLocal = 'varInLocal 입니다.';         // (2)
  const constInLocal = 'localConst 입니다.';     // (2)

  noVar = '함수안에서 지역변수가 되지 않고 전역변수가 된 noVar 입니다.'; // (3)
  debugger;
};
//console.log(varInLocal, "varInLocal 출력!")       // => ERROR varInLocal is not defined   (2)
//console.log(constInLocal, "constInLocal 출력!");  // => ERROR constInLocal is not defined (2)

//console.log(noVar);         // => ERROR noVar is not defined  (3)
test();                     // 'letInGlobal 입니다'            (4)
console.log(noVar);         // 'noVar 입니다.'                 (4)

// var, let, const 같은 키워드로 선언되지 않고 바로 쓰는 변수들은 항상 전역변수
// 오작동의 원인이기 때문에 이를 방지하기 위한 strict 모드에선 에러를 일으킴
var varInGlobalProperty = " I living at Global Property";
(() => {
  console.log(varInGlobalProperty);
  debugger;
})();

(() => {
  console.log(this)
  console.log(letInGlobal);
})();

console.log('---------------------', 'define property', '---------------------')//dot notation
/*
window.foo = 'hello';       // 윈도우 객체에 직접 입력
window['foo'] = 'hello';    // 위와 동일
var bar = function () {      // var 키워드가 바로 위와 같이 윈도우객체( 다르게 말해 실행중인 '함수의 변수object'에 접근하는 것임을 알자.
  foo = "hello";            // 키워드가 없어도 윈도우에 붙는다.
};
Object.defineProperty(window, "foo", {value: "hello"});    // Obejct에 내장된 함수를 통해서 선언

(() => {
  window.myString = "다른 함수에서 윈도우에 접근하기"
})();
console.log(window.myString);
console.log(myString);
*/
// console.log(stringAtAnony);


let P_tempVar = "tempVarAtGlobal";

function foo() {
  let P_tempVar = "tempVarAtLocal";
  bar();
}

function bar() {
  console.log(P_tempVar);
}

foo();          // "tempVarAtLocal"
bar();          // ERROR

function Computer(speed) {
  this.speed = speed;
}

let myCom = new Computer(100);
console.log("내 속도는? ", myCom.speed);

var object = {'a': 1, 'b': 2, 'c': 3};

  function abc( spell ) {
    for (var i in object) {
      var myFunction = function () {
        console.log ( i )
      }
      myFunction();
      debugger;
    }
  }

  abc('Zip');
