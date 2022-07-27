# 🌧 (1) Devops Mainline

#Devops #Mainline

설명 - 강의 들으면서 최대한 중요한 내용만 골라서 코어를 뽑아내려는 방식으로 메모, 실용적 팁, 경험이 들어간걸 적는다.



# 《Part 1》

* 시작 - 데브옵스의 고객은 개발자, 그들이 운영에 참여할 수 있는 환경을 제공한다.

* 데브옵스의 커리어 범위

	* 네트워크, 개발 및 배포 플래폼, 오케스트레이션, 관측 , 클라우드 플래폼, 보안 플랫폼, 데이터 플랫폼,  서비스 운영

	* 보안 플랫폼, 데이터 플랫폼도 포함하지만 일단은 조금씩 분리됨

	* 네트워크 엔지니어, 시스템 엔지니어가 오면 네트워크도 분리됨.

	* 다 연관이 있기 때문에 기본은 알되 하나는 전문성을 가지면 좋겠다.

* 데브옵스의 실천!‼ (데브옵스 핸드북 참고)

	* 문화의 성숙도를 평가할 수 있는 지표를 설정하고 추적하자



## Devops 로드맵

* 언어 선택에 중요한 기준 

	* 서비스들이 서드파티 지원을 할때 언어 (Go, Python, Node.js  3강)

* 컨테이너 기반으로 하다보면 initd, systemd 볼일이 잘 없음

* OS는 AD를 운영할게 아니면 리눅스 중심으로 하고 BSD는 필요없다.

* Jenkins는 역사가 오래된 만큼 기본, Gitlab CI 가 컨테이너 최적화

* elastic Stack 을 하면 모니터링은 다 들어가있음

* Jager 오픈소스에서 많이 New Relic은 유료

* 오픈소스는 Prometheus 유료는 Datadog

* 데브옵스 커리어

	* 다른 부서가 하는 일을 이해하고 있어야 하기에 진입이 쉽지 않다.

	* 흉내만 내는건 할 수도 있지만 안정화, 자동화, 비용

	* 기술 도입은 신중히

	* 장애가 발생하면 근본 원인을 찾고 (Root Cause)을 찾고 장애 기록(Post-mortem)을 남기는 습관을 기르자. 왜?를 통해 업무를 강화

	* 깊게 공부를 하게 되면 처리 시간이 늦어진다. 대충 처리하고 나면 남는게 없다. 이직을 하거든 이전 조직에서 깊게 다루어 본 문제로 신뢰를 얻고 새로운 문제에 도전해보자.

	* 정말 잘 하고 싶다면 영어는 필수다. 공식 문서를 읽는 습관, 질문을 하고 답변하자.

	* 잘하는 사람들이 가득한 환경에 뛰어 들어야 한다.

* 업무영역

	* 개발 인프라에 대한 관리 및 형상관리,효율개선

	* SW개발, 인프라 지원팀과 연락 역할

	* 개발 흐름을 이해하고 CICD 유지 및 개선

* 필요기술

* Eng : CIDE파이프라인, 클라우드 서비스 이해, Docker, Linux, 스크립트, Ansible, 소스제어(gitlab), 모니터링 서비스

* Principal : 성가 평가 책임을 가진 팀 리딩 역할, Linux 기반 환경 개발 및 테스트 변경 및 구성에 대한 이해, 클라우드 환경에 대한 구축 경험 및 이해, CICD 운영, 디자인 패턴 및 리팩토링 경험, 성능 조정 및 병목현상 및 문제 분석에 대한 지식, VPN, CIDR 네트워킹 지식



## AWS

* 사용중이지 않은 Elastic IP는 요금

* EC2 네트워크 수신은 공짜, 송신은 1기가까지 공짜

* VPC 리소스들

**VPC, subnet, route Table, VPC peering, DHCP options, Virtual Gate, Internet Gateway** ⇒  비용 X

```diff
+ `NAT Gateway, PrivateLink, Site to Site VPN
```
 과금


* IAM

	* 많은 리소스를 생성해도 과금 없음

	* 
```diff
+ User, Group, Role, Policy
```


* "공짜 서비스로 IaC를 연습하자"

* AWS 멀티 사용자 프로파일이 필요할 수가 있다. 

	* .*aws*config

	* aws sts get~~caller~~identity

****calculator aws* 이런 서비스도 존재한다. 

	* 실습할때도 실무할때도 항상 계산하도록

* 하나의 서비스에 여러 서비스가 얽혀있어서 리소스 잔여물을 처리하기가 힘들다. AWS-NUKE 로 한번에 처리 가능




---



# 《Part 2》

* 강사: 송근일 (당근, 카사코리아 인프라 디렉터) 

* 이렇게 잘나가는 사람도 헤매고 고통스러워한다. 나라고 별 수 있겠냐 연습하고 스스로를 단련시켜서 당황하지 않는 수밖에



## 《Chapter 1 - AWS basic》



* AWS 에서 제공하는 서비스

	* 컴퓨팅 서비스 Elastic Computing 2

	* 네트워킹 서비스 Route53, VPC, AWS Direct Connect, AWS ELB

	* 스토리지/DB 서비스 RDS, DynamoDB, AWS ElasticCache, S3는 파일형식에 구애 받지 않는다.

	* 데이터 분석 & AI Redshift (분석특화 스토리지), EMR(대량 데이터 처리), Sagemaker(분석을 위한 환경제공)



네트워크 

* IPv4

	* network bit, host bit

	* A,B,C 작은 네트워크 많은 호스트 ~ 많은 네트워크 적은 호스트 세번째 옥탯까지 네트워크를 표현하면 C!

	* 네트워크를 쪼개기 위한 Subnet. CIDR 표기로 대역을 쪼갠걸 표현 /25는 2^7개의 호스트를 가지겠지. 네번째 옥탯으로 시작 네트워크를 알 수 있다.

* VPC(Virtual Private Cloud)

	* Availability Zone

		* 서브넷은 하나의 AZ에만 속할 수 있다.

		* AZ 하나에 여러개의 서브넷이 있을 수 있다.

* Private subnet

	* 인터넷 불가

	* 얘한테는 0.0.0.0/0 라우트 테이블이 없어서 못나간다.

	* DB를 여기에 배치한다.

	* 그래도 인터넷과 통신이 필요하다. 이때 퍼블릭으로 경유해 통신을 한다. 이걸 가능케 하는게 NAT Gateway, NAT instance

	* 실제로 바로 가는게 아니라 라우터가 퍼블릭서브넷 안의 NAT 게이트웨이로 보낼뿐.

* Public subnet

* NACL

	* Stateless, Access block 가능

	* 프로그램의 요청과 응답의 포트는 다르다. (임시포트 1024-65535)

	* Rule number 에 의해 우선순위가 결정된다.

* Security Group (VPC의 상태값이라 보면 된다)

	* Statefull

	* outbound에 정책이 없으면 원래 응답을 할 수 없다 (예를 들어 1024) 하지만 스테이트풀하니까 응답할땐 허용함. 

* Bastion host

	* 인터넷에서 프라빗호스트로 접근하기 위한 호스트

* VPC endpoint 

	* 서비스에 비공개로 연결할 수 있다. 리소스와 통신하는데 IP가 필요없다.

	* 중간 매개체

		* 프라이빗 서브넷도 aws의 여러 서비스와 연결이 필요한데 그걸 가능케함.(AWS 서비스도 일종의 인터넷) 

		* interface endpoint: private ip를 만들어 서비스로 연결햄. 뒷구멍

		* gateway endpoint: 추가적으로 라우팅 테이블에 추가해줌. (S3, DynamoDB). 중립 지역에 별도의 게이트 웨이.

* NAT 나 IG를 통해서 AWS와 통신하는건 비추천. 트랙이 노출이 됨

	* 노출 안시시키기 위해 Gateway endpoint 사용

	* 서비스는 s3를 위한 엔드포인트.

	* 프라이빗 서브넷을 선택



## 《Chapter 2 - Backend Development》

### Django

* 개념

makemigrations - 스키마 업데이트

migrate - Django 스키마 업데이트

시리얼라이저: DB에 있는 값을 사용하기 편하게 JSON으로 바꿔주는 도구

* 공개키 등록

* 서버에서 keygen rsa 해서 나온 pub 값을 repository 디플로이 키에 등록했고

* keygen  email 서명으로 나온 pub 값을 깃허브 계정 ssh 키에 등록했다.

* 이를 통해 사용자와 리포지터리 배포관리자가 보안에 합의했음을 증명.

* 배포 명령어

```shell

virtualenv -p python myenv

pip3 install -r requirements.txt

>> "You already have Python3 but don't care about the version"

sudo ln -s /usr/bin/python3 /usr/bin/python

# 위 명령을 통해 python3 소프트링크를 python 에 링크



PIP도 아래와 같이 해도 되는데 pip3를 쓰면 되니까 굳이 할 필요는 없다.

sudo apt install -y python3-pip

sudo ln -s /usr/bin/pip3 /usr/bin/pip

```



## 《 Chapter 3 - Manual deploy 》

* 순서

```

Ubuntu LTS v22 생성

// ... keygen rsa 생성 ...

git clone ${repo}

sudo apt update

sudo apt install python3-pip

pip3 --version

sudo apt-get install libmysqlclient-dev

sudo apt-get install python3-dev

pip3 install -r requirements.txt

sudo apt-get install python3-tk

```



* without nohup) 백그라운드 실행하고 터미널 유지하는 방법

1.  [COMMAND] + ’ &’

2. `disown -h`

   →  "-h  mark each JOBSPEC so that SIGHUP is not sent to the job if the shell receives a SIGHUP"

###  Load Balancer

* Application load balancer 장점은 패킷을 까서 분기를 만드는것 (로드밸런스 기능 + sticky Session 보장)

	* 이런 로드밸런스 그룹의 한 서버가 죽으면 세션이 다 날라가는 문제가 생긴다.

	* 이때 WAS간 Session Clustering 을 해놓으면 세션이 이관된다. (톰캣 가능)



* ROUTE53

	* 개념

		* NS	호스트하는 서버

		* SOA=CNAME 다른 도메인 이름과 일부 리소스로 트래픽 라우팅

		* A IPv4 실제 라우팅 정보

* Certificate manager + ROUTE 53

	* HTTPS 를 하기 위한 조건

	* 제대로 하지 않으면 HTTPS 통신은 블로킹



0. ROUTE 53에서 도메인 이름을 지정하면 검증을 하는 과정에 들어간다.

1. 검증이 끝나면 CNAME 을 라우트53에 추가하면 된다. 

2. 이제 SSL 인증서가 발급된다.



실제 실습:

* 인증서등록 - 로드밸런서(443) 추가 - SSL 인증서 등록



* Cloudfront

	* Cache + CDN 서비스

	* 똑같은 작업을 반복하는 것이 비효율적이므로 그걸 해결하기 위한 캐싱

		* 처음엔 no Hit, origin이 계산한다. 그리고 distribution에서 저장한다.

		* 다음 요청 부터는 Hit

	* 만약 유저가 바뀌었다면? 다른 값을 뿌려야한다. 

		* Cache가 있다면 잘못된 정보를 주지 않기 위해 주기적으로 갱신해야한다.

		* 그래서 오래 동안 안바뀌는 경우에 주로 캐시서버를 사용한다. 아닌경우엔 간격을 짧게 관리한다.

	* CDN(Content delivery Network)

		* 어디에서 요청하더라도 빠른 속도의 서비스 제공Edge Location

	* CDN 실습

		* CNAME 과 SSL을 이용하여 생성한 다음 

		* Route53에서 로드밸런서 대신 CDN의 CNAME으로 연결해준다.

	* CDN Dist 생성

		* 로드밸런서를 Origin Domain 으로 선택한다. 

		* ROUTE53에선  로드밸런스를 바라보는 CDN별칭을 선택한다.

	* CDN Cache Policy

		* mimi, max, Default TTL을 지정할 수 있었다

		* 최근에 신규 정책이 생기면서 recomendation 이 됨

		* 클라이언트 쪽에서 TTL 을 설정할 수 있는데 그걸 무시하는게 여기서 설정하는 TTL

		* 5초 ~15초 설정을 해도 충분히 도움이 된다.



* 어플리케이션 구동

	* 동적파일을 나눠주는 WAS를 스케일아웃 하는것 보단  WEB서버를 스케일아웃하면 편하다. 자동으로 배포가 된다! (nginx + django 앱 폴더 끝!) 

* NGINX 

* Gunicorn

* WSGI 서버: uWSGI, gunicorn, Apache/mod-wsgi를 많이 사용하는데, uWSGI 같은 경우에는 고성능 서버 성능을 지니고 있으며, gunicorn 같은 경우에는 보통 수준의 성능이지만 설치와 관리가 간단하다

	* 웹서버와 웹 애플리케션의 인터페이스를 위한 파이선 프레임워크 WSGI. 이런게 nginx랑 연동되서 돌아가나봄.

	* wsgi 만 있어도 동작은 하지만 SSL 과 정적 파일을 지원하지 않으니 nginx를 사용하는 것. 특히나 유닉스 소켓을 사용하면 성능이 월등이 좋아진다.

	* 잘 보면 WSGI 서버가 .sock 파일을 생성하고 nginx 에서 저 소켓으로 트래픽을 보냄

```nginx

server{

  listen 80;

  server_name *.compute.amazonaws.com;

  location / {

    include proxy_params;

    proxy_pass  [http://unix/home/ubuntu/django_nginx/](http://unix/home/ubuntu/django_nginx/) 

```



```gunicon

[program:gunicorn]

directory=/home/ubuntu/django_nginx

commnad=/usr/bin/gunicorn --workers 3 --bind unix:/home/ubuntu/django_nginx/app.sock django_nginx.wsgi:application

autostart:true

autorestart:true

stderr_logfile=/logs/gunicorn1.err.log

stdout_logfile=/logs/gunicorn1.out.log

``` 



**배포 명령** 

```shell

sudo gunicorn --bind 0.0.0.0:8000 django_nginx.wsgi:application

python3 manage.py runserver 0.0.0.0:8000

gunicorn --bind unix:/home/ubuntu/django_nginx/app.sock django_nginx.wsgi:application

```



* 우분투 systemd 만들어서 관리하기

```shell

vi /etc/systemd/system/gunicorn.service

sudo systemctl start gunicorn

sudo systemctl enable gunicorn

systemctl status gunicorn

```

이 작업을 하고 나면  systemctl restart nginx … 등의 컨트롤이 가능해짐



* DOCKER 개론

	* VM

		* 하나의 서버 내에서 확실하게 구분 (HVM) but 비효율

		* 유동적으로 Power Weight 를 조정할 수 없다. 

	* DOCKER

		* 하나의 서버 안에서도 환경이 독립될 필요가 있다.

		* 개발에서든 배포에서든 그래서 만들어짐

		* 프로세스 취급하므로 효율적으로 자원사용

* Docker-Compose

	* 쓰는 프로그램이 다른 성격일 경우 컨테이너간 상호작용이 필요하고 그 역할을 하는게 컴포즈. 도커를 둘러싸고 관계를 정의.



* Docker 실습 과정

```shell

curl -fsSL https://get.docker.com/ | sudo sh

sudo usermod -aG docker $USER

uwsgi.ini  //소켓 위치와 uwsgi 가 실행되는 위치를 명시

```





## 《 Chapter 3 - 중규모 아키텍트 》

* ECS (elastic container service)

	* ECR elastic container registry VS docker Registry

	* ECS 를 쓰면 EC2를 띄우고 그 안에 도커를 실행하는걸 관리해줌.

	* AWS Fargate : EC2를 TASK 로 감싸고 클러스터가 TASK 를 감싸서 유저가 직접 EC2를 관리안하게 해줌 

	* 컴포즈가 필요할땐 ECS- CLI 로 관계관리 가능



* ECS practice

	* 클러스터 생성 (Cluster는 작업으로 구성)

	* 네트워크 전용으로 구성. EC2	는 안쓸꺼니

	* ECS 인스턴스는 EC2 인스턴스와 동일

	* 『시작 호환성』 > EC2 는 고전적 방법 (EC2 하나에 여러 도커를 실행)

	* 『작업크기』 각 작업이 사용할 리소스 레벨을 지정할 수 있다. 

		* 여기서 사용할 컨테이너를 지정한다.

	* 만들었으면 작업을 실행한다. 작업 갯수, 실행할 클러스터, 네트워크 모두 지정

	* 실행하면 배포가 된다. (각자 IP도 할당받고)



* 도커 컴포즈 작업 (YML) 작성을 CLI로 작성한다. 

* Docker 밑작업

* sudo usermod -G [그룹] [계정] 2차 그룹 1개

* sudo usermod -aG [그룹] [계정] 2차 그룹 여러개 허용

* 2차 그룹에 속한다고 그룹이 변하진 않는다.



* CLI를 통해 작업정의 생성

* JSON 파일들을 모아놓는 디렉토리를 생성

* 작업정의에 사용한 파라미터 ECS Task definition

	* family 작업의 이름

	* task role 작업실행역할(IAM)

	* Container definition

* 실행하는 계정이 ECR에 접근할 권한 + 클러스터가 태스크에 접근할 실행권한(execution role)도 필요하다.

* 파게이트를 생성하고 서비스도 해야한다. (VPC에 연결)

`ecs create_service —cluster [NAME] ~~-service-name --task~~definition ~~-vpc~~configuration`

* 지우게 되면 ECS 도 같이 관리해주므로 EC2 에는 남는게 없다.

* 작업정의된건 비용이 안든다. 실행중인 작업만 신경써



* (직접 컴포즈를 작성하지않고) AWS CLI 를 통해 도커컴포즈 만들기

	* ECS vCPU 20개면 한달에 80만원

	* ECS CLI 가 별도로 존재, 도커 컴포즈와는 문법이 다름

	****GPG*로 퍼블릭키를 통해 ECS CLI 에 권한 부여

		* `gpg ~~o ecs~~cli [URL ecs~~linux~~latest.asc]`

		* `gpg ~~-verify ecs~~cli.asc *user/local/bin*ecs-cli`



```shell

docker tag docker [sserver/django] [ecr]

docker push [ecr-url]

docker tag docker [server/nginx] [ecr-url]

docker push [ecr-Surl]



aws iam attach-role-policy 



esc-cli up --empty --cluster [이름]  //빈 클러스터 생성

ecs-cli configure profile --profile-name song ~~~

ecs-cli configure --cluster [name] --default-launch-type [타입] --region [리전] --config-name [

	// 프로파일로 설정값들을 만들어놓을 수도 있다. (액세스 키, 시크릿 키)

	// 프로파일은 프로파일일뿐. 실행이 아니다 .

ecs-cli configure default --config-name cli-config

ecs-cli configure profile default --profile-name song



vi docker-compose.yml 	// ECS-CLI 는 문법 다른거 알지!?

	// depends_on 도커에선 쓰지만 ECS-CLI 는 없다 이런게

vi ecs-params.yml

ecs-cli compose --fiele docker-compose.yml --ecs-params ecs.yml service create --launch-type FARGATE

	// 이렇게 실행하면 비어있는 ECS 에 서비스를 생성한다.

```



AWS-KMS  Key management service

	* 데이터 암호화 과정을 직접 구현할 수도 있다. 하지만 KMS 쓴다.

	* 서버 사이드의 암호화는 AWS에서 다 하는중

	* 관리하는 암호키를 CMK Customer Master key 라함

	* hardware security modules 저장소에 저장함.

	****Cloud-trail*로 어떤 key를 어떻게 사용하는지 로그 남김

* Datakey 는 4KB보다 더 큰 파일에 사용

	*  플레인 데이터 키, 엔크립트티드 데이터 키 두개가 존재.

	* 플레인 데이터 키는 항상 사용후 바로 삭제, 암호화된 키만 저장

	* CMK만 들고 있으면 결국 데이터는 안전하다.

	* CMK는 리전에 종속된다.

	* KMS는 CMK만 제어한다.

* 파이선은 백단에서 데이터암호화를 해주는데 node.js는 직접 해줘야함.

* AWS encryption Python. 파이선을 먼저 썰치하고 설치 권함

* 파이선예제

	* client 객체 생성

	* AMK arn 복사하고

	* cyperText, Header 정보도 리턴한다.

	* 암호화하면 BASE64로 일단저장

	* 클라이언트에 공개되는 코드인데 하드코딩된 만약 호스트 주소를 숨기고 싶다? 그러면 암호화를 해놓는거다. 

	* boto3, 액세스키, 등등 모두 이렇게 사용하면 좋다.

****비용*

	* 2만건 액세스 무료. 1$ 0.03$, KMS 1개 1$



CodeCommit

* something not good git-hub but it has good point about connecting code deploy.



* AWS CodeDeploy 구성 절차

	* ECS, Lambda, ECS 배포 플래폼 선택

	* 디플로이먼트 타입스 & 그룹스

	* IAM, Service role

	* 비용

		* 배포 서버당 0.02달러. AWS 서버는 공짜.



* 코드디플로이 튜토리얼

	* aws iam create-policy Policy.json 생성

	* aws iam list~~attached-user~~policy 생성된 정책을 IAM 적용

	* aws iam create-role

	* aws iam attach~~role~~policy

	* 코드디플로이 - 어플리케이션 생성

	* 코드디플로이 - 배포그룹 생성 ( 배포를 어디에 해야할지 설정)

	* 코드디플로이 - 서비스 롤 입력, 에이전트 설정, 로드밸런스 설정

	* 그룹을 만들고 나면 배포그룹안에 있는 EC2에 대해 배포가 진행된다.

	* 배포생성 - 배포그룹 선택 - 어플리케이션을 깃헙에 저장 - repo 이름 커밋 ID 입력 (우측 상단 nuj91281)

	* 이제 코드를 끌고와서 배포를 하는데.. EC2로 하면 이것저것 CLI 로 건들게 많으니 불편하다. ECS로 하면 좋지

	* YAML 파일을 사용해 앱의 실행 중단 등의 시나리오 처리를 할 수 있다.





# 《 PART 3 》



## CHAPTER 1



RabbitMQ 

* Asynchronous Messaging

	* 메시지 처리는 REST API로도 할 수 있지만 귀찮아! 그걸 해주는 브로커

	* PM과 비슷한 역할을 하는 브로커 메시지 전달에만 집중

* MicroService Architecture

	* 독립된 DB를 쓰고 DB consistency 작업도 해준다. 이것도 MQ로 한다.



* 개발 - 장고

* pika 래빗 클라이언트

* py → viewsets 패키지

	* class를 선언해놓고 5가지 함수를 구현한다. (http 각 메서드에 해당하는)

	* urls.py 에는 라우팅 인자에 ShopViewSet.as_view({}) 를 넣는다.

* class ShopSerializer(serializers.Modelsirializer):

	* class Meta:

		* model = Shop

		* fields = '_***all***_'

		* 이렇게 하면 디비 내용을 객체처럼 다룰 수 있다. 장고 ORM의 정수



* 개발환경구축

도커 --volume: 이 옵션을 사용하여 로컬 디렉터리의 특정 경로를 컨테이너 내부로 마운트할 수 있습니다. 

이걸 통해 도커안에서 뭘 변경해도 바로 로컬에 반영이 되고 DB 도 마찬가지다..

	****매번 개발환경을 셋팅해야하는 참사는 이제 없다(!‼)*



* 개발 - 플라스크

	* 라이브러리

SQLAlchemy // ORM

Flask-Migrate  // model을 디비와 동기화

Flask-Script // 

request  // html 요청을 쉽게 사용할 수있도록



* 플라스크 코드

@app.route('/')

def index():   // 단순간결하다!



* SQLAlchemy로 모델을 정의할때 다른 DB와의 연동을 위해 id 를 autoincrement=false로 관리

* 마이그레이션을 위해 'flask***migrate, flask***script 사용'

* 마이 그레이션 절차

	* docker-compose exec [name] sh	//마이그레이션을 위해 인스턴스에 접속

	* python manager.py db init

	* python manager.py db migrate

	* python manager.py db upgrade



* CloudAMQP - rabbit 클라우드 서비스



* 개발 - 메시지큐 (오더)



```python

producer.py // 작성, 피카 사용, 발급받은 URL params 로 connection

connection.channel()

def publish()

	channel.basic_publish(exchange='', routing='order', body='hello')

//이제 프로듀서를 main.py 에서 import 하여 추가하면 실행시 프로듀서도 실행된다.



consumer.py

	channel = connection.channel()

	channel.quere_declare(queue='order')

// order'큐를 선언한다.



def callback(ch, method, perperties, body):

	print("received")



channel.basic_consume(queue='order', on_message_callback=cacllback, auto_ack=True)

// 큐를 받으면 콜백을 실행한다.

// ack해주면 이제 메시지는 클로즈



exec backend 

python consumer.py

"started consuming"

//컨슈밍 시작. 이제 API 호출하면 프로듀스하고 컨슈밍도 된다.

```





* 개발 - 메시지큐 (보스)

	* 이제 ORDER에서 boss queue 로 생성하면 BOSS 에서 받는걸 볼 수 있다.

	* consumer.py producer.py	는 업데이트 했으면 다시 켜주고



* 도커컴포즈

	* 도커파일에서 python manage 삭제하고 대신

docker-compose.yml

command: 파라미터를 통해 자동실행하게 만든다.

	* queue 서버를 추가한다.

command python consumer.py 로 실행

depends_on

	-db

	* 이렇게 앱 2개, 프로듀서, 컨슈머 다 셋팅하고 컴포즈하면 전부다 다 실행



* BOSS 개발

@dataclass					// 아래 양식으로 사용하기 위한 데코레이터

class Shop(db.model):		// 상속 받아야함!

	id int

	title: str

	image: str	// 대충 쿼리를 사

	return jsonify(Shop.query.all()) 	// 모든 데이터 get

// SHOP을 처리할 수 있는 ORM dataclass를 추가



* 데이터 복제처리

	* 구조 변경 처리를 하고 MQ로 consume 한 뒤 똑같은 내용이 디비를 변경하도록 처리

	* 자신이 사용하는 디비를 변경하고 그 사실을 MQ에 날리고 consumer가 자기쪽 DB도 바꾸는 흐름



마이크로서비스 - 아키텍트와 실행방법

	* 규칙

	* 독립성이 최우선(domain drive)

	* API 설계(URI은 팀간 협업의 베이스라인 이므로 꼭 FIX )

	* 데이터 스키마를 효율적으로 관리(중복 최소화, 만약 image를 가진다면 참고하는 디비의 ID값만 가지게 설계)

	* 독립적으로 스케일링 (목적에 맞게 설계, 

	* 회사의 서비스가 90%이상 정해지기 전에 마이크로 서비스는 애로가 많다. 폐인 포인트가 없으면 모놀리식이 좋다.

* 강사님의 테스트 프랙티스

	1) End to End 테스트 환경 구축

		* 이때는 기존 테스트 서버를 하나 더 짠다.

		* 마이크로 서비스는 테스트 환경 구축이 까다롭다.

	2) 테스트서버 배포를 통해 배포 전에 문제를 캐치 (강사님은 3일동안 QA기간을 가짐) 이렇게 한달 하다가 다음단계로 넘어감

	3) 테스트 시나리오 구성 (기획자가). 에러 빈도, 에러 중요도, 

	4) 테스트 서버에 업로드 후 1일간 테스트 시나리오 테스트 (수동)

	5) 테스트 서버에 업로드 후 1일간 테스트 시나리오 테스트 (자동)

	My opinion - 이건 우츠쿠시이.. 하다. 왜 전 회사에선 이렇게 안했을까... ㅠㅠ

* 배포정책

	* 호스트 하나에 여러개 서비스를 배포

		* 관리용이, 독립성이 떨어짐, 자원 최적화 불가(CPU많이 쓰는 서비스, 메모리 많이 먹는서비스 다 다르다)

	* 호스트 마다 하나의 서비스 하나 배포

		* 가상머신 기반 or 컨테이너 기반 컨테이너가 좋지! 서버리스도 있다~(서버환경을 신경안써도 되니 서버리스) CPU 메모리 사용량에 따라 지불|

* 조직원들을 설득

	* 변경을 바로 적용할 수 있게 되야하니 개발자들은 귀찮다.(프로젝트성으로 일할때가 예측성이 높다)

* 마이크로서비스 도입때 겪은 문제점

	* 조그마한 코드 수정도 배포하기 위해 복잡한 프로세스+오랜 시간 필요

	* 디버그 하기가 까다로움 

	* 너무 거대해서 한 눈에 안 잡힘 (서비스와 서비스의 관계를 고려해야할 점이 많아진다. 복잡도 증가)

	* 정말 좋은 CI/CD 파이프라인 없으면 고전한다.

	* CICD를 제대로 활용하지 못하는 경우

	* 테스트가 약함, 마이크로서비스를 하면 data consistency 문제가 추가된다

	* 수집하는 구조를 짜고 저장(S3), 엑셀로 데이터를 보게 할 필요도 있다. 그리고 Mysql 에 올려서 검색.. 이런식으로 짰다. 그리고 슬랙에 Event 전달. 

	* 각 서비스들이 ECS, EC2 등등 여러 환경에서 도는데 성능을 체크하는것도 중요하다.

	* 정확한 업무분장이 필요하다.



Codebuild

* buildspec.yml

	* 당연히 빌드 해주고, 테스트도 해준다.

Codedeploy





* 로그 관리

* 결국은 백트래킹(문제를 추적하는 과정)

* 그래서 S3에 로그를 저장할것이다. (이게 실무에서 하는 방법)

 

* 테스트

    from django.test import TestCase

    class ShopModelTest(TestCase):

    	def test***sample(self): 			// 이름은 test***로 시작해야한다.

    		temp = True

    		self.assertIs(temp, True)	// 두 인자 같은지 비교

    다시 빌드하고

    python manage.py test user_order	//디비를 만들고 테스트까지 진행해서 결과 보여줌.

⇒  이제 YAML'에서 테스트 명령어만 넣어주면 된다! 결과값과 출력값을 업로드하고 분기점 관리하면 디플로이 과정에 테스트가 들어가게 된다.



CodeBeanStalk 콩줄기, EB, (free for aws resource)

* ECS, EC2로 배포할때 번거로움을 대신 해줌. 백단에서 fargate 또는 인스턴스를 컨트롤 해줌.

* 사용

~/eb-flask$ eb init ~~p python~~3.7 flask~~tutorial -~~region us~~east~~2

~/eb~~flask$ eb create flask~~env

~/eb-flask$ eb open

~/eb~~flask$ eb terminate flask~~env

~/eb-flask$ eb deploy



* 생성시 선택가능 항목

	* 웹서버 환경, 앱 이름, 플랫폼 선택(파이선 버전), 어플리케이션(샘플,코드업로드)

* 바로 배포 가능. 간단해 보이지만 뒤에선 EC2와 보안그룹이 돌고 있다.

* 파이선은 안되지만 JAVA는 WAR 파일로 배포가능함

* 배포 과정

	0. EC2생성

	1. apt update, python3 설치,  export PATH=$PATH:*opt/aws/eb/linux/python2.7*

	2. export PATH=~*.local*bin:$PATH

	3. curl ~~O  [http:*/bootstrap.pypa.io/get-pip.py](http://bootstrap.pypa.io*get~~pip.py) 

	4. pip3 install awsebcli ~~-upgrade -~~user // awscli 도 설치

	5. awscli configure

	6. 처음에는 느리지만 적응되면 EC2에 직접 배포하는것 보다 빨라진다.

	7. 가상환경 만들기 install virtualev

	8. virtualenv ~/eb-virt

	9. source ~*eb-virt/bin*activate

	10. pip install django==2.2

	11. django-admin startproject ebdjango

	12. cd ebdjango

	13. pip freeze > requirements.txt

	14. mkdir .ebxtensions & cd .eb

	15. vi django.config

		1. option settings:

  aws:elasticbeanstalk:container:python:

  WSGIPath: ebdjango.wsgi:application

  /public: *public  /*왼쪽으로 접근하면 오른쪽으로 처리한다.

	0. vi setting.py & allowed_hosts = "*"

	1. cd .. & deactivate  // 가상환경 exit

	2. eb init ~~p python~~3.6 django-tutorial  // 배포할 EB환경을 생성한다. 이게 거의 80%

	3. eb init

	4. eb create django1-env // 환경을 셋팅. 이제 ctrl + c 해서 나가도 실행은 됨. 로그를 보면 SG가 만들어지는것도 보인다.

	5. eb status

	6. eb deploy  // 결과값에 보이는 cname 이 서비스되는 서비스 (eb open로도 다시 배포 가능?)

	

### Code pipeline (Code build + Code deploy)

* 젠킨스는 AWS에서도 쓸 수 있지만 서클 CI는 안됨

0. 생성 - 이름, 서비스역할 (새, 기존), 아티팩트 스토어 사용자지정위치, 

1. 소스공급자 지정 ( 모든 트리거는 repository 의 역할 ), 깃헙도 되고 S3, ECR도 가능

	1. 레포지터리 선택

	2. 브랜치 선택

	3. 변경감지옵션 (웹후크: 변경시 먼저 해달라고 요청함, AWS CodePiepline 얜 스스로 감시함)

	4. 빌드스테이지 추가 (빌드 절차가 담긴 build.yaml 업로드)

	5. 배포스테이지 추가 (배포공급자- beanstalk, 리전, 앱 이름, 환경이름)

2. 이제 소스를 끌고 오는 등의 절차가 시작된다. 

3. 이제 커밋만 하면 알아서 배포까지 진행! 



### 서버리스 아키텍트

* 개요

	* 마이크로 서비스의 철학은 쓸만하지만, 서버리스는 약간 의문이다. 잘못쓰면 실이 더 많을때도 있다. 

	* 여러 종류가 있다. 추상화된 서버를 빌려서 쓰는 형태. Lambda, Goole Firebase

	* 장점: 확장에 유연, 장애처리 불필요, 개발에만 집중, 트래픽 변화에 유연

	* 단점: 비쌈, 느림(셋팅까지 0.8초) , 장기적 작업에 안맞음, 함수처리결과를 별도로 저장해야함.

적합한 시스템 

	* 쓰기 좋은 예제: 누스 분석 시스템, 가끔 발생하는 이벤트에만 동작하면 된다

* 종류

	* BaaS(backend as a service)

		* customizing 어려움, 엄청난 개발속도

	* FaaS(Function as a service)

		* 그냥 함수, 트리거되면 실행된다.

**Lambda**

	* 요금

		* 요청수, 실행시간 기준으로

		* 100만건, 40만초까지는 무료

		* 128MB, 1ms 마다 0.0000000..21 USD

* 개요

	* 람다의 트리거 소스 (S3, RDS, DynamoDB, API Gateway)

	* 15분 제한시간

	* 더욱더 독립적이기에 관리하기가 더 까다롭다 (에러가 어디서 났지? 어디서 끊어졌지?)

	* 실행할때 콘테이너가 만들어지고 패키지를 옮기고 이 과정을 콜드스타트(0.8초)

		* 10분정도 이내에 호출되면 웜스타트(no delay)

	* 따라서 B2C플로우 과정에는 사용하지 않는걸 추천한다.

	* 그냥 임의로 불러서 대기 시키는 방법이 있긴하지만 

	* 컨테이너 최대 갯수제한 (1000개), 넘어가면 대기를 하게 된다. 그래서 매우 주의해서 사용



## AWS***API***Gateway

* 요금

	* 프리티어 - 수신 API 100만개, 수신 HTTP 100만개, 메시지 100만개, 연결시간 7.5million

	* API 100만건당 1.23 달러 

		* [한유저가 하루에 접속해서 100번 호출한다고 하면.. 10만명이 사용한다면 12.3$ 한달 375$

	* API 단계별로 캐싱을 한다. 

		* 0.5g 하루 0.5$ 한달 15$ 

		* 1.6g 하루 1$ 한달 30$

		* 6.1g 하루  4.8$	한달 146$

* 대체 가능한 오픈소스: 크라켄D

* 서비스 개요

	****API를 손쉽게 생성, 게시, 유지관리, 모니터링 및 보안 유지할 수 있는 완전관리형 서비스*

	* 프론트에서 URL을 호출하는데 백엔드 호스트 주소가 변하게 되면 까다롭다. 그래서 그냥 무조건 게이트웨이로 가게하면 변경이 자유로워진다. 

		* gate*a → .com		gate*b → org  이렇게 라우팅 가능

	* 서비스의 구조가 자주 바뀔 수 있는 마이크로서비스의 경우 더 유용하다.

	* 람다를 트리거하기 위해선 필수

	* 제공 하는 서비스 대분류

		* HTTP API: 단순하고 싸고 빠르다.

		* REST API: 복잡하고 비싸고 느리다.

		* Web-socket API

* CORS 과정을 상세하게 컨트롤 할 수 있다.

	* Cross origin HTTP request

		* case 1) 다른 도메인에서 호출한다.  `http:*/fc.com 에서  http:/*fc.org를 호출한다?`

마이크로 서비스라면 이런걸 또 허용해야겠지(Standard 함수) ⇒  이런걸 허용하기 위한 인증작업을 CORS(cross origin resource sharing) 이라 한다. 

		* case 2) 다른 포트

		* case 3) 다른 프로토콜 http, https, ftp

	* 실제 호출 과정

		* 권한 체크 《클라이언트 → 서버》

			* 요청내용: OPTIONS

			* GET, Content~~Types, Authorization, x-api~~key

			* "난 너 URI 에 이런 타입으로 하고 싶어!"

		* 허용 《클라이언트 ← 서버》 

			**요청내용: Access Method : GET, POST  , Content~~type, Access-Control-Allow~~Origin:**

			**"GET, POST 된다. 내가 허용할 오리진은** 이다."

		* 실제 API콜 《클라이언트 → 서버》 

* Canary 배포

	* 버그관리

		* 일부 유저에게만 업데이트된 버전을 노출시켜 리스크를 관리

		* 유저가 카나리 버전과 구버전에 골고루 노출된다. 종속되진 않음.

		* 요구 사항을 통과하면 프로덕션 릴리즈로 승격

	* AB 테스트

		* e.g 배너사이즈를 여러가지로 노출시켜서 어떻게 반응하는지 보고 싶으면 kanary 배포 사용가능.

* 실습 

	* 목표: 경로를 생성하고 Lambda 와 연결

	* 우선 '경로' 생성 e.g) *shop*

		* method, URL path 입력

		* 『통합 연결』 

			* 통합대상: http URI, Lambda, Step function 등등 지원 

			* 여기서 람다에 연결



## AWS_Lambda

* 생성

	* 블루프린트, 함수 컨테이너, 리포지터리 찾아보기 여러가지 형태의 시작 템플릿 지원

	* 기본 패키지는 있지만, 없는것도 있다.

* 메인 화면의 기능

	* 수정 후 『Deploy』 을 눌를 때마다 lastest 버전 생성

* 동작특성

	* 여기서 표준입출력을 쓰면 로그의 Functions log 에 뜬다. 

	* 과금은 Build duration 기준

* 테스트 이벤트 구성

	* 이벤트 템플릿 : 호출할 인자를 사전에 구성, 여기서 설정하는 event → 함수의 event 인자

* 트리거

	* 여러가지 이벤트 소스를 설정할 수 있다. (여기선 API_Gateway 와 연결)

* 로그

	* 클라우드 와치에서는 람다함수의 업데이트 버전마다 로그를 관리하고 있다.

	* AWS X-ray 라는걸 쓰면 분석하기 좋다

* 권한

	* 함수에도 ARN 을 붙여서 액세스 통제를 할 수 있다.

* 버전관리

	* 『작업-새 버전 발행』 을 통해 버전을 생성한다.

	* 별칭 연결하여 prod로 들어오면 1로 실행하게끔 할 수 있다.

	* 가중치 기반 별칭: 버전별로 가중치 설정



### AWS***API***Gateway - (2) HTTP API 셋팅 실습

* 경로 포맷 

	* shop*{id} 			/* 패스 파라미터

		* 이게 요청되면 람다에서 받는 함수의 인자가 궁금해진다. 

⇒ jsonformatter 를 이용한다.

		*  [pathparameter.id](http://pathparameter.id)  항목

	* shop*1?filter=1	/* 쿼리 파라미터

		* queryStringParamerts.filter 항목



### API_Gateway - (3) REST API 셋팅 실습

* Canary 배포전 설정

	* 새 하위 리소스

		* shops

	* 메서드 생성

		* GET

			* Lamba 연결 이때 별칭(prod)으로 관리한다. 

			* canaryFunction:prod

		* 배포 스테이지 생성 (first)

			* 스테이지 변수 

				* name: prod_name

		* 배포 스테이지에 리소스를 배포한 것이다.

			* *first*shops

			* 이렇게 배포가 제일 앞에

* 람다 함수의 기능을 통해 Canary 실행

* 버전 1, 2가 있는 상태에서 별칭의 설정을

	* 1의 가중치를 10%

	* 2의 가중치를 90% 설정



### API_Gateway - (4) APIGW를 통해 카나리 실행

* Stage configure → 『canary』  생성

	* 셋팅

		* lambda: new, stable 존재

		* GW: 생성 → Lambda 함수 입력시 

lamdaFunction:${stageVariable.version}

		* 변수로 입력 그 후 CLI 에서 권한을 입력해줘야한다.

			* aws lambda add~~permission --function~~name … func:stable

			* aws lambda add~~permission --function~~name …  func:new

	* 스테이지 생성

		* 스테이지 변수 생성

			* version

				* stable

		* canary

			* 카나리 지정된 요청 배분율 10%

			* second로 지정된 요청 배분율 90%

				* canary 재정의 값은 new로 설정

		* GUI환경에서 람다로 하는게 퍼미션 과정이 없어서 좋다...



### API_Gateway - (5) CORS 관리

* 『활성화』 를 통해 정책을 덮어쓴다.

	* Allow Headers는 기본값 쓰면 되고

	* Origin 값이 주요한 변경 대상

* 통합 응답

	* 메서드 응답을 하기전 전처리

	* Options 를 호출하면 헤더, 메서드, 오리진 값을 돌려준다.

* 메서드 응답

	* 각 응답 상태에 대한 헤더 메서드 오리진 등등을 컨트롤 가능

* 이제 람다함수에는 headers: { 'Content-Type': ... , 'Origin': ... , '} 값을 작성해줘야 한다. 제대로 동작한다. 형식을 지키지 않으면 다 에러남.



## AWS_Lambda - (2) 동시성과 람다의 세부 기능

* 동시성 

	* 전략 A

		* 미리 컨테이너를 지정받아 할당하면 콜드스타트를 방지할 수 있다.

		* 2019년도에 도입된 기능, EC2보다 비쌀 수도 있음

	* 전략 B

		* 5분마다 한번씩 Trigger 시키기 (그냥 EC2 고려)

	* Coldstart의 시간을 결정하는 가장 중요한 요소는 lambda 함수 코드 사이즈 (특히 라이브러리)

	* 모든 API를 람다로 구현 해놓으면 1000개의 람다 컨테이너 한계가 올 수 도 있다.

		* 『Reserved concurrency』  설정을 통해 함수 별로 컨테이너 갯수를 컨트롤 할 수 있다.

* 버전관리와 Alias (별칭)

	* 버전에 대해 별칭을 달 수 있다. (포인터 처럼 동작) 

		* API 게이트 웨이에서 별칭을 호출하게끔 설정하고, 람다에선 별칭은 필요에 따라 매번 버전을 설정~

	* 버전 하나에 대해 두개의 별칭을 다는게 저번에 배운 기법

* 환경변수 설정

	* 민감 정보를 숨기기 위해 람다에 종속된 환경변수 설정관리

* Layers

	* 복잡성이 높은 함수를 쓴다고 하면 각 함수를 모두 라이브러리를 업로드 해줘야하는 문제가 생기고 용량도 커진다.

	* 똑같은 환경셋팅을 여러번하는 문제를 처리하기 위한게 Layers 하나의 레이어에 여러개의 함수가 연결하면 별도로 셋팅을 할 필요가 없다.

* Step function

	* 예를 들어, 업로드 , 저장, 사람이 관여하는 검수절차, 권한 오픈 등의 절차를 컨트롤, 꽤나 좋다! 시각화도 잘된다.

	* 이런 플로우 컨트롤에 의한 비즈니스 로직을 앱으로 직접 짜려면 피곤하다.

		* 각 서비스가 독립적이기 때문에 시각화도 가능하다.

* EFS (elastic file system)

	* 람다가 너무 독립적이기 때문에 필요한 파일 시스템

	* 각 함수는 512mb의 FS을 할당받는다. 너무 작고 휘발되.

	* 강제 stateless

	* 이걸 이제 state 관리하기 위해 EFS가 존재한다. 같은 파일시스템을 각 함수에 제공

	* 계산하고 파일을 쓰는 작업은 EC2에서 EFS에 진행하고 람다에선 읽는 구조로 하는걸 추천



#### Lambda - (3) 실습

* 버전 

	* 새 버전을 발행해도 항상 :latest 로 명칭된다.

	* 별칭은 버전에 대한 포인터 역할을 한다. << 중요!

* 『환경변수』 설정

	* 코드를 빠르게 재활용하려면 환경변수 관리는 필수

	* {secret:song} // 이렇게 넣고

```python 

import os

def lambda_function(e, c):

	print(os.getenv("secret"))

```

	* 프린트하면 나오고, 환경변수 메뉴에서도 보이잖아.. 제대로 하려면 IAM role 통해서 접근 통제하거나 KMS를 통해서 암호화된 값을 쓴다.

* Layers (계층) configure

	* summary 함수가 깔고 앉은 환경 

	* 20개의 함수에 대해 zip을 관리하는건 미쳤어 (.py + zip)

	* 실제 사용 과정

		* pip install requests 		// 이렇게 하면 기존 깔리는 경로에 설치

		pip install -t requests * // 현재 경로에 인스톨

이제 python 폴더에 들어가면 설치한 패키지가 보이고 이걸 ZIP 생성

	* 업로드하고 실행환경 파이선 선택

	* Add Layer

		* AWS 계층, 사용자 지정계층(zip)

		* import requests 하면 잘 동작하는걸 볼 수 있다.



### Lambda - (4) EFS 실습

* EFS (Elastic File System) 

	* Summary: 람다의 사용성을 올리기 위해 업데이트된 기술

		* Elastic Block Store는 EC2에 마운트되는거..

	* 『액세스 포인트』 설정

		* 별칭: Message

		* Root DIR : /message

		* 사용자 ID 및 그룹 : 1001, 권한 750

	* 네트워크에서 서브넷(+SG)을 설정하면 접근통제 관리

	* 권한 설정

		* 람다(함수) → 권한 → 역할 → allow VPC, allow EFS role 

		* 람다(함수) → VPC 및 SG 설정

	* Config → File system → Add params

		* EFS: first, 

		* 액세스 지점: Message, 

		* Mount: *mnt*msg

	* 실제 사용 예제

import fncntl

with opern(MSG***FILE***PATH, 'r') as msg_file:

msg.file.write(new_message+'\n')

	* EC2에서도 EFS접근 가능하다. 람다는 쓰기에 적합하지 않으니 쓰기는 EC2에서



## AWS***Step***Functions  

* 개요

	* 함수 arm 기준으로 스텝을 식별

* 셋팅

	* 디폴트 role이 있진 않아서 직접만들어야 한다.

	* IAM → 이름: StepFunctionRole / 붙이는 정책 AWSLamdaRole: 모든 기능에 allow 'w'

* 상태머신 (State Machine)

	* 시각적으로 설계, 코드로 워크플로 작성(이걸로 실습, JSON 코딩)

	* Type 별로 분기문 만들고 끝내는 플로우 예제

		* 'Choice', 'Pass',

```step

"Choices": [

{ variable: "$.type", "StringEquals": "first", "next": "lambdafunc1"},

{ variable: "$.type", "StringEquals": "second", "next": "lambdafunc2"}

]

```



```

* "lambdafunc1": {

  "Type": "Task",

  "Resource: "arn.....",

  "End": ture

}  …… 중략

```

* 권한 설정 → 기존역할 (StepFunctionRole)

* 상태 머신 시작 시키기

	* { "type": first }

	* 이제 플로우에서 함수의 흐름을 시각적으로 볼 수 있다.





## AWS_DynamoDB  - (1) 개념

* 등장배경

	* 데이터를 받기전 스키마를 설정

	* 데이터의 형태가 다양해 지면서 요구를 수용하기 어려움

	* 요즘엔 데이터 베이스 때문에 투자받는다. 그래서 뭐든 저장한다. 나중에 필요해지면 그때 가공하면 된다. 

	* 애널리틱스 앱을 가동시켜 정보를 수집한다.

	* S3 → Redshift → AWS Athena → AWS SageMaker

일단 저장하고 필요할때 꺼내서 분석

	* 비슷한 서비스로는 MongoDB (그래서 그때 @Jun이 컴포지션 인덱스를 물어본거구만)

* 특징

	* PK로 찾을때 빠른 쿼리 속도, 확장유연, AutoScaling, RDS보다 쌈, S3가 제일싸고. 형식의 자유에 반비례하는 가격, JOIN  및 Transaction 불가능, 필터링은 가능하나 느리다. 

	* 액세스 패턴을 잘 알때 이상적인 서비스(PK키 성능이 좋으니)

		* 예를들어 PK로 해놓은 주문번호가 아니라 지역으로 찾아야한다면 느려지겠지

* DB Components

	* Table

	* Item (≈ row) 컬럼 제약이 심하지 않다.

	* Attribute (key/value 로 구성된 컬렉션) 자유롭게 쓰면 됨

	* index 굉장히 중요하다.

		* Partition Key

		* Sort Key

		* Primary Key (Partition + Sort)

		* GSI(Global secondary Index) - 필터링 해야할 필요가 있는 항목에 설정하여 attribute 에서 사용하지 않도록 유도. 비유연성을 해소

	* index에 지정한 컬럼들은 필수

		* 예를 들어 오더아이디가 2개가 들어온다 치자.  똑같은 오더에 대해 반품 등 요청에 의해 똑같은 키가 사용되면 sort키를 활용한다. 두키의 결합은 UNIQ 해야함. "파티션에 들어가서 Sort key로 찾는다."



### DynamoDB - (2) 실습

* 테이블 생성 practice 

	* 테이블 이름, 파티션 키:OrderID, 정렬 키:date

	* 온디맨드, 프로비저닝 (프로비저닝은 미리 할당, 트래픽이 예상 가능할때 써야한다)

	* 읽기용량, 쓰기용량(목표 사용률을 넘기면 확장) 보통 읽기를 AutoScailing

	* 보조인덱스로 쓰고 싶은게 있으면 GSI 사용 (나중에 등록가능)

	* CMK도 필요에 따라 아마존에 매니지를 넘기거나 직접 컨트롤 가능

* 개요, 인덱스, 모니터링, 글로벌 테이블, 백업, 

	* 모니터링 설정하려면 CloudWatch에 권한주기

* 『항목생성』 방법은 두가지

	* JSON 형식

		* "s" → 스트링이란 뜻

	* 양식형식도 가능

* 탐색

	* 『스캔』 탐색, 웹 GUI에서도 왠만한건 다된다. 『쿼리』

	* 파이선으로 하게되면 boto3 패키지로 컨트롤

		* 파이선으로 하게 되면 코드로 컨테이너 객체를 생성해내는 과정이 있어서 내용이 길어진다.

* in Lambda by javascript

	* at first Allow DB access to Function(arm)

	* in Lam function

```javascript

const AWS = require('aws-sdk')

const ddb = new AWS.DynamoDB.Dcounment({'region':'asis'})

export.handler = asyn (event, context, callback) => {

  const requireId = context.awsRequestId;

}

await createMessage(requireId).then(()=>{

  callback(null, {

    statusCode: 201,

    body: '',

    heders: {

     ...}

  });

}).catch((err) =>{

  console.log(err)

})

});

// 오랜만에 하니까 기억난다.. export 를 통해 미들웨어 로직을 추가하는것 처럼 사용한다 람다에선 js를 promise를 처리하고 콜백을 실행하면 끝!

function createMessage(reuqestId){

  const params= {

    Tablename: 'Oders',

       Item: {

         'OrderId': requestId,

         'Date': '20110101'

       }

}

return ddb.put(params).promise();

```

* in Lambda by Python

	* pip install boto3

	* 대충 이건 해봐서 잘 알아



## AWS-SAM AWS Serverless Application Model

* 개요

	* 서버리스 개발을 위해 필요 한 기능들을 코드로 관리

	* Lambda 콘솔에서 하던 일들을 CLI 환경에서 체계화

	* 배포할때는 CLI, SAM Install, Docker 를 쓸 수도 있지만 자체 기능으로 배포!

	* 서버리스 개발할때는 집중적으로 쓰게될 서비스

* 실습

	* sam init

		* SELECT zip or Image

		* zip을 이용하면 타입과 샘플 코드 선택

		* 여기서 신경써야 할것은 template.yaml

			* 람다 함수를 만드는 define 이 들어있음

	* sam build

		* 배포 가능한 형태로 소스를 빌드하고 Staging폴더 (여기선 /build )에 복사함.

	* sam deploy --guided

		* 필요한 롤등 모두 실행되고 생성되고 서비스 되는 부분까지 다 출력됨.





_____________________________________________________________



# 《PART 4》

## CHAPTER 1 소개 및 설치

### 챕터 개요 - (1) 코드를 통한 인프라 관리 (IaC)

* 형상관리툴은 OS 내부에서 환경을 셋팅하기 위한게 태초의 의도였으나 기능이 확장되어서 인프라 관리 툴들과 겹치게 됨.

* 테라폼은 인프라 문제를 가장 잘 해결할 수 있다.

* IaC 목적

	* a. infrastructure Templating

b. Manage infra

c. install app and one time config

d. Deploy config and changes post install

* 장점과 방법

	* 휴먼 에러 방지, 재사용성, 일관성

	* 버전관리 시스템과 융합 → 코드리뷰, 변경내용추적, 버전관리, 협업

	* declarative config/ Imperative config

		* 1) 원하는 상태를 정의

		* 2) 순차적으로 명령어를 수행



IaC Infrastructure as Code

ARM Temlplate, Terraform, Pulumi, CludFormation



형상관리 Configuration Management

* 필요한 소프트웨어를 설치하고 설정으로 관리

	* Ansible, Puppet, Chef, Salt Stack



이미지 빌드

* EC2, Virtual Box, Docker에서 사용가능한 머신 이미지를 빌드하는것

* Packer, AWS EC2 Image builder(AMI 전용)



설치

사전 빌드된 걸 받는 설치방법

받아서 직접 코드를 빌드하는 HomeBrew



## CHAPTER 2 테라폼을  이용한 인프라 관리

@Terraform_v1.2 [*Users/kth/document*학습자료 참고]

* 워크스페이스간 동일한 패키지가 설치되는 문제를 컨트롤하기 위해 plugin-cache 를 설정 (중복을 피할 수 있음) ~/.terraform.c

* 개요

	* Write → Plan → Apply

	* HCL 사용

	* provider agnostic : 프로바이더로부터 의존적이지 않다. 이걸로 AWS 코드가 다른 프로바이더에 적용된단 말은 아니고 작성은 할 수 있단거지

* Registry Doc 매일 보게 될 문서 (Provider가 제공하는 문법 + Module)

	* Module 만약 한 EC2를 openVpn 서버로 사용하게 된다면 이 안에 SG, EBS 볼륨.. 다 들어가겠지 이걸 만들때마다 정의하면 피곤하니까 그룹핑해서 하나로 만들어놓음. 재사용높임

	* 어떤 인풋과 아웃풋, 어떤 리소스를 가지는지 문서에서 확인가능

* Terraform Document

	* 여기도 자주 봐야해!‼ (configure lang)

	* 협업을 하게된다면 PR을 할때 plan 결과를 코멘트를 달아주도록 설정 가능

* Terraform Cloud (≈Atlantis)

	* comment 대신 『Action Check』 뷰가 생김. 코멘트하고 승인하고 Apply 과정을 팀과 협력으로 가능 

* 개념

	* 워크스페이스: 인프라를 관리하기 위한 프로젝트의 단위

		* 처음엔 하나 였다가 기업의 서비스가 복잡해지면 워크스페이스를 쪼개서 하게 된다. 

		* 변경사항을 추적하기 위해 상태(state)를 관리 (e.g tfstatus)

			* 워크스페이스가 상태의 단위

### 실습

	* lock.hcl 

		* 디펜던시 락시키는 용도, 협업시 유용

	* terraform.tfstate

		* 로컬에서 관리되는 테라폼 상태파일

		* 이걸 이용해 메인.tf 를 비교함

	* resource

		* data "local_file" "bar" // 리소를스 읽고

		* data "" // 리소스를 출력한다. EOT 파일 입력 시작 끝

	* aws set get~~caller~~identity

		* 인증 설정 확인

	* 《replaced》 상태 → 파괴하고 다시 생성됨

		* 아무 생각없이 적용하면 큰일난다.

		* 옛날에 kkj 님 생각나네 ㅋㅋ

	* data "aws_vpcs" "this" {}  // 해당 리전의 vpc 리스트를 가져온다.

output "vpcs" { value: data.aws_vpcs.this } // 출력

	* 『terraform destroy』

	* SUMMARY

		* 정의 → 플랜 → 적용

		* 플랜에서는 각 단계에서 나오는 diff 메시지와 destroy 항목을 볼 수 있다.


---

## HCL 기초문법

* 가장 기초가 되는 구조

```

<BLOCK TYPE> "<BLOCK LABEL>" ... { // 레이블은 0개 이상이다. 각 블록마다 다르다.

	 ARGUMENT = "VALUE"

}

```

	* .tf  또는 .tf.json 형식으로 이름을 짓고 사용한다.

	* tf 명령어는 cwd만 pasing 한다. (not nested 하게 실행되지 않는다.)

	* 운영체제마다 개행이 다르다. LF / CR+LF

* Directory, Modules

	* root module / child module 로 구분할 수 있다.

	* a*b/c 중 a가 b*c를 가져온다고 할때 a가 루트가 되고 b/c는 차일드가 된다.

* Naming and comment

	* 네이밍 규칙	: `알파뱃, 숫자(첫글자X), 언더스코어, 하이픈`

	**주석 규칙		: `#text, //text, /**text*/`

* Style Conventions

	* 값이 너무 길땐 Args 를 논리적으로 묶고 공백 개행으로 Args를 구분한다.

	* meta-args

		* counter, foreach ⇒ Head 에 주석해서 설명

		* lifecycle ⇒ tail 에 주석을 한다.

	* 『tf fmt <target>』

		* 컨벤션 포맷팅

		* -diff : 변경 내용 출력

	* BLCOK 의 종류

		* tf, locals, Resource, Var, Module, Data, Output 



### HCL, resource 와 data

* 기본구조

```terraform

provider "aws" { resion = "north-east-2" }

resource "aws_instance" "my_unbuntu"{

  ami = "ami-id..."

  instance_type = "t2.micro"



  tags = {

    Name = "FC-ubuntu:"

  }

}  // Create EC2 instance by ami

```

* 데이터 쿼리

```terraform

data "aws_ami" "ubntu" { //캐노니칼 직접 생산자 지정

  most_recent = true

  filter {

    name ="name"

    values = ["..... ubuntu-focal-20.04-amd64-server-*"]

  }

  owner = ["123133"] //canonical

} 

resource "aws_instance" "my_unbuntu"{ //가지고 온 정보 적용

  ami = "data.aws_ami.ubuntu.ami_id"

  instance_type = "t2.micro"

}

```

### HCL Module

* Github에 네트워크 등 서비스 분류별 리포지터리를 관리중

* 각 레포지터리에도 사용방법이 소개중이지만, TF doc에도 동시에 업데이트 중

* 로컬에서 임포트하든, 리포지터리를 쓰든 자유

* 실습코드

```terraform

module "vpv" {

  source  = "tedilabs/network/aws//modules/vpc"

  version = "0.24.0"



  name                  = "fastcampus"

  cidr_block            = "10.0.0.0/16"

}

module "subnet_group__public" { name = "${module.vpc.name}-public" vpc_id = module.vpc.id 

subnets = {

    "${module.vpc.name}-public-001/az1" = {  ...  }

    "${module.vpc.name}-public-002/az2" = {  ...  }

}

// 리터럴 처리를 할때만 "${}" 나머지는 그냥 자연스레 기술하면된다.

module "route_table__public" { 

  ipv4_routes = [{

      cidr_block = "0.0.0.0/0"

      gateway_id = module.vpc.internet_gateway_id

    }]

}

// tedilabs-aws-network 리포지터리에 보면 실제로 어떻게 정의를 해놓았는지 볼 수 있다. 재사용 가능하게 인터페이스화 한것이 다르다. 나중에 배움

```



## **HCL VAR & INPUT & OUTPUT**

* 변수를 통해 프로그래밍적으로 자원을 컨트롤 

	* `variable "vpc_name" {} `

* 변수 선언 기본값을 지정하지 않으면 apply에 입력받음.

* 참조할땐 → `var.vpc_name`

* Variable Definition Precedence (우선순위)

	1. OS***Env. TF***VAR***[NAME] (e.g TF***VAR***vpc***name="test")

	2. terraform.tfvars

```.tfvars

vpc_name="fastCampus"

unset TF_VAR_vpc_name

```

	3. terraform.tfvars.json

	4. '*.auto.tfvars' 

	5. ~~var // -var~~file

`tf apply ~~var~~file=test.tfvars`

⇒  사용할 변수파일 지정

`tf apply -var="vpc_name=fastcampus"`

⇒ 직접 변수 입력

* local value 

	* 같은 코드가 중복으로 쓰일때 활용해라.

```terraform

locals {	//선언후

  common_tags = {

    Project = "net"

    Owner = "me"

  }

} 

resource {	// 체계적으로 관리

 tags = local.common_tags

}

``` 



* output

	* description : 인프라의 문서화에 사용, 실질 작용 X

```terraform

output "vpc_name" { //참조

  value = module.vpc.cidr_block

}



output "vpc_name" { //통째로 출력 가능

  value = module.vpc

}



output "suibnet_groups" { //묶어서 출력

  value = {

    pub = module.subnet_pub

    pub = module.subnet_pri

  }

}

```



## HCL - count, for_each

* COUNT - resource, data, module 대상으로 사용가능

```terraform

resource "iam-user" "count" {

  count = 10 //meta arg. 제일 먼저 쓰는게 컨벤션

  name = "count-user-${count.index}

}

// output에서 활용할 수도 있다.

output { // *은 전체유저를 칭함

  value = aws_iam_user.count.*.arn

}

```



* for_each

```terraform

for_each = toset ([ //형변환 함수 toset

  "user-1", "user-2"

]) 

// 이걸 순회하고 있을때 'key' 'value 키워드를 for_each가 사용중인 인자를 호출가능

output {

  values = values(user.for_each_set).*.arn //count와 동일함.

  values = keys(...*...) //키값만 불러옴

}

resource {

  for_each = { // alice가 키, 오른쪽이 밸류 

    alice = { level= "low", manager="g1"}

  }

}

``` 

* 주의사항

	* `count` 는 리스트 형식(1~~2-3-4~~5)으로 데이터를 관리한다.

		* 수시로 리스트가 변하니 관리하기 까다로움 

	* `for_each`는 키 밸류 형식으로 관리함. (파이선의 SET을 생각해라, 중복키 안됨)

* tf state list

	* 상태값 저장해놓은거 조회



### HCL - conditional expression

```terraform

locals { //기본적인 사용법

  meg = var.is_john ? "hi john" : "hello"

}

resoruce "aws_vpc" "this" { 

  cidr_block = "10.0.0.0/16" 

}

resource "aws_internet_gw" "this" { // 1일 때만 GW 생성

  count = var.internet_gw_enalbed ? 1 : 0 

  

  vpc_id = aws_vpc.this.id

}

``` 



### HCL - for expression

```terraform

//리스트의 경우

[for i , v in var.list : "${i} is ${v}"]

//맵의 경우

{ for s in var.list s => upper(s) }

// 익스프레스 할때 Key => Value(출력) 의 구조로 약속해놓았다.

// s = ["a", "b", "c"], 출력: "a"="A","b"="B"



// 필터링의 경우

for s in var.list : upper(s) if s != ""]

// var.list = ["a", "", "c"] 결과 "a" "c"



//실제 사용

variable "users" {

  type = list(any)

}

resource "aws_iam_user" "this" {

  for user in var.users {

  user.name => user 			//user.name 은 키, user는 밸류

  } 

  user = each.key

  groups = each.value.is_dev ? [aws_iam_group.dev.name, aws_iam_group.employee.name] : ,[aws_iam_group.employee.name]

}

```  



### HCL - Backend (stage Storage)

* Local State / Remote State

* Backend(State Storage)의 종류는 다양. 로컬, 리모트(Terraform Cloud), S3(with/without DynamoDB) , 쿠버네티스, 콘솔

	* Locking 제공 여부가 중요하다. 여러 작업자간 작업충돌을 방지해야함.

	* 동시에 작업을 하더라도 한명에게만 실행권한을 가지도록 제어처리.

	* DynamoDB로 하면 락지원

* S3

	* 백엔드 설정을 해놓고 init 하면 로컬 스테이트의 copy 여부를 묻는다.

* 클라우드

	* ~/.terraformrc

	* tf login

	* local execute 하도록 setting 변경 (클라우드)



### HCL - 상태관리 『state』

* list

	* 워크스페이스에서 관리중인 리소스가 나온다. 클라우드 저장소를 쓰면 느림

* mv

	* 테라폼 코드를 리팩토링 할때 자주 씀.

	* apply시 라벨이 바뀌면 파괴 후 다시 생성한다. 이건 장애 원인이기 때문에

```shell

tf state mv 'aws_iam_group.dev' 'aws_iam_gorup.this["dev"]'

Succesfuly moved 1 object(s).

```

* rm

	* 일단 만들었지만 테라폼으로 더 이상 관리를 원하지 않을때 사용, 예를 들어 권한관리를 다른 super_acl을 사용하고 싶을때 쓰는 명령어

	* 코드를 바로 지우면 apply할때 해당 리소스를 destroy함

`terrafirn state rm 'aws***iam***user_policy,dev["alice"]'`

하면 state 에서 해당 유저가 빠지고 지운 코드를 apply 해도 destroy 가 이뤄지지 않음. 

* pull

	* work space 를 쪼개는 작업을 할때 필요함. 아웃풋을 저장!

` tf pull > a.tfstate `

* push

	* 상태를 덮어쓰는 것이기 때문에 굉장히 주의해서 사용

* show : 특정 리소의 상태를 조회

* replace-provider : Provider가 큰 변경이 있을떄 사용



### HCL - 특정 리소스 강제 변경 

* taint ( mark fuction )

`tf taint [PATH]`

> Resource [PATH] has been marked as tainted

> [PATH] is tainted, so must be replaced

* 교체에 따라 이걸 의존하고 있는 자원들 예를 들어 이 경우는 라우팅테이블이겠지. 도 교체 되는걸 알아야함.

* untaint

	*  canceling taint 

* replace

`tf apply replace=[PATH]`

	* taint가 좋다. 여러개를 할때는



### HCL - 워크스페이스관리

* 코드프로젝트 / tf 스페이스 "a" "b" "c"

	* 스테이징 단계에 따라 사용하기 전략

	* dev, stg, prd 를 복붙으로 관리하면 부담증가

		* 코드와 데이터를 분리해라! ⇒ 즉 데이터는 vars로

	* kr, jp, us 를 복붙으로 관리하면 부담증가

* tf workspace -h

	* list → 별표가 cw

	* show → 현재 사용중인 워크스페이스 확인

	* new → 생성

	* delete

	* select 사용 중인 워크스페이스 변경

* 이 기능을 쓰기 시작하면 『terraform.tfstate.d』 에서 각 워크 스페이스에 따른 상태를 관리하기 시작함

```shell

tf select dev

tf terraform apply -var-file=dev.tfvars

// stg, prod 각각 tfvars를 구성하면 같은 코드로 다른 인프라를 구성할 수 있다.

// 각각 다른 tf워크스페이스를 가지는것은 물론 각각 AWS에 자원들이 생성되는걸 볼 수 있다.

```

* 테라폼 클라우드를 쓸때는 상태값이 조금 다르게 동작한다. (주의! 문서 읽어보고 쓰면됨)



### 테라폼 클라우드, 아틀란티스

* 『Registry』 

	* 모두가 저장할 수 있는 Public 저장소

	* 내가 설정한 vcs를 레폼 모듈로 등록할 수 있다.

	* 깃헙의 PR을 할때 깃헙 action 체크를 통해 플랜결과를 확인할 수 있다.

* 『Workspaces』

	* 조직 전용 저장소

* 요금제

	* 프리로도 5명까지, 협동툴, 무제한용량, 유료버전 트라얼 1달

	* 팀

		* 팀, 롤 매니지먼트

	* 팀 앤 거버너

		* 회사의 정책 적용

		* workspace estimation

	* 비지니스

		* Agents, SSO

* Execution Mode

	* 어디에서 실행하느냐의 이슈

	* local → 상태저장만 클라우드가 함

	* remote → 테라아폼 클라우드 인프라에 tf runner 에게 작업을 시킴

		* 만약 인트라넷 유저라면 리모트를 쓰기가 힘들다. 클라우드에 접근을 해야하니

		* 장점

			* apply 유무, 버전, 워킹 디렉토리

			* Variable TAB에서 변수를 웹에서 등록해서 관리 private값은 숨기기 가능

			* 환경변수 설정가능

		* 스트리밍 방식으로 결과를 내려준다.

* Run trigger

	* 워크스페이스 간 실행순서 a > b > d > c 이런 시퀀스를 보장하고 싶을때 어플라이를 해줄 필요가 있다면 이걸 쓰면 쉽게 가능

* 아틀란티스

	* VCS 에서 PR할때 워크플로우에서 atlantis plan 코멘트로 플랜을 하고 atlantis apply 라고 코멘트에 써서 적용하고 코웍을 편하게



### Terraform 모듈 작성법

* 모듈의 위치는 내가 정의한것일수도 정의된 표준 모델 일수도 있다.

* 기본 원칙은 Clear organization & DRY(don't repeat yourself)

	* 리소스간 명확히 구분하고 캡슐화를 통해 분리해라

	* 다시 정의하지 마라. 같은 리소스를 두번 이상 쓰지마라.

	* 모듈의 단위의 근거

		* 함께 생성할 인프라를 하나의 모듈로

		* 권한 범위 내에서 정의

		* 인프라의 생명 주기에 따라 분리

* tree

	* 구성 `readme.md mian.tf outputs.tf variables.tf versions.tf` 

	* account alias, aws id가 기억하기 힘든 숫자라서 별도로 부여

* 모듈의 핵심

* 재사용 가능성을 높히려면 output이 중요하다.

* source로 로컬 모듈을 들고와도 외부 링크를 써도 된다.

* 모듈이 설정한 아웃풋만 쓸 수 있따.

* 모듈을 래핑하는 모듈을 작성할 수 있다. 대신 이렇게 쓰면 점점 문제를 추적하기 힘들다.



### Terraform 리모트 스테이트 사용

* 하시코프에서 만든 '리모트 스테이트' 프로바이더

* 복수의 워크스페이스가 생기고 Ws마다 의존성이 생기게 된다. 그걸 처리하기 위한 remote_state (상태파일을 참고)

* 의존성을 설정할 main.tf 에서 설정한다.

```terraform

data "terraform_remote_state" "network" {

  backend = "local"

  

  config = {

    path = ${path.module}/../network/terraform.tfstate"

  }

}

``` 



* 참조를 위한 outputs 설정

```terraform

locals { 	//일단 로컬 이름로 레퍼런스 해주고

  vpc_name      = data.terraform_remote_state.network.outputs.vpc_name

  subnet_groups = data.terraform_remote_state.network.outputs.subnet_groups

} 

local.subnet_groups["public"].ids[0]

// 실제로 값을 쓸땐 로컬로 쓰면 깔끔해진다.

``` 



### Terraform 워크스페이스 디렉토리 전략

* 코드는 길어지고 협업은 해야하고 전략을 짜야한다. // 예제 파일은 apply는 안됨

* 각 리소스들을 종류별로 .tf를 생성

* 중요한건 variable.tf → config.yaml 참조

* terraform.tf (백엔드 설정)

```

context = yamldecode(file(var.config_file).context  // yaml을 읽고 값을 들고 온다.

config = yamldecode(templatefile(....)

```

* versions.tf config.yaml

* remote-state.tf

	* 다양한 워크스페이스를 쓸떄 중요해! foreach를 통해 yaml에서 정의한 리모트 정보들을 한번에 로딩한다.

* 테라폼 버전을 필요에 따라 바꿀 필요가 있다. 이를 위한 'TF switch' , 'TF env'

	* 설치를 하면 .version 을 읽고 알아서 해줌. 



### Terraform 프로비저너와 EC2 userdata 속성

소스:  `*hashicorp*aws`

EC2 유저 데이터, 부팅시점에 사용자 생성 설치 등등 AMI에서 사용함.

```bash

user_data = <<EOT 		// multi-line stream, 히어 도큐먼트!

#!/bin/bash

sudo apt-get update

sudo apt-get install -y nginx

EOT

```

* 프로비저너 → 첫 리소스 생성 시점에 실행 

* file : 로컬에서 리모트 파일복사

* local_exec  로컬피시에서 명령어 수행

* remote_exec 리모트 머신에서 명령어 수행

	* ssh, win_rm

```terraform

 provisioner "remote-exec" {

    inline = [

      "sudo apt-get update",

	"sudo apt-get install -y nginx",]

    connection { ssh 정보}

}

``` 

*  apply 시 provisioner를 사용했을땐 터미널에 아웃풋을 출력해준다 (AMI 에서 제공하는거 쓰면 안보임) 

* 주의사항 

	* 유저데이터 값은 처음 인스턴스를 생성할때에 사용한다.

	* 따라서 값을 수정하면 apply 시 replace 되버린다.

	* `self.public_ip` // 부모 리소스를 가르킴

* 트리키한 팁

	* null resource

		* trigger 안에 filemd5 로 해시값을 생성하는데 할당한 값이 바뀌면 리플레이스 대상이 된다.

		* 이제 트리거를 일으키고 apply하면

		* null resource 가 다시 적용한다.

		* 많이 쓰겠는데 이거?



### AWS VPC _ OPEN VPN 구성

1. 네트워크 tf 작성 - vpc, subnet

2. EC2 tf 작성 - public →  openvpn, private → ec2

	1. 사용자가 오픈VPN접속하고 ec2 를 사용하는 것이 목표

	2. SG엔 ingress 1194를 추가해준다.

```terraform

locals {

  // 첫번째 인자로 유저데이터 모듈

  // 두번째 인자(컨텐스트)로는 파일에서 사용할 변수를 줬다.

  openvpn_userdata = templatefile("${path.module}/files.openvpn-userdata.sh, 

    {

      vpc_cidr = local.vpc.cidr_block

      public_ip = aws_eip.openvpn.public_ip

    }

  }

``` 

3. 이제 userdata.sh를 보면 뭘하는지 볼 수 있다. 

// 강사는 openvpn with LDAP 인증 컨테이너를 많이 썼다. 

// 1194 포트로 도커를 서비스 하고 "${public_ip}" 이렇게 변수를 사용했다. 

*/ ${split("*",  vpc_cidr)[0] 이렇게 테라폼 내장 함수도 사용가능

```terraform

resource "aws_eip_association" "openvpn" {

  instance_id =  [aws_instance.openvpn.id] 

  allocation_id =  [aws.eip.openvpn.id] 

} // 퍼블릭 아이피로 빌드하면 매번 아이피가 바뀌지만 aws.eip를 쓰면 매번 바뀌지 않고 계속 사용가능(현업에선 꼭 이걸로 하길 바람!)

``` 



4. 생성하고 public ec2 접속!

`cat var*log/cloud~~int~~output.log /* 생성직후엔 도커를 설치하는 서버 모습 을 볼 수 있다.`

5. sh 로 생성된 vpn config 파일을 실행하면 Tunnelblick 앱에서 연결을 해준다. 

	1. 이제 openvpn 으로 프라이빗 망에 연결

	2. 프라이빗 DNS 에서만 된다. `ip~~10-222-2~~6.ap.. internal`  이런 주소는 오직 내부망에서만 쿼리



# Packer v1.8 톺아보기!

* 패커는 머신 이미지를 코드로 생성하도록 도와줌. ≈ AWS AMI Builder 도 비슷한 역할을 한다. 다만 플랫폼 종속적

* Warmup 시간이 중요한 팩터인데 AMI는 시간이 짧다.

* 프로비전닝 기반으로 이 배포를 하면 Warmup 시간이 길어진다.

* Templates

	* HCL Template: 처음엔 JSON을 쓰다가 점점 HCL이 커져서 쓰게됨. (JSON Template)

* 실제 사용 과정

```shell

vi main.pkr.hcl

packer init .

packer build .

```



* EC2 생성 > Provisioning > STOP > AMI snapshot

	* 이 과정에서 임시 SG, SSH key페어도 생성한다. 이걸로 프로비저닝하는데 사용.

* 끝나면 Terminate - EC2, Temporary SG

* 패커는 상태관리를 하지 않는다. 삭제는 수동으로 한다.  

* build, source는 테라폼에 없는 블럭



### Packer Builder

* 빌더를 정의한다는 것은 어떤 머신의 이미지를 만들건지 디파인하는것. AWS Azure 등등..

* 테스트나 유틸리티 목적으로 사용하는 NULL 빌드

	* `communicator = "none"` 

	* 프로비저닝 할때 쓰는 통신방식 SSH, WINRM을 지정

* 빌드할때 소스의 실행순서는 보장되지 않는다.

	* build → name. null 이름에 pre-fix로 붙는다.

* source 키워드는 extend 역할을 한다. 

	* name 값을 주면 alias 보다 name 우선시 된다.

	* overwrite는 지원하지 않는다.

* provisioner 개별적인 스크립트 실행

* post-processor 

	* 빌드 후 후처리를 위한 모듈 → 이쪽은 실행순서를 보장한다.



### 선택적 빌드 (only, except)

```

packer build -only="null.two"

packer build -only="null.two", "null.one"

packer build -except="null.two", "null.one"

```

**그롭 명령어가 먹는다. -only="**.one"



### Packer's Provisioner

* Shell, File, Window, Breakpoint (사용자가 확인하기전까지 멈춤)

* Ansile, Chef, Puppet 등 CM도구도 지원

* 프로비저너 리소스는 실행순서가 보증된다.

	* tmp 폴더는 모든 유저가 접근가능



### DataSource

: 비교적 최근에 생긴 거라 지원하는 프로바이더가 적음

* AWS

	* Parameter Store

	* AMI

```packer

data "amazon-ami" "ubuntu" {} // 이렇게 사전에 정의해놓고

source "amazon-ebs" "" {

 source_ami = data.amazon-ami

} // 이렇게 해놓으면 ami 코드를 source 할때마다 적는걸 방지할 수 있다.

```

	* Secret Manager: 매니저에서 사용할 값을 정해놓고 프로바이더로 호출



### Post~~processor (후처리기) (~~s 복수형도 별도로 존재한다)

후처리기 플러그인

1. CheckSum

2. Compress

3. Manifest Post-Processor (빌드를 한 사실에 대해 명세파일)

4. Local Shell Post Processor (맘에 드는 프로세서가 없는 경우 직접 작성한 쉘을 실행)





issue - AMI 과정을 만드는 과정이 긴데 디버깅을 하려면 힘들다. 그래서 지원하는 방법들

1.  브레이크포인트

```

build { // 이렇게 하면 빌드 중 멈춘다. 터미널로 들어가서 커맨드를 내리면서 문제르 분석하면 된다.

  provisioner "breakpint"{

    disable = false

    note = "디버깅"

  }

}

```

 2. debug

`packer build -debug .`

	* 이렇게 실행하면 한단계식 실행한다. 

	* 여기서 실행 중에 pem파일이 생성되는게 보이는데 이 키로 해당 인스턴스에 접속하면 된다.

	* 보다가 죽었다! 하면 이제 쉘로 들어가서 syslog 든 뭐든 보면 된다.

	* 중간에 실행하다가 CTL+C를 하면 프로비전을 취소해준다.

AMI에서

AMI를



### Packer CLI 

* `packer fmt` 	코딩컨벤션 포맷팅

* `packer inspect` 	해당 템플릿이 어떤 구조로 되어있는지 청사진을 보여줌

* `packer validate .` 	코드 문법 체크

 



## Packer 마지막 실습 OpenVPN과 Grafana 구성

* 필수는 아니지만 현업처럼 버전 관리를 위해 tags 구성

```bash

cloud-init status --wait // 사용자 명령이 끝날때까지 대기

docker run

	--restart unless-stopped // 이런식으로 쓰면 EC2가 재시작해도 항상 실행을 유지 AMI 를 만들어도 자동으로 실행됨.

```



```diff
+ 168.254.169.254
```
 → EC2 meta data Server. 여기에 쿼리하면 다 줌.


`most_recent = true` → 그룹으로 끌고와서 가장 최근것을 사용

* openvpn 을 연결하고 나면 프라이빗 대역에 대한 dns 쿼리도 가능하다. (인터넷의 루트도메인의 포맷과 다른 주소)

* openvpn, Grafana 이미지를 만들고 tf로 네트워크 설정하고 인스턴스 올리고 실제로  vpn연결해서 서비스 사용해보고 그까지 했다!



## Ansible ver  6.0.0a1 PRE-RELEASE

1. 기본만 다루게 될것임 - 인벤토리, 애드훅, 플레이북, 모듈, 변수, 조건문 반복문, 임무, 실습

2. 훨씬 다양한 고급기능이 있으므로 공부할 게 많음



### 왜 서버 형상관리 인가?

* 운영체제에 필요한 소프트웨어 설치하고 설정으로 관리한는것. Configuration as Code

	* Code로 되면 GitOPS 이념 이행이 가능

	* 비슷한 툴 puppet, saltSTACK, Chef

	* Agentless 하게 동작 SSH로 통신

* 유즈케이스

	* 주요 기능으로 추천: Configuration Manage, Security Compliance 

	* 보조 기능으로서 사용을 추천 CD, Application Deployment, Provisioning



### 왜 앤서블인가?

* 쉘로 하는것을 멱등성을 지원하기 위해선 많은 조건문이 필요해진다. 

(각 명령어 실행전에 실행조건 확인하고 그에 따라 명령을 시행하는 한마디로 예외처리가 멱등성을 지원)

* 앤서블로 하면 YAML 문법으로도 리눅스서버를 컨트롤 할 수 있다. 멱등성을 보장하기에 여러번 실행해도 된다. 

* 여러 서버 대상으로 동시실행 할수 있다. 무엇보다 버전관리가 되는건 GitOPS 가능 



###  INVENTORY

* 타겟하는 서버 즉 호스트를 관리하는 파일. 그룹기능을 지원한다. 한 호스트가 여러 호스트에 속할 수도 있다. 서버의 속성, 네트워크 영역 또는 스테이징 단계로도 구분할 수도 있다.

* Static Inventory, Dynamic Inventory 두가지가 존재. 클라우드 상에선 정보가 계속 변하기 때문에 Dynamic Inv가 필요하나 오늘은 정적 인벤만 사용

* `name.inv` → 확장자는 컨벤션, IP와 도메인 모두 지원함

```amazon.inv

simple.inv

[amazon]

1.1.1.1

2.2.2.2

[ubuntu]

ec2-3-24-...

ec2-3-24-...

// all이라는 default 그룹이 존재한다.

```



```alias.inv

amazon1 anssible_host=1.1.1.1 // 이렇게 cn을 설정할 수 있다.

```



```vars.inv

amazon1 anssible_host=1.1.1.1 ansible_user-ubuntu

// SSH로 통신을 한다고 했는데 계정이 EC2-USER, ubuntu잖아 기본이 

// 이 옵션을 안주면 맥의 사용자 아이디로 접속을 시도한다. 그래서 입력해야함.

[linux:children]

amazon

ubuntu

// 이렇게 하위 그룹을 설정하면 amazon과 ubuntu 를 가지게 된다.

```





### Ad-hoc Command

* 플레이북 대신 바로 명령을 전달하는 방법

`ansible host-pattern ~~m module [~~a 'module option'] [-i inventory] ` 	

→ 이게 기본적인 사용법

`ansible -i amazon.inv -m ping all ~~u ec2~~user`

→ 쉘과 달리 순서가 중요하지가 않다. 이렇게 바로 접근을 위해선 ssh에이전트를 설치해놓거나  ssh-add ~~K [name.pem] 명령어를 통해 pem 교환을 해놔야한다. 또는 접속시 --private~~key [name.pem] 을 사용한다.

* 여기서 사용한 `-m ping`은 ICMP Ping과 다르다. 대상호스트에 연결 후 파이선 사용가능여부를 확인하는 모듈이다.



* Control node, Managed Node Concept

	* 실제로 명령을 실행하는 맥북이 컨트롤 노드

	* Managed Node는 명령이 실행되는 인스턴스를 칭함



```bash

ansible localhost -m setup >> ansible_facts // setup은 Facts를 수집하는 모듈이다. 굉장히 많은 정보가 수집된다. ansible_facts // 이 파일에 접근해서 참조가능`

--become // 사용자 전환을 위한 옵션(DF. ROOT)

```

// 실습내용 apt 명령어를 전달해 git설치하고 지우고 했음 



### Playbook (yaml)

 `syntax.yaml`

* 플레이가 모여있는 문서고 절차를 가지고 실행됨.

	* Play: 작업 목록(tasks), 특정 호스트 목록에 대해 수행

	* Task: 수행의 단위, 애드훅 하나하나가 작업이다.

	* Module: 핑 모듈, 셋업 모듈, 호출하게 되는 하나의 함수를 뜻함

	* Collection: 비슷한 모듈을 묶은 것

```install-nginx.yaml 

apt, service 모듈을 이용해 nginx를 설치 실행

command, yum, service 이렇게 서비스 설치 후 실행 



//사용방법

$ asible-playbook -i inventory install-nginx.yaml

```



* 실행내용

`changed`  → 변경사항이 있는걸 말한다.

`ok`  →  이미 실행됐다. 괜찮다!

* 리포지터리 활성화 하기 위해 썼던 command는 계속 실행되기 때문에 멱등성을 보장못한다. 별도로 처리하면 가능 →  :TODO 나중에 공부할 부분



### Module

: 사람들이 만들어놓은 많은 모듈이 존재한다.

****Collection index*

	* ansible.builtin - 효과적인 사용을 위한 기본. 이것만 봐도 절반은 하겠다!

* `"name=fastcampus shell=bin*bash"` 	/* 스페이스를 구분자로 속성을 줄 수도 있다.

****linefile 포맷*

```yaml

name:*  //resolve.conf에서 찾고 없으면 추가해라라는 뜻

  path: /etc/resolve.conf

  line: 'nameserver 8.8.8.8' 

// 이렇게 키밸류 형식으로 속성을 줄수도

```



****Freeform* //  프리폼은 이렇게 기술함.

`command : echo "hello world"`

****Ansible_POSIX* 

	* 리눅스의 rsync 를 앤서블에서 쓸 수 있게 해주는 모듈

```yaml

name:

syncronize:

  src: file/html/ 		// 로컬서버 설정

  dest: var/www/html		// 목표서버 설정

  checksum: true

  archieve: true

  recursive: true

  delete: true

```



## Handler

* 왜 핸들러가 필요한가? 핸들러는 이벤트 기반으로 동작하는 태스크이므로 작업간 종속성을 처리할때 활용할 수 있다.

* 특정 태스크가 실행될때 이벤트 publish 하면 구독중인 태스크가 실행됨. 

	* 실습에선 configure 파일을 수정하는 태스크가 실행될때 마지막에 재시작 Notify 퍼블리시 했다.

* 주의 사항, 

	* 이벤트를 여러번 일으켜도 동일 핸들러 는 한번만 실행된다.

	* 모든 핸들러는 플레이 내의 모든 작업이 끝난 후 실행된다.

	* 핸들러는 이벤트 호출 순서에 따라 실행되는게 아니라 핸들러 정의 순서에 따라 실행된다. 

* 예제

```yaml

tasks:

  - name: Install nginx

   apt: (중략)

  notify: 모듈로 이벤트를 만듬. 

   - Start Nginx

handler:

  - name: Restart Nginx

  service:

    name: nginx

    state: started

```



### Variable

: 파이선 기반이기 때문에 파이선의 예약어 사용금지. `async labda` 또 네이밍룰도 마찬가지

템플릿 언어로는 `Jinja2`를 사용한다. 총 22가지가 있다.  우선 순위는 DOC 확인

```vars.inv

user_name=posit0 user_comment="from inv:"

```



`ansible-playbook -i vars.inv playbook.yaml`	//  inv를 참조해 플레이북 실행



플레이북에도 직접 변수 지정 가능.

```playbook.yaml

vars:

  user_name: "posix0"

```



파일에서도 변수지정 가능 (vars_files 모듈)

```vars_files

user_name: "posix0" \n comment: "my comment"

```

 

`ansible-playbook -i playbook.yaml`  이렇게 실행



커맨드라인으로 주는법

`ansible-playbook -i playbook.yaml -e "user***comment=hello user***shell=*bin*sh"`

→ 우선 순위 제일 높음



이렇게 파일로 넘겨줄수도 있음.

`ansible-playbook -i playbook.yaml -e "@vars.yaml"`  



## Loop 반복문 사용법

```with.yaml

With <lookup> // lookup을 찾아서 속한 모듈을 3번을 실행함

group: "Create groups"

  name: "{{item}}"

  status: "present"

with_items:

- backend 

- frontend

- devops	// {{item}}은 각각 with_items들을 가르킨다. group 모듈이 3번 호출됐다!

```



**loop** // 이게 권장되는 문법

```loop.yaml

group: "Create a user"

  name: "{{item}}"

  status: "present"

loop:

- me 

- and

- u	// item이 각각 이 아이템들을 가르킨다. group 모듈이 3번 호출됐다!



vars:

  users:

    -me

    -and 		// 이렇게 정의를 해놓고

loop: "{{users}}:" 이렇게 호출

```



키밸류 형식으로 루프를 돌고 싶을땐



```dict.yaml

loop: "{{ tags | dict2item }}" 	// $$ exp | func 진자2의 함수 구현

vars:

  users:

    - name : john

    - shell: /bin/bash  //이렇게 key, value 정의를 해놓고

user:		// 실행. 하여 딕셔너리 이터레이터

  name: "{{item.name}}

  shell: "{{item.shell}}

  loop: "{{users}}"

```

****conclusion 이것 말고도 다양한 루프 사용방법이 있음* 이걸로 모잘라면 API 문서 참고



### Conditional 

: 조건문은 운영체제에 따라 다른 것을 하고 싶을때 주로 사용

**when**

```when.yaml

loop: {{users}}

when : item.enabled and (ansible_facts["distribution"] == "Amazon")

  // 팩츠가 아마존일때만 실행된다.



loop: [0,192,55,99]

when: // 이렇게 수직으로 리스트를 선언하면 and 연산으로 처리

- item >= 10

- item <= 100

// 이 경우 55, 99가 충족

```



`ansible_facts['distribution']=='Amazon'`	⇒  자주 쓰는 패턴(AMI is yum, 우분투 is apt)



```yaml

command: ""

register: users



debug:

  msg: "There is no claud"

when: users.stdout.find('claud') == -1

// 저장한 변수를 이렇게 참조하여 없음(-1) 이면 msg 출력

```



## Facts (상세)

* Facts를 수집하는게 기본이다. 수집안하게 하려면 `gather_facts:false`

	* 대규모 시스템의 경우 이게 성능에 문제가 될 수가 있다. 

	* 실험적 환경에서 앤서블사용을 준비할때도 꺼야한다. (테스트를 해야하니), 대부분 모듈은 파이선을 쓰고 컨테이너들은  파이선이 없는 경우가 많아서 false해놓고 command, shell 같이 파이선프리한 모듈로 파이선을 설치하는 과정이 선행. 

		* AMI에는 파이선이 있지만, 그 외의 컨테이너들은 대부분 없다.

`ansible localhost -m setup -a "fillter=anisible_distribution*" `

→ 빌트인 모듈, 팩츠를 직접 수집해온다. 

여기서 말하는 팩츠는 anisible 이 수집해온걸 말함



### AWS 메타데이터 상세

: EC2 메타데이터 팩트를 수집해보자 (setup 말고 다른 방법)

```

// collection.AWS 를 셋팅한다.

ansible - i default.inv ubuntu - m amazon.aws.ec2_metadata_facts

```

* 이렇게 해서 ec2에서 주는 네트워크 값들을 가져와서 참조하여 작업구성



* vpc 이름을 가져오기 위한 트릭. (raw 결가는 key가 너무 복잡하다)

```yaml

// (1) 방법

-name: "set vpc CIDR"

  set_fact : // 호스트 단위의 변수처럼 쓸 수 있다. dict2는 K-V Dict를 배열로 바꿈["key:v"]

    vpc_cidr: {{ansible_facts | dict2items | selectattr('key', 'match', '^ec2_network_interfaces_macs_.*_vpc_ip4_cidr_block$') |  map (attribute='value'))[0] }}"

// $는 표현식의 끝을 의미, map은 js의 map과 비슷. 조건문을 단 이터레이터, 파이프라인을 따라서 수집한 팩츠를 뽑아내는 중이다 



// (2) 방법

-name: "set vpc CIDR"

  set_fact:

    {{ vpc_cidr | ipaddr(2) | ipaddr("address") }} // ipaddr(2)는 해당 네트워크에서 두번째 인덱스의 호스트를 가지고 온다. 10.222.0.0/16 → 10.222.0.2/16 → 10.222.0.2 



// ipaddr("netmask") 도 가능 (255.255.0.0)

// ipaddr fillter는 주의할 사항이 있다. 파이선 라이브러리 netaddr이 필요함.

이렇게 긁어온 값을 메타데이터 지정해놓으면 저 긴 표현식 대신 간결한 키로 참조가능.

```



## 실습: TF, Pack, Ansible로 Openvpn, Grafana 구성

: 패커로 할때는 쉘 프로비저너로 했다. 패커의 Ansible Provision엔 (local, remote) 존재

	* Ansible Provision는 원격에서 프로비전 실행

	* Ansible local provisioner 는 해당 해당 서버에서 설치작업이 필요함



* TF + Ansible 통합을 생각해보자

	* TF 모듈엔 Ansible이 없어. Chef, habitat, puppet 과거에 지원하다가 지금은 deprecated됨..

	* remote-exec Provision은 Generic PRV으로 구현하자

	* 리모트 프로비전으로 앤서블 클라이언트를 설치하고 그 다음 local provisioner를 활용하는 구조로 구성



1. 일단 TF로 네트워크 구성

2. `ansible - initialize.yaml, playbook.yaml`  

파일에 대한 권한은 rwx. (700)



```yaml

provisioner "ansible" 		//이걸로 앤서블 설치를 하고 

provisioner "ansible-local"	//강사님은 이거 좋아함

// remote에 앤서블 플레이북을 복사하고 그걸 보고 실행하므로 차후 문제트래킹할때 편함.

```



초기화 과정

1. pip, python 설치

2. 로컬에서 playbook.yaml 를 가져와 실행한다.

3. task: 에서 그라파나, 도커 등등 설치

pip에서 'docker' 패키지를 설치해야 컨테이너를 anisible 로 컨트롤 가능하다.

4. yaml 내용

```yaml

canonical name

  restart_policy: 	always → 재시작 하더라도 실행을 보장하지 않는다.

				unless_stopped→ 항상 실행보장



state: "{{ openvpn_create_client_config | default(false) | ternary('stated', 'present')

// config값을 bool로 관리. ternary는 트루면 1번쨰 값, 반대면 2번째 값. present는 도커를 생성만 하고 실행하지 않는다.



docker_container_exec: // 도커 컨테이너에 대해 명령을 내리는 모듈

	container: openvpn

	container: show-client-config

    resister: result

    untill: 100 // 될때까지 한다.

    dealay: 10 // delay 10초로 100번 시도

```



```result.rc

'"END PRIVATE KEY" in result.stdout'

when: openvpn_create_client_config | default(false)

```

1. tf prv 할 때 AWS 제공한 userdata를 쓰면 AWS 에서 정보를 관리하니 볼 수가 없고 ansible 의 prv 모듈을 쓰면 직접 관리할 수 있다.

2. TF 프로비전을 통해 서비스를 설치하고 playbook을 실행 하면서 TASK가 처리된다

3. 호스트가 직접 플레이북을 갖고 있으면 다시 실행하기 좋다. (버전관리는.. 방법을 생각 해야겠지)





# Part 5 도커와 쿠버네티스를 활용한 서비스 운영

## CH01 개요 및 실습 준비

### CH01_01 개요

**컨테이너 기술의 발전**

1. Season Traditional:  동일한 바이너리에 대해 한가지 버전의 라이브러리만 사용할 수 있다. →  앱1, 2, 3이 다른 의존성을 가지고 싶을때 트리키한 방법을 썼어야 헀다.  → 효율성과 확장성이 낮아졌다.

2. Season Virtualized: 가상화를 통해 어플리케이션을 샌드박싱 → 하이퍼바이저가 게스트 OS 실행하여 독립된 실행환경을 보장. → 오버헤드 문제, 성능이슈 발생

3. Season Container: 게스트 운영체제 없이  호스트 OS의 커널을 공유하여 샌드박싱 구현(chroot) → App Binary와 Library만 컨테이너에 들어감 성능개선 → 도커가 컨테이너를 돕는 엔진이라고 볼 수 있다.

4. Season Kubernetes: 여러 도커를 관리할 수 있도록 돕는 시스템. 도커 클러스터링. 구글개발. 

### CH01_03~07 환경구성 및 미니쿠베

***docker, docker-compose, kubectl, kustomize,  minikube***

🐭 rehash: Re-computes the internal hash table.

Kubernetes v1.23



## minikube

: 학습하는 입장에서 여러가지 심플한 쿠버네티스 여러개를 구성할 필요가 있다. Driver라는 개념을 통해 원하는 가상환경을 구성가능.

* 자 시작 명령어!

`minikube start ~~-node 3 -~~driver=docker`

* 사용방법 

	* clusters, users, contexts: 클러스터와 유저의 결합을 담당

```

minikube start --driver docker //미니 쿠버를 이용해 Kub클러스터 생성

cat ~/.kube/config

~> "current-context: minikube" // 현재 사용중인 컨텍스트

kubectl cluster-info  // 현재 어디에서 control-plane이 실행되고 있는지 DNS위치도 조회

```

* 기본적인 명령어

`minikube [status*delete/pause/unpause/pause*stop]`

* 많이 쓰는 명령어

`minikube addons list`

`minikube addons enable ingress`  // 애드온 활성화

`minikube ssh`  // kubectl로 볼 수 있는 노드에 접속

* 😱미니쿠베의 kubectl 버전과 kubectl 버전이 다를 수도 있다.



### CH01_08 테라폼 코드를 이용하여 AWS 실습환경 구성

1. Dk 및 DkCompose, kubectl, minikube, 등등 설치를 포함한 Prv을 포함하는 .tf 실행을 통해 실습환경 구축



## 도커를 이용한 컨테이너 관리

### 도커 이미지와 컨테이너

**도커구성요소**

1. Docker Client: 도커 명령어(docker build, pull, run) 를 실행하는 대상

2. Docker HOST: 도커 엔진(데몬)이 띄어져 있는 서버를 

	1. 데몬: 클라이언트와 통신하는 주체

	2. 컨테이너: 이미지로 만들어진 프로세스. 격리된 자원사용. 어떤 작업을 하든 이미지에 영향 X

	3. 이미지: 저장소로 부터 가져옴. 이미지와 컨테이너는 1:N 관계. 여러계층 구조로 존재(다른 챕터 참고)

3. 이미지 저장소

	1. 저장공간은 퍼블릭도 쓰고 프라이빗 서비스도 있다.

* 이미지  이름 네이밍 규칙

	* repo/prog:1.21 → 풀네임

	* repo/prog → 가장 최근의 것

	* prog:latest → 도커허브로 인식

	* prog  → 도커허브에서 가장 최근의 것

### 컨테이너 라이프 사이클

* Created → Running → Paused

* Stopped →  Deleted

* 시작하는법. `docker run image` 했을때 이미지가 없으면 저장소에서 pull 해서 수행한다.

```bash

docker ps [-a]  //이미지 조회

docker create nginx 

docker start [name/id]  /

```

* docker 명령어 플래그

```

-i	호스트의 표준 입력을 컨테이너에 연결

-t	터미널을 연결

--rm	실행 후 자동 삭제

-d	백그라운드 모드로 실행 (detached), 실행중에 exit 하거나 ctl+c 하면 원래는 종료됨.

--name 이름지정 (안하면 랜덤이름)

-p 80:80

-v /opt/filepath \	호스트 컨테이너간 볼륨 바이딘

docker run [이미지 이름] [my-command]	실행할 명령어를 제일 마지막에 붙여줄 수도 있다.

```

* bash는 스트리밍형태의 지속적인 입력을 요구한다. 때문에 bash만 있는 컨테이너는 `-i`로 켜면 좋다.

* CTL + p, q 를 하면 컨테이너로부터 detach가능

* 라이프 사이클 관련 명령어

	* `docker inspect`  네트워크, 환경변수, 명령어 등 정보를 조회가능

	* `docker pause`  `unpause`  일시중지

	* `docker stop`  SIGTERM 전달(Graceful Shutdown)   `docker kill`  SIGKILL 전달

	* `docker stop $(docker ps -a -q)`  전체 컨테이너 아이디 전달하여 stop

	* `docker rm`  `docker rm ~~f `  `docker run -~~rm` 

	**`docker container prune`**중지된 모든 컨테이너 삭제* //가지칠때 쓰는 단어

* id는 꼭 다 입력 안해도 된다.



### 엔트리포인트와 커맨드

* 컨테이너가 실행할때 고정적으로 실행되는 스크립트 (prefix), 커맨드(suffix, 또는 prefix의 인자)

```

ENTRYPOINT ["docker-entrypoint.sh"

CMD ["node"]

```

	* → docker-entrypoint.sh node → 이것과 같다.  또는 echo "node" 와 같이 '명령어' '인자' 의 관계도 가능하다.

	* 실행할때마다 엔트리포인트와 커맨드를 바꿀 수 있으므로 중요하다.



### 환경변수

* 커맨드 환경변수 설정

```bash

docker run -it -e HY_HOST=fc.com ubuntu:focal bash

$echo $MY_HOST

```

* ⭐️ 파일 환경변수 설정

```sample.env

HY_HOST=hello.com

```



`dokcer run ~~it --env~~file ./sample.env ubuntu:focal env`

→ 컨테이너에 진입하자 마자 env를 조회한다.

* 많은 컨테이너(eg. Grafana)들이 환경변수로 플러그인 설치 등을 컨트롤하고 있다. 이미지 문서를 읽어보면 활용가능



### 명령어실행

* `docker exec [container] [cmd]`  실행중인 컨테이너에 명령어

* `docker exec -it [container] [bash]`  실행중인 컨테이너에 배쉬연결



### 네트워크

	![](/BearImages/2B2067DB-78A7-4EB6-A135-D5044D215842-18761-00000A58F182C7AE/Screen_Shot_2022-06-18_at_6.52.08_AM.png)

* 도커 네트워크 구조

	* docker0 과 eth0은  같은 네트워크로서 도커엔진이 브릿지 역할을 한다.

	* 각 도커엔진은 각 컨테이너에 대해 veth를 할당한다.

* 컨테이너 포트 노출

	* `docker run -p 80:80` 이게 지정 퍼블리시

	* `docker run -p 80`  호스트의 아무포트가 게스트 80과 연결

	* `docker run -p [ip]:80:80`  지정 ip의 포트와 연결하여 실행, 이걸 localhost를 넣으면 퍼블릭IP, 나 프라이빗IP를 통해 접근을 하려해도 안된다.

* Expose vs publish

	* `docker run ~~d -~~expose 80 ~~-name my~~nginx nginx`  expose는 그냥 문서적인 용도 실제 패킷이 포워드 되진 않는다.

* 네트워크

	* `docker network ls`

	* 네이티브 드라이버(Bridge, Host, None, Overlay), 리모트 드라이버(3rd party)

	* Single Host Networking (bridge, host, none) / Multi Host Networking (클러스터 단계에서 실행할때 사용) 대표적으로 docker swarm

	* `docker ~~it -~~net none container`  이렇게 실행한 다음 `inspect` 해보면 네트워크와 드라이버가 none 이 되어있는걸 볼 수 있다. 네트워크기능이 필요없거나 프라이빗한 네트워크를 쓰고 싶을때 사용한다.

	* `docker ~~it -~~network=host grafana/grafana` 이렇게 실행하면 바로 호스트 네트워크 3000번에 바로 붙는다. `inspect` 해보면 별도의 IP가 없는 모습을 볼 수 있다.

	* 직접 브릿지를 만들기

		*  `docker network create --driver=bridge 2022campus`  

		* `docker run ~~d -~~network=2022campus ~~-net~~alias=hello nginx`  이렇게 하면 내부에서 도메인을 찾을 때 hello 를 쓸 수 있다. 이제 grafana 컨테이너에 들어가  `wget hello`를 하면 index.html 을 받을 수 있다. 반대로 nginx 컨테이너에 들어가 curl grafana:3000을 해도 .html문서를 송신하는걸 볼 수 있다. 

		* 호스트에서 `ifconfig` 를 해보면 veth, docker0 를 볼 수 있다.

			*  `br-...` 이건 직접 만든 브릿지다.



### 볼륨

* 도커 레이어 아키텍쳐

	* `docker build -t app .`  을 통해 base OS, apt Package, install pip, source Code, Update Entrypoint 이런 과정을 수행하고 이게 ***Image Layers*** 이고 Read only

	* 도커는 이 각 단계를 레이어로 관리함으로서 작업수요는 줄인다. 

	* `docker run app`  을 통해 실행하면 ***ContainerLayer*** 가 생겨난다. 이건 RW 

* 호스트볼륨

	* `docker -v *host/path:/guest*path`  이렇게 볼륨을 연결한다.

	* 컨테이너에서의 작업이 호스트의 디스크에 기록할 수 있다.

* 볼륨컨테이너

	* Data를 쓰기위한 컨테이너를 작성하여 사용, 앱이 Data-only의 볼륨을 마운트

	* `docker run ~~-name my~~volume -v *host/path:/guest*path focal`

	* `docker run ~~-voulme-from my~~volume`

	* 모든 셋팅된 컨테이너를 실행하면 다음 inspect 해보면 `source:... dest:...` 된걸 볼 수 있다. 

* 도커 볼륨

	* 도커가 제공하는 볼륨 관리 기능을 통해 데이터를 보존

	* `var*lib/docker/volumes/${volume-name}*_data` 에 저장이 된다.

	* 도커 볼륨 생성 `docker volume create --name db`  호스트 경로 대신 'db'를 쓰면 된다.

	* 도커 볼륨 마운트 `docker run -v db:var*lib*mysql containerId`

	* `docker volume inspect db`  이렇게 하면 현재 사용중인 볼륨을 볼 수 있고 ls 로 실제 위치에 존재하는 파일을 읽을 수도 있다.

* 읽기 전용 볼륨 연결

	* `-v db:*guest*path:ro`  이렇게 뒤에 ':ro' 를 붙이면 리드온리로 마운트된다.



### 로그

* STDOUT / STDERR

	* 보통 앱에선 앱에서 제공하는 logging driver를 이용했다. 

	* 도커에선 STDOUT / STDERR 를 직접 처리하는 식으로 해야한다. 다양한 드라이버를 제공한다. 사용목적에 맞게 사용. `json-file` 

* 로그 확인하기

	* `docker logs [con]`  로그를 1회 출력

	* `docker logs --tail 10 [con]`  꼬리 10줄

	* `docker logs -f [con]`  실시간

	* `docker logs -f -t [con]`  타임 스탬프 표시

* (json-file driver 사용시) 호스트 운영체제의 로그 경로 

	* `cat *var/lib/docker/containers/${container_ID}*${container~~ID}~~json.log`  로그가 json 키로 되어 있는걸 볼 수 있다. keys → log:, stream:, time:

* 로그 용량 제한

	* `docker run ~~-log-driver=json-file --log~~opt max~~size=3m --log~~opt max-file=5` 

	* 운영환경에선 필수로 해야하고 컨테이너 단위 뿐만 아니라 도커엔진에서 전체적으로 설정도 가능

* 도커 로그 드라이버

	* 이렇게 쌓은 로그들을 Centralized Log MNG 서비스 ( elastic, sematext, splunk, cloudWatch)에 쌓으면 된다.

	* json~~file 은 파일기반, journald 는 리눅스 저널, syslog는 TCP~~UDP, fluentd는 TCP를 통해 Log Shipper에 전달할 수 있고 Log Shipper는 CLM에 HTTP로 전달한다.

	* Splunk, Gelf, Logentries, CloudWatch, Google Cloud는 직접적으로 수집할 수도 있다.

### 이미지빌드

* 도커 이미지 구조

	* os → nginx → web app 이런 순으로 레이어를 쌓고 컨테이너를 실행하면 최종 이미지를 복사하고 RW Layer가 덮어진다.

	* 실행하고 나서 `inspect` 를 통해  RootFS-Layers에서 현 상태를 볼 수 있다. 

* 도커파일없이 생성

	* 컨테이너에 직접 들어가서 명령어를 수행한 다음 commit을 해서 이미지를 만들 수 있음.

`docker commit -a 2022campus ~~m "add my***file" my***ubuntu my~~ubuntu:v1`

`sha256:a961....` 이미지 생성 확인.

	 * `inspect` my_ubuntu에 있었던 레이어가 봉니다. 기존 레이어를 따와서 재활용한다는걸 알 수 있다.

* 도커파일로 생성

	* [INSTRUCTION] [arguments] 구조로된 리스트

	* `docker build -t my_app:v1 ./`  -t 태그 지정 (디폴트 파일, Dockerfile 이용)

	* `docker build -t my_app:v1 -f example*MyDockerfile .*`  -f 도커 파일 지정 

	* Sending build context to Docker daemon → 중요한 메시지

	* 이후엔 명령어 수 만큼의 레이어가 생성됨을 알 수 있다. 이제 생성된 레이어들은 cache로 활용된다. 

* 빌드 컨텍스트

	* 명령 수행시 현재 디렉토리를 컨텍스트라고 한다. 복사같은 작업을 할때는 해당 디렉토리의 데이터들이 다 넘어간다. 그래서 용량이 커지는걸 알아야한다.  용량이 너무 큰게 있다면 ignore 활용

* .dockerignore

	**`**/temp*`

	* `!README.md` 같은 방법을 통해 빌드 컨텍스트에서 무시할 파일들을 지시할 수 있다. 



### Dockerfile

* 파일 문법은 reference 문서를 참고

	* `FROM ENV WORKDIR ADD COPY` 

	* 이때 ${VAR} 이렇게 호출되는 환경변수는 전부 컨테이너의 환경변수!

	* 빌드할때 값을 정의할 수도 있다. `ARG buildNo=1`

	* `docker build ~~-build~~arg user=what_user ` 이렇게 정의하면 사용할 수 있는데  `ARG user` 라고 정의해주기 전에 참조하면 에러. 컨테이너 변수와 빌드 변수가 겹치면 ENV 지시어가 우선된다.

```

FROM node:16  #베이스 이미지 설정

LABEL maintainer="FC Park <park@fc.com>" #이미지의 메타데이터

RUN npm install

COPY . .

EXPOSE 8080 // 8080포트를 사용한다고 문서화 (publish 하는것과 다름) 

CMD ["node", "server.js"] // 명령어, 최종적으로 이미지의 성격을 결정. 배열 또는 하나의 문자열도 가능 

```

* 엔트리 포인트를 사용하면 커맨드 명령에 앞서 뭔가 추가 할 수 있다.

* ADD 는 사용지양, COPY로 대체가능. URL을 사용할 수 있는게 장점이지만 명령에 대한 성공여부를 체크하기 까다로워짐.

### 이미지 압축파일로 저장 및 불러오기

* 저장할때는 `docker save -o [posix.tar] IMAGE`  -o는 tar 파일로 남겨준다.

* 불러올때는 `docker load -i [.tar] ` -i 는 압축으로 부터 불러온다. tar로 관리하는건 인터넷이 안되는 환경이거나 ECR을 안거치고 파일을 다른 사람에게 줘야할때 유용하다.

1. 

###  도커허브저장소 이용

* 개인키로 로그인을 한다음 프라이빗 레포지터리 생성 후

*  `docker tag nginx:latest park/my-nginx:v1.0.0`  태그 이미지 준비

* `docker push park/my-nginx0:v1.0.0`  하면 업로드 진행

* 실제로 프라이빗한게 지켜지는지 알기 위해 `docker pull park/my-nginx:v1.0.0` 시도 해본다.



### ECR 이용

* 동일하게 레포지터리 생성하면 된다. Scan on push 기능이 있다. (비용발생)

* 동일하게 `docker tag` `docker images`  `docker push`를 사용, 다만 AWS 인증과정이 다르다.

* 권한이 없으면 "no basic auth credentials"



### 이미지 경량화 전략

* 경량화를 하면 푸시, 풀, 실행하는 속도도 빨라진다. 보유할 수 있는 컨테이너의 숫자도 늘어난다. 

* 꼭 필요한 패키지 및 파일만 추가

	* 일반 서버 쓰듯이 다 설치하다보면 무거워진다. 컨테이너는 하나의 프로세스를 실행하기 위해 만들어진것을 잊지말자 

* 컨테이너 레이어 수 줄이기

	* 레이어의 수는 지시어의 수. RUN의 숫자를 줄여야한다. (하나의 RUN으로 통합하면 좋다)

```docker

RUN \

 apk add --no-cache... && \ // 이렇게 하면 한번에 여러 명령어를 수행할 수 있다.

 apk del --no-cache git &&  // Cache를 만들지 않는 옵션을 꼭 사용한다.

```

* 경량 베이스 이미지 선택

	* node 서버가 905M인데 슬림을 고르면 174M, 기본 리눅스는 800M 알파인은 110M 

	* 제일 쉬운 방법. debian slim, linux alpine, linux stretch → 고랭에서 바이너리를 스트레치에 엮어서 자주 사용함.

* 멀티 스테이지 빌드 사용. 빌드에 필요한것은 빌드때만 쓰고, 릴리즈때는 뺴버리면 된다.

	* `FROM node:16-alpine AS base`

	* base, build, release 이런 단계를 거쳐야 한다고 볼때. FROM을 기준으로 쪼개서 관리하면 BASE -> 빌드, BASE → Release 이렇게 도커 파일의 흐름을 규정할 수 있다. 

	* `FROM base AS release`  처음엔 이렇게 시작해서

	* `FROM light-base AS release`  릴리즈 단계

	* `COPY --from=build *app/node***modules .*node***modules` 이전 단계에서 수행한 내용 (`npm install`의 결과물을 복사. 의존성이 커질 수록 이 효과가 커진다. 레이어를 효과적으로 관리하기 위해선 초반에 고정적이고 후반에 가변적인 명령어를 다뤄야 한다.



### 도커데몬 디버깅

* `docker system info` 호스트 관점에서의 정보를 전달

* `docker system events`  새로 발생하는 이벤트를 받는 스트리밍 파이프 상태

이 상태에서 컨테이너를 실행시키면 컨테이너가 실행되는 과정을 지켜볼 수 있다.'

* (우분투의 경우) `jouanlctl -u docker` 를 통해 도커 데몬의 로그를 볼 수 있다.

* `docker system df` 를 통해 디스크 사용을 확인할 수 있다. `RECLAIMABLE`  컬럼 → 회수가능한

* `docker system prune`  중지된 컨테이너, 네트워크, 댕글링 이미지, 댕글링 빌드 캐시 다 날림

* `docker stats`  를 통해 컨테이너별 리소스 사용량 확인 가능.  



### 명시적으로 컨테이너 관리하기

* 도커 컴포즈 소개

	* YAML 파일을 통해 명시적 관리하고 컨테이너를 묶어서 관리할 수 있게 된다.

	* S1 → S3 를 호출하고 싶다. 브릿지 네트워크를 통해 net alias를 사용하는 대신 바로 호출할 수 있다. (디스커버리) 가 컴포즈에선 자동화 되어있다. 쉽게 컨테이너를 수평 확장할 수 있다.

* 프로젝트 / 서비스 / 컨테이너

	* 프로젝트: 워크스페이스 단위. 서비스 컨테이너의 묶음. 프로젝트 단위로 도커 네트워크가 생성됨. Project.yaml하나가 하나의 프로젝트

	* 서비스 :  scale 속성을 통해 수평적 확장 가능. eg. Web, db, 

	* 컨테이너: 서비스를 통해 컨테이너 관리

* docker-compose.yml

	* 최상위 옵션 `version, services, networks, volumes`

		* service: db, web 과 같은 앱의 성격

		* network: 프로젝트 내에서 사용할 리소스 정의 (없어도 디폴트 네트워크가 '프로젝트이름_bridge' 모드로 생성된다). 프로젝트 이름은 폴더 이름을 따른다. 

		* volume: 프로젝트 내에서 사용할 리소스 정의

 	* 버전마다 yaml 의 호환성이 달라짐 ( docker composer file compatibility matrix 를 확인)

	* Ver3부터 도커 스웜과 호환 (도커 컴포즈에서 사용되는 명령어인지, 스웜에서 사용되는 명령인지 확인해야함) 우리는 쿠버네티스를 쓸거다

	* `docker stack deploy`  이것고 관련된 옵션들은 대부분 스웜	

* docker-compose 명령어

	* `docker~~compose up`  docker run 과 유사 '~~d' 백그라운드

		* 실행될떄는 정의했던 컨테이너와 볼륨 네트워크들이 만들어지는걸 볼 수 있다.

	* `docker-compose -p my_project ` 옵션으로 프로젝트명 지정.

```yaml 

volume:

  db: {} // 별도로 옵션을 주지 않으면 기본 볼륨을 쓴다.

network:

  wordpress: {} // 이렇게 리소스가 정의된다. 기본은 bridge 필요하면 문서보고해! 

```

	* `docker-compose down`  -v 옵션을 주면 볼륨을 제거

		* -v 옵션 없이 하면 컨테이너와 네트워크만 제거된다.

	* `docker-compose ls -a`  전체 프로젝트 상태를 확인

	* `build~~web~~1` 여기서 1은 서비스 내에서 첫번째 인덱스를 의미

	* `docker~~compose up -~~scale web=3`  스케일 업할때는 이런 명령어를 주면 된다.

		* 호스트의 아무 포트나 사용해서 컨테이너를 증가시켜 5000번으로 연결하게 된다. 

```

services:

  web:

    #container_name: "web" // 이렇게 이름을 지정해주면 스케일링할떄 충돌남

    build: .

    port:

    - "5000" #"5000":"5000" 이렇게 하면 스케일링할떄 충돌남.

```

	* 숫자를 줄여서 다시 compose하면 컨테이너 숫자가 줄어듬

* app: 이 가질 수 있는 옵션

```

db:

	image:

	volumes:

  - db:/var/lib/mysql

	restart: always

  environment:

  - MYSQL_ROOT_PASSWORD=wordpress # '-' 를 이용해 정의하면 배열

...

wordpress:

  depends_on:

  - db	# 디비에 의존하겠다는 뜻. 하지만 이게 컨테이너의 존재만 체크한다. 이걸 예쁘게 컨트롤 하려면 엔트리 포인트에서 서비스 유무를 체크해서 실행하게 하는게 좋다.

  environment:

    WORDPRESS_DB_HOST: db:3306 # --> 오브젝트 형식의 정의

    WORDPRESS_DB_USER: user123 

```

* `docker-compose [ logs | events | images | ps | top ]`  등등 API DOC 참고 

* 주요 사용 목적

	* 로컬 개발 환경 구성 (Redis, MySQL, Kafka) 등을 사용할 수 있게

	* 자동화된 테스트 환경 구성 (CICD 중 격리된 테스트 환경을 구성)

	* ⭐️단일 호스트 내 컨테이너를 선언적 관리. (오케스트라에서 관리할 수도 있지만) 단일 호스트내에선 컴포즈로 하면 좋다.

		* YAML 파일을 통해 선언적으로 관리 → 코드를 보면 호스트가 어떤 컨테이너를 쓰는지 알 수 있다. → 협업에 도움



### 도커 컴포즈 이용하여 Grafana-MySQL 구성

* 요구사항 → 3000번 바인딩, 설정파일을 호스트에서 주입, 데이터를 저장할 경우 호스트 볼륨에 저장, 플러그인 설정, 로그 드라이버 설정

* 진행과정

```yaml

services:

  grafana:

    restart: unless-stopped #always는 죽으면 재시작한다. unless는 호스트가 재시작해도 재시작을 보장한다.

    environment:

      GF_INSTALL_PLUGINS: grafana-clock-panel

    port: 

    - 3000:3000

    voluems:

    - ./files/grafana.ini:/etc/grafana/grafana.ini:ro #로컬 파일을 연결

    - grafana-data:/var/lib/grafana

    logging:

      driver: "json-file"

      option: #중략

volumes:

  grafana-data: {}

```

* Grafana.ini 옵션

```ini

; 데이터베이스 설정은 주석 --> sqlite	를 쓰게 된다.

```

* 이제 grafana-mysql .yaml 을 확인

```yaml

db:

  image: mysql:5.7

volumes:

- mysql-data:/var/lib/mysql # 이것 외에도 ini에서 데이터베이스 설정이 열린걸 볼 수 있다.

```

* grafana를 켜서 시스템 설정에서 변경된 내용을 확인


---

## CH3 쿠버네티스의 이요한 컨테이너 오케스트레이션

### 쿠버네티스 소개

* 구글 배포시스템 brog를 기반으로 재작성하여 공개 (2014년) 현재는 재단에 기부

* 컨테이너의 배포, 관리, 확장, 네트워킹을 자동화하는 기술

	* D.C가 한대의 머신을 관리하는 기술이라면 쿠버네티스는 ... 

* ⭐️스케쥴⭐️, 스케일링, 로드밸런스, 롤백-롤아웃, 셀프힐링, 리소스 배분, 서비스 디스커버리, CM, 스토리지 오케스트레이션, 

	* overlay network 를 통해 하나의 네트워크 처럼 동작하게 해준다. (Service discovery가 이것)

* ***What is Container Orchestration?*** - 여러 머신으로 구성된 클러스터 상에서 컨테이너를 효율적으로 관리하기 위한 시스템 (운영체제는 하나의 머신에서 프로세스를 관리하기 위한 프로세스 오케스트레이션 시스템이잖아) → 덕분에 사용자가 OS에 대해 신경을 쓸일이 적어졌다. 해방됐다!라고 표현하기도 한다.

* 기존에도 노마드, 메소스(DC/OS), 도커스웜, 랜처(간단한게 장점) 등 있었지만 선택받은 쿠버네티스

* 왜 쿠버네티스인가?

	1. Planet Scale 를 하기 위한 원칙

	2. Never Outgrow - 다양한 요구사항을 만족할 수 있는 유연함, 로컬 규모부터 글로벌까지 유연하게 크기 조정, CRD(Custom resource Def)를 통해 기능 확장

	3. 온프레미스, 퍼블릭 클라우드, 하이브리드 어디서나 동작. 리눅스라면 고의 다  동작. 환경제약이 없음.

* 주의사항

	1. 	복잡한 구성, 쿠버네티스의 자체가 여러 컴포넌트로 구성된 분산 시스템 → 이걸 대체하기 위한 AWS EKS, GKE 가 있다.

	2. 방대한 학습량. 다양한 지식이 필요

	3. 오버 엔지니어링 - 적합한가? 운영 관리에 필요한 인력과 비용이 충분한가? 멀티노드를 운영하는 구조이기에 비용이 높아진다.  



### 쿠버네티스 버전과 배포판

* 다양한 배포판을 가지고 있음. 

	* Docker for Desktop. 쿠버네티스 기능을 활성화하고 나면 싱글노드에 클러스터 생성.

	* minikube. driver를 이용해 어떤 클러스터를 구성할지 선택가능. 비슷한 역할을 하는 K3S, MicroK8s,

	* 애저, 구글, 아마존에서 제공하는 Managed Cluster. AKS GKE EKS

	* 레드햇은 쿠버를 래핍한 OPENSHIFT 플랫폼

* 로컬 쿠버네티스 배포판

	* 단일 노드에서 쉽게 쿠버네티스 구성 및 테스트 가능. 원래 멀티 노드를 위한거니까. 한계까 있는 minikube

	* 클라우드 플랫폼에서만 사용가능한 기능

		* ALB, NLB, EBS in AWS

	* 복수의 노드에서 의미가 있는 리소스

		* DaemonSet, Affinity, Taint, Toleration

	* 위 기능을 쓰고 싶으면 프로덕션 레벨을 써야한다. 관리복잡도의 증가의 이슈. 

		* 이를 위한 옵션, kops, kubespray, kubeadm 등을 이용해 쉽게 구축가능

		* 운영부담을 최대한 줄이려면 EKS

* 쿠버네티스 버전 선택

	* 버전에 따라 사라지는 API resource. Deprecation Schedule

		* Major 업데이트마다 Changeling, Breaking Change 꼼꼼히 검토

* 실습에서는 minikube, EKS를 사용

	* Driver - docker



### 쿠버네티스 클러스터 구성요소

* Control Plane (Master Node)

	* 홀수개로 구성, kubectl 의 통신 대상

	* 클러스터를 관리하는 역할, 상태관리, 명령어 처리

	* etc: 저장소 역할, 분산 key-value 저장소

	* cutler manager(여러가지 컨트롤러가 있다, 쿠버+클라우드)

		* 클라우드 프로바이더에 종속적인 기능을 처리하기도 하고

		* 쿠버네티스 본연의 기능을 위한 컨트롤 ( pod, deploy, service, secret) 각기의 컨트롤러들이 정보를 관리하고 있다가 etcd가  API 를 앞설때 갱신.

	* scheduler(자원 사용을 관리하고 새로운 워크로드를 어디에 배포할지 관리) → apiserver(관리를 위한 API 제공) 

* Node (Worker Node)

	* kubelet - 컨테이너 런타임과 통신. 라이프사이클 관리. API 와 통신하여 노드 리소스 관리. kubelet → CRI → Container

	* CRI (Container Runtime Interface)

	* kube-proxy. 오버레이 네트워크 구성, 네트워크 프록시 및 내부 로드밸런서 

	* pod

* minikube를 쓰면 단일노드에 컨트롤 플레인과 ,워커노드가 한 호스트에 존재

	* 이번 교육과정은 구축보단 사용자관점에서 사용방법을 배울것이다.



### API 	리소스

* Kubernetes가 관리할 수 있는 오브젝트의 종류

	* Pod, Service, ConfigMap, Secret, Node, ServiceAccount, Role

	* 거의 모든게 리소스 ≈  클래스 

	* eg. 그라파나 리소스, 시크릿 리소스.

* Object

	* API 리소스를 객체화(인스턴스화) 한것. ≈ 인스턴스

	* eg. grafana pod, nginx pod, mySecret,

* `kubectl api-resource`  지원하는 API 리소스 목록 출력

	* Name(복수), Shortnames(축약어), APIVERSION(각각 리소스마다 버전을 가진다), NAMESPACE, KIND(단수)

* `kubectl explain pod`  리소스에 대한 설명 출력

* 실습

```bash

minikube status

kubectl get node

```

* `kubectl get po ~~all~~namespaces`  이렇게 pods 자원의 현황을 조회 

* `kubectl explain pod`  해당 리소스의 스펙을 조회

* 쿠버네티스는 오브젝트를 YAML 기반 매니페스트 파일로 관리

	* API version → 오브젝트가 어떤 API 그룹에 속하나

	* kind 어떤 API 리소스인가

	* 식별을 위한 정보 metadata

	* 오브젝트가 가지고자하는 데이터는 spec. → 이거 대신 data, rules, subjects 등 다른 속성을 가질때도 있다.

* Labels, Annotations

	* Labels → 사람이 필터링을 위해 설정하는 메타데이터

	* Annotations → '애드온'이 오브젝트를 어떻게 처리할지 결정하기 위한 설정



### kubectl 명령형과 선언형 방식

* Imperative, 

	* 액션을 지시, 빠르게 처리, 여러 명령어를 알아야함

* Declarative (추천)

	* 도달하고자하는 상태를 선언, 코드로 관리(GitOps), 많은 리소스에 대해 매니페스토 관리를 따라 빠르게 처리 가능, 명령어 숫자가 적음

	* apply 명령을 지원하고 멱등성을 지원한다.

* 명령형

`kubectl run -i ~~t ubuntu -~~image unbuntu:focal bash` 이게 이미지로 우분투 파드 생성

`kubectl expose deployment grafana ~~-type=NodePort -~~port=80 ~~-target~~port=3000`

→ grafana dep 오브젝트에 대해 Nodeport 타입의 Service 오브젝트 생성. 노드포트에 3000번을 개방하라는 지시.

`kubectl set image deployment/frontend www=image:v2`  

→ frontend dep 의 www 컨테이너 이미지를 image:v2로 변경

`kubectl rollout undo dep/frontend ~~-to~~revision=2`

→ frontend dep 을 리비전 2로 롤백



* 선언형

`kubectl apply -f deployment.yaml`  정의된 매니페스토를 적용

`Kubectl delete -f deployment.yaml`   오브젝트 제거

`kubectl apply -k ./`  kustomization.yaml 을 위해 작성된 파일을 오브젝트 클러스터에 반영



* 실습

`kubectl create deployment grafana ~~-image=grafana/grafana -~~port=3000` → DEP을 생성하는데 3000번을 열라고 '포드'에게 지시하는것

`kubectl expose deployment grafana ~~-type=NodePort -~~port=80 ~~-target~~port=3000`

→ grafana DEP에게 '노드포트'에 3000번을 개방하라는 지시.

이렇게 노출과 노출이 결합이 되면 minikube에서 서비스가 열렸다고 알려준다. 



선언형으로는 `deployment.yml `, `service.yml`을 준비

`kubectl delete -f deployment.yml` 서비스는 노드포트 타입을 들고 있다. DEP은 앱에 대한 명세.



`unchanged` `configured`  `changed` 이미 적용된 상태라면 결과값에서 표시를 해준다.



* TIP

	* C R U D 작업은 선언형방식을 추천

	* SSH, log, port 개방 등은 선언형으로 관리

****트러블슈팅용 명령어*

	* `logs, attach, exec, port-forward, proxy, top`



### API 리소스 Pod

* 파드란?

	* 컨테이너를 다루는 기본 단위. 컨테이를 직접 컨트롤 하는건 없다. 무조건 파드로 한다. 동일 파드내 컨테이너는 여러 리눅스 네임스페이스를 공유, 네임 스페이스 내엔 동일 IP를 사용. (파드안에컨테이너가 몇이든 아이피는 같다)

	* 사용자가 직접 관리하지는 않는다.

실습

```

kubectl api-resources | grep pod

kubectl explain pod

kubectl describe pod

kubectl apply -f pod.yaml

kubectl get pod		# READY/전체테이너

kubectl get pod -o wide # ip등을 포함한 정보



```

* 현재 쉘이 우분투에 있고 미니쿠베 클러스터에 있는건 아니기 때문에 172.17.0.3 으로 서비스되는 서비스에 바로 접근은 불가 

	* `minikube ssh`  를 이용해 접근하면 된다.  이제 여기서 curl을 보내면 서비스를 받을 수 있다. 

	* 두번째 방법 pod에 접근. `kubectl  run -i ~~t debug -~~image=posquit0/doraemon bash`  이제 클러스터의 쉘에 있으니 curl 가능

	* `kubectl exec -i -t hello bash`  도커와 마찬가지로 hello 이미지에 명령을 전달할 수 있다. 쉘을 켜면 된다.

****멀티 컨테이너 파드, 사이드카 패턴*

	* 파드 구성의 특징

		* 동일 파드내 컨테이너는 모두 같은 노드에서 실행 (네임스페이스를 공유). 때문에 kubectl 은 항상 목표 컨테이너 이름을 지정해야한다.

	* 사이드카 패턴

		* 메인컨테이너와 보조 컨테이너를 같이 실행하는 구조를 일컫는다.  사용예제는 다음과 같다.

			* Filebeat 같은 로그 에이전트

			* Envoy 같은 프록시 서버로 서비스메시 구성

			* Valut Agent 같은 기밀 데이터 주입

			* Nginx 설정 리로드 에이전트

```

kubectl apply -f multi.yaml

kubectl exec -it hello -c debug sh #debug 컨테이너에 접근.

kubectl eexc -it hello sh // 이렇게 하면 디폴트 컨테이너에 접근 (이번엔 nignx) 

```

### API 리소스 ReplicaSet (옛날이름 Replication Controller)

* 파드의 수를 늘린다(Scale-out), 그런데 매번 def를 바꾸긴 귀찮으니, DEP에 붙어있는 REPLICA SET을 설정하고 REPLICA SET에 파드가 붙는다. 

* 정해진 수의 파드가 항상 실행될 수 있도록 관리해주는 역할도 한다.

* 사용자가 직접 컨트롤 하는 일은 없다. 유저는 DEP을 컨트롤한다.

* 매니페스트

```yaml

apiVersion: apps/v1

kind: ReplicaSet

metadata:

  name: hello

spec:

  replicas: 4

  selector:  #많은 API 리소스가 이런식으로 레이블 셀렉터를 쓴다.

    metaLabels:  #

      role: web

	temlplate : #레플리카셋이 만드는 pod템플릿

	  metadata: #레플리카셋이 만들 파드의 메타 데이터를 지정해준다.

      name: hello

      labels:

        app: hello      

    sepc: 

      container: # ...(중략)

```

다른 표현방법  

```

matchExpressions:

  - {key: tier, In, values: [cache]}

  - {key: environemnet , oerator: NotIn, values: [dev]} #In, NotIn논리연산을 할수도 있다.

```

* Control Plane은 ReplicaSet Controller가 들고 있는걸 관찰해서 스케일링을 관리

 apply 후 상태확인

```yaml

kubectl get replicaset # rs

kubectl describe replicates hello 

kubectl api-resources | grep replicasets

```

* ReplicaSet은 라벨셀렉터로 파드를 체크할뿐. 동일한 이름의 파드가 레플리카셋에서 관리하는 파드인지까지는 검사하지 않는다 (레플리카가 아닌 유저가 실행된거라면?) 더미 파드로 같은 이름으로 실행하면 레플리카는 그걸 이미 실행되어있다고 가정하고 3개 띄울거 2개만 띄운다.

	* `kubectl edit pod hello-n98st` → `lables: app: bye`  이렇게 하면 라벨이 변경되고 레플리카가 추가로 파드를 추가한다.



### API 리소스 Deployment 

* 파드를 새로운 버전의 이미지 파드로 교체해야 한다면, 버전이 갱신될때 배포 전략을 설정해야한다. Deployment 오브젝트를 생성하면 대응되는 ReplicaSet과 Pod가 자동 생성된다. 이걸 활용

* Recreate 전략 + RollingUpdate 전략

	* 재생성 전략은 모두 종료하고 새로운 파드를 생성

	* 트래픽을 받고 있다면 롤링업데이트

* 매니페스트

```yaml

#기존에 사용하던 것에서 kind만 Deployment 로 교바꿨다.

spec:

  type: RollingUpdate

  rollingUpdate:

    maxSurge: 1 #업데이트 과정에 spec.replicas 수 기준 최대 새로 추가되는 파드 수

    maxUnavailable: 0 #업데이트 과정에 허용량 최대 이용 불가능 파드 수

  minReadySeconds: 5 #새로운 파드가 띄어질때 기다리는 시간

  minReadyHistoryLimit: #업데이트 할때마다 리비전으로 관리중인데 최대 보관갯수

```

`kubectl api-resources | grep deployment` 

* 롤링 업데이트 전략

→  새 파드 생성해서 삭제하거나 삭제하고 생성하거나 컨트롤 할 수 있다. 생성하고 파괴하는건 수용량 유지에 유리하고 파괴하고 생성하는건 노드의 갯수가 설정값을 초과하지 않는데 장

`kubectl rollout history deploy`   이렇게 보면 리비전이 기록된걸 볼 수 있다.

`kubectl set image deployment rolling nginx=nginxdemos/hello:latest --record` 선언형으로 업데이트 진행

`kubectl rollout undo deployment rolling ~~-to~~revision=1`  롤링으로 롤백을 수행

`kubectl rollout status deployment rolling`  롤백 상황을 조회 가능



### API 리소스 - Service

* 역할

	* Deployment를 통해 파드를 수평확장하기 위한 개념 L4 기반 Loadbalance 

	* 여러 파드에 대해 클러스터 내에 사용 가능한 고유 도메인 부여(Service discovery)

	* 파드의 IP는 항상 가변 할 수 있음.

![](/BearImages/A282D917-284B-4FD5-9BC4-A495E2644B16-7058-0000020254C4B15D/1D250843-51BB-4F3F-A0C5-1CEF3BFDC392.png)

* 서비스의 종류 `Nodeport NodePort LoadBalancer ExternalName`

	* ClusterIP 클러스터 내부의 요청만 처리. 외부트래픽 X

	* NodePort : ClusterIP 의 랩핑한 타입, 외부로부터 트래픽이 오면 node가 받아서 SVC로 전달

	* LoadBalancer : NodePort  래핑한 타입, 밖에 존재하는 로드밸런서를 컨트롤해서 SVC로 전달

	* ExternalName : 앞의 3개가 트래픽을 받기 위한 거라면, 이건 외부로 가는 트래픽을 해석하는 변환하기 위한 용도. 

* ClusterIP 

	**서비스 네트워크 IP/PORT 정보 → 
```diff
+ spec.clusterIP:spec.ports[**].port
```


	* ⭐️ 파드에 부여하는 CIDR 대역과 서비스에 부여되는 ClusterIP CIDR 가 독립적으로 존재한다.  클러스터는 서비스를 가지고 서비스는 ClusterIP 를 가진다. 이곳으로 오는 요청은 LoadBalance 내부 DNS를 통해 서비스 이름으로 통신도 가능

```yaml

apiVersion: v1

kind: Service

metadata:

  name: hello

  labels:

    app: hello

spec:

  type: ClusterIP #타입 이거 안넣으면 기본값으로 들어감

  ports:

  - name: http

    protocol: TCP

    port: 8080 #CIP:port 이렇게 사용된다. --> podIP(targetPort)로 포워드

    targetPort: 80 #컨테이너의 포트를 적는다.

  selector:

    app: hello #이 서비스는 hello라는 DEP를 가르킨다. 

``` 



`minikube ssh` 접속해서 curl 해보면 서비스하는 파드의 이름들이 변하는걸 볼 수 있다.

`kubectl run -i ~~t test -~~image=posquit0/doraemon bash` 이렇게 만들 다음 curl을 해보면 클러스터 내에서 통신이 가능하지

`kubectl cluster-info dump | grep ~~m 1 service-cluster-ip~~range`

→ 클러스터 아이피를 볼 수 있고 수도으로 설정도 가능하다.

* NodePort를 외부에 노출하기

	**서비스 네트워크 IP/PORT 정보 
```diff
+ <NodeIP:spec.port[**].nodePort
```


	* 쿠너네티스의 모든 동일 포트를 개방하여 서비스에 접근가능케함

```yaml

apiVersion: v1

kind: Service

metadata:

  name: hello

  labels:

    app: hello

spec:

  type: NodePort

  ports:

  - name: http

    protocol: TCP

    port: 8080

    targetPort: 80

    #nodePort: 31000 #지정하지 않으면 port 랜덤하게 설정

  selector:

    app: hello

``` 

	* 이제 적용하면 ClusterIP는 유지되고 타입이 바뀌면서 PORT에 NodePort 가 보인다. 

	* `kubectl describe service hello`로 NodePort 조회

	* 이제 ssh 안하고도 바로 curl 로 접근 할 수 있다.

* LoadBalancer (보통 클라우드 프로바이더의 로드밸런서와 연동하여 쓴다)

	**서비스 네트워크 IP/Port 정보 
```diff
+ spec.loadBalancerlp:spec.ports[**].port
```


	* 클라우드 프로바이더에서 제공하는 로드밸런서를 동적으로 생성하는 방식. minikube 에선 패스. (할수는 있지만) MetalLB 같은 기술을 쓰면 On Poremise에서도 로드밸런스 타입 사용가능.

```yaml

spec:

  type: LoadBalancer

  ...(중략)

  selector:

    app: hello

``` 

미니쿠베이기 때문에 `kubectl apply` 해도 `pending`상태가 유지된다.

* ExternalName 로 외부로 요청 전달

	* 보통 클러스터 외부의 레거시 시스템을 쿠버네티스로 마이그레이션할때 쓴다. DNS의 cn 레코드와 동일한 역할 수행 ( 리다이렉트 해준다)

```yaml

apiVersion: v1

kind: Service

metadata:

  name: httpbin

spec:

  type: ExternalName 

  externalName: httpbin.org

```

apply 하고 `kubectl get service`를 하면 `hot-bin ExternalName` 이란 서비스를 볼 수 있다. 그리고 `httpbin.org`를 가르키고 있다. 이제 테스트 파드에 들어가서

`$curl httpbin.org` 를 하면 외부에 대한 요청을 성공한다. 

	* [EKS실습환경] 에서 로드밸런스 기능 확인

명세

```yaml

apiVersion: v1

kind: Service

metadata:

  name: hello

  labels:

    app: hello

spec:

  type: LoadBalancer

  ports:

  - name: http

    protocol: TCP

    port: 8080

    targetPort: 80

  selector:

    app: hello

```

`kubectl get service`하면 로드밸런서 확인가능 . `NLB 타입도 쓸 수 있다. 

```LB-nlb type yaml

annotations:

    service.beta.kubernetes.io/aws-load-balancer-type: "nlb"

```

```LB.yaml 

kubectl app -f deployment.yml 

kubectl get svc

kubectl get pod // 이렇게 하면 타입들이 변한걸 확인 가능

```



### API 리소스 - ConfigMap

* 어플리케이션의 설정값을 컨테이너에 주입! 어플리케이션과 볼륨, 환경변수를 분리하면 이상적

```yaml

      env:

      - name: MYSQL_ROOT_PASSSWORD #실행하고 들어가면 $PASSWORD 해보면 보인다.

```

직접적으로 지정하는 방법

```yaml

apiVersion: v1

kind: ConfigMap

metadata:

  name: mysql-config

data: # 대개 spec을 가지나 data 키를 가진다.

  MYSQL_ROOT_PASSWORD: fastcampus 

  MYSQL_DATABASE: devops

  ... (중략)

```

**envFrom 방법**

```

        envFrom:

        - configMapRef: #mysql-config맵 모든걸 가져온다.

            name: mysql-config

```

**configMapKeyRef 방법**

```

        env:

        - name: MYSQL_ROOT_PASSWORD

          valueFrom:

            configMapKeyRef: #키를 지정해서 가져온다.

              name: mysql-config

              key: MYSQL_ROOT_PASSWORD

```

apply 하고 나면  `kubectl describe cm` 을 통해 현재 관리되고 있는 ConfigMap 의 정보를 조회가능. `kubectl describe cm mysql`을 통해 현재 가지고 있는 환경변수 값을 조회 가능

**볼륨으로 쓰는법**

```

    Containers:

        volumeMounts: # tmp/config에 mysql-config를 덮었다. 이렇게 하면 파일이 올라간다. 그걸 직접 집어들어서 쓰는것.

        - mountPath: /tmp/config

          name: mysql-config

      volumes:

      - name: mysql-config

        configMap: #볼륨 드라이버 옵션이 들어올 자리인데 컨피그맵을 보게 했다.

          name: mysql-config



```

@팁 yaml 파일이 굉장히 길수도 있다. 그게 부담이 된다면 imperative를 이용해 쉽게 쓸 수 있는 트릭, 

`kubectl create configmap my-config`

`kubectl create configmap my~~config --from~~file config.yaml` 이건  `#key=value` 구조로 들어간다.

`kubectl create configmap my~~config --from~~file config=config.yaml` // 이렇게 쓰면 'config'키가 파일을 바라보게 된다.

`kubectl create configmap my~~config --from~~file config=config.yaml ~~dry~~run -o yaml `  드라이 런은 이렇게 하면 가짜로 실행하라는 의미. 클러스터에 반영이 안되고 어떤 결과를 내는지를 본다. -o (ou  tput) yaml 포맷. 의미 따라서 declarative한 사용에 필요한 값을 출력 받을 수 있다. 

`kubectl create configmap my~~config config=config.yaml -dry~~run ~~o yaml --from~~file deployment.yaml`이렇게 쓰면 'data:' 의 키값으로 deployment.yaml 이 들어간다.

`kubectl create configmap my~~config config=config.yaml -dry~~run ~~o yaml --from~~file test=deployment.yaml`  → test 이렇게까지 써주면 파일명 대신 test란 이름으로 config키가 설정된다. 

`~~-from~~literal key=value` 옵션을 주면 data: 밑에 바로 등록이 된다.



### API 리소스 - Secret

* 패스워드, ssh key, API key 등을 주입하기 위해 사용. 안전하게 저장되는건 아니다. Base64으로 그냥 플레인하게 저장되어있다. Binary도 지원한다. etcd 에 접근가능하면 아무나 읽을 수 있다. KMS로 관리해야 진짜로 안전. RBAC(role based access control) 리소스을 통해 시크릿을 콘테이너와 분리할 수 있다. 

* 여러 종류의 시크릿의 사용방법

	* Opaque (generic) 일반. kubectl get 를 통해 바로 사용가능

	* dockerconfigjson - 도커 이미지 저장소 인증 정보

	* tls → 파드나 서비스 등에서 암호화를 위해 필수!

	* service~~account~~token - ServiceAccount 인증 정보 (RBAC할때 필요함)

* kubectl 로 생성

`kubectl create secret generic my-secret` →  generic은 타입이다. 

`kubectl create secret generic ~~-from~~file secret.yaml`  yaml 에 정의해놓고 쓰는법 이것 도 역시 드라이런을 활용할 수 있다.

* 실습

```

envFrom:

- configMapRef:

    name : mysql-config #기존 사용

- secretRef:

    name : mysql-secret #키를 두번 설정하면 아랫께 오버라이드

```

apply하고

```

   valueFrom:

      secretRef: // 이렇게 또 키로 참조

```

그냥 뭐 ConfigMap 쓰는걸아 비슷하네



type: docker-registry 도 비슷하게 쓰면 되는데 imperative하게 선언하는 방법

```bash#!/usr/bin/env sh

kubectl create secret docker-registry docker-registry \

  --docker-username=fastcampus \

  --docker-password=fastcampus \

  --dry-run -o yaml

```



```

    spec:

      imagePullSecrets:

      - name: docker-registry // 이렇게 설정하면 여기서 들고 오게 된다.

```

@팁 퍼블릭 이미지는 레이트 리밋이 걸려있으므로 시크릿으로 만들어서 사용하면 속도개선



type:tls 만들어서 저장하기

```bash

openssl req -new -newkey rsa:4096 -days 365 -nodes -x509 -subj "/CN=fastcampus.com" -keyout cert.key -out cert.crt



kubectl create secret tls my-tls \

  --cert cert.crt \

  --key cert.key \

  --dry-run -o yaml

```



Secret을 코드로 관리하게 되면 의미가 없어진다. 따라서 두가지 방법

1. external secrets

	* 시크릿관리 백엔드와 연동하여 프로바이더에게 기밀값을 가져오는 방식

1. Sealed secrets

	* kubeseal CLI 를 통해 암호화를 하고 컨트롤러가 복호화한다. 

	* 파일로 관리해도 평문이 노출되지 않는다.

	

### Namespace ResourceQuota LimitRange

* 네임스페이스 - 일반 언어 네임스페이스와 다르지 않다. 논리적 구분 + 논리적인 그룹에 대하여 CPU, MEM 등 리소스 제한을 둘 수도 있다. 환경에 따라 구분  (팀, 환경, 서비스 단위)

	* 네임스페이스 범위 API 리소스 조회  `kubectl api~~resources -~~namespaced=true `

		* 종속적인 리소스들 event, pods, 

	* 클러스터 범위 API 리소스 조회  `kubectl api~~resources -~~namespaced=false`

		* namespaces, nodes, 

* 클러스터 기본 네임스페이스

	* 기본은 default, `kube-system` 쿠버 시스템에 의해 생성되는 API 오브젝트를 관리하기 위한 스페이스

	* `kube-public` 클러스터 모든 사용자로부터 접근 가능하고 읽을 수 있는 오브젝트

	* `kube~~node~~lease` 쿠버 내부 시스템이 사용하는 영역

* 다른 네임 스페이스의 서비스에 접근하는법

	* 	FQDN(Fully Qualified Domain Name), Domain Search 옵션

`curl ${service}.${namespace}.svc.cluster.local`→ FQDN 레벨의 서치, 이게 resolve.conf에 설정되곤 하는데 

이런 도메인 서치 옵션들이 하는건 curl my-service 하게되면 알아서 FQDN부터 해서 순차적으로 넓은 범위로 쿼리를 한다.

* 실습환경 구축 및 테스트

```

kubectl create namespace a

kubectl create namespace b

kubectl apply -f . -n a // 이렇게 하면 같은 내용으로 두 개의 네임스페이스가 생성됐다.

kubectl apply -f . -n b #-n은 네임스페이스를 지정하는 옵션

```

 →  `kubectl get all -n a` → minikube ssh → curl http://hello.a.8080

→ curl http://hello.b.svc:8000 해도 잘 됨. 

* 자원제한 (@TODO: 나중에 많이 필요할듯)

	* ResourceQuota , LimitRange

		* 사용량의 합을 제한 ( 할당 자원의 <CPU, MEM, VOL>총합 재헌, 생성하는 리소스<POD, Service,  Deployment> 의 개수 제한)

	* 	LimitRange는 자원할당량의 기본, 최소, 최대를 설정한다.

	type:Container 타입을 자주 많이 쓴다.

* 컨테이너에 리밋을 걸면 파드에도 상위 리소스의 값을 상속해서 알아서 제한이 걸린다. 



### Job과 CronJob

* 지속적으로 실행되는 서비스가 아니라 특정 작업을 수행하고 종료해야 하는 경우에는?

* 특정 동작을 수행하고 종료하는 작업을 정의하기 위한 리소스, 데이터 백업, 점검, 알림전송에 사용

```

apiVersion: batch/v1 

kind: Job

spec: 

  template: #DEP도 파드를 가질때 템플릿을 사용헀다.

    sepc:

      restartPolicy: Never #잡을 만들때는 반복시도 하지마

      containers:

      - name: hello ...(중략)

```

JOB은 파드처럼 알아서 레이블과 레이블 셀렉터를 만들어준다. 다만 특별히 조정하고 싶을땐 직접 셀렉터를 설정해주면 된다.

* 패러렐리즘 (동시실행횟수)

```

kind: job

spec: 

  completions: 10 #타겟횟수

  parallelism: 2 #동시진행

``` 

`kubectl logs job/hello` 이렇게 조회 `kubectl get job`

* 데드라인

```

sepc:

  activeDeadlineSeconds: 3 #최대 수행시간

```

실패하면 Completed 가 아닌 Terminated가 된다. 



* kind: CronJob → 파드의 템플릿 구조를 그대로 사용.

```

  schedule: "/1 * * * *"

  successHistoyLimit

  jobTemplate:

    spec:

      template:

        spec:

          restartPolicy: Never

          container:

          - name: hello

          image: ubuntu:focal

          command: ["sh", "-c","echo Hello $(date)!"]

```

	* 이 구조는 `DEP -> ReplicaSet ~~> pod <~~ job <- Cronjob` 로 파드를 감싼다고 보면 된다.



### API 리소스 - DaemonSet

* 각 노드마다 꼭 실행되야 하는 워크로드(로그 수집, 메트릭 수집, 네트워크 구성)이 있다면?

* 클러스터의 모든 노드에 동일한 파드를 하나씩 생성한다.  

	* filebeat, fluentbit 로그수집

	* node-exporter, metricbeat, telegraf 메트릭수집

	* kube-proxy, calico 네트워크 구

* Label Selective 하게 동작가능하고 모드도 지정할 수 있다.

```yaml 

kind: DaemonSet

(중략)

spec:

  selector:

    matchLabels:

      app.kubernetes.io/name: filebeat

(중략)

      containers:

      - name: filebeat

        image: docker.elastic.co/beats/filebeat:7.15.0

(중략)

        - mountPath: /var/lib/docker/containers #모든 컨테이너에 접근할 수 있게 되었다.

          readOnly: true

(중략)

        hostPath:

          path: /var/lib/filebeat-data #데이터를 쌓기 위해 

          type: DirectoryOrCreate 

```

보통은 파일로 저장하는데 ConfigMap 보면 그냥 콘솔로 아웃풋을 출력하게 해놨다. 실제로는 그렇게 운영하지마!



### API 리소스 - Ingress

* 소개 - 외부로부터의 요청에 대해 TLS 및 라우팅 관리가 필요한데. 인그레스는 L7에서 처리할 수 있게 해준다. 인그레스가 HOST, 앱과 PATH를 읽어서 서비스로 전달하고 서비스에선 LoadBalancer 를 한다. 

* ingress 리소스는 있는데, 컨트롤러는 없어서 별도로 설치를 해야한다.

	* 인그레스 컨트롤러 역할을 할 수 있는 앱이 많기 때문이다. eg. NGINXINX, Kong ingress, AWS LBC, GoogleLBC

* 	인그레스 클래스는 - 하나의 클러스터에서 여러 인그레스 컨트롤러를 쓸 수 있게 해주는 리소

	* 인그레스컨트롤러 + Configuration 

* `minikube addons enable ingress` → kubectl get ns → kubectl get ingressclass 

* path.yamlml 을 적용하고 나면 kubectl get inginxress 에서 처리하고 있는 패스가 보인다. 



```yamlspec:

  ingressClassName: nginx

  rules:

  - http:

      paths:

      - path: /hello

        pathType: Prefix

        backend:

          service:

            name: hello

            port:

              name: http

```

→ 가장 기본이 되는 패스 기준 인그레스 처리



```yaml

spec:

  ingressClassName: nginx

  rules:

  - host: hello.fastcampus // 이렇게 호스트 헤더에 따라 라우팅도 한다. 실제로 할때는 curl로 헤더값을 넣는게 아니라 클러스터 상에 도메인 설정읋 해서 해야한다.(이게 뭔소리야)

    http:

      paths:

      - path: /

        pathType: Prefix

        backend:

          service:

            name: hello

            port:

              name: http

```

→  인그레스의 핵심이 되는 설정



```

spec:

  ingressClassName: nginx

  defaultBackend: #나머지 요청을 처리하도록 등록

    service:

      name: httpd

      port:

        number: 80

```

→  요약을 하면... 인그레스 쓰고 싶은거 골라서 정의하고 어떻게 쓸지 yaml 로 정의해주면 된다 이거지



### 파드의 배치 전략 - Node Selector

* 파드를 만드는데 어떤 Node에 배치할지는 전략모델에 따른다. 

	* minikube 로 멀티노드 클러스터를 구성해서 파드를 만들어볼것입니다!

* `NodeName` 을 이용해서 배치하면 강직성이 높아져 추천하지 않는다. 정확히 지정한 이름의 쿠베에 들어간다.

* `NodeSelector`를 이용해 Label Selector 기반 배치

	* 노드를 구성할때 Kubelet 옵션을 통해 기본 레이블 설정 가능

	* `kubectl label node minikube~~m2 team=red`  이렇게 레이블 설정 뺄때는 `team~~`

	* 실제로 셀렉트 할때는

```dep.yaml

nodeSelector:

  team: red #미니쿠베 2-3번에 `team-red`을 주었다.

```

이런 구조에서 `kubectl apply -f deployment.yaml`을 하면 귀신같이 red에만 달라붙는다. 



### 파드의 배치 전략 - Node Affinity

* affinity (선호도)

* nodeAffinity 확장된 Label Selector

	* Hard(required)조건, Soft(referred)조건이 존재한다. ignoredDuringExecution(이미 실행 중이라면 이 규칙을 무시한다). 실행중인 워크로드 , 즉 deployment 카인드로 별도로 배치를 했다면 무시한다는거다.  Scheduling 중에 적용되는 전략이다. 

```dep_required.yaml

kind:deployment: (...중략)

  affinity:

        nodeAffinity:

          requiredDuringSchedulingIgnoredDuringExecution:

            nodeSelectorTerms:

            - matchExpressions:

              - key: team

                operator: In

                values:

                - blue

                - red

```

	* 소프트룰에선 weight 는 40~100으로 설정하여 가중치를 조정 



* podAffinity ( 띄어져 있는 pod 위치에 가점)

	* 여기도 하드, 소프트 조건이 존재. 토폴로지 키 (Topology Key)가 중요하다. 

	* 노드, 존, 리전 세가지 키가 존재하는데 미니쿠베에서는 설정불가능. 

	* 존 → age, 리전 → aws리전, 노드 → 호스트네임

```yaml

     affinity:

        podAffinity: 

          preferredDuringSchedulingIgnoredDuringExecution:

          - weight: 100

            podAffinityTerm:

              labelSelector:

                matchExpressions:

                - key: app

                  operator: In

                  values:

                  - mysql

              topologyKey: kubernetes.io/hostname

              # topologyKey: topology.kubernetes.io/zone

              # topologyKey: topology.kubernetes.io/region

```

* podAntiAffinity (안띄어져 있는 pod 위치에 가점)

	* 반드시 중복해야하는것(hard), `requiredDuringSchedulingIgnoredDuringExecution`

	* 선호하는 조건 soft `preferredDuringSchedulingIgnoredDuringExecution` 으로 쓴다.

	* [규칙이 하나 밖에 없으면 의미가 없다.]

### 파드의 배치 전략 - Taint와 Toleration

* Taint(얼룩), 임의의 파드가 할당되는 것을 방지

* Toleration(용인) 정의한 노드에 대해 면역을 가지고 배치를 할 수 있다.  톨러레이션을 주면 무시하고 들어간다.

```yaml

    spec:

      tolerations:

      - key: role

        operator: Exists // 구분자 exist 면 그냥 다 적용해버린다.

```

* taint를 관리하는 방법에는 kubectl, kbl 



`kubectl taint node minikube-m02 role=system:NoSchedule`  해당 노드에 노스케쥴 테인트 추가

`kubectl taint node minikube~~m02 role=system:NoSchedule~~`  해당 노드에 노스케쥴 테인트 제거

`kubectl taint node minikube~~m02 role~~`  해당 노드 모든 테인트 제거 



* Effect 효과

`NoSchedule`  파드를 스케쥴링하지 않 기본적인 테인트의 목

`NoExecute`  파드의 실행을 허용하지 않음

`PreferNoSchedule`  파드 스케쥴링을 선호하지 않음




---

# Chapter04. Kustomize를 이용한 쿠버네티스 매니페스토 관리 (이하 kust)

**Helm에 대해 정리**

차트 - 헬름의 패키지.  (패키지에는 애플리케이션, 도구, 서비스를 구동하는데 필요한 리소스가 포함. like YUM RPM (Redhat Package Manager) 디펜던시를 설치해주고 실제 목적했던 프로그램도 설치

저장소 - 차트를 모아놓고 공유하는 장소.

릴리즈 - 클러스터에서 구동되는 차트의 인스턴스. 차트는 여러번 실행될 수 있다. 

`helm install[릴리즈][차트]` 의 형태로 설치할 차트를 명령할 수 있다. 

`helm show values` 이걸로 차트의 구성정보를 확인하고 차트를 커스터 마이징하게 된다.

릴리즈를 업데이트, 삭제, 롤백을 할 수 있다.



## 01. KUST 소개

* Kubernetes 매니페스트를 효율적으로 관리하기 위한 오픈소스 도구

YAML을 보존한채 변경본(patch)을 만들어 사용할 수 있는 것을 목표로함. 다른 툴 Helm 은 Chart를 쓰는걸 도와주는데 둘 중에 하나를 쓴다. Kustomize가 쉽다. Helm 은 템플릿을 만들어서 변수를 넣어 완성하는 방식. 

* 원본이 유지됨에 따라 base가 되는것도 언제든 apply가능한 상태

* kustomization.yaml 

: Kustomize가 사용하는 매니페스트, Base 매니페(기본설정만 구성됨)-오버레이 매니페(변형을 위해 사용됨)로 나뉜다. 누군가의 Base가 될 수 있다. 도커의 layer랑 비슷하네. 오버레이 값은 베이스가 되는걸 덮어쓰는 방식으로 동작한다. 

* 주요 명령어

 `kustomize create`  kustomize build . (yaml을 해석하여 쿠버네티스 매니페스트 출력) 

`kustomize build [url]`URL을 통해 원격에 위치한 customisation.yaml 을 해석하여 쿠버네티스 매니페스트 출력

`kustomize build . | kubctl [apply|delete] -f -`

kustomize 는 매니페스토를 표춘출력만 한다. 그래서 이렇게 kubctl에 흘려줘야함.

* kubectl에 통합되어서 바로 사용가능

```bash

kubectl kustomize .

kubectl apply -k .

kubectl delete -k .

```



## 02. 메타데이터

* 실습

```kustomization.yaml

apiVersion: kustomize.config.k8s.io/v1beta1

kind: Kustomization



resources:

- pod.yaml // `resource` 키워드로 yaml을 묶을 수 있다. 

- rbac.yaml



namespace: fastcampus // 변형 코

```

여기에다  뭘 적으면 이제 pod, rbac yaml 에 네임스페이스가 등록된다.

* namePrefIx, nameSufix 를 이용해 리소스의 이름에 뭘 달아줄 수 있다.

```

CommonLables:

  ownner: claud

  department: devops

```

이렇게 레이블을 달아주는데도 유용



## 03. Replica and Images

* 이제 annotation, namespace 등을 모두 공용으로 지정해줘서 더 짧은 코드로 더 풍부한 정보를 줄 수 있지?

```yaml

resources:

- grafana/ // 디렉토리를 리소스로 지정할땐 각 디렉토리에 kustomization.yaml 이 있어야 한다. 각 리소스를 실행한 결과를 리소스로 사용하게 된다. 

- hello/

```

```yaml

replicas:

- name: grafana // 이렇게 하면 각 앱의 정의는 앱.yaml에서, replica만 kust로 관리하게 된다.

  count: 2

- name: hello

  count: 1

``` 



* `images:`  이미지 레지스트리의 위치 변경, 이미지의 버전변경에 사용가능하다. 이미지와 버전을 kust에서 관리할 수 있단 뜻. 각 앱의 정의는 이미지에 대해 신경쓰지 않고

```yaml

images:

- name: grafana/grafana

  newTag: "8.2.2"

- name: nginxdemos/hello

  newName: nginx

  newTag: "latest"

```



## 04. ConfigMap과 Secret, Generator

```yaml

configMapGenerator:  #ConfigMap을 직접 관리하면 힘드니 만들어진 기능

- name: mysql-config

  literals:

  - MYSQL_DATABASE=devops

  envs:

  - mysql.env

- name: test-files

  files:

  - files/test1.txt  // 이렇게 정의하면 밸류만 지정하면 경로가 키가 된다. 

  - test2.txt=files/test2.txt // 좌측이 키, 우측이 밸류가 된다.



secretGenerator:

- name: mysql-secret

  literals:

  - MYSQL_ROOT_PASSWORD=fastcampus



# These labels are added to all configmaps and secrets. 제너레이터와 관련된거 모두에 추가된다. (위쪽 제너레이터)

generatorOptions:

  labels:

    env: dev

  annotations:

    managed_by: kustomize

  # disableNameSuffixHash is true disables the default behavior of adding a

  # suffix to the names of generated resources that is a hash of

  # the resource contents.

  # disableNameSuffixHash: true

```



* from literals 환경변수를 키밸류로 하나하나 정의

* from env 파일을 읽어서 변수로 정의(파일 안에서  키밸류로 정의)

* from files:   

* kust로 생성된 빌드 내용들엔 해시값을 쓰라는 정의가 없는데 빌드하면 붙어서 나온다.  여기서 나오는 해시들은 제너레이터가 출력값에 따라 해시값을 다르게 가지게 된다. 내용 변경없이 실행하면 계속 같은 해시값이다.

	* 해시를 추가하는 이유는 디플로이먼트 객체가 configmap을 참조할때 configmap있는 계정과 패스워드가 바뀌게 된다면 디플로이는 알 수 없어서 가만히 있는다. 하지만 해시를 해성성하고 있다면 변경을 감지하고 디플로이가 파드를 업데이트 할 수 있다.

	* 이런 동작은 항상 장점이 되지는 않는다. 일부러 해시붙이는 기능을 disable 할 수 있다.

* `kubectl exec -it deploy/mysql bash` 명령어로 파드에 붙고  `cd temp; cat test; 하면 환경변수나 볼륨을 확인할 수 있다.



## 05. Patches

* base, dev, prod 각 폴더로 patchesStrategicMerge 를 통해 실습

```kust.yaml at dev

resources:

- ../base // 베이스를 참조한다.



namePrefix: dev-



patchesStrategicMerge:

- resources.yaml

- service.yaml

``` 



```resource.yaml at dev

apiVersion: apps/v1

kind: Deployment

metadata:

  name: hello // 여기까지 앱버전, 카인드, 메타데이터는 세가지값을 명시하면 머지를 수행할때 어떤 머지의 대상인지 판별하는 기준이 된다. 그 다음부터 쓰는 데이터들은 패치의 대상

spec: // 이미지 이름이라던가 기본적으로 써야할게 다 빠져있다. 이정보는 merge를 통해 가져온다.

  template:

    spec:

      containers:

      - name: nginx

        resources:

          requests:

            cpu: 100m

            memory: 64Mi

```

base에서 설정하는 속성, patch에서 설정하는 방법을 구분하여 머징한다. → patchesStrategicMerge

이렇게 설정해놓고 `kubectl apply  -k dev` 로 클러스터에 적용



* 패치 메소드 2 

```base/service.yml

apiVersion: v1

kind: Service

metadata:

  name: hello

  labels:

    app: hello

spec:

  type: ClusterIP

  ports:

  - name: http

    protocol: TCP

    port: 8080

    targetPort: 80

  selector:

    app: hello

```



```/prod/kustomization.yaml

resources:

- ../base



namePrefix: prod-



patchesStrategicMerge:

- resources.yaml



```



```resource.yaml at prod

spec:

  template:

    spec:

      containers:

      - name: nginx

        resources:

          requests:

            cpu: 300m

            memory: 128Mi



```



* 위와같은 작업을 json으로도 할 수 있다.

	*  JSON 방식으로 할때는 `target`을 지정해줘야 한다. 

```dev/kustomization.yaml at

apiVersion: kustomize.config.k8s.io/v1beta1 // 적용대상은 이 앱!

kind: Kustomization



resources:

- ../base



namePrefix: dev-



patchesJson6902:

- target:

    version: v1

    kind: Deployment

    name: hello

  path: resources.yaml // (1) 리소스를 참조해서 적용하게 하게 한다고

- target:

    version: v1

    kind: Service

    name: hello

  path: service.yaml

```

op 엔 add replace 등등 많으니 문서 참고



```dev/resource.yaml

- op: add

  path: /spec/template/spec/containers/0/resources // (2) 이 항목에 values를 넣어라.

  value:

    requests:

      cpu: 100m

      memory: 64Mi

```



``` base/deployment.yaml

    spec:

      containers:

      - name: nginx

        image: nginxdemos/hello:plain-text

        ports:

        - name: http  // (3) 이 레벨에서 values의 값이 입력된다.

          containerPort: 80

          protocol: TCP



```



### 이번 이챕터요약

→ kubectl 가 Kubernetes 를 통제하기 위한 명령어였다면 kustomization은 kubectl을 좀 더 유연하고 코드 생상성을 높히기 위해 사용하는 것이다.




---

# CAHP5 쿠버네티스 관리 도구

## kubectx를 이용한 쉬운 컨텍스트 전환

* `kubectl config get-contexts` 를 통해 보면 EKS를 통해 만들어진 컨텍스트, minikube 를 통해 만들어진 네임. 여러가지가 있을 수 있다.

	**cluster + user + namespace 3개의 합이**컨텍스트*

* `cat ~*.kube*config` 에서 컨텍스트를 볼 수 있다. 

	* kubectl 로도 컨텍스트를 바꿀 수도 있는데, kubectx가 더 간단하다.

* `kubectx fastcampus`  컨텍스트 변경

* `kubens`명령얼 통해 네임스페이스 목록을 출력

	* kubectl get pod  같은걸 할때 default 를 지정해놓은걸로 자동으로 타겟이 지정된다. 디폴트를 안썼으면 아무것도 안나옴. `kubectl get pod ~~n kube~~system` 처럼 다 쓰지 않고도 명령어 수행가능

	* `kubeens` 로 네임스페이스를 바꾸면 간단하게 사용 가능 굳



## kail을 이용한 쿠버네티스 서비스 접촉

* kail은 로그를 보는데 사용한다. 

* kail의 Selectors 옵션 잡이름, 노드이름, 서비스 이름 을 기준으로 셀렉터하여 로그를 볼 수 있다.

* Combining Selector

	* 예를 들어 `mail ~~-rs workers -~~rs db` 이렇게 두번 쓰면 OR로 동작한다.

	*  `mail ~~-svc front -~~deploy back`  둘다 다른 옵션을 쓰면 AND 로 동작한다.

* other flags

	* `--since 12h` 특정 시점에서 로그를 보여주기 때문에 자주쓴다. 옵션 안주면 실시간 로그를 ㅁ

* 그냥 kail만 하면 디폴트 네임 스페이스로의 로그를 수집

* 예를 들어 kubectl get svc 를 통해 서비스를 보고 그중에 hello를 보고 싶어.. 그런데 지금은 로그가 없네

그러면 `kail ~~-svc hello -~~since 12h` 쓰면된다.

* `-n` 은 네임스페이스 지정



## kubefwd를 이용하여 로컬에서 쿠버네티스 서비스 접속

* 개발자가 로컬에서 쿠버네티스 환경을 구축할때 사용하면 좋다.

* 쿠버네티스 안에서의 로컬 DNS는 개발자와 로컬 환경과 구분되어 있어서 접근이 안된다. 그걸 하려면 서비스에 인그레스 설정을 따로해야겠지. 애초에 열라고 만든것도 아니잖아

* kubefwd를 이용하면 공공 DNS에 요청하기 전에 먼저 응답받을 수 있다.

* `sudo kubefwd svc ~~all~~namespaces`를 수행하면 모든 네임스페이스로 부터 서비스를 가져다가 포트포워딩을 벌크로 진행한다.  ( 포트포워드는 관리자 권한을 요구한다) 이제 로그가 막 찍히는데

* `kubernetesectl get svc ~~all~~namespaces`로 서비스 목록을 받아보고 비교해보면 포트포워드된걸 확인할 수 있다.

* `curl nginx:80` 이러면 통신이 되지? 접속안해도 바로 된다! 굿

* `sudo -E kubefwd svc -n fastcampus` 이렇게 서비를 특정하여 포워드를 할 수도 있다. 

* mac 이나 윈도우에서 포워딩이 되면 서비스를 브라우저에서도 확인할 수 있으니 훨씬 좋다.. (아하)



## k9s : CLI 클러스터 관리 툴

* 문서에 있는 옵션들 꼭 읽어보길

* GUI환경에서 쿠버네티스에 속하는 리소스들을 볼수 있다.

* metris-server 애드온 설치하면 됨 리소스 사용량 조회가능

* 파드에 대한 조작 명령어들도 지원

* `popeye`를 통해서 현재 상태를 체크할 수 있다. (왜 점수가 그렇게 나왔는지도 나옴)



## Lens 이용하여 GUI 앱으로 쿠버네티스 클러스터 관리

* brew install lens 

* connect

* config - Lens Metrics (클릭하나로 관측 시스템을 구성할 수 있는게 장점)

	* 전문적으로 또는 개별적인 서비스가 필요하다면 직접 구성하는걸 추천한다.

* 쉘에 바로 접속을 하거나 리소스 사용량, 히스토리 조회 가능

* 실시간으로 Replica도 늘릴 수 있고 

* 여기서 변경을 하면 yaml에 반영이 되나?

* Network-service에서 포워드를 끄고 켜고 할 수 도 있다. 

* Event도 유용

* 개발자들한테는 lens를 추천. 쉽게 접근할 수 있으니까.



# Part 6 CI/CD 구현

## Chapter 1 CICD

* CICD's ideal

	* 잘 관리된 코드베이스

	* 빠른 머지 빠른 제공

	* 베이스라인에 매일 작업들이 커밋되고 배포되어야

	* 모든 커밋은 테스트를 거쳐야 한다.

	* PRD환경을 클론한 스테이징 환경

* CICD → Continuous delivery

	* 계속 자동으로 배포가 된는 구조의 문제점을 극복하기 위해 더 확장된 개념. 비즈니스적 관점을 추가한것.

	* 예를 들어 임베디드 제품이라면? 디펜던시가 있는 프로젝트라면? 특정 시점에 배포를 해야한다면? 이런 니즈를 처리하는게 Delivery

## Chapter 2 AWS IaaS CI/CD

* 	젠킨스 장점

	* 커뮤니티가 활성화 되어 있고, 플러그인이 다양하게 준비된다. 클러스터가 되고 확장성이 높다. JVM 기반 구동

* 	젠킨스 실습

```bash

// 도커로 정의 후 실행

```

플러그인 검색, SMTP 설정, 깃허브 설정, 크레덴셜 등록(AWS API 콜을 위한), 

* 파이프라인 잡을 만들고 여기에서 스크립트로 잡을 구성했다.

## 젠킨스 파이프라인

* 2.0 이후부터 추천한다. 프리스타일 잡들이 단일 잡에 특화되어있으므로 파이프라인은 복합적 작업을 위한 기능

* 두가지 타입으로 작성가능. 

	* 스크립트 타입 파이프라인 (groovy, JAVA API 호출)



## Chapter 3 AWS SaaS CI/CD

## Chapter 4 외부 SaaS를 이용한 CI/CD

## Chapter 5 kubernetes CI/CD



# Part 7 모니터링 서비스 및 운영 구현



# Part 8 AWS 기반 보안



# bonus Part AWS EKS



#devops/Mainline