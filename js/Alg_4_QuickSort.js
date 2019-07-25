function quickSort(data, start, end) {
  console.log(data, start, end);
  if (start >= end) {
    return;
  }
  let key = start;
  let i = start + 1;
  let j = end;
  let temp;

  while (i <= j) {
    while (data[i] < data[key]) {
      i++;
    }
    while (data[j] >= data[key] && j > start) {
      j--;
    }
    if (i > j) { //키교체
      temp = data[j]
      data[j] = data[key]
      data[key] = temp;
    } else if (j < i) { //값교체
      temp = data[j]
      data[j] = data[i]
      data[i] = temp;
    }
  }
  quickSort(data, start, j - 1); //왼쪽
  quickSort(data, j + 1, end); //오른쪽
}

let myData = [1, 2, 3, 4, 5, 10, 9, 8, 7, 6];
console.log(quickSort(myData, 0, myData.length-1));
console.log(myData)

// O(N^2) 이지만 좋은 상태에서 최강
