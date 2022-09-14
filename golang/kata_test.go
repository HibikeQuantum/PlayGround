package kata_test

import (
	"kata"
	"testing"

	"github.com/stretchr/testify/assert"
)

// #1 original test Method
func TestExample(t *testing.T) {
	if true {
		print("Passed TestExmaple test")
	} else {
		t.Errorf("[ERROR]")
	}
}

// #2 test with assertion package
func TestS001(t *testing.T) {
	assert.True(t, kata.Solution001("abc", "c"))
	assert.False(t, kata.Solution001("abc", "ab"))
}

// #3
func TestS002(t *testing.T) {
	assert.Equal(t, []int{2}, kata.Solution002([]int{1, 2}, []int{1}))
	assert.Equal(t, []int{1}, kata.Solution002([]int{1, 2, 3}, []int{2, 3, 4}))
	assert.Equal(t, []int{0}, kata.Solution002([]int{0, -1}, []int{-1, 1}))
}
