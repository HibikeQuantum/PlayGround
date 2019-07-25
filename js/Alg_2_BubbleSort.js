function bubbleSort(data) {
  let x, y, min, temp;

  for ( x = 0; x < data.length; x++){
    for ( y = 0; y < data.length - x; y++){
      if ( data[y] > data[y+1]){
        temp = data[y];
        data[y] = data[y+1];
        data[y+1] = temp;
      }
    }
  }

  for (let z in data){
    console.log(data[z]);
  }
}
let myData = [1,2,3,4,5,10,9,8,7,6]
bubbleSort(myData);

// O(N^2)
