// classical Model

function Answer(value) {
  this.value = value;
};
Answer.prototype.get = function fn1() {
  return this.value;
};
