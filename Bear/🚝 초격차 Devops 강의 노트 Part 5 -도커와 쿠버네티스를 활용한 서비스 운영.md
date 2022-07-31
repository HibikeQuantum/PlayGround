# 🚝 초격차 Devops 강의 노트 Part 5 -도커와 쿠버네티스를 활용한 서비스 운영-

#Devops/lesson #lesson

---

# Part 5 도커와 쿠버네티스를 활용한 서비스 운영

## CH01 개요 및 실습 준비

### CH01_01 개요

*컨테이너 기술의 발전*

1. Season Traditional:  동일한 바이너리에 대해 한가지 버전의 라이브러리만 사용할 수 있다. →  앱1, 2, 3이 다른 의존성을 가지고 싶을때 트리키한 방법을 썼어야 헀다.  → 효율성과 확장성이 낮아졌다.

2. Season Virtualized: 가상화를 통해 어플리케이션을 샌드박싱 → 하이퍼바이저가 게스트 OS 실행하여 독립된 실행환경을 보장. → 오버헤드 문제, 성능이슈 발생

3. Season Container: 게스트 운영체제 없이  호스트 OS의 커널을 공유하여 샌드박싱 구현(chroot) → App Binary와 Library만 컨테이너에 들어감 성능개선 → 도커가 컨테이너를 돕는 엔진이라고 볼 수 있다.

4. Season Kubernetes: 여러 도커를 관리할 수 있도록 돕는 시스템. 도커 클러스터링. 구글개발. 

### CH01_03~07 환경구성 및 미니쿠베

_docker, docker-compose, kubectl, kustomize,  minikube_

🐭 rehash: Re-computes the internal hash table.

Kubernetes v1.23



## minikube

: 학습하는 입장에서 여러가지 심플한 쿠버네티스 여러개를 구성할 필요가 있다. Driver라는 개념을 통해 원하는 가상환경을 구성가능.

* 자 시작 명령어!

`minikube start --node 3 --driver=docker`

* 사용방법 

	* clusters, users, contexts: 클러스터와 유저의 결합을 담당

```

minikube start --driver docker //미니 쿠버를 이용해 Kub클러스터 생성

cat ~/.kube/config

~> "current-context: minikube" // 현재 사용중인 컨텍스트

kubectl cluster-info  // 현재 어디에서 control-plane이 실행되고 있는지 DNS위치도 조회

```

* 기본적인 명령어

`minikube [status/delete/pause/unpause/pause/stop]`

* 많이 쓰는 명령어

`minikube addons list`

`minikube addons enable ingress`  // 애드온 활성화

`minikube ssh`  // kubectl로 볼 수 있는 노드에 접속

* 😱미니쿠베의 kubectl 버전과 kubectl 버전이 다를 수도 있다.



### CH01_08 테라폼 코드를 이용하여 AWS 실습환경 구성

1. Dk 및 DkCompose, kubectl, minikube, 등등 설치를 포함한 Prv을 포함하는 .tf 실행을 통해 실습환경 구축



## 도커를 이용한 컨테이너 관리

### 도커 이미지와 컨테이너

*도커구성요소*

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

	* `docker rm`  `docker rm -f `  `docker run --rm` 

	* `docker container prune`  *중지된 모든 컨테이너 삭제* //가지칠때 쓰는 단어

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



`dokcer run -it --env-file ./sample.env ubuntu:focal env`

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

	* `docker run -d --expose 80 --name my-nginx nginx`  expose는 그냥 문서적인 용도 실제 패킷이 포워드 되진 않는다.

* 네트워크

	* `docker network ls`

	* 네이티브 드라이버(Bridge, Host, None, Overlay), 리모트 드라이버(3rd party)

	* Single Host Networking (bridge, host, none) / Multi Host Networking (클러스터 단계에서 실행할때 사용) 대표적으로 docker swarm

	* `docker -it --net none container`  이렇게 실행한 다음 `inspect` 해보면 네트워크와 드라이버가 none 이 되어있는걸 볼 수 있다. 네트워크기능이 필요없거나 프라이빗한 네트워크를 쓰고 싶을때 사용한다.

	* `docker -it --network=host grafana/grafana` 이렇게 실행하면 바로 호스트 네트워크 3000번에 바로 붙는다. `inspect` 해보면 별도의 IP가 없는 모습을 볼 수 있다.

	* 직접 브릿지를 만들기

		*  `docker network create --driver=bridge 2022campus`  

		* `docker run -d --network=2022campus --net-alias=hello nginx`  이렇게 하면 내부에서 도메인을 찾을 때 hello 를 쓸 수 있다. 이제 grafana 컨테이너에 들어가  `wget hello`를 하면 index.html 을 받을 수 있다. 반대로 nginx 컨테이너에 들어가 curl grafana:3000을 해도 .html문서를 송신하는걸 볼 수 있다. 

		* 호스트에서 `ifconfig` 를 해보면 veth, docker0 를 볼 수 있다.

			*  `br-...` 이건 직접 만든 브릿지다.



### 볼륨

* 도커 레이어 아키텍쳐

	* `docker build -t app .`  을 통해 base OS, apt Package, install pip, source Code, Update Entrypoint 이런 과정을 수행하고 이게 _Image Layers_ 이고 Read only

	* 도커는 이 각 단계를 레이어로 관리함으로서 작업수요는 줄인다. 

	* `docker run app`  을 통해 실행하면 _ContainerLayer_ 가 생겨난다. 이건 RW 

* 호스트볼륨

	* `docker -v /host/path:/guest/path`  이렇게 볼륨을 연결한다.

	* 컨테이너에서의 작업이 호스트의 디스크에 기록할 수 있다.

* 볼륨컨테이너

	* Data를 쓰기위한 컨테이너를 작성하여 사용, 앱이 Data-only의 볼륨을 마운트

	* `docker run --name my-volume -v /host/path:/guest/path focal`

	* `docker run --voulme-from my-volume`

	* 모든 셋팅된 컨테이너를 실행하면 다음 inspect 해보면 `source:... dest:...` 된걸 볼 수 있다. 

* 도커 볼륨

	* 도커가 제공하는 볼륨 관리 기능을 통해 데이터를 보존

	* `var/lib/docker/volumes/${volume-name}/_data` 에 저장이 된다.

	* 도커 볼륨 생성 `docker volume create --name db`  호스트 경로 대신 'db'를 쓰면 된다.

	* 도커 볼륨 마운트 `docker run -v db:var/lib/mysql containerId`

	* `docker volume inspect db`  이렇게 하면 현재 사용중인 볼륨을 볼 수 있고 ls 로 실제 위치에 존재하는 파일을 읽을 수도 있다.

* 읽기 전용 볼륨 연결

	* `-v db:/guest/path:ro`  이렇게 뒤에 ':ro' 를 붙이면 리드온리로 마운트된다.



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

	* `cat /var/lib/docker/containers/${container_ID}/${container-ID}-json.log`  로그가 json 키로 되어 있는걸 볼 수 있다. keys → log:, stream:, time:

* 로그 용량 제한

	* `docker run --log-driver=json-file --log-opt max-size=3m --log-opt max-file=5` 

	* 운영환경에선 필수로 해야하고 컨테이너 단위 뿐만 아니라 도커엔진에서 전체적으로 설정도 가능

* 도커 로그 드라이버

	* 이렇게 쌓은 로그들을 Centralized Log MNG 서비스 ( elastic, sematext, splunk, cloudWatch)에 쌓으면 된다.

	* json-file 은 파일기반, journald 는 리눅스 저널, syslog는 TCP-UDP, fluentd는 TCP를 통해 Log Shipper에 전달할 수 있고 Log Shipper는 CLM에 HTTP로 전달한다.

	* Splunk, Gelf, Logentries, CloudWatch, Google Cloud는 직접적으로 수집할 수도 있다.

### 이미지빌드

* 도커 이미지 구조

	* os → nginx → web app 이런 순으로 레이어를 쌓고 컨테이너를 실행하면 최종 이미지를 복사하고 RW Layer가 덮어진다.

	* 실행하고 나서 `inspect` 를 통해  RootFS-Layers에서 현 상태를 볼 수 있다. 

* 도커파일없이 생성

	* 컨테이너에 직접 들어가서 명령어를 수행한 다음 commit을 해서 이미지를 만들 수 있음.

`docker commit -a 2022campus -m "add my_file" my_ubuntu my-ubuntu:v1`

`sha256:a961....` 이미지 생성 확인.

	 * `inspect` my_ubuntu에 있었던 레이어가 봉니다. 기존 레이어를 따와서 재활용한다는걸 알 수 있다.

* 도커파일로 생성

	* [INSTRUCTION] [arguments] 구조로된 리스트

	* `docker build -t my_app:v1 ./`  -t 태그 지정 (디폴트 파일, Dockerfile 이용)

	* `docker build -t my_app:v1 -f example/MyDockerfile ./`  -f 도커 파일 지정 

	* Sending build context to Docker daemon → 중요한 메시지

	* 이후엔 명령어 수 만큼의 레이어가 생성됨을 알 수 있다. 이제 생성된 레이어들은 cache로 활용된다. 

* 빌드 컨텍스트

	* 명령 수행시 현재 디렉토리를 컨텍스트라고 한다. 복사같은 작업을 할때는 해당 디렉토리의 데이터들이 다 넘어간다. 그래서 용량이 커지는걸 알아야한다.  용량이 너무 큰게 있다면 ignore 활용

* .dockerignore

	* `*/temp*`

	* `!README.md` 같은 방법을 통해 빌드 컨텍스트에서 무시할 파일들을 지시할 수 있다. 



### Dockerfile

* 파일 문법은 reference 문서를 참고

	* `FROM ENV WORKDIR ADD COPY` 

	* 이때 ${VAR} 이렇게 호출되는 환경변수는 전부 컨테이너의 환경변수!

	* 빌드할때 값을 정의할 수도 있다. `ARG buildNo=1`

	* `docker build --build-arg user=what_user ` 이렇게 정의하면 사용할 수 있는데  `ARG user` 라고 정의해주기 전에 참조하면 에러. 컨테이너 변수와 빌드 변수가 겹치면 ENV 지시어가 우선된다.

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

	* `COPY --from=build /app/node_modules ./node_modules` 이전 단계에서 수행한 내용 (`npm install`의 결과물을 복사. 의존성이 커질 수록 이 효과가 커진다. 레이어를 효과적으로 관리하기 위해선 초반에 고정적이고 후반에 가변적인 명령어를 다뤄야 한다.



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

	* `docker-compose up`  docker run 과 유사 '-d' 백그라운드

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

	* `build-web-1` 여기서 1은 서비스 내에서 첫번째 인덱스를 의미

	* `docker-compose up --scale web=3`  스케일 업할때는 이런 명령어를 주면 된다.

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

* _What is Container Orchestration?_ - 여러 머신으로 구성된 클러스터 상에서 컨테이너를 효율적으로 관리하기 위한 시스템 (운영체제는 하나의 머신에서 프로세스를 관리하기 위한 프로세스 오케스트레이션 시스템이잖아) → 덕분에 사용자가 OS에 대해 신경을 쓸일이 적어졌다. 해방됐다!라고 표현하기도 한다.

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



### API 리소스

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

* `kubectl get po -all-namespaces`  이렇게 pods 자원의 현황을 조회 

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

`kubectl run -i -t ubuntu --image unbuntu:focal bash` 이게 이미지로 우분투 파드 생성

`kubectl expose deployment grafana --type=NodePort --port=80 --target-port=3000`

→ grafana dep 오브젝트에 대해 Nodeport 타입의 Service 오브젝트 생성. 노드포트에 3000번을 개방하라는 지시.

`kubectl set image deployment/frontend www=image:v2`  

→ frontend dep 의 www 컨테이너 이미지를 image:v2로 변경

`kubectl rollout undo dep/frontend --to-revision=2`

→ frontend dep 을 리비전 2로 롤백



* 선언형

`kubectl apply -f deployment.yaml`  정의된 매니페스토를 적용

`Kubectl delete -f deployment.yaml`   오브젝트 제거

`kubectl apply -k ./`  kustomization.yaml 을 위해 작성된 파일을 오브젝트 클러스터에 반영



* 실습

`kubectl create deployment grafana --image=grafana/grafana --port=3000` → DEP을 생성하는데 3000번을 열라고 '포드'에게 지시하는것

`kubectl expose deployment grafana --type=NodePort --port=80 --target-port=3000`

→ grafana DEP에게 '노드포트'에 3000번을 개방하라는 지시.

이렇게 노출과 노출이 결합이 되면 minikube에서 서비스가 열렸다고 알려준다. 



선언형으로는 `deployment.yml `, `service.yml`을 준비

`kubectl delete -f deployment.yml` 서비스는 노드포트 타입을 들고 있다. DEP은 앱에 대한 명세.



`unchanged` `configured`  `changed` 이미 적용된 상태라면 결과값에서 표시를 해준다.



* TIP

	* C R U D 작업은 선언형방식을 추천

	* SSH, log, port 개방 등은 선언형으로 관리

* *트러블슈팅용 명령어*

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

	* 두번째 방법 pod에 접근. `kubectl  run -i -t debug --image=posquit0/doraemon bash`  이제 클러스터의 쉘에 있으니 curl 가능

	* `kubectl exec -i -t hello bash`  도커와 마찬가지로 hello 이미지에 명령을 전달할 수 있다. 쉘을 켜면 된다.

* *멀티 컨테이너 파드, 사이드카 패턴*

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

`kubectl rollout undo deployment rolling --to-revision=1`  롤링으로 롤백을 수행

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

	* 서비스 네트워크 IP/PORT 정보 → 
```diff
+ spec.clusterIP:spec.ports[*].port
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

`kubectl run -i -t test --image=posquit0/doraemon bash` 이렇게 만들 다음 curl을 해보면 클러스터 내에서 통신이 가능하지

`kubectl cluster-info dump | grep -m 1 service-cluster-ip-range`

→ 클러스터 아이피를 볼 수 있고 수도으로 설정도 가능하다.

* NodePort를 외부에 노출하기

	* 서비스 네트워크 IP/PORT 정보 
```diff
+ <NodeIP:spec.port[*].nodePort
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

	* 서비스 네트워크 IP/Port 정보 
```diff
+ spec.loadBalancerlp:spec.ports[*].port
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

*envFrom 방법*

```

        envFrom:

        - configMapRef: #mysql-config맵 모든걸 가져온다.

            name: mysql-config

```

*configMapKeyRef 방법*

```

        env:

        - name: MYSQL_ROOT_PASSWORD

          valueFrom:

            configMapKeyRef: #키를 지정해서 가져온다.

              name: mysql-config

              key: MYSQL_ROOT_PASSWORD

```

apply 하고 나면  `kubectl describe cm` 을 통해 현재 관리되고 있는 ConfigMap 의 정보를 조회가능. `kubectl describe cm mysql`을 통해 현재 가지고 있는 환경변수 값을 조회 가능

*볼륨으로 쓰는법*

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

`kubectl create configmap my-config --from-file config.yaml` 이건  `#key=value` 구조로 들어간다.

`kubectl create configmap my-config --from-file config=config.yaml` // 이렇게 쓰면 'config'키가 파일을 바라보게 된다.

`kubectl create configmap my-config --from-file config=config.yaml -dry-run -o yaml `  드라이 런은 이렇게 하면 가짜로 실행하라는 의미. 클러스터에 반영이 안되고 어떤 결과를 내는지를 본다. -o (ou  tput) yaml 포맷. 의미 따라서 declarative한 사용에 필요한 값을 출력 받을 수 있다. 

`kubectl create configmap my-config config=config.yaml -dry-run -o yaml --from-file deployment.yaml`이렇게 쓰면 'data:' 의 키값으로 deployment.yaml 이 들어간다.

`kubectl create configmap my-config config=config.yaml -dry-run -o yaml --from-file test=deployment.yaml`  → test 이렇게까지 써주면 파일명 대신 test란 이름으로 config키가 설정된다. 

`--from-literal key=value` 옵션을 주면 data: 밑에 바로 등록이 된다.



### API 리소스 - Secret

* 패스워드, ssh key, API key 등을 주입하기 위해 사용. 안전하게 저장되는건 아니다. Base64으로 그냥 플레인하게 저장되어있다. Binary도 지원한다. etcd 에 접근가능하면 아무나 읽을 수 있다. KMS로 관리해야 진짜로 안전. RBAC(role based access control) 리소스을 통해 시크릿을 콘테이너와 분리할 수 있다. 

* 여러 종류의 시크릿의 사용방법

	* Opaque (generic) 일반. kubectl get 를 통해 바로 사용가능

	* dockerconfigjson - 도커 이미지 저장소 인증 정보

	* tls → 파드나 서비스 등에서 암호화를 위해 필수!

	* service-account-token - ServiceAccount 인증 정보 (RBAC할때 필요함)

* kubectl 로 생성

`kubectl create secret generic my-secret` →  generic은 타입이다. 

`kubectl create secret generic --from-file secret.yaml`  yaml 에 정의해놓고 쓰는법 이것 도 역시 드라이런을 활용할 수 있다.

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

	* 네임스페이스 범위 API 리소스 조회  `kubectl api-resources --namespaced=true `

		* 종속적인 리소스들 event, pods, 

	* 클러스터 범위 API 리소스 조회  `kubectl api-resources --namespaced=false`

		* namespaces, nodes, 

* 클러스터 기본 네임스페이스

	* 기본은 default, `kube-system` 쿠버 시스템에 의해 생성되는 API 오브젝트를 관리하기 위한 스페이스

	* `kube-public` 클러스터 모든 사용자로부터 접근 가능하고 읽을 수 있는 오브젝트

	* `kube-node-lease` 쿠버 내부 시스템이 사용하는 영역

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

	* 이 구조는 `DEP -> ReplicaSet -> pod <- job <- Cronjob` 로 파드를 감싼다고 보면 된다.



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

	* `kubectl label node minikube-m2 team=red`  이렇게 레이블 설정 뺄때는 `team-`

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

`kubectl taint node minikube-m02 role=system:NoSchedule-`  해당 노드에 노스케쥴 테인트 제거

`kubectl taint node minikube-m02 role-`  해당 노드 모든 테인트 제거 



* Effect 효과

`NoSchedule`  파드를 스케쥴링하지 않 기본적인 테인트의 목

`NoExecute`  파드의 실행을 허용하지 않음

`PreferNoSchedule`  파드 스케쥴링을 선호하지 않음



---

# Chapter04. Kustomize를 이용한 쿠버네티스 매니페스토 관리 (이하 kust)

*Helm에 대해 정리*

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

	* cluster + user + namespace 3개의 합이 *컨텍스트*

* `cat ~/.kube/config` 에서 컨텍스트를 볼 수 있다. 

	* kubectl 로도 컨텍스트를 바꿀 수도 있는데, kubectx가 더 간단하다.

* `kubectx fastcampus`  컨텍스트 변경

* `kubens`명령얼 통해 네임스페이스 목록을 출력

	* kubectl get pod  같은걸 할때 default 를 지정해놓은걸로 자동으로 타겟이 지정된다. 디폴트를 안썼으면 아무것도 안나옴. `kubectl get pod -n kube-system` 처럼 다 쓰지 않고도 명령어 수행가능

	* `kubeens` 로 네임스페이스를 바꾸면 간단하게 사용 가능 굳



## kail을 이용한 쿠버네티스 서비스 접촉

* kail은 로그를 보는데 사용한다. 

* kail의 Selectors 옵션 잡이름, 노드이름, 서비스 이름 을 기준으로 셀렉터하여 로그를 볼 수 있다.

* Combining Selector

	* 예를 들어 `mail --rs workers --rs db` 이렇게 두번 쓰면 OR로 동작한다.

	*  `mail --svc front --deploy back`  둘다 다른 옵션을 쓰면 AND 로 동작한다.

* other flags

	* `--since 12h` 특정 시점에서 로그를 보여주기 때문에 자주쓴다. 옵션 안주면 실시간 로그를 ㅁ

* 그냥 kail만 하면 디폴트 네임 스페이스로의 로그를 수집

* 예를 들어 kubectl get svc 를 통해 서비스를 보고 그중에 hello를 보고 싶어.. 그런데 지금은 로그가 없네

그러면 `kail --svc hello --since 12h` 쓰면된다.

* `-n` 은 네임스페이스 지정



## kubefwd를 이용하여 로컬에서 쿠버네티스 서비스 접속

* 개발자가 로컬에서 쿠버네티스 환경을 구축할때 사용하면 좋다.

* 쿠버네티스 안에서의 로컬 DNS는 개발자와 로컬 환경과 구분되어 있어서 접근이 안된다. 그걸 하려면 서비스에 인그레스 설정을 따로해야겠지. 애초에 열라고 만든것도 아니잖아

* kubefwd를 이용하면 공공 DNS에 요청하기 전에 먼저 응답받을 수 있다.

* `sudo kubefwd svc -all-namespaces`를 수행하면 모든 네임스페이스로 부터 서비스를 가져다가 포트포워딩을 벌크로 진행한다.  ( 포트포워드는 관리자 권한을 요구한다) 이제 로그가 막 찍히는데

* `kubernetesectl get svc -all-namespaces`로 서비스 목록을 받아보고 비교해보면 포트포워드된걸 확인할 수 있다.

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