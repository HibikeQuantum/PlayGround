package kata

import (
	s "strings"
)

// Complete the solution so that it returns true if the first argument(string) passed in ends with the 2nd argument (also a string)

func Solution001(str, ending string) bool {
	index := s.LastIndex(str, ending)

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
	var targetIndex int
	for i = 0; i < lenthOfOrigin; i++ {
		for {
			targetIndex = nil
			for j, v := range compSlice {
				if originSlice[i] == v {
					targetIndex = j
				}
			}
			if targetIndex != 0 {
				targetIndex = -1
				break
			} else {
				break
			}
		}
		if targetIndex == -1 {
			break
		} else {
			if targetIndex == 0 {
				originSlice = originSlice[targetIndex+1:]
			} else {
				originSlice = append(originSlice[:targetIndex], originSlice[targetIndex+1:]...)
			}
			i--
			lenthOfOrigin--
			break
		}
	}
	return originSlice
}
