// // 상속할 Human
// var Human = function (name) {
//   this.name = name;
// };
// Human.prototype.eat = function (food) {
//   console.log(this.name + " eat ", food);
// };
// var kim = new Human('kim');
// kim.eat("lamen");
//
// // 상속받을 Worker
// var Worker = function (name) {
//   Human.call(this, name);
// }
// Worker.prototype = Object.create(Human.prototype);
// Worker.prototype.constructor = Worker;
// Worker.prototype.working = function () {
//   console.log(this.name + " is working");
// };
//
// var lee = new Worker('lee');
// lee.eat('pizza');
// lee.working();


// class Human {
//   constructor(name) {
//     this.name = name;
//   }
//
//   eat(food) {
//     console.log(this.name + " is eat " + food)
//   }
// }
//
// var kim = new Human("kim");
// kim.eat("lamen");
//
// class Worker extends Human {
//   /*
//   constructor(name) {
//     super(name);
//   }
//  */
//   work() {
//     console.log(this.name + " is working");
//   }
// }
//
// var lee = new Worker('lee');
// lee.eat('pizza');
// lee.work();


class Parent {
  constructor(age) {
    this.day = age * 365;
    this.secret = "몽고반점";
    this.familyName = "강씨"
  }

  ping() {
    return 'ping!';
  }
}

class Child extends Parent {
  constructor(name){
    super();
    this.name = name;
  }


  pingpong() {
    return super.ping() + ' pong!'; // super없이는 부모에 접근할 수 없다.
  }

  changeMyFamilyName (name) {
    this.familyName = name;
  }
}

// var papa = new Child(2);
// console.log(papa.day, "일을 샀았습니다.");  // 1460
// console.log(papa.secret, "인생의 비밀");
// var kth = new Child(1);
// console.log(kth.secret, "인생의 비밀");
// console.log(kth.ping());      //ping!
// console.log(kth.pingpong());  //ping! pong!
// console.log(kth.day, "일을 샀았습니다.");   // 730
// console.log(kth.familyName, "내 성");
// kth.changeMyFamilyName("LEE");
// console.log(kth.familyName, "내 성");

