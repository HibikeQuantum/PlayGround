#NodeJS

##모듈정리
######C++ Addon
- makefile 로 컴파일된 c++ 코드를 NodeJS에서 활용하기위해 사용
######워커스레드
- 싱글스레드인 JS에서 너무 오래 시간이 걸리는 작업을 할때 활용함 (일반적으로 필요하지 않음)
- 한 스레드는 실시간 응답처리, 한개는 빅데이터나 게임엔진처럼 CPU 사용량이 많은  큰 로직을 맡기면 레이턴시가 너무 길어지는 문제를 회피할 수 있음
- 워커스레드는 NodeJS의 libuv 모듈 안쪽에서 돌아가는 스레드풀을 조작하는 모듈이다. (일반적인 JS코드들만 one thread 처럼 돌아가는거지 내부로는 멀티 스레드다인셈)
- worker_thread 는 직업 워커스레드를 조작할 수 있게 해준다.

####cluster
- 멀티프로세스를 적용하기 위해 CPU 갯수만큼 만든다.
- 스레드는 정보를 공유하지만 클러스터는 공유하지않으므로 처리가 필
- Master & Workder 로 구성

###### 왜 필요할까
- cluster 로 멀티프로세스를 처리하고 나면 스케일아웃시 동기화처리가 필요 (서버 프로세스 끼리 데이터 송수신이 필요하다)

```cluster.js
if (cluster.isMaster) {
  // Master라면 CPU갯수만큼
    os.cpus().forEach(function (cpu) {
      // 워커 포크
        cluster.fork();
    });
    cluster.on('exit', function(worker, code, signal) {
        if (code == 200) {
            cluster.fork();
        }
    });

    // 워커의 메시지를 수신
    worker.on('message', function ("A집에서 주문들어옴") {
        // 워커에게 메시지 보내기
    	worker.send("A집에서 주문들어왔다");
    });
}

if (cluster.isWorker) {
    //마스터에게 메시지 보내기
    process.send("A집에서 주문들어옴");

   //마스터가 보낸 메시지 처리
    process.on('message', function("주문이 들어왔다") {
        //카운터도 올리고 여기저기 데이터 갱신하고
    });
}
```

- 이벤트를 송수신하는 매개체로는 redis pub/sub를 활용할 수 있다
- 워커 마다 다른 환경을 가지고 있고 이는 세션문제를 일으킨다. (워커를 쓰면 포트번호도 동일하다)  클랑이언트의 요청이 지속적으로 같은 프로세스와 통신을 처리하도록 해야하니 별도의 처리가 필요(socketio-sticky-session 모듈)

```sicky sample
var sticky = require('socketio-sticky-session');

sticky(require('http').createServer(function(req, res) {
  res.end('worker: ' + process.env.NODE_WORKER_ID);
})).listen(3000, function() {
  console.log('server started on 3000 port');
});
```

- API로 이벤트를 받고 웹소켓으로 이벤트를 전송하기
```
app.get('/ridersorda', function (req, res, next) {
  next();
}, function (req, res) {
  // POST로 전송된 값들을 가져오고
  var nameSpace = req.param('nameSpace');
  var roomName = req.param('roomName');
  var rcvEvtNm = req.param('rcvEvtNm');
  var rcvData = req.param('rcvData');

io.of(nameSpace).to(roomName).emit(rcvEvtNm, rcvData);

});
```
