# 👟Go

#Devops/language/go

---



## js에서 볼때 다른점

- 변수를 선언하면서 초기값을 지정하지 않으면, Zero Value를 기본적으로 할당한다. `0`, `False`, `””`

- 변수를 사용하지 않으면 컴파일에러

- 추론기능이 있어 Type을 지정해준다.

- 다른 데이타 타입으로 변환하기 위해서는 T(v) 와 같이 표현하고 이를 Type Conversion

- golang은 c 와 비슷한 구조를 가지고 있어 포인터 가능

```

var k int = 10

var p = &k    //k의 주소를 할당

println(*p)   //p가 가리키는 주소에 있는 실제 내용

```

- if 조건은 무조건 boolean 사용



## Golang 특징

* Communicating Sequential Processes

	* Go의 Concurrent 컴포넌트

	* 채널을 통해 메시지 교환

	* 실행순서

		* 루틴을 시작하더라도 메인루틴이 끝까지가고 끝이 나면 서브루틴들이 메모리를 참고하여 작업을 시작한다.

* 상속이 불가능하다. 대신 embedding 을 사용해 조합, 재사용가능한 구조를 짠다. 굳이 거창한 키워드를 안쓰고 상속을 한다.

* 중앙관리식 패키지관리를 사용하지 않고 실행할때 통신하여 가져온다. 

### 언어적 특징

- 컴파일 언어이나 인터프리터 언어처럼 빠름

- OS와 가까워서 `systemctl` (데몬) 으로 관리하기편하다

- 현대적 문법들이 없는 대신 단순하다.

- 유닛테스트, 문서화를 기본으로 지원한다.

- concurrency를 구현하기 위해 Communicating Sequential Processes 모델을 사용 ( 루틴간 메시지 통신 )

- composition (구성) 을 통해 상속구현. Struct + Interface





## 프로젝트 파일 및 패키지

* 프로젝트

	* bin: 컴파일된 실행파일(바이너리)가 생성되는 DIR

	* pkg: 패키지를 컴파일한 라이브러리 파일이 생성되는 DIR {운영체제}_{아키텍쳐}

	* src: 작성한 소스 파일과 인터넷에서 다운로드한 소스 파일이 저장

*  import를 하면 src를 기준으로 상대경로 찾아본다. 

	* `GOROOT/src/, GOPATH/src/, [C.W.P]/src/ `

* Package

	* GOROOT, GOPATH, STD 패키지, 3rd P 패키지, Identifier (대문자/소문자)



## 툴

-  `GOROOT`: Go 인스톨폴더, 및 /GOROOT/src 에서 표준 패키지를 찾고

- `GOPATH` : 복수지정가능, /GOPATH/src 에서사용자패키지 및 3rd party  패키지를 찾는다.

- 워크스페이스 관리는 bin, pkg, src 가 기준



## 변수 할당

**short Assignment Statement**

* `var i = 1` 대신 `i:=1`로 할당가능 (대신 함수안에서만 사용이 가능하다)

* 함수 밖에서도 변수와 상수는 호출 가능

```

const (

  as = "aaa"

  bs = "bbb"

  cs = "ccc"

)

```



##### 예약어

```

break        default      func         interface    select

case         defer        go           map          struct

chan         else         goto         package      switch

const        fallthrough  if           range        type

continue     for          import       return       var

```



## 타입

* Back Quote ``  → Raw String Literal	

* Interpreted String Literal `“ ”`  개행 및 + 사용해서 표현

* Type Conversion 가능

* Uint	+ 정수 (x2 +1 길이)

* Array - 배열의 타입은 밸류다.

* int int8 int16 int32 int64 uint uint8 uint16 uint32 uint64 uintptr

- []byte(바이트 코드), []rune (유니코드 코드포인트)



## String

- 백틱(\`)과 (“)은 동일하게 문자열을 표기함



## 배열

* 배열을 슬라이스 [1:5] 처럼 표현하면 처음 인덱스는 Inclusive 이며, 마지막인덱스는 Exclusive이다 (주: Python과 동일).

* 슬라이스 타입: 동적으로 커지는 배열

var a = []int

a = []int{1,2,3}



## 반복문

* goto, continue (나머지 실행안하고 다음 실행), break 반복 종료

* Label ( L1:) 을 통해 break L1 처럼 실행순서를 컨트롤 할 수 있다. (C++ 에서 봤던거네)





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

1. *Value Type*

	* Stack 안에 실제 데이터가 있다.

	* struct int

2. *Reference Type*

	* Stack (주소) → Heap (실제 데이터)

	* Map Slice string

---



## 배열

- **배열에 ‘=‘ 연산을 사용하면 배열의 포인터가 아니라 밸류가 할당된다.**

`var a [3]int` 	Define

`a[0] = 1` 		Allocate

`println(a[1])` 	Reference

### 유즈 케이스

- 배열크기를 자동으로  관리

`var a3 = [...]int{1, 2, 3}`

- 선언과 동시에 초기화

`var a1 = [3]int{1, 2, 3}`

- 다차원 배열

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



## Slice

go 배열은 크기를 동적으로 증가시키거나 부분 배열을 발췌하는 등의 기능을 가지고 있지 않은데 슬라이스 타입은 그걸 지원한다. 마치 js 배열처럼 (js도 내부적으론 배열이 링크드리스트라 유연하다.)

* 내장함수 `make()`로 생성 (type, len, cap) 

```go

s := make([]int, 5, 10)

println(len(s), cap(s)) // len 5, cap 10

```

- **크기와 용량이 지정되지 않은 슬라이스는 Nil slice라 하고 Nil 과 동일하게 취급**



```go

s := []int{0, 1}

s = append(s, 2)       // 0, 1, 2

s = append(s, 3, 4, 5) // 0,1,2,3,4,5

```

- 확장할때 len은 입력된 값만큼 capacity는 현재 cap의 2배만큼 늘어나게 된다. 내부적으로는 cap을 확장한 새로운 slice를 생성하고 현재 slice를 copy하는 방식으로 진행된다.

### Slice: Merge

- append 안에 두가지 슬라이스를 넣으면 병합이 된다.

 `sliceA = append(sliceA, sliceB…)`

 `sliceB...` 이 사용은 ellipsis, 일리시스라고 부른다. 해당 타입의 값을 collection으로 치환한다. (in this case `4,5,6`)

* `copy` 명령어를 활용할 수도 있다. 이때 실제 데이터들이 복사되는게 아니란걸 주의. 완전 새롭게 메모리에 할당된다. 슬라이스는 데이터에 대한 포인터를 가지고 있을 뿐이다. 때문에 이런 작업의 시간 복잡도는 낮다. (배열포인터로부터 시작해서 len까지를 데이터로 취급한다)

```go

source := []int{0, 1, 2}

target := make([]int, len(source), cap(source)*2)

copy(target, source)

fmt.Println(target)  // [0 1 2 ] 출력

println(len(target), cap(target)) // 3, 6 출력

```

### Slice: 잘라내기

- 잘라내기를 할때 왼쪽은 inclusive, 오른쪽은 exclusive

```go

s := []int{0, 1, 2, 3, 4, 5}

s = s[2:5]  

fmt.Println(s) //2,3,4 출력

```

-  4까지는 [:5], 인덱스 2부터 마지막까지 [2:] 이렇게 표현한다. (regex랑 비슷하네)

---



## 함수

* first-class function

* pass by value, pass by reference, 

* Valiadic function ( 인자를 가변적으로 받을 수 있는 함수)

* `*string` 이렇게  레퍼런스 변수를 함수에서 인자로 정의할 수 있다. 

	* 사용할 때는 `Test_func(*msg msg)`  처럼 표시를 해서 포인터가 가리키는 값을 바꿀 수 있다. 이걸 dereferencing(역참조)라고 한다.

* 복수개의 값을 리턴할 수 있다.

* 클로져 패턴 가능



### 익명함수

- 리터럴하게 함수를 정의하면 익명함수

```go

func calc(f func(int, int) int, a int, b int) int {

    result := f(a, b)

    return result

}

```

* 이렇게 하면 지저분하고 읽기 힘드니 

```go

type calculator func(int, int) int

// type 함수원형 정의

func calc(f calculator, a int, b int) int {

    result := f(a, b)

    return result

}

```

---



## STRUCT

* `person, Person` 의 차이? → Public

* auto deference. 

	* 스트럭처 포인터라도 그냥 변수처럼 쓴다.  ***arg로 넘기면 call by value가 된다. call by ref 를 원하면 포인터로 명시해서 넘긴다.***

* 생성자 정의 함수를 구성해서 사용( ≈ js's CONSTRUCTOR)

* struct 의 receiver

	* Value 로 STR 을 받을지 Pointer로 받을지 메서드에서 정의하는대로 가능

	* (와.. 마음대로 정의할 수 있는게 짱이네, js 지옥 끝)



## interface

	* *필드의 집합 구조체, 메서드의 집합 인터페이스*

	* `interface type = empty` 

	* `interface = dynamic type = java object` 와 비슷..

	* Type Assertion .  a.(int) 같은 패턴을 통해 a를 검증하는 확인(assert) 여기서 a가 int가 아니면 런타임에러

* Error

	* interface를 구현하여 case 문법으로 에러를 처리가능 (유용한 내용이다 추천)

* 에러처리

	* defer: 마지막에 실행(ex: clean up)

	* panic(): defer만 실행하고 콜스택 타면서 종료 후 에러

	* recover()

## error 처리     

기존 언어들이 try catch로 에러를 붙잡아 이를 함수의 인자로 보내 컨트롤한다면 Go는 에러케이스에 Error 인터페이스를 구현하여 반환하고 nill 혹은 Error 타입을 검사한다.

- Go의 내장타입으로, **에러는 이 타입을 통해 주고 받을 수 있는 인터페이스**타입다.

```

type error interface {

    Error() string

}

```

- 에러 인터페이스는 하나의 메서드를 가진다. 이 말은 실제 코드에서 인터페이스의 메서드를 실행함으로서 내부적으로 의도한 에러값이 나온다는 말이다.

#### 에러처리 예제

```

os.Open() 함수코드 

func Open(name string) (file *File, err error)`

```

이렇게 함수가 리턴으로 에러를 정의 해놓았다. 함수를 호출하고 리턴을 체크해서 `nil` 이면 에러가 없는 것이고, nil 이 아니면 err.Error() 로부터 해당 에러를 알 수 있다. 이렇게 함수를 구현하면 결과값에서 에러를 확인하는 로직을 일반적으로 사용한다.

```go

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



## 지연실행 defer

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



## panic

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

#### recover

 - panic 함수가 프로그램을 crash 할때 리커버는 다음코드를 실행시키도록 한다. 뒤처리를 하고 프로그램을 원복하기 위한 패턴

```

 func openFile(fn string) {

    // defere 함수. panic 호출시 실행됨

    defer func() {

        if r := recover(); r != nil {

            fmt.Println(“OPEN ERROR”, r)

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



## general method ( value 변수로 구현 )

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





## 구조체 struct (3년전 버전)

- Custom data type을 표현할때 사용한다. struct 는 필드의 집함이며 필드의 컨테이너. 필드만을 가지고 메서드를 가지지 않는다. 메서드는 인터페이스로 구현

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



* 생성자 함수 패턴

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

- Struct는 초기화 과정을 커진 다음에 사용이 가능하므로 초기화 코드를 진행하는 함수를 만들고 생성된 포인터를 반환하는 생성자함수를 사용하면 편리하게 쓸 수 있다.





#### 인터페이스 구현

- 함수의 인자로 스트럭처를 요구할 수 있다. 요구할때 인터페이스 구현된 메서드가 등록된 구조체들은 동일한 규격의 동작을 예상하고 동작을 지시할 수 있다.

```

func main() {

    r := Rect{10., 20.}

    c := Circle{10}



    showArea(r, c)

}



func showArea(shapes ...Shape) {

    for _, s := range shapes {

        a := s.area() // area가 구현되어 있지 않으면 에러 가 발생했겠지

        println(a)

    }

}`

```



## 인터페이스 Interface

#### 빈인터페이스 Empty interface

- 아무거나 넣어도 되는 컨테이너로 사용

```

func Marshal(v interface{}) ([]byte, error);

func Println(a ...interface{}) (n int, err error);

```

* Dynamic Type 이라고 볼 수 있다. (주: empty interface는 C#, Java 에서 object라 볼 수 있으며, C/C++ 에서는 void* 와 같다고 볼 수 있다)

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







###### pointer receiver

```

// 메소드 (포인트 리시버 구현), 원본값이 변형됨

func (r *Rect) area2() int {

  r.width++

  return r.width * r.height

}

```



## 루틴 (go routine)

* 논리적 스레드 ( 1개의 OS 쓰레드는 여러개 고루틴 처리가능)

* 익명함수에 사용

* 기본적인 이 go는 동시성처리

* 하지만 rollingUpdatentime. 으로 Parallel(병렬)도 지원.

* * `goroutine`은 가상 쓰레드의 개념이다.

- go 키워드를 통해 함수를 호출하면 런타임시 즉시 goroutine으로 실행한다. 비동기적으로 함수를 실행하기 때문에 코드를 동시에 실행하는데 필요하다.

- goroutine 은 go런타임이 관리하고 OS 수준의 스레드보다 훨씬 가볍다.

- gochannel을 통해 goroutine 간 통신을 구현한다.



### 채널

	* 송신자와 수신자가 존재하도록 구성

	* 수신이 될때까지 기다리는 *언버퍼 채널*, 버퍼에 저장하고 바로 일하러 가는 *버퍼채*널

	* 함수의 파라미터로 쓸때 송신 채널인지 수신 채널로 쓸건지 정하고 그대로 써야함

	* ***채널을 닫아도 송신은 된다. 새로운 메시지를 거부하는거지 송신은 된다고 생각해***

	* `for` 와 `select` 로 각 채널의 송신에 대한 이벤트를 계속 제어할 수 있다 . 송신 채널이 없는데 default 가 있으면 그걸 무한으로 하게 된다



### 패키지

* go mod init {pack_name}

	* GOPATH 밖에 있어도 알 수 있게 컨트롤 해줌 (대체로 프로젝트안에서 정의한 사용자 패키지는 GOPATH에 없겠지 그래서 항상해준다.)

	* mod 파일은 모듈의 루트에만 존재

	* mod 실행시 현존 모든 경로의 DIR을 정리해 임포트(mod 명세 파일을 만든다) (디렉토리만든다고 또 실행할 필요없다.)

	* `tidy`   Install package that defined by import command, operate missing and remove unused modules. 



```

mod init 하기전 테스트

ok      _/Users/kth/Code/Go_1_package_test      0.244s

mod init 후

ok      github.com/lecture      0.352s

```

* go 커맨드는 sum 파일로 섬체크를 한다. (악의적 변경 우발적 변경을 방지)

* go.mod 파일

	* (여기서 indirect 표시는, 직접적으로 이 패키지를 사용하지 않는다는 표시이다)



---

## go routine 3년전 메모

```go

func main() {

// WaitGroup 생성. 2개의 Go루틴을 추가시켰다.

var wait sync.WaitGroup

wait.Add(2)



// 익명함수의 실행

go func() {

    defer wait.Done() // 익명 함수가 끝나면 wait 객체 .Done() 호출

    fmt.Println("Hello")

}()



go func(msg string) {

    defer wait.Done() // 익명 함수가 끝나면 .Done() 호출

    fmt.Println(msg)

}("Hi")



wait.Wait() 고루틴이 두개가 실행되면 여기서 기다린다. 

}

```

#### 병렬처리

- 이렇게 여러개의 루틴을 짜더라도 이건 시피유1개에서 동작하므로 동시성(concurrency)은 보장되나 병렬처리는 되지 않는다. (멀티 코어를 활성화 하고 싶다면) 런타임 환경의 변수를 지정해주면 병렬처리 효과를 볼 수 있다.

```go

func main() {

    runtime.GOMAXPROCS(4)

}

```

#### 채널 Channel

###### 개념

- 기본적인 개념은 데이터를 주고받는 통로

- make 함수로 만들어지고 *채널연산자* 를 통해 동작한다.

- 상대편이 준비될때까지 채널에서 대기함으로서 lock없이 데이터를 동기화한다

```go

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

```go

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

- 채널은 Queue 자료구조 형태로 동작한다.

- 채널을 만들때 두번째 인자로 갯수 제한을 걸면 생성되는 루틴의 갯수를 제한할 수 있다. (`couting semaphore`)

---



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

	`go doc  [rsc.io/quote/v3](http://rsc.io/quote/v3) `

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

“GIN-FIRST-PROJECT/src/dataRepo"

이렇게 모듈 + root로부터 상대경로 이렇게 임포트하고



사용할때는 



* 고랭으로 프로그램 짤때 쓸 수 있는 SOLID 원칙(DIP)

	* 모듈 > 추상체 > 구현체 순으로 코드의 커버리지가 크다. 이때 상위 개념은 하위개념을 호출하면 안된다. 하위가 상위의 인터페이스를 구현해야한다.

	* 이 말은 Deploymentendency Inversion PrinClusterIPle (의존성 역전원칙)으로서 많은 객체지향언에서 지향하는 원칙이다. 



## Map 맵

- 키에 대응하는 값을 구현해놓은 자료구조

```

var idMap map[int]string

        //map[key_type]value_type

```

중간이 키의 타입, 마지막이 밸류의 타입

- 초기화가 되지않은 맵은 Nil Map 이라고 하며 값을 쓸 수 없다. (panic: assignment to entry in nil map)

- 할당되지 않은 값을 호출하면 `Nil || Zero value` 반환

`idMap = make(map[int]string)` 초기화를 통해 사용

- 리터럴하게 값을 할당하여 사용할 수도 있다.

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







## Type Assertion 패턴

변수를 체크하기 위해 `변수.(type)`으로 호출하는것을 말함.

- `Nil`이면 컴파일 에러, 값이 예상되는 Type이 아니어도 컴파일 에러 (리액트에서 `propTypes`를 통해 빌드 중 에러를 발생시켜 미리 디버깅 가능

```

var a interface{} = 1

i := a       // a와 i 는 dynamic type, 값은 1

j := a.(int) // j는 int 타입, 값은 1



println(i)  // 포인터주소 출력

println(j)  // 1 출력

```





## 제너릭

1. 제네릭 프로그래밍은 타입 파라미터를 통해서 하나의 함수나 타입이 여러 타입에 대해서 동작할 수 있도록 해줍니다.

2. 타입 제한을 통해서 타입 파라미터로 사용되는 타입을 제한합니다.

3. 인터페이스와 제네릭 타입은 각각의 사용법이 있습니다.

4. 동작하는 코드 먼저, 제네릭은 나중에 고민하세요.

```diff
+ 일단 타입을 좀 더 유연하게 하지만 좀 더 광범위하게 사용하기 위해 사용. 다만 인터페이스란 옵션도 존재한다!
```
