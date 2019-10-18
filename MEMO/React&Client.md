# 클라이언트

> _"^G^O! G^O^! R~E~A~C~T!"  - 강태훈_

### PM2
###### NodeJS 프로세스 관리 도구
* 자동 업데이트 변경사항 logging
* 프로세스 회복 기능
* 모듈로 라이브러리를 지정해서 로직만 메인에 표시하고 구현된건 쪼개서 관리가능.

### snippet
- rcc : class component skeleton
- rrc→	class component skeleton with react-redux connect
- rrdc→	class component skeleton with react-redux connect and dispatch
- rsf : stateless named function skeleton
- rsc : stateless component skeleton    (literal with arrow)

- - -

### 리액트
- BASIC
  - **Status** :렌더같은 DOM의 변화에도 데이터를 계속 담고 밑으로 흘려줄 수 있음
  - **Props** :Container(부모) 컴포넌트가 prop을 정하고 표현하는 컴포넌트에서 this.props로 받아서 처리

- HOOK ( ~ React 16 )
  ```npm install --save eslint-plugin-react-hooks```

- *Build*
   + for Deploy

- *Eject*
  + CRA의 자동관리에서 벗어나 수동작업을 위해 설정을 분리해내는 작업

  ##redux
  - 디버깅할때 무조건 원인을 알아야 다음 찾는 해결방법도 도움이 된다. undef 라면 어디서 부터 undef인지 찾아봐라.

- *리액트 작업팁*
  + 스테이트를 관리하기 위해 Stateful 컴포넌트의 함수에서 this를 bind하거나 Arrow Function 사용
  + 비구조화 할당으로 간결하게 값을 조정하기 ( 버그도 줄이고 속도도 빠르게 )
  + 화살표 함수쓰면 bind안하고 내려주기 가능
  + 현재 리액트에선 constructor 밖이 먼저 실행된다. 이런 로직을 이용하고 하고 싶은게 아니면 constructor, super 필요없다.
  + shouldComponentUpdate 에서 true 리턴이 되면 render 호출. 성능관리에 중요한 로직. 하지만 이걸 일부러 수정하는 것은 신중할 필요가 있다. 리액트도 그걸 염두하고 이미 스스로 관리하고 있다.
  + setState를 통해서 스테이트를 관리는이유? ```this.status.*``` 같은 접근이 객체의 레퍼런스를 바꿈으로서 ```prev===priv``` 연산을 느리게 만들기 때문이다.
  + 데이터의 분기점에 status풀하게 관리하는게 성능에 좋다.
  + 컴포넌트는 재사용가능하게
  + 하나의 컴포넌트는 하나의 기능을 한다.



### HTML
- BASIC
  + block : 한줄 차지
  + div 및 display: inline은 컨텐츠만큼의 hight 를 가진다. **height 설정불가**
  + inline-block : height 설정가능

### CORS(Cross-Origin Resource Sharing)
- 이전에는 same 오리진 정책이 기본이였지만, CORS를 허용하면 다른 도메인에서도 요청가능 API활용이 많아진 시대에는 필요한 허용을 관리한다.
- CORS는 시스템 수준에서 타 도메인 간 자원 호출을 승인하거나 차단하는 것을 결정한다.
- CORS는 웹 브라우저에서 외부 도메인 서버와 통신하기 위한 방식을 표준화한 스펙이다.
- 서버와 클라이언트가 정해진 해더를 통해 서로 요청이나 응답에 반응할지 결정하는 방식으로 교차 출처 자원 공유.
- 이게 스트링파이안하면 갑자기 CORS를 딴지를 건다.;;

## 브라우저
- 브라우저에서 미리 preflight를 통해서 필요한 요청을 정의한 다음 본격 통신.

##CORS
#### xos 개발자모드 크롭 켜기 (옵션 안전 끔)
open -na Google\ Chrome --args --disable-web-security --user-data-dir="/tmp/chrome_dev"
