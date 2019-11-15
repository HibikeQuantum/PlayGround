package main

import (
  "fmt"
  "sync"
  "time"
)

func main() {
  //var f float32 = 11.0
  //var s string = "this is"
  //var i, j, k int = 1, 2, 3
  //println(i, j, k)
  //println(f, s)
  const (
    as = "aaa"
    bs = "bbb"
    cs = "ccc"
  )
  println(as, bs, cs)
  fmt.Println(as, bs, cs)

  var i int = 10
  var u uint = uint(100)
  var f float32 = float32(i)
  println(f, u)

  str := "ABC"
  bytes := []byte(str)
  str2 := string(bytes)
  println(bytes, str2)

  a := 100
  a |= 1
  print(a)

  var k int = 10
  var p = &k  //k의 주소를 할당
  println(*p) //p가 가리키는 주소에 있는 실제 내용
  println(p)  // k의 주소
  println(&k) // k의 주소

  max := 10
  i = 1
  if i *= 2; i < max {
    println(i, max)
  }

  n := 1
  for n < 100 {
    n *= 2
    //if n > 90 {
    //   break
    //}
    println(n)
  }
  println(n)

  // 조건문
  temp := 1
  for temp < 25 {
    if temp > 19 {
      break
    }
    temp += 5
    println(temp)
  }

  names := []string{"따효니", "방송천재", "바보"}

  for index, name := range names {
    println(index, name)
  }

  a1 := [3]int{1, 2, 3}
  b1 := a1
  b1[1] = 100

  fmt.Println(a1)
  fmt.Println(b1)

  sum := func(n ...int) int {
    s := 0
    for _, v := range n {
      s += v
    }
    return s
  }
  result := sum(1, 2, 3)
  println(result)

  var a2 = [...]int{1, 2, 3}
  println(a2[2])
  //초기화하지 않은 인덱스를 호출하면 "invalid array index 2 (out of bounds for 2-element array)"
  for _, v := range a2 {
    println(v)
  }
  // len=0, cap=3 인 슬라이스
  sliceA := make([]int, 0, 3)

  // 계속 한 요소씩 추가
  for i := 1; i <= 15; i++ {
    sliceA = append(sliceA, i)
    // 슬라이스 길이와 용량 확인
    fmt.Println(len(sliceA), cap(sliceA))
  }

  fmt.Println(sliceA) // 1 부터 15 까지 숫자 출력

  sliceA1 := []int{1, 2, 3}
  sliceB := []int{4, 5, 6}

  sliceA1 = append(sliceA1, sliceB...)
  fmt.Println(sliceA1)

  //sliceA = append(sliceA, 4, 5, 6)

  //var myMap map[int]string
  //fmt.Println(myMap)
  //myMap[0] = "a"
  //fmt.Println(myMap) 초기화 안해서 에러난다.

  println("___ 13일 파트 ___")

  type person struct {
    name string
    age  int
  }

  px := person{}
  px.name = "Tom"
  px.age = 11
  fmt.Println(px)

  // 2019년 11월 14일
  rect := Rect{10, 20}
  area := rect.area() //메서드 호출
  println(area)

  var x interface{}
  x = 1;
  printIt(x)
  x = "X"
  printIt(x)

  //var ass interface{}
  //
  //iex := ass       // a와 i 는 dynamic type, 값은 1
  //jex := ass.(int) // j는 int 타입, 값은 1
  //
  //println(iex) // 포인터주소 출력
  //println(jex) // 1 출력

  //_, err := myFunc()
  //switch err.(type) {
  //default:
  //  println("ok")
  //case MyError:
  //  log.Print("Log!!! my error")
  //case error:
  //  log.Fatal(err.Error())
  //}

  // 2015일 루틴
  // 함수를 동기적으로 실행
  say("Sync")

  // 함수를 비동기적으로 실행
  go say("Async1")
  go say("Async2")
  go say("Async3")

  // 3초 대기
  time.Sleep(time.Second * 1)

  // WaitGroup 생성. 2개의 Go루틴을 기다림.
  var wait sync.WaitGroup
  wait.Add(2)

  // 익명함수를 사용한 goroutine
  go func() {
    defer wait.Done() //끝나면 .Done() 호출
    fmt.Println("Hello")
  }()

  // 익명함수에 파라미터 전달
  go func(msg string) {
    defer wait.Done() //끝나면 .Done() 호출
    fmt.Println(msg)
  }("Hi")

  wait.Wait() //Go루틴 모두 끝날 때까지 대기
  fmt.Println("last line ")

  // 정수형 채널을 생성한다
  ch := make(chan int)

  go func() {
    ch <- 123 //채널에 123을 보낸다
  }()

  var iii int
  iii = <-ch // 채널로부터 123을 받는다
  println(iii)

  // 송수신 지정 채널링
  println("여기는 채널링 테스트")

  ch2 := make(chan string, 1)
  sendChan(ch2)
  receiveChan(ch2)

  // 클로즈 테스트
  ch3 := make(chan int, 2)

  // 채널에 송신
  ch3 <- 1
  ch3 <- 2

  // 채널을 닫는다
  close(ch3)

  // 채널 수신
  //println(<-ch3)
  ////1
  //println(<-ch3)
  ////2
  //println(<-ch3)
  ////0
  if v, success := <-ch3; success {
    println(v, success)
  }
  if v, success := <-ch3; success {
    println(v, success)
  }
  if v, success := <-ch3; !success {
    println(v, "더이상 데이타 없음.", success)
  }

  // channel example

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
  // true를 수신하는 대로 통신이 열린다. 먼저  done2가 되면 break;

}

// 스트럭쳐 구현
type Rect struct {
  width, height int
}

// 메소드 구현
func (r Rect) area() int {
  return r.width * r.height
}

// 메소드 (포인트 리시버 구현), 원본값이 변형됨
func (r *Rect) area2() int {
  r.width++
  return r.width * r.height
}

func printIt(v interface{}) {
  fmt.Println(v)
}

// 루틴이 실행할 로직
func say(s string) {
  for i := 0; i < 10; i++ {
    fmt.Println(s, "***", i)
  }
}

func sendChan(ch chan<- string) {
  ch <- "Data"
  //x := <-ch // 에러발생
}

func receiveChan(ch <-chan string) {
  data := <-ch
  fmt.Println(data)
}

// select example
func run1(done chan bool) {
  time.Sleep(1 * time.Second)
  done <- true
}

func run2(done chan bool) {
  time.Sleep(2 * time.Second)
  done <- true
}
