# 🛠 Command Tools

#Devops*language*Bash

## wc (단어 세기)

* return num



## grep (단어 찾기 return string)

`fgrep	(fixed)` ≡ grep -F	정규식을 배제

`egrep	(extended)` ≡ grep -E 확장정규식을 위해 사용 escape 생략 가능



## awk	특정 칼럼을 출력  

* `awk ‘패턴{action}’ target` 개발자이름인데 

* Aho. 산술, 비교, 논리 연산을 하고 출력 칼럼을 선택가능. retrun string



## uniq	중복라인을 제거

## sed	Stream editer 	

`$ sed 's*KING/yyy*' emp.txt`

→  emp.txt 를 출력할 때 KING 을 yyy 로 변경해서 출력한다. 데이터는 변경 안한다.

* 원본 데이터는 변경하지 않은채 명령어로 VIM편집을 한것과 같은 결과를 낸다. (굉장히 고급스럽고 깔끔하네)

* `sed ’s*trunk/‘${proejct}’\//*‘ result.txt > modified`



## cut	

* 바이트 문자열 필드 구분자 NUL 을 기준으로 문자열을 잘라내는 명령어



## fmt	

* 파일을 보기 좋은 포맷으로 바뀐다. 옵션 없으면 한문장으로 압축함

	

## tr  

* 넘겨받은 문자열을 치환하거나 삭제. 굉장히 유연하고 광범위한 치환을 지원. 

예제 `tr “1234” “abcd”` `tr “[a~~z]” [“A~~Z”]`



## chage 

**사용자의 패스워드 만기 정보를 변경 및 설정하는**명령어*이다



## 프로세스 모니터링

* PID

* PPID parent

* UID

* GID

* file descriptor



## ps 자주 쓰는 옵션

* ps 			사용자가 실행한 프로세스만

* ps -ax		모든 프로세스

* ps -aux	모든 프로세스의 자원 점유율까지

* ps -ef		ppid를 포함한 조회



리소스 소모를 체크할땐 ps 보다 htop 이 특화. atop은 과거 이력을 조회할때 유용

kill은 프로세스 신호를 보내는게 원래 취지. -9  SIGKILL -15 SIGTERM 

백그라운드는 & 간단~



nmap - 포트 탐지

tcpdump - tcp 사용 데이터

mtr : ping + traceroute

dig: domain information grouper

airmon, airodump : wireless network scan

iptables: linux firewall setter

netstat: monitoring Port Status



nmon: 로컬 시스템의 통계를 대화식으로 보여주고 통계를 기록함.

iostat: 디스크 입출력 성능 분석

sar : system activity report. 시스템 자원 사용률 이력을 저장하고 레포팅한다.

vmstat: CPU, MEMORY 리소스를 종합적으로 확인(이게 직빵)



strace: 실행가능한 바이너리를 추적하고 시스템콜도 보여줌

dtrace: 시스템 정보 및 이벤트를 표시

systemtop: 커널의 특정 정보들을 수집해 문제해결에 사용. 시스템콜에 handler를 다는 느낌

du -sh : 디렉토리 사용량 분석

uname: 시스템 정보 출력



lsof	[List Open Files] 시스템에 열린 파일 목록을 알려줌. 파일을 지정하면 파일을 사용중인 프로세스를 알 수 있음.

	특정 포트를 사용도 체크가능 lsof - i TCP:22

	lsof -c httpd		해당 서비스가 사용중인 파일 정보출력

	파일 기준으로 정보 탐색할때 유용





find . -name “*log”



$PATH 같은 시스템 변수는 어딜가든 동일하게 적용 (로그인쉘, 서브쉘)

다만 이건 부모 프로세스가 같을때만 적용된다…;;



<<VIM>>

undo U

undo undo  ^+R 





rm -rf `cat [지울 파일이 개행된 파일]`로 한번에 지울 수 있다.

basename 경로를 지우고 순수한 파일명을 리턴





find . -name “some” -pirint0

* 기본 플래그는 -print 0을 하면 각 결과가 \0으로 끝난다. 



xargs 는 입력되는 문쟈열을 trim 하고 각각에 대해 명령을 내릴수 있다. 





## Docker

* 태그가 떨어진 (최근꺼만 lastest를 달고 있다) 이미지 삭제

docker rmi -f $(docker images -f "dangling=true" -q)



* 도커 localhost

도커 안에서 localhost 주소를 쓰게 되면 app 돌아가는 프로세스 내의 localhost를 지칭하게 된다.

개발 컴퓨터의 Localhost를 따로 지정해주려면 'host.docker.internal'를 쓴다.



sed 명령어

s*old/new*g

s*old/new*gi



chmod +x

chomd 700



readlink - 전체 주소반환

baseline



'cd -' 뒤로가기

'cd .' 새로고침



file - 해당 파일의 포맷을 출력 (csv, tar 등등)



우왓!!

cat > filename	// 이렇게 하면 입력파이프를 걸어놓을 수 있고 이때 붙여넣기든 뭐든 하면 vi 안하고도 파일 생성이 가능





grep -efv

grep -EV 

grep Hello a |grep -Ev 'apple|orange|banana'