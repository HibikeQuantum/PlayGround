package kata_test

import (
	"testing"
	"kata"
  "github.com/stretchr/testify/assert"
)

// original test
func TestExample(t *testing.T) {
	if true {
		print("Passed TestExmaple test")
	} else {
		t.Errorf("[ERROR]")
	}
}

// test with assertion
func TestS001(t *testing.T) {
	assert.False(t, kata.Solution001("abc", "cd"))
	assert.True(t, kata.Solution001("abc", "c"))
}