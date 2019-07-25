function selectionSort(data) {
  let x, y, min, temp, index;

  for (x = 0; x < data.length; x++) {
    min = 9999;
    for (y = x; y < data.length; y++) {
      if (data[y] < min) {
        min = data[y]
        index = y
      }
      temp = data[x];
      data[x] = data[index];
      data[index] = temp;
    }
  }

  for (let z in data) {
    console.log(data[z]);
  }
}

// let myData = [1,2,3,4,5,10,9,8,7,6]
// selectionSort(myData);
// O(N^2)

function selectionSort2(arr) {
  let index, i, j, temp, min;
  for (i in arr) {
    min = -3000;      // change
    for (j = i; j < arr.length; j++) {
      if (arr[j] > min) { //change
        min = arr[j]
        index = j;
      }
    }
    temp = arr[i];
    arr[i] = arr[index];
    arr[index] = temp;
  }
}

var test = [2, 10, -1, 4, 100, 99, -230, 14, 222]
console.log(test)
selectionSort2(test)
console.log(test)


