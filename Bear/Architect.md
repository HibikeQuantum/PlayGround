# Architect

#Devops/OS_INFRA #Devops/data



## 서비스 설계

- nginx를 express 서버 앞에 두고 프록시로 연결하면 보안성 향상기대

- HTTP1.1, WebSocket 지원호환 이슈가 있음.

* 이렇게 웹서버를 이중으로 두는 프록시 설계가 static 파일을 서비스 측면에선 우수(캐시)

* 되도록 서버 로직을 클라우드 프론트 같이 정적 서비스에 배치 할 수 있으면 서버가 더 견고하게 된다. (뒤집힐 일이 줄어든다)