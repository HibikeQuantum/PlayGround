package main

import "fmt"

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
}
