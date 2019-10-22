# 프로젝트 셋팅 및 로그

> 죽느냐 사느냐 그것이 문제로다.[^누가]

[^누가]: 내가

##프로젝트 실행환경관리

### 백그라운드 실행 (with log)
* nohup python3 app.py production > app.log &   (에러출력이 터미널이 아닌 파일에 찍히는점 주의)
* netstat -ntlp | grep :8000      (포트점유 확인)
* tail -f app.log   (로그 확인)
- - -

##프로젝트 지침
- 작업단위별로 커밋해가는 습관 길러야 한다.

### ESLINT
가장 기본적인 세팅
~~~
{
    "rules" : {
        "no-console" : "off",
        "no-alert" : 1,
        "quotes" : ["error", "double"]
    }
}
~~~

### Node 프로세스 안죽이기
~~~
process.on('uncaughtException', (err) => {
  console.error("죽지마 ㅠㅠ");
  console.error(err);
  // retruen것이 없기 때문에 process를 종료시켜 줘야함.
  process.exit(1);
});
~~~



##반성
### 3차
TIL 1) 네스티드한 구조가 이상하게 구현되었일때 console에서 찾기가 참 힘들다. 다구현해놓고 나서 POST맨이랑 디비랑 CLIENT JSON이랑 비교하고 나서야 꺠닫는 버그. 절대로 네스티드 금지. 한번에 저장하고 한번에 보내는 이득은 30% 디버깅 문제 100% 증가

### 2차
from rest_framework.compat import unicode_to_repr
이 라이브러리가 버그가 있어서 업데이트가 됬는데 의존성을 업데이트하지 않아서 계속 버그가 남. 그렇다고 라이브러리를 쓸수도 없고 그래서 버림.

### 3차
10월 1일 로그. 클라우드 프론트 origin에 호스팅된 사이트를 등록하고 클라우드 프론트에서 별칭이랑 origin 이랑 연결해주고. 별칭을 연결하는데 인증서를 발급해서 CNAME으로 인증을 받고 ( route 53에서 인증용 cname을 발급) route53에선 duchoo.site 레코드를 생성해서 4가지 이름을 발급함.
