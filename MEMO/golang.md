#Go Lang
##셋팅
####툴
- IDE: goland
- INSTALL: https://golang.org/
####환경변수
- `GOROOT`: Go 인스톨폴더
- `GOPATH` : 복수지정가능, 패키지
## 언어적 특징
- 컴파일 언어이나 인터프리터 언어처럼 빠름
- 09년에 발표
####기초문법
######Short Assignment Statement
- `var i = 1` 대신 `i:=1`로 할당가능 (대신 함수안에서만 사용이 가능하다)
- 함수 밖에서도 변수와 상수는 호출 가능
######할당
```
const (
  as = "aaa"
  bs = "bbb"
  cs = "ccc"
)
```
###### 예약어
```
break        default      func         interface    select
case         defer        go           map          struct
chan         else         goto         package      switch
const        fallthrough  if           range        type
continue     for          import       return       var
```
###### 데이터타입
- bool
- string Immutable 타입
- 정수
int int8 int16 int32 int64
uint uint8 uint16 uint32 uint64 uintptr
- Float 및 복소수
float32 float64 complex64 complex128
- []byte(바이트 코드), []rune (유니코드 코드포인트)

##### JS 와 공통점
- 백틱(\`)과 (")은 동일하게 문자열을 표기함

##### JS 다른점
- 변수를 선언하면서 초기값을 지정하지 않으면, Zero Value를 기본적으로 할당한다. `0`, `False`, `""`
- 변수를 사용하지 않으면 컴파일에러
- 추론기능이 있어 Type을 지정해준다.
- 다른 데이타 타입으로 변환하기 위해서는 T(v) 와 같이 표현하고 이를 Type Conversion
- golang은 c 와 비슷한 구조를 가지고 있는데 때문에 포인터를 쓸 수 있다.
```
var k int = 10
var p = &k    //k의 주소를 할당
println(*p)   //p가 가리키는 주소에 있는 실제 내용
```
- if 조건은 무조건 boolean 사용
###### Optional Statement
```
if val := i * 2; val < max {
    println(val)
}
```
- 위와 같은 방법으로 조건을 검사하면서 순회작업 가능
- switch 의 문법이 기타 언어와는 편이하게 구현되어 있으며 if 대용으로 사용가능 [🔗LINK](http://golang.site/go/article/7-Go-%EC%A1%B0%EA%B1%B4%EB%AC%B8)
- 표현식을 집어넣을 수 있고 자동으로 break 가입력된다. 다음 케이스를 강제로 실행하려면 fallthrough
