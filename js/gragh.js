// Instantiate a new graph
const Graph = function () {
  this.allNode = [];
  this.root = undefined;
}
const Node = function () {
  constructor()
  {
    this.fromEdge = []
    this.toEdge = []
    adjNode = []
  }
};

// Add a node to the graph, passing in the node's value.
// eslint-disable-next-line func-names
Graph.prototype.addNode = function (value) {
  if (this.root === undefined) {
    this.root = Node(value);
  }
  var newNode = Node(value);
  this.allNode.push(newNode);

};

// Return a boolean value indicating if the value passed to contains is represented in the graph.
Graph.prototype.contains = function (node) {
  // 탐색을 돌려서 참 거짓을 반환 DFS
};

// Removes a node from the graph.
Graph.prototype.removeNode = function (node) {
  //노드를 제거한다. 제거하기 전엔 removeEdge도 선행된다.
};

// Returns a boolean indicating whether two specified nodes are connected.  Pass in the values contained in each of the two nodes.
Graph.prototype.hasEdge = function (fromNode, toNode) {
  // from노드에게 질의해서 edge를확인
};

// Connects two nodes in a graph by adding an edge between them.
Graph.prototype.addEdge = function (fromNode, toNode) {
  //  fromNode한테 추가하고
  // toNode한테도 toEdge에 추가
};

// Remove an edge between any two specified (by value) nodes.
Graph.prototype.removeEdge = function (fromNode, toNode) {
  // fromNode삭제, toNode도 삭제

};

// Pass in a callback which will be executed on each node of the graph.
Graph.prototype.forEachNode = function (cb) {
  // 각 노드에 콜백실행함수를 넣어준다.
};

/*
 * Complexity: What is the time complexity of the above functions?
 */

module.exports = Graph;

let gragh = new Graph();
gragh.addNode(1);
gragh.addNode(2);
gragh.addEdge(1, 2);
gragh.hasEdge(1, 2);
