package kata

import (
	"fmt"
	s "strings"

	"golang.org/x/exp/slices"
)

// Complete the solution so that it returns true if the first argument(string) passed in ends with the 2nd argument (also a string)

func Solution001(str, ending string) bool {
	index := s.LastIndex(str, ending)
	fmt.Printf("index %#v\n", index)
	fmt.Printf("len of ending %#v\n", len(ending))

	if index == -1 {
		return false
	} else if index+len(ending) == len(str) {
		return true
	} else {
		return false
	}
}

func Solution002(originSlice, compSlice []int) []int {
	// your code here
	lenthOfOrigin := len(originSlice)
	i := 0
	for i = 0; i < lenthOfOrigin; i++ {
		fmt.Printf("Loop i: %v\n", i)
		fmt.Printf("origin slice : %-v\n", originSlice)
		for {
			var targetIndex int

			fmt.Printf("i:%v\n", i)
			targetIndex = slices.Index(originSlice, compSlice[i])
			if targetIndex == -1 {
				fmt.Printf("%+v did not has %v\n", originSlice, compSlice[i])
				break
			} else {
				fmt.Printf("Delete it! index: %-v value: %v\n", targetIndex, compSlice[targetIndex])
				if targetIndex == 0 {
					originSlice = originSlice[targetIndex+1:]
				} else {
					originSlice = append(originSlice[:targetIndex], originSlice[targetIndex+1:]...)
				}
				fmt.Printf("Deleted Slice: %+v\n", originSlice)
				i--
				lenthOfOrigin--
				break
			}
		}
	}

	fmt.Printf("result value %#v\n", originSlice)
	return originSlice
}
