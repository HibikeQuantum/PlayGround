function f() {
  let sorted = [];

  function merge(a, m, middle, n) {
    var i = m;
    var j = middle + 1;
    var k = m;
    //작은 순서대로 배열에 삽입
    while (i <= middle && j <= n) {
      if (a[i] <= a[j]) {
        sorted[k] = a[i];
        i++;
      } else {
        sorted[k] = a[j];
        j++;
      }
      k++;
    }
    //남은 데이터도 삽입
    if (i > middle) {
      for (var t = j; t < n; t++) {
        sorted[k] = a[t];
        k++;
      }
    } else {
      for (var t = i; t <= middle; t++) {
        sorted[k] = a[t];
        k++;
      }
    }
    //정렬된 배열을 삽입
    for (var t = m; t <= n; t++) {
      a[t] = sorted[t];
    }
  }

  function mergeSort(a, m, n) {
    console.log(a, m, n, "쿠루쿠루");
    debugger;
    if (m < n) {
      var middle = Number.parseInt((m + n) / 2);
      mergeSort(a, m, middle);
      mergeSort(a, middle + 1, n);
      merge(a, m, middle, n);
    }
  }

  var array = [7, 6, 5, 8, 3, 5, 9, 1];
  var number = 8;
  mergeSort(array, 0, number - 1);

  for (let key in array) {
    console.log(array[key]);
  }
}

f();
