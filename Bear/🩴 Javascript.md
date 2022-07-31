# 🩴 Javascript

#Devops*language*javascript


---

## this bind

* 화살표함수, bind -> call, apply -> 나머지 우선순위로 this가 바인딩 된다.

* 즉 순위가 높은건 유저가 지정한다고 확신할 수 있는 케이스다.

* 잡아먹는다는 것이고 낮은건 엔진이 스스로 지정하는 경우다…



## SCOPE

* 함수단위로 scope가 생겨나고 arrow를 하면 현재 함수만을 보게 된다. ≡ 딴데 가서 호출되어도 this를 새로 할당 받지 않는다. ≡  이미 바인드 되었다.

```

var obj {

  c: function() {

    console.log(this)

}

```

**객체가 어떻게 되든 c가 함수스코프가 되고**this**는**obj* 가 된다. 그래서 메소드호출은 언제나 객체가 this가 된다. 대신 객체 안이라도 => 익명함수가 되면 스코프가 생겨나지 않고 생겨나지 않으면 기본은 window.

* 즉 다르게 말하면 애로우를 작성하면 함수가 작성된 시점의 스코프로 고정된다. 안바뀐다. 애로우로 안하면 실행되는 시점에서 함수스코프다 >> 객체는 스코프를 만들지 않는다. 그걸 생각해라.



## Instance 

* Instance를 만들어 낼 수 있는 객체(new 키워드를 를 쓸 수 있는)만 construct 를 가진다. 예를 들어 math는 construct가 없다. 계산만을 위해 존재하는 것.

* 부모의 컨스트럭터를 실행하는게 super 키워드 → 명시적 실행. ES6 부터는 없어도 실행된다. 바벨 옵션에 따라 없어도 알아서 수행된다. create~~react~~app에는 옵션이 적용되어 있다.



## 인스턴스 메서드

-	[ ] 다시 확인

## 프로토타입 메서드

-	[ ] 다시 확인



## 프로토타입 표현

`_***proto***_` 은 `[[prototype]]` 과 같다. 표기방식이 다른거다. 두가지가 읽는건 프로토타입체인,프로토링크

`super` 키워드로 부모에 접근



* `new FFF` => FFF 를 컨스트럭터로 가지는. 생성자만 실행된 객체 인스턴스 생성하는 키워드

`object create`를 하면 `(arg)`의 객체를 _***proto***_ 로 가르치는 생성자만 실행된 객체 반환







## 브라우저에서 사용가능한 HTML REQUEST

* async 는 `AJAX` 의 핵심단어. DOM과는 독립적으로 HttpRequest 객체로 데이터를 처리한다. 페이지속도가 빨라지고 로드를 처리하는게 부드러워진다.

* `XMLHttpRequest`가 자바크립트가 HTML요청을 처리하기 위한 객체이고 jQuery로도 다룰 수도d있다.

* `Fatch` 좀더 최신의 API

* `URI` (Uniform Resource Identifier) ≈ URL


---



# 리액트 이야기

* React DOM은 엘리먼트와 그 자식 엘리먼트를 이전의 엘리먼트와 비교하고 DOM을 원하는 상태로 만드는데 필요한 경우에만 DOM을 업데이트합니다.

* 개념적으로 컴포넌트는 JavaScript 함수와 유사합니다. 컴포넌트는 ‘props’로 입력을 받은 후, 화면에 어떻게 표시되는지를 기술하는 React 엘리먼트를 반환합니다.

* 컴포넌트는 순수함수의 정체성을 가지고 절대로 prop를 직접 수정하지 말아야 한다.

* setState() 를 하면 다시 렌더시키는 트리거가 된다. 값을 알아내기 위해



## PM2

***NodeJS 프로세스 관리 도구***

* 자동 업데이트 변경사항 logging

* 프로세스 회복 기능

* 모듈로 라이브러리를 지정해서 로직만 메인에 표시하고 구현된건 쪼개서 관리가능.


---



### snippet (vscode)

-	[ ] rcc : class component skeleton

-	[ ] rrc→  class component skeleton with react-redux connect

-	[ ] rrdc→ class component skeleton with react-redux connect and dispatch

-	[ ] rsf : stateless named function skeleton

-	[ ] rsc : stateless component skeleton    (literal with arrow)


---



리액트 기초

***Status*** :렌더같은 DOM의 변화에도 데이터를 계속 담고 밑으로 흘려줄 수 있음

***Props*** :Container(부모) 컴포넌트가 prop을 정하고 표현하는 컴포넌트에서 this.props로 받아서 처리



HOOK ( ~ React 16 )

  `npm install —save eslint~~plugin-react~~hooks`



## Build

   * for Deploy

## Eject

  + CRA의 자동관리에서 벗어나 수동작업을 위해 설정을 분리해내는 작업



##  redux

  - 디버깅할때 무조건 원인을 알아야 다음 찾는 해결방법도 도움이 된다. undef 라면 어디서 부터 undef인지 찾아봐라.



## 리액트 작업팁

  + 스테이트를 관리하기 위해 Stateful 컴포넌트의 함수에서 this를 bind하거나 Arrow Function 사용

  + 비구조화 할당으로 간결하게 값을 조정하기 ( 버그도 줄이고 속도도 빠르게 )

  + 화살표 함수쓰면 bind안하고 내려주기 가능

  + 현재 리액트에선 constructor 밖이 먼저 실행된다. 이런 로직을 이용하고 하고 싶은게 아니면 constructor, super 필요없다.

  + shouldComponentUpdate 에서 true 리턴이 되면 render 호출. 성능관리에 중요한 로직. 하지만 이걸 일부러 수정하는 것은 신중할 필요가 있다. 리액트도 그걸 염두하고 이미 스스로 관리하고 있다.

## setState를 통해서 스테이트를 관리는이유? 

`this.status.*` 같은 접근이 객체의 레퍼런스를 바꿈으로서 `prev≡priv` 연산을 느리게 만들기 때문이다.

  + 데이터의 분기점에 status풀하게 관리하는게 성능에 좋다.

  + 컴포넌트는 재사용가능하게

  + 하나의 컴포넌트는 하나의 기능을 할때 최적화



### HTML

-	[ ] BASIC

  + block : 한줄 차지

  + div 및 display: inline은 컨텐츠만큼의 hight 를 가진다. ***height 설정불가***

  + inline-block : height 설정가능



### CORS(Cross-Origin Resource Sharing)

-	[ ] 이전에는 same 오리진 정책이 기본이였지만, CORS를 허용하면 다른 도메인에서도 요청가능 API활용이 많아진 시대에는 필요한 허용을 관리한다.

-	[ ] CORS는 시스템 수준에서 타 도메인 간 자원 호출을 승인하거나 차단하는 것을 결정한다.

-	[ ] CORS는 웹 브라우저에서 외부 도메인 서버와 통신하기 위한 방식을 표준화한 스펙이다.

-	[ ] 서버와 클라이언트가 정해진 해더를 통해 서로 요청이나 응답에 반응할지 결정하는 방식으로 교차 출처 자원 공유.

-	[ ] 이게 스트링파이안하면 갑자기 CORS를 딴지를 건다.;;



## 브라우저

-	[ ] 브라우저에서 미리 prefliGitHubt를 통해서 필요한 요청을 정의한 다음 본격 통신.



##CORS

#### xos 개발자모드 크롭 켜기 (옵션 안전 끔)

open ~~na Google\ Chrome —args —disable-web~~security —user~~data~~dir=“*tmp*chrome_dev”







## JSX

* comp 내부에서 규칙

	* if 사용금지

	* {} 안에서 자바스크립트 로직사용

	* 클래스이름은 className 카멜로 표기

	* 하나의 엘리먼트 블락으로 완료 <div><하하><하하><div>



`e.preventDefault();`   실행방지를 위한 코드

* 실행되면 원래는 리프레시 된다. 순자바에선 return false;



* `this.handleClick = this.handleClick.bind(this);`

IF를 한줄로 표현하기

*  `unreadMessages.length > 0 && <h2> {messages~} </he>  `



```react

  if (!props.warn) {

    return null;

  }



  return (

    <div className=“warning”>

      Warning!

    </div>

  );

```



## 제어 컴포넌트 (controlled components)

자바스크립트로 직접 폼의 value 를 컨트롤

Hint: props에 (state를 변경하는) event handler를 넘겨주면 다른 컴포넌트에서 스테이트를 컨트롤 할 수 있다.

재조정(Reconciliation) -> 렌더 여부 결정




---



## Node.js

* V8 엔진을 서버에서도 사용할 수 있게 해놓은 자바스크립트 ‘러닝환경’.. 프레임워크 X

* path Module -> 파일이름을 다루는 모듈. 입력된 경로를 가지고 다양한 포맷으로 다루게 해준다.

* “데이터가 제대로 stringfy됐는지 검증해야함..;;”



#### 패키지

`exports == module.exports` 동일한 개념을 호출하는 방법이 다를 뿐이다.

`require` 는 path를 읽고 `return module.exports` 를 한다.

`module.exports = greet(){} `  ≈  `module.exports.greet = function () {};`

`IIFE(Immediately invoked function expression)` 이지만 한번의 모듈만 실행된다. require는 캐쉬된다. 메모리에 올라가서 대기.



## ESLINT

```js

<< ES_LINT>>

rules: {

  "no-console": 1

}

```



## Promise + async + await

* async 함수의 스코프 내에서만 await를 쓸 수 있다.  

`then.( async(res) =>{ });`

* async await는 try catch로 에러를 잡는다.

사용하는 함수에 따라 fetchd의 400이나 500을 reject로 볼 수도 있고 아닐수도 있다.

* 따라서 `await ≡ promise().then`  이런 관계로 볼 수 있다. 프로미스가 풀필먼트 되는것을 키워드로 만들어놓은 것.

* `pendding` (비동 처리가 시작도 안했다) -> 동기적으로 실행되는 코드에서 프로미스를 찍어보면  그렇게 나온다. -> 실제로 의도한게 실행되면 `fulfilled (res, rej)`의 상태를 가진다.

* async의 리턴은 `펜딩 프로미스 `이걸로 또 이어서 사용가능

***await의 리턴은 리졸브된 값이다.***



### Node 프로세스 안죽이고 버티게 만들기

```js

process.on('uncaughtException', (err) => {

  console.error("죽지마");

  console.error(err);

  // return 된것이 없기 때문에 process를 종료시켜 줘야함.

  process.exit(1);

});

```



****