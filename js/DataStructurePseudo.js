// function A(name) {
//   this.name = name;
//   this.foo = () => {
//     console.log(this);
//   }
// };
// var a = new A('abc');
// a.foo();
//QueuePseudo.js
class Queue {
  constructor() {
    this.queue = [];
  }

  dequeue(item) {
    this.queue.push(item)
  }

  enqueue(item) {
    return this.queue.shift();
  }

  qLength() {
    return this.queue.length;
  }
}

var myQueue = new Queue();
myQueue.dequeue("A"); // A
myQueue.dequeue("B"); // A B
console.log(myQueue.enqueue());  // A;
console.log(myQueue.qLength());  // 1;

var temp = new Vertex(input);
temp.next = head;
head = temp;


head = temp
//추가
Vertex
temp = new Vertex(input)
temp.next = head
head = temp
//삭제
Vertex
temp1 = head
while (--k != 0)
  temp1 = temp1.next
Vertex
temp2 = temp1.next
Vertex
newVertex = new Vertex(input)
temp1.next = newVertex
newVertex.next = temp2


class LinkedList

(item)
{
  constructor()
  {
    this.data = item
  }
  data;
  nextNode;

  find(num)
  {
    return dListAddressfinde
  }

  input(item, 넣고
  싶은
  인덱스
)
  {
    // NewList = new LinkedList
    // PrevList = find(넣고 싶은 인덱스)
    // NewList.nextnode = PrevList.nextnode
    // PrevList.nextnode = NewList
  }

  delete (item)
  {
  }
}

class Node {
  data;
  leftNode;
  rightNode;
}

class Tree {
  root;

  setRoot(node) {
    this.root = node
  }

  getRoot() {
    return root;
  }

  makeNode(data, leftNode, rightNode) {
    node = new Node();
    node.data = data;
    node.leftNode = leftNode;
    node.rightNode = rightNode;
    return node;
  }
}


var Graph = (function () {
  function Node(key) {
    this.next = null;
    this.edge = null;
    this.key = key;
    this.inTree = null;
  }

  function Edge(data, dest, capacity) {
    this.nextEdge = null;
    this.destination = dest;
    this.data = data;
    this.capacity = capacity;
    this.inTree = null;
  }

  function Graph() {
    this.count = 0;
    this.first = null;
  }

  Graph.prototype.insertNode = function (key) {
    var node = new Node(key);
    var last = this.first;
    if (last) {
      while (last.next !== null) {
        last = last.next;
      }
      last.next = node;
    } else {
      this.first = node;
    }
    this.count++;
  };
  Graph.prototype.deleteNode = function (key) {
    var node = this.first;
    var prev = null;
    while (node.key !== key) {
      prev = node;
      node = node.next;
    }
    if (!node) return false;
    if (!node.edge) return false;
    if (prev) {
      prev.next = node.next;
    } else {
      this.first = node.next;
    }
    this.count--;
  };
  Graph.prototype.insertEdge = function (data, fromKey, toKey, capacity) {
    var from = this.first;
    var to = this.first;
    while (from && from.key !== fromKey) {
      from = from.next;
    }
    while (to && to.key !== toKey) {
      to = to.next;
    }
    if (!from || !to) return false;
    var edge = new Edge(data, to, capacity);
    var fromLast = from.edge;
    if (fromLast) {
      while (fromLast.nextEdge != null) {
        fromLast = fromLast.nextEdge;
      }
      fromLast.nextEdge = edge;
    } else {
      from.edge = edge;
    }
  };
  Graph.prototype.deleteEdge = function (fromKey, toKey) {
    var from = this.first;
    while (from !== null) {
      if (from.key === fromKey) break;
      from = from.next;
    }
    if (!from) return false;
    var fromEdge = from.edge;
    var preEdge;
    while (fromEdge !== null) {
      if (toKey === fromEdge.destination.key) break;
      preEdge = fromEdge;
      fromEdge = fromEdge.next;
    }
    if (!fromEdge) return false;
    if (preEdge) {
      preEdge.nextEdge = fromEdge.nextEdge;
    } else {
      from.edge = fromEdge.nextEdge;
    }
  };
  return Graph;
})();

const hash = (string, max) => {
  let hash = 0;
  for (let i = 0; i < string.length; i++) hash += string.charCodeAt(i);
  return hash % max;
};

const HashTable = function () {
  let storage = [];
  const storageLimit = 4;

  this.add = (key, value) => {
    const index = hash(key, storageLimit);
    if (storage[index] === undefined) {
      storage[index] = [[key, value]];
    } else {
      const inserted = false;
      for (let i = 0; i < storage[index].length; i++) {
        if (storage[index][i][0] === key) {
          storage[index][i][1] = value;
          inserted = true;
        }
      }
      if (inserted == false) storage[index].push([key, value]);
    }
  };

  this.remove = key => {
    const index = hash(key, storageLimit);
    if (sotrage[index].lengh === 1 && storage[index][0][0] === key)
      delete storage[index];
    else {
      for (let i = 0; i < storage[index]; i++) {
        if (storage[index][i][0] === key) delete storage[index][i];
      }
    }
  };

  this.lookup = key => {
    const index = hash(key, storageLimit);
    if (storage[index] === undefined) return undefined;
    else {
      for (let i = 0; i < storage[index].length; i++) {
        if (storage[index][i][0] === key) return storage[index][i][1];
      }
    }
  };

  this.print = () => {
    console.log(storage);
  };
};

console.log(hash('dongwoo', 10));

const ht = new HashTable();
ht.add('a', 'a');
ht.add('b', 'b');
ht.add('c', 'c');
ht.add('d', 'd');
console.log(ht.lookup('asd'));
ht.print();


class Node {
  constructor(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
  }

  show() {
    return this.data;
  }
}

//Binary Search Tree
class BST {
  constructor() {
    this.root = null;
  }

  getRoot() {
    return this.root;
  }

  insert(data) {
    //새로운 Node 생성
    let n = new Node(data, null, null);
    //트리에 루트 노드가 없으면 생성한 노드가 루트 노드
    if (this.root == null) {
      this.root = n;
    } else {
      //current에 루트 노드를 가져옴
      let current = this.root;
      let parent;
      while (true) {
        parent = current;
        if (data < current.data) {
          current = current.left;
          if (current == null) {
            parent.left = n;
            break;
          }
        } else {
          current = current.right;
          if (current == null) {
            parent.right = n;
            break;
          }
        }
      }
    }
  }

  inOrder(node) {
    if (!(node == null)) {
      this.inOrder(node.left);
      console.log(node.show());
      this.inOrder(node.right);
    }
  }

  find(data) {
    let current = this.root;
    while (current.data != data) {
      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
      if (current == null) {
        return null;
      }
    }
    return current;
  }

  remove(data) {
    this.root = this.removeNode(this.root, data);
  }

  removeNode(node, data) {
    if (node == null) {
      return null;
    }
    if (data == node.data) {
      //자식이 없을 때
      if (node.left == null && node.right == null) {
        return null;
      }
      //왼쪽 자식이 없을 때
      if (node.left == null) {
        return node.right;
      }
      //오른쪽 자식이 없을 때
      if (node.right == null) {
        return node.left;
      }
      //둘 다 자식이 있을 때
      let tempNode = this.getSmallest(node.right);
      node.data = tempNode.data;
      node.right = this.removeNode(node.right, tempNode.data);
      return node;
    } else if (data < node.data) {
      node.left = this.removeNode(node.left, data);
      return node;
    } else {
      node.right = this.removeNode(node.right, data);
      return node;
    }
  }

  getSmallest(node) {
    let current = node;
    while (!(current.left == null)) {
      current = current.left;
    }
    return current;
  }
}

const nums = new BST();
nums.insert(23);
nums.insert(45);
nums.insert(15);
nums.insert(37);
nums.insert(3);
nums.insert(99);
nums.insert(21);
nums.insert(40);
nums.insert(44);
nums.insert(1);
nums.insert(65);
nums.inOrder(nums.getRoot());//1, 3, 15, 21, 23, 37, 40, 44, 45, 65, 99
console.log("==========");
console.log(nums.find(45));
console.log(nums.find(2));
nums.remove(45);
nums.inOrder(nums.getRoot());
