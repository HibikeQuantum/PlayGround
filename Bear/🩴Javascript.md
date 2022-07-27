# 🩴Javascript

#Devops/language


---

## this bind

* 화살표함수, bind -> call, apply -> 나머지 우선순위로 this가 바인딩 된다.

* 즉 순위가 높은건 유저가 지정한다고 확신할 수 있는 케이스다.

* 잡아먹는다는 것이고 낮은건 엔진이 스스로 지정하는 경우다.



## SCOPE

* 함수단위로 scope가 생겨나고 ARemoteRepositoryow를 하면 현재 함수만을 보게 된다. ≡ 딴데 가서 호출되어도 this를 새로 할당 받지 않는다. ≡  이미 바인드 되었다.

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



## 브라우저에서 사용가능한 HTML REQUEST

* async 는 `AJAX` 의 핵심단어. DOM과는 독립적으로 HttpRequest 객체로 데이터를 처리한다. 페이지속도가 빨라지고 로드를 처리하는게 부드러워진다.

* `XMLHttpRequest`가 자바스크립트가 HTML요청을 처리하기 위한 객체이고 jQuery로도 다룰 수도d있다.

* `Fatch` 좀더 최신의 API

* `URI` (Uniform Resource Identifier) ≈ URL