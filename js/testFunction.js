function initHtml () {
  let button = document.createElement('button');
  button.textContent = '클릭해봐!';
  button.id = 'test button';
  button.index = 7;
  var count = 0;
  button.onclick = click;

  document.body.appendChild(button)
}

function click( e ) {
  console.log( e.target.index);
};

initHtml();
