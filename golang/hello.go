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


	a:= 100
	a |= 1
	print(a)

	var k int = 10
	var p = &k    	//k의 주소를 할당
	println(*p)   	//p가 가리키는 주소에 있는 실제 내용
	println(p)		// k의 주소
	println(&k)   	// k의 주소

	max :=10
	i = 1
	if val := i * 2; val < max {
		println(val)
	}
}