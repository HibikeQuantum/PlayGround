var button = document.getElementById('myButton');

button.addEventListener('click', () => {
  console.log(this === window) // => true
  this.innerHTML = 'clicked button';
})
// 이벤트리스너를 달 때는 화살표함수를 쓰면 원하는 this가 아니다. 실행시점에 글로벌이 this가 되니까.

button.addEventListener('click', function() {
  console.log(this === button) // => true
  this.innerHTML = 'clicked button';
})
// 버튼에 이벤트를 달면 펑션 컨텍스트는 남아서 button이 this가 된다.
