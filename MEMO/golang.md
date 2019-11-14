#Go Lang
---
#*prep*
---
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
##배열
#### 속성
- 배열의 크기는 Type의 일부분으로서
`reflect.TypeOf([3]int{}) == reflect.TypeOf([5]int{}) // False`
이렇게 크기가 다르면 다른 취급이다.
- `var a1 = [3]int{1, 2, 3}` C처럼 크기를 할당하여 사용한다.

##배열
#### 속성
- 크기를 지정하지 않고 사용가능, 중간을 잘라내는 등의 메서드 지원
```
var a []int        //슬라이스 변수 선언
a = []int{1, 2, 3} //슬라이스에 리터럴값 지정
a[1] = 10
```
- 내장함수 make()를 활용하여 슬라이스를 만들 수도 있다. (인자타입, 길이, 캐파)
```
s := make([]int, 5, 10)
println(len(s), cap(s)) // len 5, cap 10
```
- 크기와 용량이 지정되지 않은 슬라이스는 Nil slice라 하고 Nil 과 동일하게 취급
###### 잘라내기
- 잘라내기를 할때 왼쪽은 inclusive, 오른쪽은 exclusive
```
s := []int{0, 1, 2, 3, 4, 5}
s = s[2:5]  
fmt.Println(s) //2,3,4 출력
```
-  4까지는 [:5], 인덱스 2부터 마지막까지 [2:] 이렇게 표현한다.
###### 붙이기
- 필요에 따라 확장되는 성격을 활용하는 APPEND
```
s := []int{0, 1}
s = append(s, 2)       // 0, 1, 2
s = append(s, 3, 4, 5) // 0,1,2,3,4,5
```
- 확장할때 len은 입력된 값만큼 capacity는 현재 cap의 2배만큼 늘어나게 된다. 내부적으로는 cap을 확장한 새로운 slice를 생성하고 현재 slice를 copy하는 방식으로 진행된다.
####### 병합
- append 안에 두가지 슬라이스를 넣으면 병합이 된다.
```
sliceA := []int{1, 2, 3}
    sliceB := []int{4, 5, 6}

    sliceA = append(sliceA, sliceB...)
    //sliceA = append(sliceA, 4, 5, 6)
```
- sliceB... (ellipsis, 일리시스)를 하면 해당 내용-컬렉션-으로 치환한다. (여기선 4,5,6)
- __copy__ 명령어를 활용할 수도 있다. 이때 실제 데이터들이 복사되는게 아니란걸 주의. 슬라이스는 데이터에 대한 포인터를 가지고 있을 뿐이다. 때문에 이런 작업의 시간 복잡도는 낮다. (배열포인터로부터 시작해서 len까지를 데이터로 취급한다)
```
source := []int{0, 1, 2}
target := make([]int, len(source), cap(source)*2)
copy(target, source)
fmt.Println(target)  // [0 1 2 ] 출력
println(len(target), cap(target)) // 3, 6 출력
```
---
## Map 맵
#### 개요
- 키에 대응하는 값을 구현해놓은 자료구조
`var idMap map[int]string`
- 이렇게 구현을 해놓으면 중간이 키의 타입, 마지막이 밸류의 타입
- 초기화가 되지않은 맵은 Nil Map 이라고 하며 값을 쓸 수 없다. (panic: assignment to entry in nil map
)에러 발생
`idMap = make(map[int]string)` 초기화를 통해 사용
- 또는 리터럴하게 값을 할당하여 사용할 수도 있다.
```
tickers := map[string]string{
    "GOOG": "Google Inc",
    "MSFT": "Microsoft",
    "FB":   "FaceBook",
}
```
#### 할당 및 삭제
- `m[901] = "Apple"` 이렇게 초기화된 내용을 사용할 수 있다.
- `delete(myMap, 777)` 맵의 특정키를 삭제하기, 삭제에 대해 없는 키값이면 Nil, value타입인 경우에는 zero를 리턴한다.

#### 키확인
`val, exists := tickers["MSFT"]`
- Map을 호출하면 첫번째는 값이 두번째로는 키의 값의 존재여부에 대한 boolean이 리턴된다.
- 복수개의 리턴 되는 함수를 쓰는것처럼 변수를 준비해놓고 호출하면 확인가능

#### 순회
```
for key, val := range myMap {
    fmt.Println(key, val)
}
```
- 배열과 마찬가지로 range 키워드를 통해 순회가 가능하다.

---
#*immersive*
---
## 구조체 struct
- Custom data type을 표현할때 사용한다. __struct 는 필드의 집함이며 필드의 컨테이너__
- __Go의 struct는 필드만을 가지고 메서드를 가지지 않는다.__
- Go만의 다른 언어와는 상이한 OOP를 지원하며 클래스, 객체, 상속의 개념이 없다.
- 메서드는 별도의 방법으로 정의한다.
- 기본적인 정의와 사용
```
type person struct {
  name string
  age int
}
func main() {
  p := person{}
  p.name = "Tom"
  p.age = "11"
  fmt.Println(p)  

  // {Tom 11}
```
- 순서대로 값을 할당하거나, 키를 지정해서 할당하는 방법도 가능하다.
```
var p1 person
p1 = person{"Bob", 20}
p2 := person{name: "Sean", age: 50}
```
- new 키워드를 사용하면 person객체의 포인터가 반환되는데 이렇게 해도 .(dot)을 사용하여 필드에 액세스 가능하다.
```
p := new(person)
p.name = "Lee"  // p가 포인터라도 . 을 사용한다
```

####생성자 함수 패턴
```
type dict struct {
    data map[int]string
}

func newDict() *dict {
    d := dict{}
    d.data = map[int]string{}
    return &d //포인터 전달
}

func main() {
    dic := newDict() // 생성자 호출
    dic.data[1] = "A"
}
```
- Struct는 초기화 과정을 커진 다음에 사용이 가능하므로 초기화 코드를 진행하는 함수를 만들고 생성된 포인터를 반환하는 __생성자함수__ 를 사용하면 편리하게 쓸 수 있다.

#### 메서드
###### general method ( value 변수로 구현 )
GO는 Structure가 필드만 가지고 있다고 했다. 그러면 메서드는 어떻게 구현하는가
```
type Rect struct {
    width, height int
}

func (r Rect) area() int {
    return r.width * r.height   
}

func main() {
    rect := Rect{10, 20}
    area := rect.area() // 호출
}
```
이렇게 Go func의 앞에 `(name type)`을 지정한 func는 스트럭처에 귀속된 메소드 취급을 받게된다.
###### pointer recevier
```
// 메소드 (포인트 리시버 구현), 원본값이 변형됨
func (r *Rect) area2() int {
  r.width++
  return r.width * r.height
}
```
## 인터페이스 Interface
#### 개념
- 구조체가 필드의 집합체라면 인터페이스는 메서드의 집합체
- 인터페이스는 타입이 구현해야할 모든 메서드들을 구현해놓아야하는 약속이다
```
type Shape interface {
    area() float64
    perimeter() float64
}
```
- 이렇게 해놓았으면 Shape의 구현체들은 area, perimeter 메소드들이 구현되어야 한다.
#### 인터페이스 필요성
- 함수의 인자로 스트럭처를 요구할 수 있다. 요구할때 인터페이스 구현된 메서드가 등록된 구조체들은 동일한 규격의 동작을 예상하고 동작을 지시할 수 있다. (구현되지 않았다면 에러가 뜨고)
```
func main() {
    r := Rect{10., 20.}
    c := Circle{10}

    showArea(r, c)
}

func showArea(shapes ...Shape) {
    for _, s := range shapes {
        a := s.area()
        println(a)
    }
}`
```
#### 빈인터페이스 Empty interface
- 아무거나 넣어도 되는 컨테이너로 사용
```
func Marshal(v interface{}) ([]byte, error);
func Println(a ...interface{}) (n int, err error);
```
- Dynamic Type 이라고 볼 수 있다. (주: empty interface는 C#, Java 에서 object라 볼 수 있으며, C/C++ 에서는 void* 와 같다고 볼 수 있다)
```
func main() {
    var x interface{}
    x = 1
    x = "Tom"

    printIt(x)
}

func printIt(v interface{}) {
    fmt.Println(v) //Tom
}
```
####### Type Assertion 패턴
- 변수를 체크하기 위해 `변수.(type)`으로 호출하는 기법
- Nil ( 초기화하지 않음 ) 이면 컴파일 에러, 값이 예상되는 Type이 아니어도 컴파일 에러 ( 리액트에서 propTypes 를 통해 런타임에 가지 않고 타입을 체크하는것과 비슷함)
```

var a interface{} = 1
i := a       // a와 i 는 dynamic type, 값은 1
j := a.(int) // j는 int 타입, 값은 1

println(i)  // 포인터주소 출력
println(j)  // 1 출력
```

## 관리기법
####package
- 패키지명이 __main__ 인 경우는 특별하게 취급하고 excutable 프로그램으로 만든다. (엔트리포인트)
- 패키지는 함수, 구조체, 인터페이스, 메서드으로 구성.
- __이름(Identifier)이 첫문자를 대문자로 시작하면 이는 → public 으로 사용__
- __이름이 소문자로 시작하면 이는 non-public → 패키지 내부에서만 사용__
- 패키지내부에 __init__ 이름으로된 func는 패키지가 로드될때 자동으로 실행
- alias 호출을 통해 이름을 지정하고 콜을 컨트롤 할 수 있다.
- 사이즈가 큰 패키지의 경우 `go install`명령어를 통해 라이브러리를 cached한 상태로 관리할 수 있다.
