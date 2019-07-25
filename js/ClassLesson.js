// Classical Model (ES5)
function Answer(value) {
  this.value = value;
}
Answer.prototype.get = function fn1() {
  return this.value;
};
const lifeAnswer = new Answer(42);
console.log(lifeAnswer.get());
const dessertAnswer = new Answer(3.14159);
console.log(dessertAnswer.get());

function FirmAnswer(value) {
  Answer.call(this, value);
}

FirmAnswer.prototype = Object.create(Answer.prototype);
FirmAnswer.prototype.constructor = FirmAnswer;
FirmAnswer.prototype.get = function fn2() {
  return `${Answer.prototype.get.call(this)}!!`;
};
const luckyAnswer = new FirmAnswer(7);
console.log(luckyAnswer.get());
const masicAnsWer = new FirmAnswer(3);
console.log(masicAnsWer.get());
luckyAnswer.info = "even if const, I can add property";


// ES6 Class
class AnswerVer {
  constructor(value) {
    this.value = value;
  }

  get() {
    return this.value;
  }
}

const birthAnswer = new AnswerVer(81);
console.log(birthAnswer.get());
const deathAnswer = new AnswerVer(999);
console.log(deathAnswer.get());

class FirmAnswerVer extends AnswerVer {}

const dreamAnswer = new FirmAnswerVer(7);
console.log(dreamAnswer.get());
const realAnswer = new FirmAnswerVer(747);
console.log(realAnswer.get());
