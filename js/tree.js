// eslint-disable-next-line func-names
const extend = function (to, from) {
  for (const key in from) {
    to.key = from[key];
  }
};

const Tree = function (value) {

  const newTree = {
    flags: true,
  };
  newTree.value = value;

  // eslint-disable-next-line no-use-before-define
  extend(newTree, treeMethods);

  const root = undefined;

  if (root === undefined) {
    const rootNode = Tree(value);
    root = rootNode;
  }
  newTree.left = undefined
  newTree.right = undefined

  newTree.children = null; // fix me

  return newTree;
};


const treeMethods = {};

treeMethods.addChild = function (value) {
  // add 위치를 정하고 붙일 수 있는 자리를 정하고 만들고 붙이고
  // 왼쪽이 비어있으면 왼쪽에, 아니면 오른쪽에 둘다 차있으면 flag에 따라 오른쪽으로 왼쪽으로 추가요청.
  if (this.newTree.left === undefined) {
    this.newTree.left = Tree(value);
  } else if (this.newTree.right === undefined) {
    this.newTree.right = Tree(value);
  } else if (this.newTree.flags) {
    treeMethods.left.addChild(value);
    this.newTree.flags = false;
  } else {
    treeMethods.right.addChild(value);
    this.newTree.flags = false;
  }
}

treeMethods.contains = function (target) {
};

const myTree = Tree(10);

myTree.addChild(8);
console.log(myTree.newTree);
myTree.addChild(12);
console.log(myTree.newTree);

console.log(myTree.contains(9), " === false");
console.log(myTree.contains(9), " === true");


/*
 * Complexity: What is the time complexity of the above functions?
 */

module.exports = Tree;
