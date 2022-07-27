# 👟Go

#Devops*language*go

## Golang 특징

* Communicating Sequential Processes

	* Go의 Concurrent 컴포넌트

	* 채널을 통해 메시지 교환

	* 실행순서

		* 루틴을 시작하더라도 메인루틴이 끝까지가고 끝이 나면 서브루틴들이 메모리를 참고하여 작업을 시작한다.

* 상속이 불가능하다. 대신 embedding 을 사용해 조합, 재사용가능한 구조를 짠다. 굳이 거창한 키워드를 안쓰고 상속을 한다.

* 중앙관리식 패키지관리를 사용하지 않고 실행할때 통신하여 가져온다. 



## 프로젝트 파일 및 패키지

* 프로젝트

	* bin: 컴파일된 실행파일(바이너리)가 생성되는 DIR

	* pkg: 패키지를 컴파일한 라이브러리 파일이 생성되는 DIR {운영체제}_{아키텍쳐}

	* src: 작성한 소스 파일과 인터넷에서 다운로드한 소스 파일이 저장

*  import를 하면 src를 기준으로 상대경로 찾아본다. 

	* `GOROOT*src/, GOPATH/src*, [C.W.P]*src* `

* Package

	* GOROOT, GOPATH, STD 패키지, 3rd P 패키지, Identifier (대문자/소문자)





## 타입

* Back Quote ``  → Raw String Literal	

* Interpreted String Literal `“ ”`  개행 및 + 사용해서 표현

* Type Conversion 가능

* Uint	+ 정수 (x2 +1 길이)

* Array - 배열의 타입은 밸류다.



## 배열

* 배열을 슬라이스 [1:5] 처럼 표현하면 처음 인덱스는 Inclusive 이며, 마지막인덱스는 Exclusive이다 (주: Python과 동일).

* 슬라이스 타입: 동적으로 커지는 배열

var a = []int

a = []int{1,2,3}



## 반복문

* goto, continue (나머지 실행안하고 다음 실행), break 반복 종료

* Label ( L1:) 을 통해 break L1 처럼 실행순서를 컨트롤 할 수 있다. (C++ 에서 봤던거네)



## pass by value, pass by reference, 

* Valiadic function ( 인자를 가변적으로 받을 수 있는 함수)

**`**string` 처럼 레퍼런스 변수를 함수에서 인자로 정의할 수 있다. 그리고 사용할때는 `Test_func(*msg msg)`  처럼 표시를 해서 포인터가 가리키는 값을 바꿀 수 있다. 이걸 dereferencing(역참조)라고 한다.



## 타입 (2)

* type문을 사용한 함수 원형 정의

	* 원형을 정의하고 타 메서드에 전달하고 리턴받는걸 Delegate 라 한다.

* ***Zero base array, 배열크기가 다르면 다른 타입으로 취급***

* 컬렉션 

	* slice (it did not specify lenth, capacity), NIL(nothing), 내부적으로 보면 처음엔 사이즈가 0인데 증설할때마다 새로운 array를 생성하고 복사를 한다.

	* MAP 

	make() NIL 변수를 초기화해서 포인터 반환, 

		* key 가 존재하지 않으면 NIL, 또는 제로 반환 (레퍼런스/ 밸류)

* Golang 자료형 타입

1. **Value Type**

	* Stack 안에 실제 데이터가 있다.

	* struct int

2. **Reference Type**

	* Stack (주소) → Heap (실제 데이터)

	* Map Slice string



## STRUCT

* `person, Person` 의 차이? → Public

* auto deference. 

	* 스트럭처 포인터라도 그냥 변수처럼 쓴다.  ***arg로 넘기면 call by value가 된다. call by ref 를 원하면 포인터로 명시해서 넘긴다.***

* 생성자 정의 함수를 구성해서 사용( ≈ js's CONSTRUCTOR)

* struct 의 receiver

	* Value 로 STR 을 받을지 Pointer로 받을지 메서드에서 정의하는대로 가능

	* (와.. 마음대로 정의할 수 있는게 짱이네, js 지옥 끝)



## interface

	****필드의 집합 구조체, 메서드의 집합 인터페이스*

	* `interface type = empty` 

	* `interface = dynamic type = java object` 와 비슷..

	* Type Assertion .  a.(int) 같은 패턴을 통해 a를 검증하는 확인(assert) 여기서 a가 int가 아니면 런타임에러

* Error

	* interface를 구현하여 case 문법으로 에러를 처리가능 (유용한 내용이다 추천)

* 에러처리

	* defer: 마지막에 실행(ex: clean up)

	* panic(): defer만 실행하고 콜스택 타면서 종료 후 에러

	* recover()



## 루틴 (go routine)

	* 논리적 스레드 ( 1개의 OS 쓰레드는 여러개 고루틴 처리가능)

	* 익명함수에 사용

	* 기본적인 이 go는 동시성처리

	* 하지만 rollingUpdatentime. 으로 Parallel(병렬)도 지원.



### 채널

	* 송신자와 수신자가 존재하도록 구성

	**수신이 될때까지 기다리는**언버퍼 채널**, 버퍼에 저장하고 바로 일하러 가는**버퍼채*널

	* 함수의 파라미터로 쓸때 송신 채널인지 수신 채널로 쓸건지 정하고 그대로 써야함

	* ***채널을 닫아도 송신은 된다. 새로운 메시지를 거부하는거지 송신은 된다고 생각해***

	* `for` 와 `select` 로 각 채널의 송신에 대한 이벤트를 계속 제어할 수 있다 . 송신 채널이 없는데 default 가 있으면 그걸 무한으로 하게 된다



### 패키지

* go mod init {pack_name}

	* GOPATH 밖에 있어도 알 수 있게 컨트롤 해줌.

	* mod 파일은 모듈의 루트에만 존재

	* mod 실행시 현존 모든 경로의 DIR을 정리해 임포트(mod 명세 파일을 만든다) (디렉토리만든다고 또 실행할 필요없다.)

	* `tidy`        add missing and remove unused modules



```

mod init 하기전 테스트

ok      _/Users/kth/Code/Go_1_package_test      0.244s

mod init 후

ok      github.com/lecture      0.352s

```

* go 커맨드는 sum 파일로 섬체크를 한다. (악의적 변경 우발적 변경을 방지)

* go.mod 파일

	* (여기서 indirect 표시는, 직접적으로 이 패키지를 사용하지 않는다는 표시이다)



## Go 관리 명령어

```

go list -m -versions  [rsc.io/sampler](http://rsc.io/sampler) 

	버전출력

go get  [rsc.io/sampler@v1.3.1](http://rsc.io/sampler@v1.3.1) 

go get rsc.io/quote/v4

go list -m rsc.io/q...

```

* 고는 시맨틱 임포트 버저닝을 한다

* 시멘틱 버전, 1.2.3. 순으로 메이저, 마이너, 패치를 의미한다.

	* 호환되지 않는 패키지 (주요 버전이 다른 패키지)에 다른 이름을 부여합니다.

	* 메이저 단위로 같은 모듈이라도 다른 경로를 쓴단거!

* 같은 메이저 안에서 빌드를 두번할 순 없다.

* 지원하는 함수 확인..

	`go doc  [rsc.io*quote/v3](http://rsc.io/quote*v3) `

* list, tidy

```

go list -m all

 현재 프로젝트에서 사용하는 의존성 전부 확인

go mod tidy

	사용하지않는 deployment pack 제거

```



* main 은 인자가 없지만 실행시 os 라이브러리로 주고 받을 수 있음.

* 전통적인 커맨드라인 인자말고도 ‘-f=test.csv’와 같은 플래그도 받을 수 있다. 와 이거 좋다.. 일단 고 실행환경만 갖춰 놓으면 어디서든 유연하게 쓸 수 있겠다. 매번 os 환경변수 라이브러리로 호출하는 것도 일인데 바로바로 동작한다니

* list 는 타입에서 자유롭다. interface 의 후손



## Castring(convert)

* 형변환해야할때 아구가 안맞으면 에러

* 데이터를 깨지 않는선에서 형변화가 가능. 다르게 할려면 



type 정의의 형식은 정해져있다

```

type [name] struct {}

type [name] func() {}

type [name] interface {}

```



* IMPORT 기능 연구

```

import [nick] [path]

import (“lib”;”lib2”) 이렇게 가능

```



import(

“GIN~~FIRST~~PROJECT*src*dataRepo"

이렇게 모듈 + root로부터 상대경로 이렇게 임포트하고



사용할때는 



* 고랭으로 프로그램 짤때 쓸 수 있는 SOLID 원칙(DIP)

	* 모듈 > 추상체 > 구현체 순으로 코드의 커버리지가 크다. 이때 상위 개념은 하위개념을 호출하면 안된다. 하위가 상위의 인터페이스를 구현해야한다.

	* 이 말은 Deploymentendency Inversion PrinClusterIPle (의존성 역전원칙)으로서 많은 객체지향언에서 지향하는 원칙이다.