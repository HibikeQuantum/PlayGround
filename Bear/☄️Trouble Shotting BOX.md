# ☄️Trouble Shotting BOX 

#Devops/problem

---



3년전

### 1차

TIL 1) 네스티드한 구조가 이상하게 구현되었일때 console에서 찾기가 참 힘들다. 다 구현해놓고 나서 POST맨이랑 디비랑 CLIENT JSON이랑 직접 비교하고 나서야 문제점을 찾게 된다.네스티드한 구조체로 통신은 안하는게 좋다. 한 번에 저장하고 한 번에 보내는 이득은 30% 디버깅 문제 100%증가

### 2차

`from rest***framework.compat import unicode***to_repr`

이 라이브러리가 버그가 있어서 업데이트가 됬는데 의존성을 업데이트하지 않아서 계속 버그가 남. 그렇다고 라이브러리를 쓸수도 없고 그래서 버림.

### 3차 R53 사용 일기

* 10월 1일 로그. 클라우드 프론트 origin에 호스팅된 사이트를 등록하고 클라우드 프론트에서 별칭이랑 origin 이랑 연결해주고. 별칭을 연결하는데 

* 인증서를 발급해서 CNAME으로 인증을 받고 (route 53에서 인증용 cname을 발급) 

* route53에선 thekoo.site 레코드를 생성해서 4가지 이름을 발급함.

---





배경: path('timeinput/', views.time_input , name="timeinput")

해결: 자꾸 timeinput args를 못찾아서 헤맸는데 timeinput/<int:shop> 이라 되어 있어서 못찾은거임. 프레임워크 사용규칙을 몰라서 생긴일.



문제: RDS에 접근 못하는데

해결: SG가 이상하게 설정되어 있었음. 0.0.0.0/0 설정을 거부하는 상태. 지우고 다시 하니까 됨. (버그)



문제: 파이프 깨짐 에러 발생

해결: pipe = socket 고로 broken pipe error = "클라이언트가 연결을 시도하려 했을 때 서버의 소켓이 닫혀있어서 연결을 할 수 없어서 뜨는 에러" 

이 사람의 경우 테이블 수정에 대해 migration이 되지 않은 상태. 디버그 모드를 끄게 되면 잘 처리할 수 없음을 기억!



배경: Bastion 호스트 구현 실습

문제: 이상하게 통신이 안됨

해결: inbound NACL에서 외부 source를 차단하고 있었기에 yum 요청에 대한 응답을 막고 있었음.



0514

문제: Nginx BAD_GATEWAY 문제, nginx 모듈 못찾는 다고함.. 

해결: conf 파일에서 경로를 변수로 넣으니까 되네.

개선: 무조건 따라하기 전에 무엇을 하는지 정확히 알아야 한다. 특히 Nginx처럼 문법이 까다로운놈은. 

 

0515

문제: 경로를 변수로 넣으면 nginx -t 는 넘어가는데 실제 req가 오면 에러가 발생한다. 결국 제대로 넣는 수 밖에 없다! 위에서 한건 임시 방편 

해결: http://unix:/

개선: 코드는 무조건 확실하게 확인!! 잘 안보였음 : 콜론이 빠져서 안된거였음.



문제: insominia 에서 보내면 broken pipe 에러 발생

해결: preference 설정에서 응답대기시간 연장

개선: 단어의 맥락을 이해는 디버깅의 시작



문제: 'utf-8' codec can't decode byte 0xb0 in position 67: invalid start byte

해결: IDE에서 해당 파일의 인코딩을 UTF-8로 변경

개선: 사람눈엔 같아보여도 컴퓨터 눈엔 다른거다.



문제: 사용하고자 하는 변수에 값이 들어가지 않음

해결: 코드 실행순서 변경

os.environ.setdefault("DJANGO***SETTINGS***MODULE", 'order.settings') 

→ 환경변수를 컨트롤 하는 패키지와 코드들이 순서대로 있는건 기본

            {'input': "- Not Strike~”, 'expected': “~~ Not Strike-"}

0607 - 느닷없는 정보가 결과 리포트 이메일에 들어가있어 문제가 됨.

해결: 내가 잘 파악하지 못한 배열에 '-'으로 저장하던 로직에 메시지는 다다익선이라고 'info_msg··· '을 적음. 그걸 참고하는 다른 로직에서 가지고가 정보를 보여줘서 평소와 다르니 에러인줄 파악함. 실제 비즈니스 로직이었으면 심각한 문제였다. 로직을 고칠때 배열이 어디서 쓰이는지 다 알고 쓰자.



0705 - 함수가 실행안되고 있었는데 레겍스가 왜 패턴을 못잡을까 고민하고 있었다. 기본을 생각하자.





#### 왜 함수가 실행안되나 의아해 하고 있었는데

* 프로미즈에서 에러가 나서 플러그인 전체가 작동안하고 있었음.

* 에러가 나는걸 자세히 안읽은게 문제



#### 용량 이슈가 일어나능 ㅣ유 

/var/spool/clientmqueue

메일 서비스를 꺼놓으면 큐가 차오르게 된다. 매일을 누가 보내는지 알아내서 처리해야한다.



#### AWS 요금 이슈

NAT Gatewaya 켜놓기만 했는데 한달에 36달러 나왔다..

다 배움이다. 수업비용 치곤 싼거야.. 절대로 테라폼 없이 하지 말자!!! 어디서 어떤 리소스가 도는지 한눈에 파악할 수가 없다.

→ 별 트래픽이 없는데 비용이 청구되면 미리미리 알람을 주는 서비스 있으면 좋겠다! 내가 만들면 어떄!?





## After reinstall jekyll, these message is occurred.

```

$ jekyll serve --trace

/Users/kth/.rbenv/versions/2.6.10/lib/ruby/site_ruby/2.6.0/rubygems.rb:265:in `find_spec_for_exe': can't find gem jekyll (>= 0.a) with executable jekyll (Gem::GemNotFoundException)

	from /Users/kth/.rbenv/versions/2.6.10/lib/ruby/site_ruby/2.6.0/rubygems.rb:284:in `activate_bin_path'

	from /usr/local/bin/jekyll:23:in `<main>'

```

gem update --system