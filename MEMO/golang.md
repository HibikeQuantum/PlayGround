#Go Lang
##셋팅
####툴
- IDE: goland
- INSTALL: https://golang.org/
####환경변수
- `GOROOT`: Go 인스톨폴더, 및 /GOROOT/src 에서 표준 패키지를 찾고
- `GOPATH` : 복수지정가능, /GOPATH/src 에서사용자패키지 및 3rd party  패키지를 찾는다.
- 워크스페이스 관리는 __bin, pkg, src__
## 언어적 특징
- 컴파일 언어이나 인터프리터 언어처럼 빠름
- 09년에 발표
##기초문법
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
- break, continue, goto (c) 동일 키워드

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
- 표현식을 집어넣을 수 있고 자동으로 break 가입력된다. 다음 케이스를 강제로 실행하려면 fallthrough 를 쓴다.

- for 문으로 반복문을 처리한다.
```
names := []string{'따효니','방송천재','바보'}

for index, name := range names {
    println(index, name)
}
```
- 이렇게 range를 지원 python의 forEach 를 닮았다.

#### 함수
`*msg = "" `
- 레퍼런스 파라미터의 사용은 앞에 \*를 붙이는데 이를 흔히 Dereferencing 이라 부른다.
- Call by value: 뮤터블하고
- Call by ref: 주소로 접근하기 때문에 언뮤터블
- 가변인자 (...) 같은형에 대해 rest 표현으로 사용
- __Go 언어는 복수개의 값을 리턴할 수 있다.__

###### example -  Several return values
```
func main() {
    count, total := sum(1, 7, 3, 5, 9)
    println(count, total)   
}

func sum(nums ...int) (int, int) {
    s := 0      // 합계
    count := 0  // 요소 갯수
    for _, n := range nums {
        s += n
        count++
    }
    return count, s
}
```

#### 익명함수
- JS처럼 함수를 변수처럼 다루고 인자로도 넘겨줄 수 있다.
- 리터럴하게 함수를 정의하면 익명함수
```
func calc(f func(int, int) int, a int, b int) int {
    result := f(a, b)
    return result
}
```
###### Delegate
- 이렇게 함수 인자를 넘겨주던 패턴을
```
type calculator func(int, int) int
// type 으로 함수 원형 정의
func calc(f calculator, a int, b int) int {
    result := f(a, b)
    return result
}
```
- 간단하게 표현할 수 있다.
---
#### 클로져 패턴
###### 역시 지원
---
## 배열
#### 기초
- 연속적인 메모리 공간에 데이터를 연속적으로 저장하는 자료구조
`var a [3]int` 선언
`a[0] = 1` 할당 적용
`println(a[1])` 호출
#### 사용
- 배열크리를 자동으로  관리
`var a3 = [...]int{1, 2, 3}`
- 선언과 동시에 초기화
`var a1 = [3]int{1, 2, 3}`
- 다차원 배열 허용
`var multiArray [3][4][5]int`
- 다차원 배열 초기화
```
var a = [2][3]int{
    {1, 2, 3},
    {4, 5, 6},  //끝에 콤마 추가
}
println(a[1][2])
```

---
## 관리기법
####package
- 패키지명이 __main__ 인 경우는 특별하게 취급하고 excutable 프로그램으로 만든다. (엔트리포인트)
- 패키지는 함수, 구조체, 인터페이스, 메서드으로 구성.
- 이름(Identifier)이 첫문자를 대문자로 시작하면 이는 → public 으로 사용
- 이름이 소문자로 시작하면 이는 non-public → 패키지 내부에서만 사용
- 패키지내부에 __init__ 이름으로된 func는 패키지가 로드될때 자동으로 실행
- alias 호출을 통해 이름을 지정하고 콜을 컨트롤 할 수 있다.
- 사이즈가 큰 패키지의 경우 `go install`명령어를 통해 라이브러리를 cached한 상태로 관리할 수 있다.

##배열
#### 속성
- 배열의 크기는 Type의 일부분으로서
`reflect.TypeOf([3]int{}) == reflect.TypeOf([5]int{}) // False`
