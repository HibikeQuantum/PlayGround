function renderObject(ele) {
  const width = Math.random() * 500;
  const height = Math.random() * 500;
  document.body.appendChild(ele);
}

class Graph {
  constructor(value) {
    this.value = value;
    this.adj = [];
    this.check = false;

    const target = document.querySelector(".downside");
    const left = document.body.clientLeft * 0.9 * Math.random();
    const top = document.body.clientHeight * 0.55 * Math.random() - 50;
    this.$El = document.createElement("span");
    this.$El.className = "node";
    Object.assign(this.$El.style, { top: `${top}px`, left: `${left}px` });
    target.appendChild(this.$El);

    this.interval();
  }

  getNode() {
    return this;
  }

  addEdge(nodeA, nodeB) {
    nodeA.adj.push(nodeB);
    nodeB.adj.push(nodeA);
  }

  addEdgeToAll(target) {
    this.addEdge(this, target);
    for (let i = 0; i < this.adj.length; i += 1) {
      if (this.adj.checked === false) {
        this.adj.addEdgeToAll(target);
      }
    }
  }

  blink() {
    this.interval();
    let left = document.body.clientWidth * 0.9 * Math.random();
    let top = document.body.clientHeight * 0.55 * Math.random() - 50;
    Object.assign(this.$El.style, {left: `${left}px`, top: `${top}px`});
  }

  interval() {
    setTimeout(this.blink.bind(this), 1000);
  }
}
const saveArr = [];

window.onload = function () {


  const target = document.querySelector(".addNodeButton");
  target.addEventListener("click", () => {
    const random = Math.floor(Math.random() * 100);
    const newGraph = new Graph(random);
    saveArr.push(newGraph.getNode());
  });
};
