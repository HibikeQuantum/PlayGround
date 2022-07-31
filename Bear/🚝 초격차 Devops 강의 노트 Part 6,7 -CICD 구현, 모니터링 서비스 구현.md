# 🚝 초격차 Devops 강의 노트 Part 6,7 -CICD 구현, 모니터링 서비스 구현-

#Devops/lesson #lesson

---

# Part 6 CI/CD 구현

## Chapter 1 CICD

* CICD ideal point

	* 잘 관리된 코드베이스

	* 빠른 머지 빠른 제공

	* 베이스라인에 매일 작업들이 커밋되고 배포되어야

	* 모든 커밋은 테스트를 거쳐야 한다.

	* PRD환경을 클론한 스테이징 환경

* CICD 의 확장 `Continuous delivery`

	* 계속 자동으로 배포가 된는 구조의 문제점을 극복하기 위해 더 확장된 개념. 비즈니스적 관점을 추가한것.

	* 예를 들어 임베디드 제품이라면? 디펜던시가 있는 프로젝트라면? 특정 시점에 배포를 해야한다면? 이런 니즈를 처리하는게 Delivery

---

## Chapter 2 AWS IaaS CI/CD

## CH02-01 소개

* 젠킨스 장점

	* 커뮤니티가 활성화 되어 있고, 플러그인이 다양하게 준비된다. 클러스터가 되고 확장성이 높다. JVM 기반 구동

* 도커로 실행

* 플러그인 검색, SMTP 설정, 깃허브 설정, 크레덴셜 등록(AWS API 콜을 위한), 

* 파이프라인 잡을 만들고 여기에서 스크립트로 잡을 구성했다.

---

## CH02_02 젠킨스 파이프라인

* 버전은 2.0 이후부터 추천한다. 구버전에서 지원하는 프리스타일 잡은 단일 실행에 특화되어있다. 파이프라인은 복합적 작업을 위한 기능

* 두가지 타입으로 작성가능. 

	1. 스크립트 타입 파이프라인 (groovy, JAVA API 호출)

	2. 선언형 파이프라인 (Jenkins DSL, isolate complex logic into Jenkins plugin) 

* 선언형 파이프 라인의 구성에 들어가는 개념

	* Agent: pipeline or stage가 실행될 노드 지정, type(none, any, label, node, docker, dockerfile, Kubernetes)

	* Stages: 작업의 명세서인 stage의 묶음

	* Steps: Stage안의 단계

	* Directives: step의 묵음

	* Post: 후처리. (스테이지 안에 선언하면 다 끝나고 실행된다) type(always, cleanup ...) 

	* env: credentials() 를 통해 호출 가능

	* parameter: 스코프가 다 블럭마다 존재

	* when (실행 조건)



## CH02_03 실습 #1 by Manual  install

* 실습과정

1. Provision the following →  VPC, NAT, SUBNET, Bastion, Jenkins, RouteTable, SG, IGW

2. `tf apply --auto-ap prove`

3. EC2 접속후 `git remote -v`결과로 클론, 허드슨이 제공하는 공식 스크립트로 젠킨스 설치

4. `journalctl -u jenkins.service -f` `netstat -nlp | grep 8080` `curl - v http://localhost:8080` 이렇게 구동 확인

5.  실습의 목표는 젠킨스가 ECR의 이미지를 가져와 도커를 다뤄야 하므로 도커 데몬스가 필요하다. 

```DOCKER daemon install

sudo uyum install -y docker;

systemctl enable docker;

systemctl start docker;

ll /var/run/ | grep docker // 이렇게 보면 docker를 3개 볼 수 있는데 sock이 중요하다. 

```

6. 권한 부여 `usermod -aG docker ec2-user`  socket에 접근 할 수 있도록 하기 위한 조치. 소켓은 root, docker 그룹에 속한다. 가지고 있으므로 ec2-user 에게 권한을 준다. 명령어를 내린 다음 재로그인해야 적용. 

7. `cat /etc/passwd | grep jenkins` 젠킨스 유저가 도커를 컨트롤 할 수 있게 `sudo usermod -aG docker jenkins` 이제 젠킨스도 도커를 컨트롤 할 수 있다.



## CH02_04~07 실습 #2 by Docker

* DIND 구조와 DOOD 구조

*Docker in Docker*

	* 도커데몬 안의 도커 (딘드) 에서 소스 코드를 빌드한다면 딘드가 여러개있을때 독립적인 환경을 구성할 수 있는게 장점. 대신 딘드가 리눅스의 *Cgroups*에 접근해야하므로 권한을 많이 가지게 되고 딘드가 침해당하면 호스트가 침해당하게 되는 문제가 있어 권장하지는 않는다.

*DOOD(Docker out of Docker)*

	* 도커데몬 대신 도커 클라이언트로 두드를 실행한다. 유닉스 소켓(docker.sock)을 통해 요청을 하여 마더 도커 데몬과 통신을 한다. 보안 취약을 극복할 수 있지만 두드 컨테이너는 네임페이스를 마더와 공유하기 때문에 여러 두드가 생기게되면 사이드이펙트가 발생.  격리를 포기한다는 뜻.

	* DOOD의 도커 클라이언트가 도커 Push등의 명령을 받게 되면 호스트의 데몬에 소켓을 통해 요청을 한다. 

	* (서로 독립된 OS인데) 호스트 소켓은 어떻게 두드가 참고 할 수 있을까?  

		* -> 마운트를 하면 된다. 

		* 두드는 소켓에 대한 권한을 가지면 된다. 

		* 호스트는 *docker:999*그룹을 jenkins 실행 계정에 실행한다.

		* 이때 액세스 권한에 주의한다. sock을 others에 다 풀어줘도 해결이 될 수 있지만 보안 문제가 발생한다.



* DOOD 실습시나리오 *github receive push Req -> Pipeline -> Delivery*

1. 파일 구성

```dockerfile

FROM jenkins/jenkins/lts

ARG DICKCER_GID=1000

#AWS_CLI설치

RUN /user/sbin/groupadd -g ${DOKCER_GID:-1000} -f dokcer && \ user/sbin/usermod -aG docker jenkins

USER jenkins

```

```docker-compose.yaml

volumes:

  - "/var/run/docker.sock:/var/run/docket.sock"  // 중요한 마운트 부분

```

2. 젠킨스 초기 설정 →  젠킨스 URL 발행 → 로드밸런스나 다른 서비스에서 젠킨스를 참조할때 사용

3. 젠킨스에는 *Pipeline script from SCM(Source Control Management)* 라는 옵션이 있다. 깃에서 스크립트를 가져오게 와서 사용함. 이러면 매번 웹 인풋박스를 통해 잡을 매니페스트 하지 않고 체계적으로 관리할 수 있게 된다. GItOPS 구현

4. 깃허브에서 발행한 레포, hook 권한을 준 키를 입력한다.  

5. WEB hook 설정을 한다. 젠킨스 주소, json, 이벤트를 설정 이제 웹훅을 통해 트리거되는 모습을 볼 수 있다. 

---

##  CH02_07 실습 #3 CI 자동화

젠킨스 환경변수 사용 `env.WORKSPACE`

* `when { expression { return params.DOCKER_IMAGE }` 이런식으로 사용한다.

* *빌드는 캐시에 영향을 많이 받는다.*



### 자동화 과정

1. 빌드(`docker build -t test:1`

2. 테스트(`docker run --rm test:1 root/.local/bin/pytest -v`)

3. 이미지 푸시

```

sh """

docker push ${DOCKER_IMAGE}

# 이런식으로 steps 안에서 쉘 스크립트 멀티라인의 커맨드를 보낼 수 있다.

"""

```

4. Deployment 



Tips

 * 빌드 캐시는 디스크를 빨리 채우게 되고 운영에 지장을 줄 수 있다. 도커 GCE(Garbage collection engine)가 정기적으로 관리하도록 해야한다. 

	* *prune* 이란 컨셉에 의한 캐시 정리는 문제의 원인이 되기도 한다. 가끔 하는 작업이거나 동시에 병렬 또는 시퀀스를 가질때 문제가 된다.  A가 작업을 끝내고 이미지를 prune으로 날리면 A에 대해 의존성을 가지는 B가 실패하게 된다. Race condition.  따라서 배치잡을 통해 할 것.

	* 컨테이너만 Prune의 대상이 아니다. 이미지, 볼륨, 네트워크, 시스템 오브젝트 모두 대상

---

##  CH02_07 실습 #3 CD 자동화

1. 파이프라인에서 설정을 하면 credential 을 이용, sshagent로 명령을 전달한다.  (빌드는 빌드서버에서 배포는 배포서버로 연결해서 수행)

```

aws ecr get-login...

export IMAGE=${ECR_DOCKER_IMAGE}

export TAG=${ECR_DOCKER_IMAGE}

docker-compose -f compose.yaml down;

docker-compose -f compose.yaml up -d';

```

2. *Input* 타입을 통해 유저에게 물어보고 입력 여부에 따라 프로세스를 분기하면 delivery를 컨트롤 할 수 있다. (이거 좋네!?) 빌드는 하되 배포하지 않는걸 통해 리소스 효율과 딜리버리를 달성할 수 있다. 

3.  파이프라인을 이용할 수 있는 젠킨스 최신 버전은 스테이별로 진행상황을 볼 수 있다. 로그도 따로 등록된다.

* Tips

	* 젠킨스가 이전 버전의 컨피그로 실행되는 문제가 간혹 발생한다. 

	* 여러대를 배포해야한다면? 6대를 해야 한다면?

		* AWS 오토스케일링 그룹을 통해 서비스를 한다면 알아서 해주겠지

		* Packer를 통해 배포를 한다면? 이런 관리니즈를 충족할 수 있다. 

	* 위의 실습은 젠킨스의 기능을 순수하게 활용하기 위한 예제 다른 서비스를 보통 쓴다. 패커나 쿠버네티스

---

## 슬랙연동

### 설치 및 연동 과정

1. slack app directory → Jen Config → Jen 애드온에서 notification 추가 → 시스템 설정 slack에 워크스페이스, 토큰, 채널 입력  

---

## 젠킨스 Master, Slave concept

* 마스터는 매니저만 하고 슬레이브에게 빌드를 분담하는 컨셉

* 구현방법

1. 쉘 등록

```.ssh/config in bastion.

Host target

  Hostname 10.0.3.61

  User ec2-user

  IdentityFile ~/.ssh/dev.pem

```

2. 슬레이브 쪽엔 authrized_key 즉 공개키를 등록시켜준다. 

<Tips: in iTERM , CMD + SHIFT + i 로 복수의 터미널에 동시입력이 가능하다. >

3. git, docker 등을 설치하고 JDK 등을 설치한다. 에이전트로 부터 받은 명령이 JVM 기반으로 실행된다.

4. 이제 `webconsole - system - Nodes` 에서 슬레이브를 등록한다.  `trusted key`  옵션을 선택한다. 

5. 이제 파이프라인에서 어디에서 할지 `label`을 붙여준다. 

6. 스테이지를 분산하게 되면 생기는 에러를 주의해서 파이프라인 작성(스테이지간 의존성)

	* EC2를 잠시 띄었다가 다시 내리는 방식으로 처리할 수도 있다. 플러그인을 믿어.



---



# Chapter 3 AWS SaaS CI/CD

## AWS Code Series CICD 개요

젠킨스에서 마스터 슬레이브 구조를 통해 역할을 분담한것과 비슷한 구조를  AWS CB, CD에서 구현하는 내용! SaaS를 쓴다는건 바로 이것이다.

### 장점!

1. CODE Build, fully managed build service 큐를 신경쓰지 않고 사용가능

```buildspec.yml

pharses:

  install:

    run-as:

  pre_build:

  build:

artifacts:

cache: // 이런 구조로 빌드 과정을 정의

```

* 권한설정: 마스터 젠킨스를 EC2에 두는 구조. EC2의 룰은 ECR, S3, CloudWatch, VPC 에 대한 권한을 가져야 한다. 

```jenkinsfile in EC2 Master

steps {

  awsCodeBuild(

    credentialsType: 'keys's,

    buildSpecFile: 'deploy/buildspec.yml'

  )

} // 이렇게 코드빌드를 호출하는 함수를 사용한다. 코드빌드 플러그인이 이일을 한다. 

```

tips - 잡이 실행되면 코드빌드와 클라우드 와치에서 동작을 확인할 수 있다.



### Deployment by CodeDeploy (fully managed build service)

### 콘셉트

	* 컴퓨팅 서비스 (EC2, Lambda, on-Premise) 에 배포 자동화 지원

	* In-Place, Rolling, AB Deployment, Canary Deployment

	* Rollback, Notification, Delivery 지원

### 구성

	* App, Deployment Group, Deployment, Deployment Configuration

### 시나리오

1. CB가 만든 파일을 CD가 참조해서 한다.

2. 배포할 파일을 S3 오브젝트에 명세한다. 

3. CD 프로젝트는 S3권한이 필요해진다.

4. 타겟 서버(배포 서버)에는 CD Agent가 필요하다.

5. CD가 직접 배포하는게 아니고 작업 내용은  `appspec.yml`에 명세한다.  

6. Agent가 직접 S3오브젝트를 읽고 매니페스트를 처리한다. 때문에  CD가 아닌 타겟서버의 EC2에 S3 Read 권한을 줘야한다. Agent는 호스트의 권한을 따른다. (Conssume)

```appspec.yml

permission:

 - object: /home/ec2-user

  pattern: "**" // 하위 디렉토리 모두

hooks:

  applicationStart:

  applicationStop:

```



### 시나리오 해석

1. EC2에 바로 넣는게 아닌 S3에 올리는 구조가 기존 배포구조와 다른 점 

2. 아티팩트  `artifacts { ... }` 에서 빌드 결과물을 컨트롤하고 있다. 

3. `deployment***gorup.tf`의 `resource deployment***config` 에서 `minimum***healthy***hosts`를 정의할 수 있다.  디폴트는 한번에 하나씩 하는 전략. (1개니까 여기선 주석처리했고 복수 노드를 대상으로 배포 할땐 사용한다.)

4. 개인적으로 관심있게 본 부분

```main.tf

user_data  = data.template_file.userdata.rendered

# user_data를 프로비전하도록 하고

```

```data.tf

data "template_file" "userdata" {

  template = file("templates/userdata.sh")

} # 여기에선 스크립트 실행

```

```userdata.sh

cd /home/ec2-user

wget https://aws-codedeploy-ap-northeast-2.s3.amazonaws.com/latest/install

chmod +x ./install

sudo ./install auto

sudo service codedeploy-agent status

rm -rf ./install

# 배포 환경을 셋팅

cat >/etc/init.d/codedeploy-start.sh <<EOL

#!/bin/bash

sudo service codedeploy-agent restart

EOL

chmod +x /etc/init.d/codedeploy-start.sh

# 디플로이 스크립트를 짜고 실행한다.

``` 



### 배포과정 설명

1. `build spec.yml` 의 `discard-paths` 옵션을 쓰면 디렉토리 경로를 무시하고 HOME에 파일을 바로 생성한다. 

2. 타겟서버에 `user_data` 데이터를 줬다. 그리고 스크립트에 코드디플로이 설치 및 서비스 시작 스크립트가 들어갔다. 에이전트가 S3에 접근할 수 있도록 권한도 Define한다.

3. Jenkins 파이프라인 구성

```YAML 

# Override로 정의하는 이유. 빌드넘버가 생길때마다 산출물이 읽기힘든 해시로 생겨나는데 디버그를 힘들게 한다. 젠킨스의 빌드 넘버를 쓰도록 오버라이드를 하자.

  artifactPathOverride: "${currentBuildNumber}"

```

4. 스탭 내 스크립트를 이용한 배포 

```groovy

sh```

  aws deploy create-deployment \

  --application-name ${CODEDEPLOY_NAME) \

  ...

```

5. 코드디플로이가 배포를 주도하기 때문에 while을 통해 리절트 값을 체크한다. 



### 서버 여러대라면 배포 설정의 결과는 어떻게 판단하는가?

deployment config 의 타입에 따라 성공판단 기준도 바뀐다. AllAtOnce, HalfAtTime 일부의 실패도 성공으로 받아들이는 타입은 조심해서 사용해야겠지.

---

## AWS CodePipeline

* 젠킨스를 대체하는 SaaS

* 지원하는 스테이지 Stage

	* *Source* 지원 서비스 - 깃헙, 코드커밋, ECR, S3 (다른 소스를 쓰고 싶으면 S3에 후크를 걸면 된다.

	* *Build* - 코드빌드, 젠킨스, 팀시티, 클라우드비

	* *Test* - 코드빌드, 디바이스팜, S3 

	* *Deployment*  - 클라우드 포메이션, S3, ECS

	* *Approval* -  휴먼 디시전, Invoke(람다, 스탭펑션 호출)

* 스테이지별로 아웃풋을 정의하고 다음 스테이지에서 또 호출해서 쓴다.

	* 설정한 뒤 `웹 - Setting - 깃헙` 커넥션을 정의해줘야 한다.

	* 테라폼에서 지원안되는 리소스도 있다. 직접 만들자~! 

	* Noti (SNS) 설정

		1. 파이프라인 → noti rule을 생성 

		2. AWS chatbot 설정

		3. slack -> configure slack channel

---

## Chapter 4 외부 SaaS를 이용한 CI/CD

* Github Actions, CircleCI

	* 왜 이런걸 외부 SaaS라고 부르는가? AWS 기준으로 보니 외부 SaaS가 되었다. 

	* 이벤트를 통해 워크플로우를 자동화 할 수 있는 도구

		* push event, Pull request, master branch 병합, 주기적 태스크 실행 →  모두 이벤트

* Github Actions 컴포넌트 구성

	* *Workflows* (전체를 아우르는 상위 개념)

	* *Events* (push, pr, release, schedule)

	* *Jobs* (스탭의 묶음, 러너가 실행하는것, 의존성있는 실행도 지원)

	* *Steps* (shell 실행을 말한다. 스탠드얼론)

	* *Runners* (실행자, 애저의 서버를 활용할 수도 있고, on-premise도 지원

* 정의하는 방법

```.github/workflows/learn.yml 

name: blah

on: [push]

jobs:

  check-version:

  runs-on: ubuntu-latest:

  steps:

    - uses: actions/checkout@v2

    - run: npm install -g bats

```

	* 무시할 패스와 이벤트를 일으킬 패스를 구분할 수 있다.

	* 셋팅 후 이벤트가 일어나면 Actions 탭에서 워크플로우를 조회할 수 있다. 젠킨스 없이도 바로 할수 있는게 재밌는 포인트.

---

### 액션과 AWS CLI를 연동해보기

* 깃허브는 외부 서비스고 타겟서버는 운영서버니까 직접 관여하는건 보안문제가 됨. 배포에선 스크립트가 복잡해지니 CodeDeploy를 활용하는 설계.

```

jobs:

  ci:

  cd:

```

이런 정의에 사용되는 리소스들은 액션 마켓플레이스에서 구할 수 있다. 

`echo ::set-output name=.... ${{ steps.login... }}` 이런식으로 고유한 변수 정의 문법이 있다. 

`zip -j`패스를 지우고 바로 현재 위치에 다 압축을 구성한다.

```cicd.yml

needs: [ci] // ci 작업이 끝나면 실행하겠다.

```

---

## CH04_03 Custom Action

### slack  연동

* incoming WebHook 등록 → 이제 HTTP 문서로 메시지를 채널에 쓸 수 있게 되었다. 이제 웹훅의 시크릿을 적용하고자 하는 레포지터리에의 시크릿에  등록하고 메시지를 쓰게 한다. 워크플로우 중에 호출하여 메시지를 슬랙에 쓴다. 

```slack.yml

jobs:

 slack:

   steps:

   uses: dev-chilbuji/devops_custom_action@master

```

### 커스텀 액션의 용도

* 복수의 REPO에서 각자 슬랙과 통신해야한다고 했을때 각 프로젝트마다 로직과 토큰을 관리해야 한다면 관리비용이 커진다. `커스텀 액션`을 정의해놓으면 참조를 통해 *reuseable*을 보장할 수 있다.  

* 기존에는 저장소마다 토큰을 발급하고 로직을 작성해 이벤트를 일으켰다면 커스텀은 액션은`incomming 토큰`을 발급해서 여기를 모든 저장소가 호출하여 이벤트를 처리하게 만든것이다.

* `action.yml` → `dockerfile 호출` →

```dockerfile

FROM ... RUN ... ADD ... ENTRYPOINT ["/entrypoint.sh"]

``` 

→ 

```entrypoint.bash

CMD = '$1'

case "${CMD}" in

  slack)

    _slack // 커맨드를 받아서 슬랙 액션을 호출한다.

    ;;

  *) 

    exit 1

esac

```

→ 

```slack.yml 다른 레포지터리에 있는 깃허브 액션 정의

jobs:

  slack:

    runs-on: ubuntu-latest

    steps:

    - name: Send slack message # 메시지 발송

      uses: dev-hibike/devops_custom_actions@master

      with:

        args: slack

      env:

        SLACK_TOKEN: ${{ secrets.SLACK_TOKEN }}

        SLACK_MESSAGE: Push event!!

```



## CH04_04 CircleCI 소개

* Since 2011 개발

[image:8FB83FDC-6CF1-4F11-A573-46B26809C1BF-641-000001BE4ABCEA9E/7A14CD8F-454F-4583-B6C8-FB3D31FB7856.png]

* 컴포넌트

	* Project, Pipelines, Steps, Workflows, Executors

	* Jobs 의 묶음 →  워크플로우

	* Orbs : 재사용성이 높은 코드스니펫 (마켓이 있다)

---

## CH04_05  CircleCI 실습

* 로직을 매니페스트하는 파일

`.circleci/config.yml`

* 실습

	1. 깃헙과 연동 - 프로젝트 선택 - config 정의 (repo와 1:1 매칭)

	2. 연동 후엔 Circle CI 웹 콘솔을 통해 REPO 통계와 실행결과 조회

	3. `config.yml`에서 build - test - deploy 단계를 워크플로우로 정의

	4. jobs내의 executor에 대해선 `setup***remote***docker`를 구성해줘야 한다. 

```

	steps:

	   - checkout // 자주 쓰는 명령어는 이렇게 압축해놨다.

```

### Context 

시크릿을 저장해놓는 공간. Orbs에서 요구하는 키값을 미리 저장해놓으면 알아서 읽는다. 그래서 코드를 줄줄이 적지 않아도 된다. (GitHub 는 하나하나 정의해줘야함) 

---

# Chapter 5 kubernetes CI/CD

## CH02 argocd

* GitOPS 기반 워크로드 실행 솔루션. 구체적으론 CD를 담당한다.

	* 설치시 쿠버네티스 내 독립적 워크스페이스에서 동작하며, 롤을 만들고 롤에 기반한 토큰을 발행하여 외부에서 api call을 한다.

* Argo를 구동하기 위한 워크로드(앱의 구성요소)

	* API SERVER

	* Repository server

	* Application controller 

	* dex-server

	* argocd-redis

---

## CH03 declarative-setup

* 기본 컨셉: 깃허브에 푸시를 하면 argo는 그걸 default 네임스페이스에 반영한다. 

* 디폴트  비밀번호는 `configuration - secret` 에서 확인가능



### 메뉴와 개념

	* *repository* - 연동규칙 by http, SSH

	* *Cluster*를 추가하면 현재 아르고가 실행중인 클러스터 말고도 외부 클러스터에 워크로드를 실행할 수 있다.

	* *Project* == 네임스페이스와 동일한 로지컬 스코프

	* *Role*을 만들어서 path에 따른 권한을 할당, Account 기반 권한관리도 가능하다



### 프로젝트

***프로젝트는 어플리케이션으로 구성되고 하나의 어플리케이션은 여러 워크로드로 구성된다.***

* `어플리케이션 생성`

	* Attribute : 이름, 싱크 정책 지정, 소스 (레포지토리, PATH), Destination (`kubernetes.dafault.svc`)

	* 프로젝트에서 사용할 path와 클러스터 설정

* GUI에서 여러가지 방식으로 리스트를 조회할 수 있다. 어플리케이션들은 싱크 값을 강조하여 보여준다. 각 어플리케이션을 정의하는 yaml의 싱크 상태 (정의된 상태, 실제 상태) 를 가시적으로 볼 수 있다.

* 기존에 클러스터를 명령어로 관리할때는 하나씩 명령어를 이용해 정의한 yaml 상태값을 apply하던것에 비해 git으로 상태값을 관리할 수 있게 된다.

```appProject.yml

spec:

  project: dev

  source:

    repoURL: https://github.com/dev-hibike/devops_k8s.git

    targetRevision: HEAD

    path: sample-yaml

  destination: // 배포할 장소

    server: https://kubernetes.default.svc

    namespace: default

  syncPolicy: // 오토를 안켜면 수동으로만 관리

    syncOptions:

    - Validate=false

    - CreateNamespace=true

    - PrunePropagationPolicy=foreground

```



### 쿠버네티스 패키지 관리는 helm !‼

```

  source:

    repoURL: https://github.com/dev-hibike/devops_k8s.git

    targetRevision: HEAD

    path: sample-helm-1

    helm:

      valueFiles:

        - values.yaml

```

```values.yaml

sentinel:

  port: 26379

// 대충 이런 값들을 저장하기 위해 쓴다.

```

* Argo 사용 시나리오

Change source in REPO -> Out of Sink -> 젠킨스가 감시하고 있다가 트리거 → 트리거에 필요한 토큰과 API 정보를 주면 된다.

```

/{project-name}/sync

# 헤드에 token

```

---



## CH04 app of apps 패턴

* 앱을 만드는 앱. 부속품들을 배포하게 된다. 앱을 덩어리로 만드는 느낌이네

```values.yml

apps:

  - name: prometheus-operator

    project: dev

    namespace: prom

    source:

      path: kube-prometheus-stack

      customValues: true

      values:

        - values-local.yaml

  - name: prometheus

    project: dev

    namespace: prom

    source:

      path: prometheus

      customValues: true

      values:

        - values-local.yaml

```

* 모든 앱에 적용될 종속적인 정보를 한곳(app of apps)에서만 설정하면 나머지는 설정한 값을 따라가 준다.  

---



## CH05 local-user

* `dex` 서버를 이용해 외부 인증을 처리

* 가장 베이직한 인증방법은 `.yml` 에서 매니페스트

```

metadata: (중략)

data:

  account.alce: apiKey, login //이렇게 정의

```

	* 패스워드는 ARGO CLI 를 통해 진행한다.

* 명령어로 인증

```bash

argocd login cd.argoproj.io —username admin —-grpc-web

argocd account list

argocd account update-password --acount alice 

```

* ArgoCD RBAC (Roll base access control)

	* local user setup 또는 SSO기반으로 진행할 수 있으며 빌트인 권한이 존재한다.  

```values-local.yaml

  rbacConfig:

    policy.default: role:readonly

    policy.csv: |

      p, role:org-admin, applications, *, */*, allow

```

	* `p, <role/user/group>, <resource>, <action>, <approject>/<object>, allow`  순서에 따라 권한을 Define

---



## CH06 Argocd SSO

* GUI 설정방법

1. Organization → new → Settings → Developer Setting → 

2. new OAuth (name, URL, Authorisation Callback URL) → Got ClientID , clientSecret (이건 쿠버네티스 시크릿을 이용해 관리하면 좋다)

```

server:

  config:

    dex.config: |

      connectors:

        - type: github

          id: github

          name: GitHub

          config:

            clientID: xxx

            clientSecret: xxx

            orgs:

            - name: xxx

```

* SSO 로그인 UI 활성화 

	1.  ORG ->  TEAM 생성. -> rbacConfig 설정 추가 

	2. 깃헙의 조직구성에 따른 RBAC 관리가 가능

	3. 깃랩, LDAP 다양한 서비스 지원

---



## CH07 Kubernetes CICD with Actions

* *Actions를 사용한 앱 업데이트 과정*

App repo update -> image update -> `config repo - values.yaml` 업데이트 -> ArgoCD 가 싱크를 맞추고 -> POD 업데이트 

* 시나리오 전제조건

	 * 하나의 Config repo에 여러개의 App repo 담는다. 

	 * POD는 ECR에 접근할 수 있는 권한이 필요하다. 

* 구체적인 Actions 동작과정

	1. App repo, `./github/workflows/cdcd-k8s.yml`

```yaml

  cd:

    needs: [ci]

    runs-on: ubuntu-latest

    steps:

      - name: Checkout Target Repository

        uses: actions/checkout@v2

        with:

          repository: dev-hibike/devops_k8s

          path: deploy-k8s

			# 일련의 스탭을 담은 액션

```

	2. Config repo. `demo/values.yaml`

```yaml

replicas: 1

image:

  repository: 552661052297.dkr.ecr.ap-northeast-2.amazonaws.com/demo

  tag: 1.2.6 # 여기 값이 변경된다. 푸시에 의해

  imagePullSecrets:

    - name: ecr-cred

service:

  type: NodePort

```

* 여기 TAG 버전을 바꿔주는게 앱 Repo 액션에 담겨있다.  그리고 컨피그 배포에 푸시 배포!



`.github/workflows/cicd-k7s.yaml`

```yaml

jobs:

  ci:

  cd:

    needs: [ci]

    runs-on: ubuntu-latest

    steps:

...중략

        cmd: yq eval -i '.image.tag = env(IMAGE_TAG)' 'deploy-k8s/demo/values-eks.yaml'

      - name: Push helm repo

        run: |

          cd deploy-k8s

          git config --global user.email "dev-hibike@gmail.com"

          git config --global user.name "dev-hibike"



          git add demo/values.yaml demo/values-eks.yaml;

          git commit --message "Update demo image tag to $IMAGE_TAG";

          git config -l | grep 'http\..*\.extraheader' | cut -d= -f1 | xargs -L1 git config --unset-all

          git push --prune https://token:$token@github.com/dev-hibike/devops_k8s.git

```

이건 CI CD 과정을 거치고 jq로 이미지 값을 변경하는 구조다. 그리고 Argo가 config repo를 풀링 하는 구조 (3분 주기)하여 내용을 반영한다.



### ngrok

	* 외부에서 로컬호스트 서비스에 접근할 수 있도록 해주는 서비스, 현재 쿠버가 로컬에서 서비스 중이므로 외부서비스가 클러스터에 접근 할 수 없기 때문에 필요한 서비스 (EKS나 직접 EC2에서 쓴다면 LoadBalancer 가 그 역할을 한다.

	* `http://12312323.ngrok.io` → `http://localhost:30080` 이렇게 해준다. 

		* 주소를 발행 -> GitHub Setting 에 생성된 URL을 등록한다. 

---



### CH08 CircleCI

* 이전의 시나리오와 다른 부분 점은 Actions이 하던일을 .circleci가 하는 것이다. 

	* 액션은 각 레포지터리에 기능이 종속되어 있어서 전반적인 활동이 어렵지만 circleci 는 통합환경을 쓸 수 있는게 장점이다.

1. `.circleci/config-k8s.yml`

```yaml 

  steps: // ... (중략) 테스트 스탭

   -persist_to_workspace:

      root: .

      paths: VERSION // 이렇게 테스트하는 영역을 퍼시트로 선언하면

cd:

  steps:

   - attach_worksapce:

     at: . // 다음 스탭에서 활용할 수 있다.

```

2. `.circleci/config.yml`

```yaml

          git clone https://github.com/dev-hibike/devops_k8s.git && cd devops_k8s;



          yq eval -i '.image.tag = env(VERSION)' 'demo/values.yaml';

          yq eval -i '.image.tag = env(VERSION)' 'demo/values-eks.yaml';

// 클로닝 한 다음 버전값을 업데이트 했다.

... 중략

workflows:

  cicd:

    jobs:

      - aws-ecr/build-and-push-image: 

··· 중략

      - test:

          context: AWS

          requires:

            - build-and-push-image

      - deploy:

          context: GIT // 이건 깃허브에서 제공하는 변수 네임 스페이스

```

	* 깃헙액션이 레포지토리 단위의 배포환경 설정에 특화되어 있다면, Circle CI는 중앙관리형 배포환경 관리가 가능해진다.  성능도 액션보다 빠르다.

* *전체 워크플로우*

	 1. App Repo의 변화를 Circle이 알아차리고 컨픽 Repo를 업데이트

	 2. 그리고 컨픽 Repo에 걸려있는 Web hook이 Ngrok를 거쳐 현재 개발중인 로컬의 Argo를 콜. 

	 3. 파드가 배포된다.

---



## CH09 Argo in EKS

### 실습개요

* Argo 를 통해 AWS EKS에 배포, v1.21, prod용, DMZ(public)vpc를 썼지만 실제환경에선 Private권장

* 워커로드가 t3.small이라 한다면 워크로드에 대해 붙일 수 있는 파드의 갯수는 11개로 제한된다. 

### Tips

* Attach limit이 다르다.  [amazon-eks-ami/eni-max-pods.txt at master · awslabs/amazon-eks-ami · GitHub](https://github.com/awslabs/amazon-eks-ami/blob/master/files/eni-max-pods.txt) 이게 Packer 의 EKS config 리소스 배포 



### 절차

1. EKS 리소스 생성, 컨텍스트를 Lens에 등록, LoadBalancer Contoller 를 쓰기 위해 VPC 소스에 다음 코드를 추가한다.

```tf

// main.tf

  public_subnet_tags  = local.public_subnet_tags

  private_subnet_tags = local.private_subnet_tags

// *.auto.tfvars

	private_subnet_tags = { "kubernetes.io/role/internal-elb": 1 }

	public_subnet_tags  = { "kubernetes.io/role/elb": 1 } 

// 1 또는 빈값을 넣어야하는데 이건 eks 리소스 독을 보면 알 수 있다. 이 태그가 있음으로서 LB CTLR이 일을 할 수 있게 된다. 

```

2. EKS를 쓸거니 이번엔 ingress 서비스를 이용해서 외부와 클러스터를 연결해야 한다. 배포가 되면 NGROK이 해주던 일을  이젠 로드밸런스가 하게 됨. 

[image:14302489-A0A8-4198-977F-48B3152457C6-76434-000004DD7F908808/008B1B50-8AF1-4B8E-B36C-59233FFC50C7.png]

3. Argo를 먼저 배포하고, `App of Apps`를 배포한다.

4. config repo에서 web hook 를 이제 nrok 대신 `argo의 서비스 URL`로 걸어준다.

5. 크게 달라진건 없다. EKS환경에 따라 인그레스 및 로드밸런스가 해야할일이 생겼을뿐.



*Tips*

* `yq` :  `jq` 와 비슷한 커맨드. 파일의 내용을 바꿔준다. (json → yaml이 됐을뿐)

예를 들어 `yq e ‘.test = “no”’ ingnore.yml`   test란 키를 찾아서 no로 바꾼다는 의미

---



# Part 7 모니터링 서비스 및 운영 구현

## CH01 - 모니터링 개요

* 개발을 돕는 것이 지금까지 배운것이라면 모니터링은 운영을 돕는다. 데이터를 축적하고 액션 플랜을 다시 개발쪽에 제공해줄 수 있다. 

* Telemetric 원격측정

	* 모니터링, 로깅, 트레이싱(MSA에서 중요하다.) 하나의 사용 시나리오를 보여주는걸 트레이싱이라고 한다.

* 실습시나리오: `external, public, private` 3단 VPC 구조

	* Application LoadBalancer  , CloudWatch, RDS, EC2, Slack, Prometheus, ElasticSearch, 장애에 대한 조치방안 설정

---



## CH02 - AWS 인프라 모니터링

### _01 CloudWatch 개요

* 모니터링 및 메트릭에 따른 앱 인터그레이션을 자동화

* 도메인 용어

	* namespace. 데이터가 들어갈 공간

	* ‘사용률’로 대변되는 값

	* dimension (동질적인 리소스의 메트릭을 합하는 개념) 예를들어 특정 AMI EC2에 대한 시피유 사용률을 감지

	* Statistics 평균 최소 최대 등 통계값

	* Resolutions (데이터 측정의 단위, 요금과 관계가 있음) Standard(1m), High RES(1s) 로 나뉨 High RES는 과금이 된다.

	* Alarm을 이용하면 스케일링, 문제가 있는 인스턴스를 스탑하는 작업(ec2 action), system mag actions(특정 시스템에 대해 명령어를 내린다거나) , SNS 토픽 발행

		-> 특정 프로세스가 행이 걸리면 가서 크러시 내고 덤프를 저장하는 거 해보자 재밌겠다

---



### _02 Monitoring #1 기초

* basic monitoring은 5분, detail monitoring은 1분, 

* 메트릭: CPU, MEM, Network, MetaDataNoToken, CPU Credit, EBS Metric, Status check metric

	* 특별한 토큰을 가지고 서비스를 호출할 수 있는데 그 양을 메트릭으로 삼을 수 있다. 

	* 버스터 타입(T) 타입은 인스턴스 타임마다 사용량이 기준치를 초과하지 않으면 밸런스를 올려주고 사용량이 많아지면 성능이 늘어난다. 그래서 이 크레딧에 대한 모니터링도 필요하다.

* dedicate (bear metal)

* `Status` check metrics (normal..?)

* `EC2 usage Quota` (한 리전에서 허락된 최대 리소스 사용량) 그것도 감시가능하다.

* 디테일드 모니터링 옵션을 켜면 과금이 된다. (terraform에도 관련 키가 있으니 생성가능)

* Metrics 을 쿼리할 수도 있고 다양한 포맷으로 조회할 수 있다. (그래프 등)

* Period, Vertical annotation

* JSON 형식으로 API 쿼리를 해서 결과를 받을 수도 있다

* 대시보드는 히니 하나 안만들어도 기본적인 대시보드를 셋팅해놓았다. 

---



### _02 Monitoring #1 커스텀 매트릭

* 위에서 설명한건 다 제공하지만 프로덕션에서 특이한 것들을 모니터링해야한다면 커스터마이징한 메트릭을 만들어내야한다. 이건 CW agent 프로세스를 통해 put metric 으로 생성한다. 이걸 위해 EC2에게 IAM 권한도 필요.

1. DMZ EC2를 관찰할 예정. 기본 메트릭 말고도 다른거를 보내는 내용 실습. 

2. 별도의 롤을 EC2 에 attach (CloudWatchAgentServerPolicy)

3. 설치는 `userdata.sh	` , `amazon-cloudwatch-agent` 를 yum 으로 설치

4. `sudo /opt/aws/amazon-cloudwatch-agent/bin/… config-wizard` (telegraph 기반으로 만들어진 에이전트다.)

위자드 형태로 config를 생성해준다. on-premise를 지원한다 -> 클라우드 + on-premise 혼합 구성도 가능하다.

`/opt/aws/amazon-cloudwatch-agent/bin/config.json`에 생성된 값 확인가능

5. API DOC → 수집가능한 메트릭의 리스트  

```bash

wget \

  https://raw.githubusercontent.com/dev-hibike/devops_infra/master/apne2/dev/ec2/bastion/templates/cloudwatch-agent-config.json \

  -O /opt/aws/amazon-cloudwatch-agent/bin/config.json



# run agent

sudo amazon-cloudwatch-agent-ctl \

  -a fetch-config \

  -m ec2 \

  -c file:/opt/aws/amazon-cloudwatch-agent/bin/config.json \

  -s

```

이렇게 하면 에이전트가 동작



### CloudWatch agent configuration

1. `agent`: EC2을 권한으로 에이전트가 동작하는걸 assume 이라고 한다. 이는 어플리케이션이 호스트의 권한을 갖는것도 그렇게 부른다.

2. `logs` : nginx를 쓴다고 할떄 로그를 클라우드 워치에서 로그를 보고 싶다면 path를 잡아서 바로 볼 수 있다. 시스템레벨 + 프로세스레벨 로그 둘다 가능!

3. `metrics` 설정

	* userdata 리소스를 이용해서 에이전트와 config를 넣으면 편하게 수집가능

		* 동일하게 셋팅을 했으니 `CloudWatch -> Log groups -> /aws/ec2/var/log/messages` 그룹에 들어가면 인스턴스 아이디별로 로그가 수집이 되는걸 볼 수 있다. 

		* 잘 트래킹하고 싶으면 시간을 잘 동기화 시킬것  `timedatectl set-timezone Asia/Seoul`

---



## _05 ALB logging

* 뭐든 프로비저닝과 동시에 메트릭이 수집된다. ALoadBalancer에는 `HTTP status Code count` 이런것도 수집이 되므로 연동해서 전략을 짤 수 있다. 

* ALoadBalancer attribute를 수정하면 accesslog를 s3에 저장하도록 셋팅 할 수 있다. 언제나 그렇듯 S3에 뭔가 쓰려면 접근하는 주체에 Bucket Policy를 줘야한다. (여기선 자동생성한다. 다만 이렇게 하지 않고 Assume하는 구조로도 설계할 수 있다)

* AWS의 서비스는 하나의 서비스가 마이크로 서비스로 짜여져 있다. 염두하면 이해하기 편하다.



## S3에 쌓이는 로그 정보를 처리하기

1. *Athena*가 직접 해석해서 서비스. 그냥 RDB처럼 보이는데 저장공간은 S3를 쓴다. 5TB에 아주 쬐금 과금 됨. 

	1. 쿼리 결과를 저장할 S3를 지정한다.

	2. DB, Table을 생성해준다. 공식 DOC에서 제공하는 생성 스크립트에 location, region 만 바꿔도 됨

	3. 이제 SQL이랑 동일하게 쿼리를 하면 결과를 볼 수 있다.

2. *AWS Lambda*가 주기적으로 패턴을 잡아서 호출

	* 모든 걸 클라우드에서 하고 싶다! 그럴때 사용하는 전략

	* S3이벤트를 받아서 파싱 후 클라우드 워치로 전송하는 코드.  보내는 포맷은 json, alb 선택가능.

---



### _03 CloudWatch Alarm #1 ~ #3

* 알람 스토리 라인

collect(metrics, log) -> evaluation (static 판단 / abnormal 판단 지원) -> alarm -> action (sms, ec2, sailing, system manager)

* 알람의 옵션들

	* *datapoint*: period 이내에 몇번의 유효판단을 요구할지 지정한다. 높으면 빨리 판단하지만 오탐이 많을 수 있겠지.

	* *Alarm Status* : OK ALARM INSUFFICIENT DATA

* 누락 데이터 처리전략 

	* *notBreaching* (data treat empty data as good)

	* *breaching* (breaching the threshold) Breaching -> 구멍을 뚫다.

	* *ignore*(알람 상태를 유지)

	* *missing*

* *subscription filter* 를 통해 이벤트 소스(에러)가 발생하면?

	* 액션 -> lambda, kinesis, opensearch 다만 이런건 `datapoint` 기능이 없다. -> 기다릴 수가 없다는 뜻.

	* 로그의 발생을 metric으로 만들면 datapoint 처럼 동작 시킬 수 있다.

---



### 실습시나리오

* 일반 메트릭 notify 절차

스토리 : watch -> AWS SNS -> Lambda | chatbot -> slack

1. SNS 설정 - CloudWatch  측에서 감시할 topic을 생성

2. 챗봇에서 슬랙에 대한 new channel을 허용

3. Alarm을 만들어놓고 insufficient data 상태에서 시작

4. 인위적으로 stress 커맨드를 내려 로 데이터 값 내고 ->  Noti 확인



* 로그기반 알람 절차

스토리 : 읽은 로그에서 subscription filter를 걸어 액션으로 람다를 실행하도록 설정

1. Give lambda running permission to CloudWatch

2. log groups -> subscription filter -> `oom` 이렇게 패턴을 건다. 패턴 검증도 가능

3. Log groups -> Logstream 에 잘 쌓였는지 확인하고 람다 실행을 확인



### Log Insight

1. 쿼리를 날리듯이 짜놓으면 메트릭화할 수 있다.

2. `Create metric filter.` 

	1. `Define pattern` - 키워드를 패턴을 잡거나 `access.log`처럼 형식이 있거나 하겠지. 그걸 원하는 대로 잡을 수 있다. 

	2. filter pattern `${$.target***processing***time = 0.001 }`  

	3. Metric Value를 설정한다. ->  잡은 패턴 값 그대로 쓸 수도 있고 1 로 쓸 수도 있다. (필드값을 따오고 싶으면 $로 참조)

3. 이제 `Log Groups`  -> `Metric filter` 탭에서 설정한 값을 확인할 수 있다 

4. 이제 Niti 설정 -> 추가 설정 만들값을 고른다.`$.target***processing***time` 선택



*Chapter 2 Summary* -> 로그를 메트릭 수치화 해서 대시보드에서 보거나 Noti로 연동할 수 있다.



---



## CH03 - metric 모니터링 시스템 구축

### Introduce Prometheus

* 모니터링의 두 개의 컨셉

	1. Push, coping metric backend system, require agent

	2. Poll, require service discovery, easy to update setting

* 소개

	* PromQL, multi-dimentional

	* pull method, Collect, Store time-series

	* pushgateway (풀링이 적합하지 않은 리소스 eg. crontab)은 여기에 정보를 쌓고 server가 게이트웨이에서 풀링

* 컴포넌트

[image:870777DA-620F-4B29-860A-8030D980093E-76434-000008ACBFB98A02/D9B0856C-6634-4EAE-B6F9-2B4698F029D5.png]

* Metric type

	* *Counter* (cumulative metric only up)

	* *Gauge* (up & down)

	* *Histogram* (sables observations) 흑담비..? 예를 들어 응답속도가 0.3초보다 낮은 애들만 모으고 싶다! 이렇게 선언하여 버켓에 데이터를 저장할 수 있다. 서버측의 서버측 계산이 많다.

	* *Summary*: 특정 기간 동안의 클라이언트 사이드에서 계산을 해서 서버로 던진다.

* 메트릭의 구성

	* name, label key = label value, metric value*(scalar)*

* *샘플* 

	* 프로메테우스에서 데이터를 일컫는, 검색을 하면 특정 시간대를 보여준다. `동일 시간대의 샘플 묶음을 인스턴스 = 벡터`

	* `prometheus***http***requests_total [1m]` 이렇게 검색을 할 수 있는데 이건 *레인지 벡터*라한다.

		* 하나의 샘플 안에 스칼라는 여러개의 스칼라를 가진다.

* 레인저 벡터

	* 시간 대역 대의 여러개의 값을 라 한다.

* PromQL

	* instance Vector selector 의 동작 코드가 200인 애들만 보고 싶다면? `prometheus***http***requests_total{code=“2—“)` regex나 논리표현도 지원한다. `code!=“200”`

	* `offset 1m` 1분전 데이터를 가져오고 싶다. UNIX epoch도 쓸 수 있다. 

	* *operation*  → 인스턴스 벡터를 대상으로만 사용할 수 있다. 

		* sum, min, max, avg, stddev, count, count_values(값 별로 몇개 인지), bottomk(가장 작은), tops, quantile(분위수)

	* GROUP BY - SQL 과 비슷하다. 묶어야 데이터가 의미있어지지

		* BY (끼리끼리), Without (라벨을 무시)

	* JOIN

		* one to one 

`method***code:http***errors:rate5m{code="500"} / ignoring(code) method:http_requests:rate5m` 코드를 무시하고 두개를 검색하고 같은 검색이 된것끼리 나누기 연산을 했다.

		* one to Many

			* 카디널리티가 높다. (모수)가 많다. (숫자가 많다) Group left면 모수가 많은 쪽이 왼쪽에 가야 한다.

	`method***code:http***errors:rate5m / ignoring(code) group***left method:http***requests:rate5m`

	***MyOp: 이렇게 결과를 쉽게 조작해서 의도된 좋은 데이터를 모니터링의 기준으로 삼을 수 있는게 환상적이네***



* Prometheus Configuration 

	* 두가지 설정법

		* command-line flag

		* configuration file

	* 어떤 쿼리를 했는지 저장할 수 있는 로그를 지정할 수도 있다.

		* `global, rule***files, scrape***configs, alerting, remote***write, remote***read, storage`

	* 자주 쓰거나 부하가 큰 것들은 캐시를 지정해놓을 수 있다.

```dj.alerts.yaml

    rules:

      - alert: alerts:cpu_usage:prometheus:80

        expr: rate(process_cpu_seconds_total{job=~"prometheus"}[1m]) * 100 > 0

```

* `prom tool check rules [name] ` yaml 의 문법 정합성을 체크

	* 얼럿을 미리 PromQL로 yaml에 정의해서 레코드가 쌓이는걸 볼 수 있다.

*  Prometheus 는 DSDB에 데이터를 쌓는데 이렇게 되니 성능문제가 생기기 쉽고 스케일아웃도 쉽지 않다. 때문에 확장을 지원하기 위해 `remote_write, read` 으로 나뉘는 샤딩 형태를 API로 구현한다.

* Scrap_configs

	* 가장 많이 설정하는 내용

```prometheus.yml

scrape_configs:

  - job_name: prometheus

    scrape_interval: 15s

    metrics_path: /metrics

    static_configs:

      - targets: [ 'localhost:9090' ] # override Global

```



⬇️ 타겟(host)에 대한 config. 타겟이 스케일아웃 되면 하나하나 잡아 줄 수 없으므로, 파일을 읽어 서비스 디스커버리를 자동으로 변경하도록 설정 

```

 - job_name: ‘dj-custom-file-sd’ # 별도의 타겟을 지정하게 되고 설정한 내용을 웹에서 볼 수 있다.

   file_sd_configs:

     - files:

         - /etc/prometheus/sd/dj_custom.json

       refresh_interval: 10s

```



⬇️  서비스 디스커버리를 등록해놓았고 

```

 - job_name: ‘dj-custom’

   scrape_interval: 10s

   scrape_timeout: 10s

   metrics_path: /metrics

   scheme: http

   http_sd_configs: //동적으로 타겟서비스를 찾아내는 리소스

     - follow_redirects: false

       refresh_interval: 1s

       url: http://sdapp:8080/targets

```

`curl -XPOST -v http://localhost:9090/.../reload` 이렇게 해놓으면 파일 dj-custom이란 디스커버리를 등록하여 체크한다. 이상태에서 서비스 호스트를 더 많이 추가하면 타겟이 추가되어도  자동으로 추가된다. 

	* 이런 SD들이 거의 모든 AWS 서비스에 다 존재한다. 

	* 태그를 이용해 모니터링 여부를 컨트롤하는 팁(모니터링하면 태그를 추가하고, 태그로 리소스를 검색해 모니터링 중이지 않은 태그를 알아내면 됨)

* Relabeling

	* Add Label by host’s meta data

* 룰 (얼럿, 사정저의 값으로 알람생성, 룰 - 캐시정보 생성)

---



## Install Prometheus

* 미리 `config.yml`을 작성하고 도커를 올릴때 volumes으로 업로드한다. 커스텀 네트워크를 사용하여 도커와 도커를 연결

* 그라파나를 써서 datasources를 프로메테우스를 지정하면 프로메테우스의 부족한 데이터 조회 기능을 보완할 수 있다. Prometheus 가 데이터 소스를 제공하고 그라파나는 시각화 

1. data source는 엘라스틱서치, 프로메테우스 다양하게 지원

2. node-exporter 메트릭을 외부에 노출 시켜주는주는 앱 (≈  CW agent)



### Install Kubernetes

```values-eks.yaml 

server:

  replicas: 1

  service:

    type: NodePort

    namedTargetPort: false

  ingress:

    enabled: true

    annotations:

      kubernetes.io/ingress.class: alb

      alb.ingress.kubernetes.io/scheme: internet-facing // 사내에선 internal로 설정한다. 

      alb.ingress.kubernetes.io/tags: Environment=prod,Name=argocd-alb

  extraArgs:

    - —insecure

  config:

    accounts.admin: apiKey, login

    repositories: |

      - url: https://github.com/dev-hibike/devops_k8s.git

      - url: https://github.com/dev-hibike/devops_sample_app_python.git



```

쿠버네티스에 접근하기 위한 인그레스 LoadBalancer 및 인그레스 설정 추가만된다.

---



## Prometheus Metric

* 프로메테우스가 이해할 수 있는 메트릭을 제공해주는 라이브러리를 사용해 만들 수 있다. `exporter`를 사용하면 만들지 않고 알아서 제공하게 할 수도 있다. 

* 단독실행되던 도커 옆에 `node***exporter`를 붙여서 컴포즈하고 `scrape***configs`에 잡을 등록해주면 끝. 

	* 수집 셋팅이 끝나면 그라파나에서 대시보드 마켓에서 대시보드 설정



### nginx-prometheus-exporter

	* exporter는 9133으로 수집한 정보를 노출하고 동시에 nginx의 메트릭을 관측한다.

`docker-compose.yml`

```yaml 

    nginx-prometheus-exporter:

      container_name: nginx-prometheus-exporter

      image: nginx/nginx-prometheus-exporter:latest

      ports:

        - "9113:9113"

      command: -nginx.scrape-uri http://nginx/metrics -web.telemetry-path=/metrics

```

 

`nginx.conf`  nginx는 URI로 정보를 서비스를 하고 이걸 Exporte가 참조한다. 

```nginx

  location /metrics {

    stub_status on;

    access_log off;

    allow all;

  }

```

* tips

	* 어플리케이션(워크로드)의 성격에 따라 커스텀 모니터링을 할 수 없다. 그러니 일단 잘 떠있는지 등 기본적인 것들은 공통이니 모니터링 하기 위해서 쓴다. 

	* `host.docker.internal` 도커에서 내부에서 로컬호스트를 가르킬 수 있도록 쓰는 도메인

	* `_***address***_`는 target 리소스에 등록한 호스트들을 가르킨다.

* `prometheus-flask-exporter` (라이브러리 형태로 exporter)

	* `import PrometheusMetrics` -> APM 같은 기분을 내준다. function level 에서 헤비한 작업을 한다고 했을때 그걸 측정하게 해주는 라이브러리. 코드로 등록하고, compose대시보드를 등록하고

---



## Kubernetes 리소스를 상태를 수집? node-exporter-Kube

* 프로메테우스에 대해 네임 스페이스 기준으로 쿼리를 할 수 있다. `label***values(kube***namespace***created,exported***namespace)`   결과가 탭으로 나뉜다.

* `sum(kube***pod***labels(exported_namespace=“$namespace:”})` → 이렇게 하면 적용중인 네임스페이스의 파드라벨의 합을 보여준다.

* `kube***service***createdexported_namespace=“$namespace:”, pod=~"$service.*})` -> Kubernetes 를 제외하고 상단 셀렉터에서 고른 서비스를 쿼리. 멀티밸류는 꺼줘야 원하는 값이 나온다.

	* `container***cpu***usage***seconds***total{namespace=$namespace”, image=“”, pod=~”$service.*”}[1m`  전체 CPU  자원 점유량을 표현, `contiainer***memory***res`를 사용하면  메모리 사용량을 체크할 수 있다. 

* 사이드 메뉴 사용법 주절주절 딱보면 다 알 수 있다.

	* value mapping (특정값에 도달하면 발동) 

---



## Prometheus Alarm

* 	Alertmanager 기반으로 여러 통신매체에게 전달하는식으로 Alert를 처리. 프로메테우스가 아니라도 매니저에게 통신요청 가능

	* Features: duplicating, grouping, sending, silencing, inhibition, HA

* Install

`alertmanager.config`

```yaml

global # 서비스 및 권한정보 

route # 받은 메시지를 처리하는 방법에 대해 정의, 재발생주기, continue(case fallthrough 와 같은 역할)

receiver: # 누가 받을지 어떤 채널에 보낼지, 어떤 내용과 제ㅔ목

inhibit_rules # 상위 등급의 알람이 왔을때 하위 알람을 무시하겠다.

templates: p[] # title, text 등 자주 쓰는 컨텐츠를 템플릿으로 관리하는 방법 지원

```

* smtp***auth***password 등은 계정에서 앱 패스워드를 발급할 수 있는데 보통 그걸 입력하면된다. 슬랙도 마찬가지다.

```prometheus.yml

alerting:

  alertmanager:

  - scheme : http

  api_version: v2 

```

* HA 컨셉

[image:82C74298-AB5C-41BA-B011-FF35EE5D13FA-76434-00000A38C4B69400/63644837-58F7-41E2-B344-CA6D8AED3649.png]

	* Alertmanager는 웹에서 확인가능하고 히스토리를 다 조회할 수 있다. 굉장히 유연하게 알람을 발생시키고 관리할 수 있네 좋다야.. 



### Alerting Making, Alert manager 를 거치지 않고 직접 발생시키기

* 슬랙 채널의 정보를 입력

* `Edit panel` →  `Rule, condition` -> `컨텐츠` 설정

---



# CH04 - logging 시스템

## CH04_01 ELK Stack 소개

* 각 서비스의 이름을 합친거. 여기에 Beat 시리즈가 합쳐져 스택이 됐다.

* Workload logging

	* 구식 모니터링  `Application + Log` 는 기본적인 동작 App’s stdout 하는 걸 파일로 기록하고 이를 호스트에 접속해 직접 본다.

	* 각각의 호스트를 접속해야한다는 전제조건이 생기는데, 클라우드 네이티브 환경에선 application 과 호스트가 디커플링된다. (종속성이 사라진다) 어떤 앱이 어떤 호스트에서 뜨는지 연결할 수가 없다.

	* 이 문제를 해결하기 위해 파일비트 데몬이 로그를 읽어서 *Elasticsearch* 로 보낸다. 여기서 더 필요하면 *Kibana*가 일을 하면 된다.

	* 파일비트의 설정을 바꿔야하는 시나리오에서 하나씩 접속할 수는 없으니 설정의 관리와 로그의 파싱은 *logstash*가 추상화 추상화 레이어로서 동작한다. HA를 구현하거나 queue 서비스를 합쳐서 메시지 정합성을 구현한다.

	* 로그들을 파이프라인으로 관리는게 이번 챕터의 목표

---



## CH04_02 ELK Component Elasticsearch

* 정형, 비정형 데이터 검색 및 분석 툴, Apache Lucene(java 기반 고성능 검색 library), 2010년에 출시, HA와 API를 제공한다 -> 여러 서비스와 integration

* 비교한다면 RDB? Inverted file index (vs row), 풀텍스트 데이터 검색에 용이(vs 데이터 수정, 삭제에 용이)

	* IFI? 문자가 들어오면 전부 다 쪼개서 테이블로 관리한다. `1  best 2,3` 

* Document

	* *데이터 단위(serialized json), collection of Field, Field=(key-value)*

	* *Index, collection of Document*

	* primary shard, replica shard 를 통해 HA구현

	* Mapping: support dynamic mapping. JSON으로 넣는다 하더라도 알아서 타입을 지정해서 관리해준다.

* HA가 중요하잖아.

	* 9200 - to Client / 9300 -  to Node

	* Master Node -> index metadata + shard location + cluster status

		* `elasticsearch.yml` 에 `node.master: true` 설정을 하여 마스터 후보군을 설정한다.

		* 후보군간엔 마스터만 관리하는 데이터를 공유한다. master가 너무 많으면 불필요한 통신이 많아진다.

	* Data Node -> store index data, `node.data: true`

* Split Brain Concept

	* Master 는 홀수개로 지정, (짝수면 문제가 생겼을때 각각 마스터 정보를 가지게 된다) v7부터 split brain문제를 해결하는 알고리즘이 들어갔고 그냥 홀수개로만 하면 된다. 

* Stack Component

	* 도큐먼트의 묶음이 Index(indices), 저장을 indexing -> es01(PRI-0,PRI-3, REP-1, REP-4), es02(PRI-1,PRI-4,REP-0,REP2), es03(PRI-2,REP-3) 이렇게 데이터를 쪼개서 데이터를 보존한다. P가 죽으면 남은 서버의 R이 P로 승격하고 파괴된 REP 샤드는 남은 노드 중에 한개에 생성된다.

---



## CH04_03 ELK Component Elasticsearch 설치

* 	도커를 이용해 Elasticsearch 설치 (master 1, Data 2)

```docker-compose.yml 

ES_SETTING_BOOTSTRAP_MEMORY__LOCK:”true”

node.roles: master

cluster.initial_master_node: esm01

discovery.seed_hosts: esm01, esd01, esd02

(...)

```

* `:9200/_nodes` 이렇게 API 호출을 하면 현재 클러스터의 구성정보를 조회할 수 있다. 

* 키바나를 켜면 KIBANA 쿼리 문법을 통해 ⬇️ 정보를 받을 수 있다.

	* `GET _nodes`

	* `GET _cluster/health` 

		* PRI 샤드가 배분안됐을때 RED, 

		* REP 샤드가 Assign안 되어있을때 옐로우

	* `GET ***cluster/setting?inlcude***defaults=true` 동시성 리밸런스 등 설정 내용을 확인가능 (이게 튜닝포인트)

```

PUT devops/_doc/1

{

  "title": "",

  "chapter": ""

} // 이런 형식으로 인덱스를 넣을 수 있다.

```

	* `GET devops/_doc/1`으로  정보를 조회할 수 있다.

	* `GET devops/_maaping`을 하면 다이나믹 타입을 결과를 알 수 있다. *ES는 다이나믹 매핑을 할때 가장 보수적인 매핑을 한다.* (즉 성능이 떨어진다, 튜닝할 부분이 있다) 이미 설정된 매핑은 바꿀 수가 없다. 

	* 한번 매핑이 되고 나면 다른 타입을 넣으려고 할때 에러가 발생하기 시작한다.

	* `DELETE develops/_doc/1`

	* `POST devops/_update/1` `{ “doc”: { “title”:”devops1”}}`

	* 직접 API를 날린다면 뭔가 이벤트 상황일것이다. 일반적으론 호출 할일이 없을테니까.

---



## CH04_04 ELK Component Kibana

* Elasticsearch 색인 데이터를 검색하고 시각화 해주는툴

	* discover, dashboard, canvas, lens

	* KQL(Query Lang), es cluster monitoring(X-pack)

		* Term:

			* text: a b c 

			* text: “a b c” 문장

		* Boolean : response: (200 or 400)

		* Range : bytes > 100 and bytes < 1000

		* Exist: currency: *

		* Wildcard machine.os:win*

* 컴포즈하고 샘플데이터 추가 -> Dev Tool -> 기본적인 KQL 로 조회가능

* `Discover`는 인덱스로부터 시간과 키워드로 데이터를 조회할 수 있다.

	* `toggle columm in table`로 데이터 뷰를 바꿀 수 있음 마치 RDB처럼 동작한다. 보기도 좋아

	* 이런 검색문들은 save해놓고 반복적으로 쓸 수 있다.

	* KQL을 GUI 로 만들어준다. (JIRA에도 있던거네)

	* popular 등 다양한 비쥬얼라이제이션과 통계들을 볼 수 있다. (오호)

* Stack Management

	* 인덱스 정보들을 관리할 수 있다.

* Stack Monitoring을 통해 관련 툴들의 헬스를 체크할 수 있다.

	* 도커에 `metricbeat.yml` 을 등록해 `metricbeat`를 설정해 데이터를 노출시켜놓는다. 

---



## CH04_04 ELK Component Beat

* 원래는 Logstash의 일부였으나 기능이 너무 커져 분리

	* 	audit, File, Metric, Packet, Heart(uptime), Winlog, Function(서버리스용)

* 도커구성

	* nginx(host Vol 마운트) + shipper(filebeat.yml, log mount)

	* .yml content -> `log path`, `output.elasticsearch:`

	* 파일비트가 던지는 것을 관리하는 ILM 설정 해주지 않으면 디폴트 정책 사용 

* 키바나 구성

	* 이제 KIBANA - Stack Mag -> Create index pattern (name, timestamp) 로그가 수집되기 시작한다. 한줄짜리 메시지가 수집되기 시작하면 각 로그들이 키밸류로 다 쪼개져서 테이블로 만들 수 있는 상태가 된다.

---



## CH04_04 ELK Component Logstash

* 인풋 -> 필터 -> 아웃풋 파이프라인 구축해주는 데이터 수집 엔진, jRuby (Ruby voer JVM) 

* Pipeline

```

input {}

filter {}

output {} // 어디(엘라스틱 + 인덱스) 로 보낼지 , 메타정보를 컨트롤 할 수 도 있다.

```

*  output은 인덱스 관리의 기준이 된다. (롤오버) ILM을 안쓰면 로그스태시에서 메타데이터로 날짜를 넣어(YYYY MM 같은) 인덱싱할 수 있다.

* *filter*

	* grok pattern: `PATTERN: {identifier}` 이런식으로 정의를 해놓으면 JSON으로 만들어준다. Serializer의 역할

	* *mutate*: 플러그인들이 많다. rename, uppercase, join, copy, sub 등 비트 사이의 추상계층이므로 여기서 값을 잘 정의해놓으면 비트에서 설정을 변경할 필요가 없어진다 . convert (ES가 마음대로 정해버리는 다이나믹 타입을 여기서 지정할 수 있다, 인덱스를 갈아 엎지않고 그냥 여기서 바꾸면 좋다.)

```

filter {

  mutate {

   split => { "hostname:" => "." } // 해당 문자로 list로 만듬

   add_filed => { "shortHostname" => "${[hostname][0]"}

   }}

```

	* 이 뮤테이트 작업들이 시퀀스가 보장이 안되는걸 기억. -> 보장이 안되는데 rename을 여러번하게 되면  종속성을 가져서 에러가 발생한다.

```logstash.yml

config.reload.automate: true // (프로세스를 자동으로 재기동 시켜줌, 실습에 유용)

```

* 이제 Elasticsearch 로 바로 보내지 않을거니 Beat의 설정도 로그스태시로 보낸다.

	* grok은 값을 후처리를 하기 위해 유용하다. For example, `geoip`플러그인은 퍼블릭 IP의 지리적 정보를 보여준다. 그러면 이걸 위해 Host IP를 grok으로 잡아서 인자(`source`)로 던져줘야한다. 

---



## CH04_04 ELK Component in Kubernetes

* Kubernetes 에서 각 노드에 설치된 비트가 logstash를 바라보게 만드는 구조

	* elasticsearch와 kibana는 Kubernetes 와 독립적인 환경에서 실행, 안에서 운영하면 언제 죽을지 모르니 안정적이지 않다.

	* EKS든 도커 데스크탑 환경이든 큰 차이는 없다. (ingress 설정만 다르다)

* 구성

`host.docker.internal:9200`으로 output

구성을 마치면 `index create`

---



## CH04_04 ELK Component aws SaaS

* 시나리오 1. 

	* node -> watch subscription filter -> lambda -> Elasticsearch 

* 시나리오 2. 

	* node (with fluent bit) -> aws KINESIS -> Elasticsearch 

	* 키네시스  (메시지스트림  만들어줌), 람다를 불러서 로그를 가공할 수 있다.

		* fluent bit는 이 만들어진 스트림을 가르키게 한다.

* aws 자원들을 테라폼으로 구성 ->  argo CD로 app 및 LoadBalancer ctrl makefile 배포 ->  아르고 synk -> Lens 대신 중앙 집중 로그관리 구조 완성