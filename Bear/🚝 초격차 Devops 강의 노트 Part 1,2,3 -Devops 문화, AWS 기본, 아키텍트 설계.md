# 🚝 초격차 Devops 강의 노트 Part 1,2,3 -Devops 문화, AWS 기본, 아키텍트 설계-

#Devops/lesson #lesson 

---

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

*VPC, subnet, route Table, VPC peering, DHCP options, Virtual Gate, Internet Gateway* ⇒  비용 X

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

	* ./aws/config

	* aws sts get-caller-identity

* *calculator aws* 이런 서비스도 존재한다. 

	* 실습할때도 실무할때도 항상 계산하도록

* 하나의 서비스에 여러 서비스가 얽혀있어서 리소스 잔여물을 처리하기가 힘들다. AWS-NUKE 로 한번에 처리 가능

---



# 《Part 2》 AWS 기반 소규모 & 중규모 아키텍트 설계

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

    proxy***pass  [http://unix/home/ubuntu/django***nginx/](http://unix/home/ubuntu/django_nginx/) 

```



```gunicon

[program:gunicorn]

directory=/home/ubuntu/django_nginx

commnad=/usr/bin/gunicorn --workers 3 --bind unix:/home/ubuntu/django***nginx/app.sock django***nginx.wsgi:application

autostart:true

autorestart:true

stderr_logfile=/logs/gunicorn1.err.log

stdout_logfile=/logs/gunicorn1.out.log

``` 



*배포 명령* 

```shell

sudo gunicorn --bind 0.0.0.0:8000 django_nginx.wsgi:application

python3 manage.py runserver 0.0.0.0:8000

gunicorn --bind unix:/home/ubuntu/django***nginx/app.sock django***nginx.wsgi:application

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

`ecs create_service —cluster [NAME] --service-name --task-definition --vpc-configuration`

* 지우게 되면 ECS 도 같이 관리해주므로 EC2 에는 남는게 없다.

* 작업정의된건 비용이 안든다. 실행중인 작업만 신경써



* (직접 컴포즈를 작성하지않고) AWS CLI 를 통해 도커컴포즈 만들기

	* ECS vCPU 20개면 한달에 80만원

	* ECS CLI 가 별도로 존재, 도커 컴포즈와는 문법이 다름

	* *GPG*로 퍼블릭키를 통해 ECS CLI 에 권한 부여

		* `gpg -o ecs-cli [URL ecs-linux-latest.asc]`

		* `gpg --verify ecs-cli.asc /user/local/bin/ecs-cli`



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

	* *Cloud-trail*로 어떤 key를 어떻게 사용하는지 로그 남김

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

* *비용*

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

	* aws iam list-attached-user-policy 생성된 정책을 IAM 적용

	* aws iam create-role

	* aws iam attach-role-policy

	* 코드디플로이 - 어플리케이션 생성

	* 코드디플로이 - 배포그룹 생성 ( 배포를 어디에 해야할지 설정)

	* 코드디플로이 - 서비스 롤 입력, 에이전트 설정, 로드밸런스 설정

	* 그룹을 만들고 나면 배포그룹안에 있는 EC2에 대해 배포가 진행된다.

	* 배포생성 - 배포그룹 선택 - 어플리케이션을 깃헙에 저장 - repo 이름 커밋 ID 입력 (우측 상단 nuj91281)

	* 이제 코드를 끌고와서 배포를 하는데.. EC2로 하면 이것저것 CLI 로 건들게 많으니 불편하다. ECS로 하면 좋지

	* YAML 파일을 사용해 앱의 실행 중단 등의 시나리오 처리를 할 수 있다.





# 《 PART 3 》 AWS 기반 대규모 아키텍트 설계

## CHAPTER 1 RabbitMQ 

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

	* *매번 개발환경을 셋팅해야하는 참사는 이제 없다(!‼)*



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



channel.basic***consume(queue='order', on***message***callback=cacllback, auto***ack=True)

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

~/eb-flask$ eb init -p python-3.7 flask-tutorial --region us-east-2

~/eb-flask$ eb create flask-env

~/eb-flask$ eb open

~/eb-flask$ eb terminate flask-env

~/eb-flask$ eb deploy



* 생성시 선택가능 항목

	* 웹서버 환경, 앱 이름, 플랫폼 선택(파이선 버전), 어플리케이션(샘플,코드업로드)

* 바로 배포 가능. 간단해 보이지만 뒤에선 EC2와 보안그룹이 돌고 있다.

* 파이선은 안되지만 JAVA는 WAR 파일로 배포가능함

* 배포 과정

	0. EC2생성

	1. apt update, python3 설치,  export PATH=$PATH:/opt/aws/eb/linux/python2.7/

	2. export PATH=~/.local/bin:$PATH

	3. curl -O  [http://bootstrap.pypa.io/get-pip.py](http://bootstrap.pypa.io/get-pip.py) 

	4. pip3 install awsebcli --upgrade --user // awscli 도 설치

	5. awscli configure

	6. 처음에는 느리지만 적응되면 EC2에 직접 배포하는것 보다 빨라진다.

	7. 가상환경 만들기 install virtualev

	8. virtualenv ~/eb-virt

	9. source ~/eb-virt/bin/activate

	10. pip install django==2.2

	11. django-admin startproject ebdjango

	12. cd ebdjango

	13. pip freeze > requirements.txt

	14. mkdir .ebxtensions & cd .eb

	15. vi django.config

		1. option settings:

  aws:elasticbeanstalk:container:python:

  WSGIPath: ebdjango.wsgi:application

  /public: /public  //왼쪽으로 접근하면 오른쪽으로 처리한다.

	0. vi setting.py & allowed_hosts = "*"

	1. cd .. & deactivate  // 가상환경 exit

	2. eb init -p python-3.6 django-tutorial  // 배포할 EB환경을 생성한다. 이게 거의 80%

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

*Lambda*

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

	* *API를 손쉽게 생성, 게시, 유지관리, 모니터링 및 보안 유지할 수 있는 완전관리형 서비스*

	* 프론트에서 URL을 호출하는데 백엔드 호스트 주소가 변하게 되면 까다롭다. 그래서 그냥 무조건 게이트웨이로 가게하면 변경이 자유로워진다. 

		* gate/a → .com		gate/b → org  이렇게 라우팅 가능

	* 서비스의 구조가 자주 바뀔 수 있는 마이크로서비스의 경우 더 유용하다.

	* 람다를 트리거하기 위해선 필수

	* 제공 하는 서비스 대분류

		* HTTP API: 단순하고 싸고 빠르다.

		* REST API: 복잡하고 비싸고 느리다.

		* Web-socket API

* CORS 과정을 상세하게 컨트롤 할 수 있다.

	* Cross origin HTTP request

		* case 1) 다른 도메인에서 호출한다.  `http://fc.com 에서  http://fc.org를 호출한다?`

마이크로 서비스라면 이런걸 또 허용해야겠지(Standard 함수) ⇒  이런걸 허용하기 위한 인증작업을 CORS(cross origin resource sharing) 이라 한다. 

		* case 2) 다른 포트

		* case 3) 다른 프로토콜 http, https, ftp

	* 실제 호출 과정

		* 권한 체크 《클라이언트 → 서버》

			* 요청내용: OPTIONS

			* GET, Content-Types, Authorization, x-api-key

			* "난 너 URI 에 이런 타입으로 하고 싶어!"

		* 허용 《클라이언트 ← 서버》 

			* 요청내용: Access Method : GET, POST  , Content-type, Access-Control-Allow-Origin: *

			* "GET, POST 된다. 내가 허용할 오리진은 * 이다."

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

	* 우선 '경로' 생성 e.g) /shop/

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

	* shop/{id} 			// 패스 파라미터

		* 이게 요청되면 람다에서 받는 함수의 인자가 궁금해진다. 

⇒ jsonformatter 를 이용한다.

		*  [pathparameter.id](http://pathparameter.id)  항목

	* shop/1?filter=1	// 쿼리 파라미터

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

			* /first/shops

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

			* aws lambda add-permission --function-name … func:stable

			* aws lambda add-permission --function-name …  func:new

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

		* Mount: /mnt/msg

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