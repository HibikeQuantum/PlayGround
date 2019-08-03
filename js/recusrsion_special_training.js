const factorial = function (n) {
  if (n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}
// console.log(factorial(3));

const twoGugudan = function (n) {
  console.log(2, "*", n, "=", 2 * n);

  if (n === 1) {
    return;
  }

  return twoGugudan(n - 1);
}
// twoGugudan(5);

const twoGugudanUp = function (n) {
  if (n !== 1) {
    twoGugudanUp(n - 1);
  }
  console.log(2, "*", n, "=", 2 * n);
}
// twoGugudanUp(5);

const countBoom = function (n) {
  if (n === 0) {
    console.log("boom!")
    return;
  }
  console.log(n, "!!")
  countBoom(n - 1);
}
countBoom(5);
