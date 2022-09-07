package kata

import s "strings"

// Complete the solution so that it returns true if the first argument(string) passed in ends with the 2nd argument (also a string)

func Solution001(str, ending string) bool {
	if s.Contains(str, ending) {
		return true
	} else {
		return false
	}
}