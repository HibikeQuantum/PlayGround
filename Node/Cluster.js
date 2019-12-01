var cluster = require('cluster');

if (cluster.isMaster) {
  console.log('12:20', 'Cluster.js/func:4 >> is master')
  var worker = cluster.fork();
}

if (cluster.isWorker) {
  console.log('12:20', 'Cluster.js/func:4 >> is workder')
}
