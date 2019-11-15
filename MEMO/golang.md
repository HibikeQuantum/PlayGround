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
- OS와 가까워서 `systemctl` (데몬) 으로 관리하기편하다
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

- type 관련된 로직을 구현할때 reflect 패키지를 활용하면 편하다 (JS의 TypeOf)

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

####error 처리
###### 소개      
- 기존 언어들이 try catch로 에러를 붙잡아놓고 이를 함수의 인자로 컨트롤한다면
- Go는 에러케이스에 Error 인터페이스를 구현하여 반환하고 nill 혹은 Error 타입을 검사한다.
- Go의 내장타입으로, 에러는 이 타입을 통해 주고 받을 수 있는 인터페이스 타입다.
```
type error interface {
    Error() string
}
```
- 에러 인터페이스는 하나의 메서드를 가진다. 이 말은 실제 코드에서 인터페이스의 메서드를 실행함으로서 내부적으로 의도한 에러값이 나온다는 말이다.
######사용방법
`os.Open() 함수코드 func Open(name string) (file *File, err error)`

그래서 이 경우 두번째 error를 체크해서 nil 이면 에러가 없는 것이고, nil 이 아니면 err.Error() 로부터 해당 에러를 알 수 있다. 이렇게 함수를 구현하면 결과값에서 에러를 확인하는 로직을 짤 수 있다.

```
_, err := myFunc()
  switch err.(type) {
  default:
    println("ok")
  case MyError:
    log.Print("Log!!! my error")
  case error:
    log.Fatal(err.Error())
  }
  ```

#### 지연실행 defer
- defer 를 쓰면 해당 라인의 문장또는 함수를 소속함수의 리턴 직전에 처리해준다.
- 파일 처리 로직이면 파일을 닫는 로직에 defer를 쓰면 파일처리 작업의 에러 유무와 상관없이 무조건 닫아주는 로직을 넣을 수 있다.
```
f, err := os.Open("1.txt")
if err != nil {
    panic(err)
}

// main 마지막에 파일 close 실행
defer f.Close()
```
#### 패닉함수  panic
- 현재 함수를 멈추고 defer 키워드가 달린 함수를 모두 처리하고 즉시리턴
- 상위함수 ( 콜스택 )에도 적용되어 마지막엔 프로그램을 종료한다.

```
func main() {
    openFile("invalidt.txt")
    println("Done") // 실행안됨
}

func openFile(fn string) {
    f, err := os.Open(fn)
    if err != nil {
        panic(err)
    }
    defer f.Close()
    // 파일 close 실행됨
}
```
- 작업들을 종료할 로직과 벌어진 작업들을 정리할 로직을 처리하는데 사용하면 된다

#### Recover 함수
 - panic 함수가 프로그램을 crash 한다면 리커버는 다음코드를 실행시키도록 한다.
 ```
 func openFile(fn string) {
    // defere 함수. panic 호출시 실행됨
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("OPEN ERROR", r)
        }
    }()

    f, err := os.Open(fn)
    if err != nil {
        panic(err)
    }

    // 파일 close 실행됨
    defer f.Close()
}
```
- 위의 코드에 이 내용을 첨가하게 된다면 openFile의 단계에서 defer 에 복원 로직이 들어가게 된다. 구체적으론 crash되지 않고 파일만 닫히는 로직으로 이행하게 된다.

## 병렬 프로그래밍
####Go routine
- goroutine 은 가상 쓰레드의 개념이다.
- go 키워드를 통해 함수를 호출하면 런타임시 즉시 goroutine으로 실행한다. 비동기적으로 함수를 실행하기 때문에 코드를 동시에 실행하는데 필요하다.
- goroutine 은 go런타임이 관리하고 OS 수준의 스레드보다 훨씬 가볍다.
- gochannel을 통해 goroutine 간 통신을 구현한다.

```
func main() {
// WaitGroup 생성. 2개의 Go루틴을 기다림.
var wait sync.WaitGroup
wait.Add(2)

go func() {
    defer wait.Done() // 익명 함수가 끝나면 .Done() 호출
    fmt.Println("Hello")
}()

go func(msg string) {
    defer wait.Done() // 익명 함수가 끝나면 .Done() 호출
    fmt.Println(msg)
}("Hi")

wait.Wait()
}
```
- waitGroup을 만들고 2개의 루틴을 추가해놓고 익명의 함수에서 wait - done을 호출하여 웨이팅을 종료하는 로직이 구현된 예제다.

###### 병렬처리
- 이렇게 여러개의 루틴을 짜더라도 이건 시피유1개에서 동작하므로 동시성(concurrency)은 있으나 병렬처리는 되지 않는다. (다중 CPU사용)

```
func main() {
    runtime.GOMAXPROCS(4)
}
```
- 런타임 환경의 변수를 지정해주면 병렬처리 효과를 볼 수 있다.

#### 채널 Channel
###### 개념
- 기본적인 개념은 데이터를 주고받는 통로
- make 함수로 만들어지고 *채널연산자* 를 통해 동작한다.
- 상대편이 준비될때까지 채널에서 대기함으로서 lock없이 데이터를 동기화한다
```
func main() {
  // 정수형 채널을 생성한다
  ch := make(chan int)

  go func() {
    ch <- 123   //채널에 123을 보낸다
  }()

  var i int
  i = <- ch  // 채널로부터 123을 받는다
  println(i)
}
```
- 채널은 송수신자가 모두 상대를 기다린다. 123을 보내고 받는측 모두 완성되면 로직이 끝난다.

```
func main() {
    done := make(chan bool)
    go func() {
        for i := 0; i < 10; i++ {
            fmt.Println(i)
        }
        done <- true
    }()

    <-done
}
```
- 함인함수 (메인루틴)에  <-done 채널을 수신시켜놓으면 true를 받았을때 루틴을 종료시키는 로직을 만들 수 있다.

###### go channel buffering
- 두가지 채널이 존재한다. 위의 예제는 Unbuffered, 데이터를 받을때까지 송신자가 채널에서 대기하는것을 말한다.
- buffered 채널을 사용하면 송신자는 송신하고 바로 다른 일에 들어간다. (수신상태에 얽매이지 않는다)

```

func main() {
   ch := make(chan int, 1)
   ch <- 101

   fmt.Println(<-ch)
}
```
- 버퍼 채널의 사용례, 받는 수신자가 없어도 버퍼가 값을 들고 있기 때문에 에러가 나지 않는다.

###### 송신, 수신 전용 채널
```
func main() {
    ch := make(chan string, 1)
    sendChan(ch)
    receiveChan(ch)
}

func sendChan(ch chan<- string) {
    ch <- "Data"
    // x := <-ch // 에러발생
}

func receiveChan(ch <-chan string) {
    data := <-ch
    fmt.Println(data)
}
```
- 이렇게 채널을 생성하게 됐을때 *func sendChan* 은 데이터를 송신하기 위한 파라미터로 정의되어 있으므로 수신하는대 사용하면  `invalid operation: <-ch (receive from send-only type chan<- string)` 에러가 발생한다.

###### 채널 송수신
- 채널 클로즈를 선언하면 수신만 가능한 상태가 된다.
```
ch3 := make(chan int, 2)

// 채널에 송신
ch3 <- 1
ch3 <- 2

// 채널을 닫는다
close(ch3)
if v, success := <-ch3; success {
  println(v, success)   // 2, true
}
if v, success := <-ch3; success {
  println(v, success)   // 1, true
}
if v, success := <-ch3; !success {
  println(v, ,success)  // 0, false
}
```
- 복수의 리턴이 오므로 값을 판정하여 채널의 송신의 량을 판단가능
- for range문으로 간단하게 활용

###### channel select
- `select`문을 통해 복수의 채널을 모니터링하고 데이터를 보내온 채널을 실행하는 기능
- 복수의 신호가 동시에 오면 랜덤하게 선택하고 아닐때는 default를 실행한다.
```
func main () {
  done1 := make(chan bool)
  done2 := make(chan bool)

   go run1(done1)
   go run2(done2)

   EXIT:
   for {
     println("루프 도는중")
     select {
     case <-done1:
       println("run1 완료")

     case <-done2:
       println("run2 완료")
       break EXIT
     }
   }
 // true를 수신하는 대로 case를 수행한다. 먼저  done2가 되면 break;
}

func run1(done chan bool) {
    time.Sleep(1 * time.Second)
    done <- true
}

func run2(done chan bool) {
    time.Sleep(2 * time.Second)
    done <- true
}
여기서 run1을 run2보다 늦게 done하게 되면 미리 break; 되어서 run1의 출력은 보이지 않음
```
- 채널은 Queue 자료구조로 동작한다.
- 채널을 만들때 두번째 인자로 갯수 제한을 걸면 생성되는 루틴의 갯수를 제한할 수 있다. (couting semaphore)


참고자료

- http://golang.site/Quiz/Tests
- https://brunch.co.kr/@magictbl/50
