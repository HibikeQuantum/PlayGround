function bubbleSort(data) {
  let i, j, temp;
  for (i = 0; i < data.length; i++) {
    j = i;
    while (data[j] < data[j - 1]) {
      temp = data[j - 1]
      data[j - 1] = data[j]
      data[j] = temp;
      j--;
    }
  }

  for (let z in data) {
    console.log(data[z]);
  }
}

let myData = [1, 2, 3, 4, 5, 10, 9, 8, 7, 6]
bubbleSort(myData);

// O(N^2) 이지만 좋은 상태에서 최강
