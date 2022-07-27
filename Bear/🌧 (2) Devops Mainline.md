# 🌧 (2) Devops Mainline

#Devops #Mainline


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

2. `tf apply ~~-auto~~ap prove`

3. EC2 접속후 `git remote -v`결과로 클론, 허드슨이 제공하는 공식 스크립트로 젠킨스 설치

4. `journalctl -u jenkins.service -f` `netstat -nlp | grep 8080` `curl - v http://localhost:8080` 이렇게 구동 확인

5.  실습의 목표는 젠킨스가 ECR의 이미지를 가져와 도커를 다뤄야 하므로 도커 데몬스가 필요하다. 

```DOCKER daemon install

sudo uyum install -y docker;

systemctl enable docker;

systemctl start docker;

ll /var/run/ | grep docker // 이렇게 보면 docker를 3개 볼 수 있는데 sock이 중요하다. 

```

6. 권한 부여 `usermod ~~aG docker ec2~~user`  socket에 접근 할 수 있도록 하기 위한 조치. 소켓은 root, docker 그룹에 속한다. 가지고 있으므로 ec2-user 에게 권한을 준다. 명령어를 내린 다음 재로그인해야 적용. 

7. `cat *etc*passwd | grep jenkins` 젠킨스 유저가 도커를 컨트롤 할 수 있게 `sudo usermod -aG docker jenkins` 이제 젠킨스도 도커를 컨트롤 할 수 있다.



## CH02_04~07 실습 #2 by Docker

* DIND 구조와 DOOD 구조

Docker in Docker: 딘드 내에서 소스 코드를 빌드한다면 딘드가 여러개있을때 독립적인 환경을 구성할 수 있는게 장점. 대신 딘드가 리눅스의  **Cgroups**에 접근해야하므로 권한을 많이 가지게 되고 딘드가 침해당하면 호스트가 침해당하게 된다.

* DOOD(Docker out of Docker)

	* 도커데몬 대신 도커 클라이언트로 두드를 실행한다. 유닉스 소켓(docker.sock)을 통해 요청을 하여 마더 도커 데몬과 통신을 한다. 보안 취약을 극복할 수 있지만 두드 컨테이너는 네임페이스를 마더와 공유하기 때문에 여러 두드가 생기게되면 사이드이펙트가 발생.  격리를 포기한다는 뜻.

	* DOOD의 도커 클라이언트가 도커 Push등의 명령을 받게 되면 호스트의 데몬에 소켓을 통해 요청을 한다. 

	**호스트 소켓은 어떻게 두드가 참고 할 수 있을까? (서로 독립된 OS인데) -> 마운트를 하면 된다. 두드는 소켓에 대한 권한을 가지면 된다. 호스트는**docker:999*그룹을 jenkins 실행 계정에 실행한다.

	* 이때 액세스 권한에 주의한다. sock을 others에 다 풀어줘도 해결이 될 수 있지만 보안 문제가 발생한다.

* 실습 시나리오: When github receive push Req -> Pipeline -> Delivery

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

2. 웹서비스에서 초기설정 →  젠킨스 URL → 로드밸런스나 다른 서비스에서 젠킨스를 참조할때 사용

3. **Pipeline script from SCM(Source Control Management)** 라는 옵션이 있다. 깃에서 스크립트를 가져오게 와서 사용함. 이러면 매번 웹 인풋박스를 통해 잡을 매니페스트 하지 않고 체계적으로 관리할 수 있게 된다. GItOPS

4. 깃허브에서 발행한 레포, hook 권한을 준 키를 입력한다.  

5. WEB hook 설정을 한다. 젠킨스 주소, json, 이벤트를 설정 이제 웹훅을 통해 트리거되는 모습을 볼 수 있다. 


---

##  CH02_07 실습 #3 CI 자동화

* 젠킨스 환경변수 사용 `env.WORKSPACE`

* `when { expression { return params.DOCKER_IMAGE }` 이런식으로 사용한다.

****빌드는 캐시에 영향을 많이 받는다.*

### 자동화 과정

1. 빌드(`docker build -t test:1`

2. 테스트(`docker run --rm test:1 root*.local/bin*pytest -v`)

3. 이미지 푸시

```

sh """

docker push ${DOCKER_IMAGE}

# 이런식으로 steps 안에서 쉘 스크립트 멀티라인을 정의할 수 있다.

"""

```



4. Deployment 

* 빌드 캐시는 디스크를 빨리 채우게 되고 운영에 지장을 줄 수 있다. 도커 GCE가 정기적으로 관리하도록 해야한다. 

	****prune* 이란 컨셉에 의한 캐시 정리는 문제의 원인이 되기도 한다. 가끔 하는 작업이거나 동시에 병렬 또는 시퀀스를 가질때 문제가 된다. 왜냐하면 A가 이미지를 prune으로 날리면 A에 대해 의존성을 가질때 B가 실패하게 된다. (Race condition) 배치잡을 통해 할것.

	* 컨테이너만 Prune의 대상이 아니다. 이미지, 볼륨, 네트워크, 시스템 오브젝트 모두 대상


---

##  CH02_07 실습 #3 CD 자동화

1. 파이프라인에서 설정을 하면 credential 을 이용, sshagent로 명령을 전달한다. 

빌드는 빌드서버에서

배포는 배포서버로 연결해서 수행 

```

aws ecr get-login...

export IMAGE=${ECR_DOCKER_IMAGE}

export TAG=${ECR_DOCKER_IMAGE}

docker-compose -f compose.yaml down;

docker-compose -f compose.yaml up -d';

```

2. **Input** 타입을 통해 유저에게 물어보고 입력 여부에 따라 프로세스를 분기하면 delivery를 컨트롤 할 수 있다. (이거 좋네!?) 빌드는 하되 배포하지 않는걸 통해 리소스 효율과 딜리버리를 달성할 수 있다. 

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

	* 컴퓨팅 서비스 ( EC2, Lambda, on-Premise) 에 배포 자동화 지원

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

	****Source* 지원 서비스 - 깃헙, 코드커밋, ECR, S3 (다른 소스를 쓰고 싶으면 S3에 후크를 걸면 된다.

	****Build* - 코드빌드, 젠킨스, 팀시티, 클라우드비

	****Test* - 코드빌드, 디바이스팜, S3 

	****Deployment*  - 클라우드 포메이션, S3, ECS

	****Approval* -  휴먼 디시전, Invoke(람다, 스탭펑션 호출)

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

	****Workflows* (전체를 아우르는 상위 개념)

	****Events* (push, pr, release, schedule)

	****Jobs* (스탭의 묶음, 러너가 실행하는것, 의존성있는 실행도 지원)

	****Steps* ( shell 실행을 말한다. 스탠드얼론)

	****Runners* (실행자, 애저의 서버를 활용할 수도 있고, on-premise도 지원

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

**복수의 REPO에서 각자 슬랙과 통신해야한다고 했을때 각 프로젝트마다 로직과 토큰을 관리해야 한다면 관리비용이 커진다. `커스텀 액션`을 정의해놓으면 참조를 통해**reuseable*을 보장할 수 있다.  

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

      uses: dev-chulbuji/devops_custom_actions@master

      with:

        args: slack

      env:

        SLACK_TOKEN: ${{ secrets.SLACK_TOKEN }}

        SLACK_MESSAGE: Push event!!

```



## CH04_04 CircleCI 소개

* Since 2011 개발

![](/BearImages/8FB83FDC-6CF1-4F11-A573-46B26809C1BF-641-000001BE4ABCEA9E/7A14CD8F-454F-4583-B6C8-FB3D31FB7856.png)

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

Concept

* GitOPS 기반 워크로드 실행 솔루션. 구체적으론 CD를 담당한다.

	* 설치시 쿠버네티스 내에서 자신의 워크스페이스에서 동작하며, 롤을 만들고 롤에 기반한 토큰을 발행하여 외부에서 api call을 한다.

* Argo를 구동하기 위한 워크로드(앱의 구성요소)

	* API SERVER

	* Repository server

	* Application controller 

	* dex-server

	* argocd-redis


---

## CH03 declarative-setup

* 기본 컨셉: 깃허브에 푸시를 하면 argo는 그걸 default 네임스페이스에 반영한다. 

* 디폴트  비밀번호는 configuration - secret 에서 확인가능

### 메뉴와 개념

	****repository* - 연동규칙 by http, SSH

	****Clucster*를 추가하면 현재 아르고가 실행중인 클러스터 말고도 외부 클러스터에 워크로드를 실행할 수 있다.

	****Project* == 네임스페이스와 동일한 로지컬 스코프

	****Role*을 만들어서 path에 따른 권한을 할당, Account 기반 권한관리도 가능하다

### 프로젝트

***프로젝트는 어플리케이션으로 구성되고 하나의 어플리케이션은 여러 워크로드로 구성된다.***

* 어플리케이션 생성

	* 이름, 싱크 정책 지정, 소스(레포지토리, PATH), Destination (`kubernetes.dafault.svc`)

	* 프로젝트에서 사용할 path와 클러스터 설정

* 여러가지 방식으로 리스트를 조회할 수 있다. 어플리케이션들은 싱크 값을 강조하여 보여준다. 각 어플리케이션을 정의하는 yaml의 싱크 상태 ( 정의된 상태, 실제 상태 ) 를 가시적으로 볼 수 있다.

* 기존에 클러스터를 명령어로 관리할때는 하나씩 명령어를 이용해 정의한 yaml 상태값을 apply하던것에 비해 git으로 상태값을 관리할 수 있게 된다.

```appProject.yml

spec:

  project: dev

  source:

    repoURL: https://github.com/dev-chulbuji/devops_k8s.git

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

    repoURL: https://github.com/dev-chulbuji/devops_k8s.git

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

* 사용 시나리오

레포가 바뀐다 -> Out of Sink -> 젠킨스가 감시하고 있다가 트리거 → 트리거에 필요한 토큰과 API 정보를 주면 된다.

```

/{project-name}/sync

// 헤드에 token

```


---

### CH04 app of apps 패턴

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



### CH05 local-user

* dex 서버를 이용해 외부 인증을 처리

* 가장 베이직하게 yml 에서 매니페스트

```

metadata: (중략)

data:

  account.alce: apiKey, login //이렇게 정의

```

	* 패스워드는 ARGO CLI 를 통해 진행한다.

* 명령어

```bash

argocd login cd.argoproj.io —username admin —-grpc-web

argocd account list

argocd account update-password --acount alice 

```

* ArgoCD RBAC (Roll base access control)

	* local user setup 또는 SSO기반으로 진행할 수 있으며 빌트인 권한이 존재한다.  

```values-local.yaml

server:

	rbacConfig:

    policy.default: role:readonly

```

	* `p, <role*user/group>, <resource>, <action>, <approject>*<object>, allow` 문법에 따라 권한등록


---

### CH06 SSO

* 설정: Organization → new → Settings → Developer Setting → new OAuth (name, URL, Authorisation Callback URL) → Got ClicentID , clientSecret (쿠버네티스 시크릿을 이용해 관리하면 좋다)

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

* SSO 로그인 UI 활성화 ->  ORG ->  TEAM 생성. -> rbacConfig 설정 추가 -> 깃헙의 조직구성에 따른 RBAC 관리가 가능

* 깃랩, LDAP 다양한 서비스 지원


---

### CH07 Kubernetes CICD with Actions

* App repo update -> image update -> config repo 의 values.yaml 업데이트 -> ArgoCD 가 싱크를 맞추고 POD가 업데이트 된다. 

* 설계 하나의 Config repo에 여러개의 App repo를 담는구조. 이걸 위해서 파드는 ECR에 접근할 수 있는 권한이 필요하다. 

*  Actions 동작과정

	1. App repo, `.*github/workflows*cdcd-k8s.yml`

```yaml

  cd:

    needs: [ci]

    runs-on: ubuntu-latest

    steps:

      - name: Checkout Target Repository

        uses: actions/checkout@v2

        with:

          repository: dev-chulbuji/devops_k8s

          path: deploy-k8s

// 일련의 스탭을 담은 액션

```

	2. Config repo. `demo/values.yaml`

```yaml

replicas: 1

image:

  repository: 552661052297.dkr.ecr.ap-northeast-2.amazonaws.com/demo

  tag: 1.2.6

  imagePullSecrets:

    - name: ecr-cred

service:

  type: NodePort

```

여기 TAG 버전을 바꿔주는게 앱 Repo 액션에 담겨있다.  그리고 컨피그 배포에 푸시 배포!



```App repo .yaml

      - name: Push helm repo

        env:

          token: ${{ secrets.GH_TOKEN }}

          IMAGE_TAG: ${{needs.ci.outputs.IMAGE_TAG}}

        run: |

          cd deploy-k8s

          git config --global user.email "dev-chulbuji@gmail.com"

          git config --global user.name "dev-chulbuji"



          git add demo/values.yaml demo/values-eks.yaml;

          git commit --message "Update demo image tag to $IMAGE_TAG";

          git config -l | grep 'http\..*\.extraheader' | cut -d= -f1 | xargs -L1 git config --unset-all

          git push --prune https://token:$token@github.com/dev-chulbuji/devops_k8s.git

```

* 이와는 반대로 Argo가 config repo를 풀링 하는 구조(3분주기)도 할 수 있지만 반대로 웹후크로 푸시하는게 낫다.

* ngrok

	* 외부에서 로컬호스트 서비스에 접근할 수 있도록 해주는 서비스, 현재 쿠버가 로컬에서 서비스 중이므로 외부서비스가 클러스터에 접근 할 수 없기 때문에 필요한 서비스

	* `http:*/12312323.ngrok.io` → `http:/*localhost:30080` 이렇게 해준다. 

		* 이제 GitHub Setting에 생성된 URL을 등록한다. 


---

### CH08 CircleCI

* 이전의 시나리오와 다른 부분은 Actions가 하던일을 .circleci가 하는점

1. CI

```

  steps: // ... (중략) 테스트 스탭

   -persist_to_workspace:

      root: .

      paths: VERSION // 이렇게 테스트하는 영역을 퍼시트로 선언하면

cd:

  steps:

   - attach_worksapce:

     at: . // 다음 스탭에서 활용할 수 있다.

```

2. CD

```config.yml

          git clone https://github.com/dev-chulbuji/devops_k8s.git && cd devops_k8s;



          yq eval -i '.image.tag = env(VERSION)' 'demo/values.yaml';

          yq eval -i '.image.tag = env(VERSION)' 'demo/values-eks.yaml';

// 클로닝 한 다음 버전값을 업데이트 했다.

... 중략

workflows:

  cicd:

    jobs:

      - aws-ecr/build-and-push-image: 

···

      - test:

          context: AWS

          requires:

            - build-and-push-image

      - deploy:

          context: GIT // 이건 깃허브에서 제공하는 변수 네임 스페이스

          requires:

            - test

```

	* 깃헙액션이 레포지토리 단위의 배포환경 설정에 특화되어 있다면, Circle CI는 중앙관리형 배포환경 관리가 가능해진다.  성능도 액션보다 빠르다.

3. **전체 워크플로우**

App Repo의 변화를 Circle이 알아차리고 컨픽 Repo를 업데이트. 그리고 컨픽 Repo에 걸려있는 Web hook이 Ngrok를 거쳐 현재 개발중인 로컬의 Argo를 콜. 파드가 배포된다.


---

### CH09 AWS EKS

****목표* Argo 를 통해 AWS EKS에 배포, v1.21, prod용, DMZ(public)vpc를 썼지만 실제환경에선 Private권장, 워커로드가 t3.small이라 한다면 워크로드에 대해 붙일 수 있는 파드의 갯수는 11개로 제한된다. Attach limit이 다르다.  [amazon~~eks-ami*eni-max-pods.txt at master · awslabs*amazon-eks~~ami · GitHub](https:*/github.com/awslabs/amazon~~eks-ami/blob/master/files*eni-max~~pods.txt) 이게 Packer 의 EKS config 리소스 배포 

1. EKS 리소스 생성, 컨텍스트를 Lens에 등록, LoadBalancer CTRLER 를 쓰기 위해 VPC 소스에 다음 코드를 추가한다.

```

// main.tf

  public_subnet_tags  = local.public_subnet_tags

  private_subnet_tags = local.private_subnet_tags

// *.auto.tfvars

	private_subnet_tags = { "kubernetes.io/role/internal-elb": 1 }

	public_subnet_tags  = { "kubernetes.io/role/elb": 1 } // 1또는 빈값을 넣어야하는데 이건 eks 리소스 독을 보면 알 수 있다. 이 태그가 있음으로서 LB CTLR이 일을 할 수 있게 된다. 

```

2. EKS를 쓸거니 이번엔 ingress 서비스를 이용해서 외부와 클러스터를 연결해야 한다. 배포가 되면 NGROK이 해주던 일을  이젠 로드밸런스가 하게 됨. 

![](/BearImages/14302489-A0A8-4198-977F-48B3152457C6-76434-000004DD7F908808/008B1B50-8AF1-4B8E-B36C-59233FFC50C7.png)

3. 아르고를 먼저 배포하고, App of Apps를 배포한다.

4. config repo에서 web hook 를 이제 nrok 대신 argo의 서비스 URL을 걸어준다.

5. 크게 달라진건 없다. EKS환경에 따라 인그레스 및 로드밸런스가 해야할일이 생겼을뿐.



* yq 명령어. jq 와 비슷한 커맨드. 파일의 내용을 바꿔준다. (json → yaml)

`yq e ‘.test = “no”’ ingnore.yml`  e .test란 키르 찾아서 no로 바꾼다는 의미




---



# Part 7 모니터링 서비스 및 운영 구현

## CH01 - 모니터링 개요

* 개발을 돕는 것이 지금까지 배운것이라면 모니터링은 운영을 돕는다. 데이터를 축적하고 액션 플랜을 다시 개발쪽에 제공해줄 수 있다. 

* Telemetric 원격측정

	* 모니터링, 로깅, 트레이싱( MSA에서 중요하다.) 하나의 사용 시나리오를 보여주는걸 트레이싱이라고 한다.

* 실습시나리오: external, public, private 3단 구조.

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

* Status check metrics (normal..?)

* EC2 usage Quota ( 한 리전에서 허락된 최대 리소스 사용량) 그것도 감시가능하다.

* 디테일드 모니터링 옵션을 켜면 과금이 된다. (TF에서도 관련 키가 있어~)

* Metrics 을 쿼리할 수도 있고 다양한 포맷으로 조회할 수 있다. (그래프 등)

* Period, Vertical annotation

* JSON 형식으로 API 쿼리를 해서 결과를 받을 수도 있다

* 굳이 하나 하나 안만들어도 기본적인 대시보드를 셋팅해놓았다. 


---



### _02 Monitoring #1 커스텀 매트릭

* 위에서 설명한건 다 제공하지만 프로덕션에서 특이한 것들을 모니터링해야한다면 커스터마이징한 메트릭을 만들어내야한다. 이건 CW agent 프로세스를 통해 put metric 으로 생성한다. 이걸 위해 EC2에게 IAM 권한도 필요

1. DMZ EC2를 관찰할 예정. 기본 메트릭 말고도 다른거를 보내는 내용 실습. 

2. 별도의 롤을 EC2 에 attach ( CloudWatchAgentServerPolicy )

3. 설치는 `userdata.sh	` amazon~~cloudwatch~~agent 를 yum 으로 설치

4. `sudo *opt/aws/amazon~~cloudwatch-agent/bin*… config~~wizard` (telegraph 기반)

위자드 형태로 config를 생성해준다. on-premise를 지원한다 -> 복합적인 구성도 가능하다.

`*opt/aws/amazon~~cloudwatch~~agent/bin*config.json`에 생성된 값 확인가능

5. API DOC → 수집가능한 메트릭의 리스트  

```bash

wget \

  https://raw.githubusercontent.com/dev-chulbuji/devops_infra/master/apne2/dev/ec2/bastion/templates/cloudwatch-agent-config.json \

  -O /opt/aws/amazon-cloudwatch-agent/bin/config.json



# run agent

sudo amazon-cloudwatch-agent-ctl \

  -a fetch-config \

  -m ec2 \

  -c file:/opt/aws/amazon-cloudwatch-agent/bin/config.json \

  -s

```

이렇게 하면 에이전트가 동작하기 시작한다.

* 커스텀 대시보드를 만들기

* CloudWatch agent configuration

1. agent: assume이라고 한다. EC2을 권한으로 에이전트가 동작하는걸

2. logs : nginginx를 쓴다고 할떄 로그를 클라우드 워치에서 로그를 보고 싶다면 path를 잡아서 바로 볼 수 있다. 시스템레벨 + 프로세스레벨 로그 둘다 가능!

3. metrics

* userdata 리소스를 이용해서 에이전트와 config를 넣으면 편하게 수집가능

	* 동일하게 셋팅을 했으니 Log groups > *aws/ec2/var/log*messages 그룹에 들어가면 인스턴스아이디별로 수집이 되는걸 볼 수 있다. 

	* 잘 트래킹하고 싶으면 시간을 잘 동기화 시킬것  `timedatectl set-timezone Asia/Seoul`


---



### _05 ALB logging

* 프로비저닝과 동시에 메트릭이 수집된다. HTTP status Code count 이런것도 수집이 되므로 연동해서 전략을 짤 수 있다. 

* ALoadBalancer attribute를 수정하면 accesslog를 s3에 저장하도록 셋팅 할 수 있다. 버킷 폴리시를 줘야한다. (여기선 자동생성)

* AWS의 서비스는 하나의 서비스가 마이크로 서비스로 짜여져 있다. 염두하면 이해하기 편하다.

### S3에 쌓이는 로그 정보를 처리하기

1. Athena가 직접 해석해서 서비스. 그냥 RDB처럼 보이는데 저장공간은 S3를 쓴다. 5TB에 아주 쬐금 과금 됨. 

	1. 쿼리 결과를 저장할 S3를 지정한다.

	2. DB, Table을 생성해준다. 공식 DOC에서 제공하는 생성 스크립트에 location, region 만 바꿔도 됨

	3. 이제 SQL이랑 동일하게 쿼리를 하면 결과를 볼 수 있다.

2. AWS Lambda가 주기적으로 패턴을 잡아서 호출

	1. 모든 걸 클라우드에서 하고 싶다! 그럴때 사용하는 전략

	2. S3이벤트를 받아서 파싱 후 클라우드 워치로 전송하는 코드.  보내는 포맷은 json, alb 선택가능.


---

### _03 CloudWatch Alarm #1 ~ #3

* collect(metrics, log) -> evaluation (static 판단 / abnormal 판단 지원) -> alarm -> action (sms, ec2, sailing, system manager)

* 알람의 옵션들

	* datapoint는 period 이내에 몇번의 유효판단을 요구할지

	* Alarm Status : OK ALARM INSUFFICIENT DATA

* 누락 데이터 처리전략 

	* notBreaching(treat as good)

	* breaching ( breaching the threshold)

	* ignore(알람 상태를 유지), missing (미싱이라고 지정)

* subscription filter 를 통해 이벤트 소스(에러) 에 따른 액션을 취할 수 있다. lambda, kinesis, opensearch를 호출하는 구조. 다만 이런건 datapoint 기능이 없다.

	* 이걸 하기 위해선 로그의 발생을 metric화하면 된다. 


---



### 실습시나리오

* watch -> SNS -> Lambda | chatbot -> slack

1. SNS 설정 (cloud watch 에서 관측할 topic을 생성)

2. 챗봇에서 슬랙에 대한 new channel을 허용.

3. Alarm을 만들어놓고 insufficient data 상태에서 시작, stress로 데이터 값 내고 ->   알람방생



* 로그기반 알람 실습

1. 시나리오, 읽은 로그를 통해 람다를 실행

2. 클라우드워치에 람다를 실행할 권한을 준다.

3. log groups -> subscription filter -> oom 이렇게 패턴을 건다. 패턴 검증도 가능

4. Log groups (로그스트림)에 잘 쌓였는지 보고 람다도 실행된다. 



* Log Insight

1. 쿼리를 날리듯이 짜놓으면 메트릭화할 수 있다.

2. Create metric filter. 1) Define pattern - 키워드를 패턴을 잡거나 accesslog처럼 형식이 있거나 하겠지. 그걸 원하는 대로 잡을 수 있다. filter pattern `${$.target***processing***time = 0.001 }`  ‘Metric Value ->  잡은 패턴값 그대로 쓸 수도 1로 쓸 수도 있다. (필드값을 따오고 싶으면 $로 참조)

3. 이제 로그 그룹스에 Metric filter 탭을 확인할 수 있다 

4. 이제 알람을 생성 -> 추가설정 만들값을 고른다.`$.target***processing***time` 선택

****Sumaary -> 로그를 메트릭 수치화 해서 대시보드에서 보거나 알람기능과 연동할 수 있다.!*


---

## CH03 - metric 모니터링 시스템 구축

### Introduce Prometheus

* 모니터링의 두 개의 컨셉

	1. Push, coping metric backend system, require agent

	2. Poll, require service discovery, easy to update setting

* 소개

	* PromQL, multi-dimentional

	* pull method, Collect, Store time-series

	* pushgateway ( 풀링이 적합하지 않은 리소스 eg. crontab)은 여기에 정보를 쌓고 server가 게이트웨이에서 풀링

* 컴포넌트

![](/BearImages/870777DA-620F-4B29-860A-8030D980093E-76434-000008ACBFB98A02/D9B0856C-6634-4EAE-B6F9-2B4698F029D5.png)

* Metric type

	* Counter (cumulative metric only up)

	* Gauge (up & down)

	* Histogram (sables observations), 0.3초보다 낮은 애들만 모으고 싶다. 이렇게 선언하여 버켓에 데이터를 저장할 수 있다. 서버측의 서버측 계산이 많다.

	* Summary: 특정 기간 동안의 클라이언트 사이드에서 계산을 해서 서버로 던진다.

* 메트릭의 구성

	**name, label key = label value, metric value**(scalar)*

****샘플* 

	* 프로메테우스에서 데이터를 일컫는, 검색을 하면 특정 시간대를 보여준다. 동일 시간대의 샘플 묶음을 인스턴스 벡터라 한다. 

	**prometheus***http***requests_total [1m] 이렇게 검색을 할 수 있는데 이건**레인지 벡터*라한다.

		* 하나의 샘플 안에 스칼라는 여러개의 스칼라를 가진다.

* 레인저 벡터

	* 시간 대역 대의 여러개의 값을 라 한다.

* PromQL

	* instance Vector selector 의 동작 코드가 200인 애들만 보고 싶다면? `prometheus***http***requests_total{code=“2—“)` regex나 논리표현도 지원한다. `code!=“200”`

	* `offset 1m` 1분전 데이터를 가져오고 싶다. UNIX epoch도 쓸 수 있다. 

	****operation*  → 인스턴스 벡터를 대상으로만 사용할 수 있다. 

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

* prom tool check rules [name] 으로 yaml 의 문법 정합성을 체크할 수 있다. 

	* 얼럿을 미리 PromQL로 yaml에 정의해서 레코드가 쌓이는걸 볼 수 있다.

* 프로메테우스는 단일 서버에 DSDB에 데이터를 쌓는데 이렇게 되니 성능문제가 생기기 쉽고 스케일아웃도 쉽지 않다. 떄문에 확장을 지원하기 위해 `remote_write, read` 샤딩 형태를 API로 구현한다.

* Scrap_configs

	* 가장 많이 설정하는 내용

```prometheus.yml

scrape_configs:

  - job_name: prometheus

    scrape_interval: 15s

    metrics_path: /metrics

    static_configs:

      - targets: [ 'localhost:9090' ] #override Global

```

	* 타겟(호스트)에 대한 컨픽(이건 스케일아웃되면 답이 없지), 파일을 읽어 서비스 디스커버리를 자동으로 변경하도록 설정 

```

 - job_name: ‘dj-custom-file-sd’ #별도의 타겟을 지정하게 되고 설정한 내용을 웹에서 볼 수 있다.

   file_sd_configs:

     - files:

         - /etc/prometheus/sd/dj_custom.json

       refresh_interval: 10s

```



* 아래와 같은 서비스 디스커버리를 등록해놓았고 

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

`curl -XPOST ~~v http:*/localhost:9090/~~*reload` 이렇게 해놓으면 파일 dj-custom이란 디스커버리를 등록하여 체크한다. 이상태에서 서비스 호스트를 더 많이 추가하면 타겟이 추가되어도  자동으로 추가된다. 

	* 	이런 sd들이 거의 모든 AWS 서비스에 다 존재한다. 

	* 태그를 이용해 모니터링 여부를 컨트롤하는 팁.

* Relabeling

	* Add Label by host’s meta data

* 룰 (얼럿, 사정저의 값으로 알람생성, 룰 - 캐시정보 생성)

### Install Prometheus

* 미리 config 용 yml을 작성하고 도커를 올릴때 volumes로 업로드한다. 커스텀 네트워크를 사용하여 도커와 도커를 연결

* 그라파나를 써서 datasources를 프로메테우스를 지정하면 프로메테우스의 부족한 데이터 조회 기능을 보완할 수 있다. 프메가 데이터 소스를 제공하고 그라파나는 시각화 

1. 데이터 소스는 엘라스틱서치, 프로메테우스 다양하게 지원

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

      - url: https://github.com/dev-chulbuji/devops_k8s.git

      - url: https://github.com/dev-chulbuji/devops_sample_app_python.git



```

쿠버네티스에 접근하기 위한 인그레스 LoadBalancer 및 인그레스 설정 추가만된다.


---



### Prometheus Metric

* 프로메테우스가 이해할 수 있는 메트릭으로 뽑아내는걸 라이브러리를 사용해 만들 수 있다. exporter를 사용하면 만들지 않고 알아서 제공하게 할 수도 있다. 

* 네트워크에러가 나면 `docker network create monitoring`dㅇ

* 단독실행되던 도커 옆에 node***exporter를 붙여서 컴포즈하고 scrape***configs에 잡을 등록해주면 끝. 

* 이제 그라파나에서 대시보드 마켓에서 번호등록

* nginx~~prometheus~~exporter

	* 8080:80, export도 같이 컴포즈에 넣어준다. 9113:9113으로 노출, `nginginx.scrape~~uri http:*/nginx/metrics -web.telemetry~~path=*metrics`

```nginx.conf

  location /metrics {

    stub_status on;

    access_log off;

    allow all;

  }

```

	* 이렇게 정볼르 노출시킬 패스를 만들어주고 이걸 Exporte가 참조한다. 

* Blackbox-exporter 

	* 어플리케이션(워크로드)의 성격에 따라 커스텀 모니터링을 할 수 없다. 그러니 일단 잘 떠있는지 등 기본적인 것들은 공통이니 모니터링 하기 위해서 쓴다. 

	* `host.docker.internal` 도커에서 내부에서 로컬호스트를 가르킬 수 있도록 쓰는 도메인

	* `_***address***_`는 target 리소스에 등록한 호스트들을 가르킨다.

	* 이렇게 컴포즈 해놓고 나면 익스포터는 앱의 활동을 감시하는걸 curl을 해보면 알 수 있다. 

* prometheus~~flask~~exporter (라이브러리 형태로 exporter)

	* `import PrometheusMetrics` APM 같은 기분을 내준다. function level 에서 헤비한 작업을 한다고 했을때 그걸 측정하게 해주는 라이브러리. 코드로 등록하고, compose대시보드를 등록하고 


---



### Kubernetes 리소스를 상태를 수집하기 위해 node~~exporter-Kube~~

* 프로메테우스에 대해 다음의 쿼리를 날리면`label***values(kube***namespace***created,exported***namespace)`  네임스페이스를 탭으로 표시해서 대시보드를 나눌 수 있다. 

* `sum(kube***pod***labels(exported_namespace=“$namespace:”})`이렇게 하면 적용중인 네임스페이스의 파드라벨의 합을 보여준다.

**`kube***service***createdexported_namespace=“$namespace:”, pod=~"$service.**})` -> Kubernetes 를 제외하고 상단 셀렉터에서 고른 서비스를 쿼리. 멀티밸류는 꺼줘야 원하는 값이 나온다.

	**`container***cpu***usage***seconds***total{namespace=$namespace”, image=“”, pod=~”$service.**”}[1m`  전체 CPU  자원 점유량을 표현, `contiainer***memory***res`를 사용하면  메모리 사용량을 체크할 수 있다. 

* 사이드 메뉴 사용법 주절주절 딱보면 다 알 수 있다.

	* value mapping (특정값이 도달하면 발동) 


---



### Prometheus Alarm

* 	Alertmanager 기반으로 여러 통신매체에게 전달하는식으로 Alert를 처리. 프로메테우스가 아니라도 매니저에게 통신요청 가능

	* Features: duplicating, grouping, sending, silencing, inhibition, HA

* Install

```alertmanager.config.yml

global // 서비스 및 권한정보 

route //받은 메시지를 처리하는 방법에 대해 정의, 재발생주기, continue(case fallthrough 같은 키워드)

receiver: // 누가 받을지 어떤 채널에 보낼지, 어떤 내용과 제ㅔ목

inhibit_rules // 상위 등급의 알람이 왔을때 하위 알람을 무시하겠다.

templates: p[] // title, text 등 자주 쓰는 컨텐츠를 템플릿으로 관리하는 방법 지원

```

* smtp***auth***password 등은 계정에서 앱 패스워드를 발급할 수 있는데 보통 그걸 입력하면된다. 슬랙도 마찬가지다.

```prometheus.yml

alerting:

  alertmanager:

  - scheme : http

  api_version: v2 

```

* HA 컨셉

![](/BearImages/82C74298-AB5C-41BA-B011-FF35EE5D13FA-76434-00000A38C4B69400/63644837-58F7-41E2-B344-CA6D8AED3649.png)

	* Alertmanager는 웹에서 확인가능하고 히스토리를 다 조회할 수 있다. 굉장히 유연하게 알러트를 발생시키고 관리할 수 있네 좋다야.. 

### 	Alerting Making, Alert manager 를 거치지 않고 직접 발생시키기

* 슬랙 채널의 정보를 입력

* Edit panel -> Rule, condition -> 컨텐츠 설정


---



## CH04 - logging 시스템

## CH04_01 ELK Stack 소개

* 각 서비스의 이름을 합친거. 여기에 Beat 시리즈가 합쳐져 스택이 됐다.

* Workload logging

	* 옛날의 방법,  `Application + Log` 는 기본적인 동작 App’s stdout 하는 걸 파일로 기록하고 이를 호스트에 접속해 직접 본다.

	* 각각의 호스트를 접속해야한다는 전제조건이 생기는데, 클라우드 네이티브 환경에선 application 과 호스트가 디커플링된다. (종속성이 사라진다) 어떤 앱이 어떤 호스트에서 뜨는지 연결할 수가 없다.

	**이 문제를 해결하기 위해 파일비트 데몬이 로그를 읽어서**Elasticsearch**로 보낸다. 여기서 더 필요하면**Kibana*가 일을 하면 된다.

	**파일비트의 설정을 바꿔야하는 시나리오에서 하나씩 접속할 수는 없으니 설정의 관리와 로그의 파싱은**logstash*가 추상화 추상화 레이어로서 동작한다. HA를 구현하거나 queue 서비스를 합쳐서 메시지 정합성을 구현한다.

	* 로그들을 파이프라인으로 관리는게 이번 챕터의 목표


---



## CH04_02 ELK Component Elasticsearch

* 정형, 비정형 데이터 검색 및 분석 툴, Apache Lucene(java 기반 고성능 검색 library), 2010년에 출시, HA와 API를 제공한다 -> 여러 서비스와 integration

* 비교한다면 RDB? Inverted file index (vs row), 풀텍스트 데이터 검색에 용이(vs 데이터 수정, 삭제에 용이)

	* IFI? 문자가 들어오면 전부 다 쪼개서 테이블로 관리한다. `1  best 2,3` 

* Document

	****데이터 단위(serialized json), collection of Field, Field=(key-value)*

	****Index, collection of Document*

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

	* 도큐먼트의 묶음이 Index(indices), 저장을 indexing ~~> es01(PRI-0,PRI~~3, REP~~1, REP~~4), es02(PRI~~1,PRI-4,REP-0,REP2), es03(PRI-2,REP~~3) 이렇게 데이터를 쪼개서 데이터를 보존한다. P가 죽으면 남은 서버의 R이 P로 승격하고 파괴된 REP 샤드는 남은 노드 중에 한개에 생성된다.


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

* 키바나를 켜면 KIBANA 쿼리 문법을 통해 정보를 받을 수 있다.

	* `GET _nodes`

	* `GET ***cluster*health` -> PRI 샤드가 배분안됐을때 RED, REP 샤드가 Assign안 되어있을때 옐로우, GET `***cluster*setting?inlcude_defaults=true` 동시성 리밸런스 등 설정 내용을 확인가능 (이게 튜닝포인트)

```

PUT devops/_doc/1

{

  "title": "",

  "chapter": ""

} // 이런 형식으로 인덱스를 넣을 수 있다.

```

	* `GET devops*_doc*1`으로  정보를 조회할 수 있다.

	**`GET devops/_maaping`을 하면 다이나믹 타입을 결과를 알 수 있다.**ES는 다이나믹 매핑을 할때 가장 보수적인 매핑을 한다.* (즉 성능이 떨어진다, 튜닝할 부분이 있다) 이미 설정된 매핑은 바꿀 수가 없다. 

	* 한번 매핑이 되고 나면 다른 타입을 넣으려고 할때 에러가 발생하기 시작한다.

	* `DELETE develops*_doc*1`

	* `POST devops*_update*1` `{ “doc”: { “title”:”devops1”}}`

	* 직접 API를 날린다면 뭔가 이벤트 상황일것이다. 일반적으론 호출 할일이 없을테니까. 중요한건 


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

		**Exist: currency:**

		**Wildcard machine.os:win**

* 컴포즈하고 샘플데이터 추가 -> Dev Tool -> 기본적인 KQL 로 조회가능

* `Discover`는 인덱스로부터 시간과 키워드로 데이터를 조회할 수 있다.

	* `toggle columm in table`로 데이터 뷰를 바꿀 수 있음 마치 RDB처럼 동작한다. 보기도 좋아

	* 이런 검색문들은 save해놓고 반복적으로 쓸 수 있다.

	* KQL을 GUI 로 만들어준다. (JIRA에도 있던거네)

	* popular 등 다양한 비쥬얼라이제이션과 통계들을 볼 수 있다. (오호)

* Stack Management

	* 인덱스 정보들을 관리할 수 있다.

* Stack Monitoring을 통해 관련 툴들의 헬스를 체크할 수 있다.

	* 도커에 metricbeat.yml 을 등록해놓아 `metricbeat`를 설정해 데이터를 노출시켜놓는다. 


---



## CH04_04 ELK Component Beat

* 원래는 Logstash의 일부였으나 기능이 너무 커져 분리

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

****filter*

	* grok pattern: `PATTERN: {identifier}` 이런식으로 정의를 해놓으면 JSON으로 만들어준다. Serializer의 역할

	* mutate: 플러그인들이 많다. rename, uppercase, join, copy, sub 등 비트 사이의 추상계층이므로 여기서 값을 잘 정의해놓으면 비트에서 설정을 변경할 필요가 없어진다 . convert ( 다이나믹 타입을 바꿀 수 있다, 인덱스를 갈아 엎지않고 그냥 여기서 바꾸면 좋다)

```

filter {

  mutate {

   split => { "hostname:" => "." } // 해당 문자로 list로 만듬

   add_filed => { "shortHostname" => "${[hostname][0]"}

   }}

```

	* rename을 여러번하고 종속성을 가질때 sequence가 보증되지 않는다. 주의!

```logstash.yml

config.reload.automate: true // (프로세스를 자동으로 재기동 시켜줌, 실습에 유용)

```

* 이제 Elasticsearch 로 바로 보내지 않을거니 Beat의 설정도 로그스태시로 보낸다.

	* grok은 값을 후처리를 하기 위해 유용하다. For example, `gioip`플러그인은 퍼블릭 IP의 지리적 정보를 보여준다. 그러면 이걸 위해 Host IP를 grok으로 잡아서 인자(`source`)로 던져줘야한다. 


---



## CH04_04 ELK Component in Kubernetes

* Kubernetes 에서 각 노드에 설치된 비트가 logstash를 바라보게 만드는 구조

	* elasticsearch와 kibana는 Kubernetes 와 독립적인 환경에서 실행, 안에서 운영하면 언제 죽을지 모르니 안정적이지 않다.

	* EKS든 도커 데스크탑 환경이든 큰 차이는 없다. (ingress 설정만 다르다)

* 구성

`host.docker.internal:9200`으로 output

구성을 마치면 index create


---



## CH04_04 ELK Component aws SaaS 이

* 시나리오 1. node -> watch subscription filter -> lambda -> Elasticsearch 

* 시나리오 2. node (with fluent bit) -> aws KINESIS -> Elasticsearch 

	* 키네시스  (메시지스트림  만들어줌), 람다를 불러서 로그를 가공할 수 있다.

		* fluent bit는 이 만들어진 스트림을 가르키게 한다.

	* 

* aws tf 구성 ->  argo CD로 app 및 LoadBalancer ctrl makefile 배포 ->  아르고 synk

* 렌즈 대신 중앙 집중 로그관리 




---



# Part 8 AWS 기반 보안

* 클라우드가 완벽하지 않다 .정보유출사건이 간간이 있었다.

* AWS Shared Responsibility Model

	* 클라우드의 보안, 클라우드에서의 보안

	* PaaS -> CaaS -> SaaS 하지만 결국 data는 항상 사용자의 책임

* Security Service

![](/BearImages/29AC0C7E-4A0E-49C3-B371-1776336F5D2D-76434-00000F0197EF3C7C/EA88D17B-DB0C-401F-9FAC-829770588D4E.png)



* CloudTrail, Audit 서비스  CloudWatch 

* Amazon GuardDuty 보안 자동화 서비스

* Amazon Inspector 검사 서비스

* S3 - Amazon Macie —> Security Hub (보안 중앙관리)

* AWS WAF (엣지단계 동작) AWS Shieled(DDOS)

* tenant를 구분하는게 가장 좋다. 컨트롤 타워, Devops, Security Account 나누면 운영이슈가 발생한다.


---



## AWS IAM

* 	Root, User - Role, STS (Security Token Service) 임시 발행 life time 존재

* AWS 서비스는 API 콜을 통해 이뤄지고 이때 SigV4로 사인된다. 이 사인을 검증하는게 IAM

* Policy

	* SCP (Service Control Policy)

		* org 내 정책, OU  or AWS Account 레벨에선의 정책

	* Permission Policy, Permission Boundary

		* 정책과 바운더리 교집합이 사용가능한 자

	* Session Policy

		* sms, federation 시 권한 제어 

	* Resource-based Policy

		* identity가 아니라 리소스 자체에 권한제어(S3, SQS, KMS, ECR)

	* Endpoint Policy

		* Gateway type vpc endpoint

* IAM Policy

	* Effect (Allow, Deny)

	* Principle ( 대상, 누가?)

	* Action ( 행위 ) 

	**Resource (무엇을) `"Resource":"are:aws:s3:::DOC/***test**”`

	* Condition

		* 컨디션 오퍼레이터를 통해 태그를 정책을 강제할 수 있다 .



* `Event Bridge(AWS의 cron)` -> lambda -> IAM Policy 



* User Group

	* 여기에 User와 Policy를 Attach

* IAM Role

	* Policy를 Attach를 해서 리소스나 아이덴티티에 권한 부여 가능

* Access Mng 절차

	* Identity에 붙이는 권한, 리소스 베이스 권한의 교집합이 사용가능하다. 모든 리소스가 리소스 베이스 policy를 가지는건 아니다.

	* Permission boundary && Identity based Policy && Resource base Policy

		* SCP 에서 Organisation SCP 를 걸었으면 또 이것도 추가

* 동일계정일때는 한쪽 (아이덴티티, 베이스) 만 되어도 되지만

	* 다른 계정일때는 교집합이 되어야 한다. 


---



### Assume (재밌는 요소)

* 컨셉: EC2에 정책을 Attach하지 않고 (깔끔하게) 요청을 하려면 EC2의 롤이 관련된 롤을 Assume하게 만들면 된다.

1. 예를 들어 한 `Master-Role`이 `Master Policy`를 가지고 있다.

2. `Master-Role`의 `Trust Relationship` 탭에서 `Action:AssumeRole` `Principle: {role:prod***role}`이라고 설정하면 prod***role은 마스터롤을 Assume할 수 있게 된다.

3. 이렇게 하면 prod_role에 아무것도 attach안하고 권한을 얻게 된다.

4. `vi  ~*.aws*credentials`

5. `[assume] region: , credential***source, role***arn:master_role` 이렇게 profile을 만들어놓고

6. `aws —profile assume s3 ls` 이렇게 하면 assume이 된다.

### Switch Role 컨셉

1. assume 설정을 해놓고 게정 메뉴에서 스윗치를 한다.  할때 마스터 롤이 A에서 Token을 준다. 

### terraform runner Role

* 각 유저가 이 권한을 Assume하도록 권한을 구조를 짜면 편리하게 권한 관리 가능

1. runner 롤을 만들고 dj에 대해 trust relationship을 등록해준다.

2.  aws configure —profile  dj-partial -> 액세스키를 물어보면 runner role에서 발급한 액세스키를 입력한다.

### ABAC (Attribute-based Access Control)

* 태그를 기준으로 컨트롤 하는걸 말한다.

* 데브 유저는 데브 EC2를.. 이렇게 컨트롤


---



## IAM 보안 Best Practice

* `ROOT` Account - 사용하지 않는게 베스트, MFA를 활성화하고 그리고 다음 방법을 통해 사용을 감시한다.

	1. Cloud Trail 생성 + Cloud Watch 에 로그 남기기

	2. EventBridge -> rules -> Event Pattern (custom) -> 로그인 and ROOT -> SNS -> publish

	3. Create SNS Topics with Access policy (root login)

* `#user`  - 강력한 암호정책 사용, MFA, Access Key 공유, 주기적 변경, Access Key 삭제

	1. password policy 정책

	2. 사내망 -> VPN or DX -> MITM proxy (외부 액세스키를 사용할때 소스를 보고 액세스 컨트롤 가능) -> 사용자(인터넷)

* IAM Policy - 최소 권한 제공

1. 	managed Policy 매니지드 폴리시를 사용하는 것을 추천

	1. MP는 AWS에서 만들어놓은 룰셋으로 나름 보장됨

	2. Custom defined policy도 괜찮다. 

2. inline Policy란

	* IAM -> Roles (add inline policy) -> JSON으로 입력해서 만드는 임의의 정책의 타입

	* 특정 Role 에만 적용이 되고 검색이 되지 않는다. (치명적일 수도 있겠다) 임시적으로 쓸때만 사용

	* 컴플라이언스에 맞춰 정책 설정 (IP, ABAC, UserAgent, MFA)

## 	EC2

* AccessKey 사용 하지마, Role 쓰고

* IMDSv2 사용, Instance meta data 

	* v1에선 curl 로 요청하면 필요한 정보들을 얻을 수 있다. 여기에 시크릿도 포함된다.

	* v2에선 unauthorized 된다. `TOEKN=curl -x PUT  ...` 이렇게 ttl token을 받아서 요청을 해야 시크릿을 받을 수 있다.

	* 테라폼에서  token을 요구하거나 최대 HOP도 지정할 수 있다. 

	* EKS 환경에서 파드들은 워커노드의 롤을 받아서 작동한다. 그러면 과도한 권한을 받게 되는데, 이때 쓰는게 서비스 어카운트 (EKS IRSA iam role for service accounts)

		* 이렇게 되면 명시적인 권한만 갖게 된다.

## IAM 보안 자동화

* 특정시간, 익스파이어, 크론 등 자동화에 따른 동작

* 람다 js 로 작성한 로직플로우

`유저 정보를 다 가져온 다음 키를 map 이터레이트 하면서 메타데이터를 기준으로 만료든 뭐든 하는 구조`

* Event Bridge 에서 이 람다를 호출한다. 이런거 안하고도 람다 스스로도 period를 지원한다. 



## IRSA

* 	파드가 노드의 권한을 assume하는 문제를 해결하기 위해 큐브아임 같은 서비스를 쓴다. (iam 컨트롤러 서비스, assume 여부를 판단해주는 서비스, 별도로 설정할 필요가 없으니 좋지) 이런 서비스를 안쓰고 OIDC(Oauth2.0)를 쓰는 대안이 있다.

![](/BearImages/379D5BF2-60F7-4233-A912-75E61788D0D8-76434-000010600D678BBF/96919664-63B8-4A1A-8DFF-B44909EA9723.png)

1. EKS에서 enable_irsa=true를 활성화

2. yml에서 정의하여 서비스 어카운트를 만들어서 파드에 붙이고 

3. 서비스 어카운트 annotations: 에서 만들어준 롤을 정의해준다.

```

serviceAccount:

  create: true

  annotations:

    eks.amazonaws.com/role-arn: >-

      arn:aws:iam::552661052297:role/aws-cli-role

  name: aws-cli

```


---



## AWS EC2

* Related concept : IaaS, EIP, ENI, SG, AMI, EBS, EFS, Key pairs

1. 퍼블릭 -> 프라이빗 존 방법을 가장 많이 쓴다. 이 구조는 외부에 열려있다는게 문제(SG, RACL로 막긴 하지만)

2. VPN -> 프라이빗 존 이 방법이 좋다.

* EC2 들어가면 authorized_keys에 키페어에 등록한 pem이 등록이 되어있지. 그래서 ec2유저로 접속을 할 수 있잖아 당연한 거지



*  일반 유저를 쓰고 싶다면

	1.  `ssh-keygen -t rsa`로 키를 생성하면 `test, test.pub` 파일이 생성된다.

	2. 이제 EC2가서 `useradd -m test`  유저 생성 `cat *etc*passwd | grep test` 확인

	3. su - test   `vi ~*.ssh/authorized_keys` 에 `cat ~/.ssh*test.pub | pbcopy`의 결과물을 넣는다.

	4. `chmod 700 ~*.ssh` `chmod 644 ~/.ssh*authorized_keys` 

	5. 이제 기본 키페어가 아니라 추가한 유저로 좁속을 할수 있다.

* 서버마다 별도의 키페어를 설정하면 가장 좋지만 운영코스트가 높아진다.


---



##  CH03-01 세션매니저 Systems Manager(previous: SSMSimple Systems Manager) 

* 기본적으로 사용하는 AMI에는 설치안해도 SSM 매니저 에이전트가 설치되어 있다. 다른 이미지를 쓸때는 설치해줘되는데 문서참고

* SSM이 에이전트와 통신을 하게되는데 권한도 필요하다.

	****EC2를 생성할때 정책에 SSM Assume 을 주면된다.*

* SSM이 있으면 웹으로도 바로 접속이 가능 (ssm-user, sudo 권한이 있음) 

* 이걸 쓰면 22번 포트 닫아버리고 SG를 비워버릴 수 있음



* 보안 세션을 로깅하는 니즈가 있다면 `AWS system manager` -> session manager

	* idle session time

	* KMS encryption

	* default user 설정

	* CloudWatch 설정 (실시간 파이프라인을 할 수도 있고, 로그를 업로드 하는 방식 두가자 지원), 이걸 활용해서 명령어 감시도 할 수 있음. 이런 키관리, 명령어 감시, 솔루션들이 많다. 이런걸로도 충분히 활용할 수 있다~ 압도적이다.. 떠 먹기만 하면된다. 데이터는 이미 시스템에 충분하니 조금만 건들여주면 상용 솔루션에서 하는걸 다 해줌.

###  aws-cli 에서 SSM을 호출해서 접근하는 방법

1. .ssh/config | grep ~~A 6 Proxy 에 보면 `aws ssh start~~session ... /prod.pem` 이런 명령어를 활용할 수 있게 셋팅이 되어 있다. 이걸 셋팅해놓고 `ssh i~~{instance~~id}` 이렇게 바로 접근이 가능해진다. 매번 pem을 바꾸는게 아니니까 혁신..!

2. 방법 2 go lang으로 커맨드를 만든다. 아니면 배시쉘이든

arg로 인스턴스를 받고 aws ssm 명령어를 통해서 접근을 하도록 한다.

* 이제 이런걸 기반으로 접근을 통제 및 로그 대시보드를 만들면 되는데 ‘HIWARE’ 같은 솔루션이 이런 일을 대신 해준다. (중앙관리를 할 수 있기 때문에 SSM을 거쳐서 하는게 좋아보인다)

## CH03-02 EC2 백업

* 저장공간을 활용하는 두가지 방법

	* EC2 에 EBS 2개를 올리는 상황에서 한개는 루트 한개는 도커용으로 쓸 수 있겠지. 전체를 이미지화 시켜서 동일한 EC2를 찍어 낼 수 있지. 이걸 AMI라고 한다.

	* 각각의 EBS별로 백업을 하고 싶을땐 EBS Snapshot을 만들고 이를 새로운 EC2의 볼륨에 attach 시키는 방법도 있다.

* snapshot 은 라이프사이클을 가지기 때문에 백업으로 쓸 수 있다.

* apply 한 뒤 `lsblk`로 마운트 상태확인가능

* EBS가서 항목을 선택해서 태그를 달고 

* AMI를 백업하고 싶으면 event bridge 를 이용해 AMI를 찍어낸다.

* 이런걸 해주는게 또 `AWS backup`

	* Backup vaults

	* 디비든 이미지든 다 백업을 할 수 있고 리텐션 등 플랜도 설정가


---

## CH03-03 EC2 AMI 

AWS Golden Image : Standard, 필수 패키지가 설치되고 , 보안 조치가 완료된 것을 일컫음

골든 이미지는 패치가 있을때 마다 자주 생긴다. devops의 관점에선 이런 이미지를 만드는 것의 절차를 고민해봐야한다.

* `Packer` (Build automated machine image tool, support multiple platform) 를 이용해서 이걸 해보자.

	* 코드푸시  -> 코드빌드로 트리거 -> 패커가 ec2 start, sensible playbook 실행 -> AMI 백업

* 위의 절차를 대신 해주는 서비스 `AWS Image Builder`

* PK working process

	1. ec2를  띄우고

	2. buildspec.yml ~~> `패커 설치`, `패커 .hcl 검사`, `packer build -var~~file …`

	3. ami.pkr.hcl ->`source “amazon_ebs”` 리소스 사용

		1. `ami_users` 만든 ami를 공유해야할때 쉐어링할 아이디를 넣는다.

		2. vpc, subnet, SG, metadata_options provision 마지막으로 build pie

```ami.pkr.hcl

build {

  sources = [“source.amazon-ebs.this”]



  provisioner “shell” {

    inline = [“sudo amazon-linux-extras install ansible2 -y”]

  }



  provisioner “ansible-local” {

    playbook_dir  = “playbook”

    playbook_file = “playbook/${var.playbook_file}”

  }



  provisioner “shell” {

    inline = [“rm .ssh/authorized_keys ; sudo rm /root/.ssh/authorized_keys”]

  }

}

```

```playbook.yaml


---

- hosts: localhost

  connection: local

  gather_facts: true

  become: true

  vars_files:

    - vars/main.yml

  roles:

    - { role: 00_cw_agent }

    - { role: 01_docker }

```

* !Codebuild 로 위의 절차 똑같이 하기

	1. Code source, branch event

	2. Web hook

	3. Managed Image `Amazon linux 2`

	4. Service role -> 주변 라이브러리 참조하는 등 권한이 필요하다. 그래서 이걸 롤을 준다.

	5. 워커컨테이너 설정 - 구동 네트워크 위치  (사설 망에 있으면 라이브러리를 참조 가능하겠지)

	6. compute 사양

	7. VPC내에 구동 or 밖에서 구동

	8. CloudWatch  설정


---

## CH03-02 EC2 inspector(v2)

* Feature. 

* 자동 취약점 점검 

	* support EC2, ECR

	* Report (Severity rating, affected resource info, how to remediate)

	* Central management

	* Integration with AWS Service

![](/BearImages/B52DB2E6-A119-4523-96B9-ACCBD13758AA-76434-000010B203767F48/E5277150-8640-4A1A-A7D8-9A914635F661.png)

* 관리자를 위임할 수 있고 각 계정의 인스펙터에 잡혀있는 취약점을 루트 관리자 입장에서 모아서 볼 수 있다.

* Active, Suppressed(예외처리), Closed(조치, 30일 뒤 삭제) 

* 스캔시점

	* 새 인스펙터 발견, 인스턴스 시작, 소프트웨어 설치, CVE 업데이트 , 30일 동안 스캔을 하지 않을시

* 기존에는 에이전트를 설치했어야 했으나 SSM agent에 통합되었다.

* Basic scanner -> Enhanced scanning(과금)을 사용하면 

	* 패키지 취약(기본) + 프로그램 취약성을 점검한다. 

	* 다른 서비스 security hub, event bridge 도 지원

* 데비안, 오라클 리눅스, 각 프로그램 랭귀지별 지원하는 리스트가 따로 있음

* 무료 버전은 clear project를 내장하여 사용하고, 프로는 별도 개발 스캐너 사용


---

# Part4 네트워크 보안

## AWS VPC 소개

* routing table 은 subnet association이 가능하다. (여러 서브넷에 적용가능)

	* Edge Association - IGW, VGW

	* Route propagation

	* VGW

* NAT는 프라이빗에서 인터넷 접근을 허용하기 위해 사용된다.

	* 2가지 단점 최대 bandwidth가 정해져있음. IPv4만 지원

* VPC - Middlebox routing

	* Middlebox routing 을 생성할 수 있다. Source -> middle -> destination 

	* middle로는 보안장비, ec2 를 지정할 수 있다. 

	* 시나리오

		1. Ingress traffic 을 검사. 중간에 Firewall 앱을 넣으면 되겠지

		2. Subnet to Subnet 간 검사 하도록 구조를 짤 수도 있다.

		3. GLB -FW를 통한 트래픽 검사. VPC안에서 또 쪼갤 수 있는게 도와주는게 GLB

			1. 만약 인터넷으로 향하는 트래픽은 GLB(+security appliance) 를 거쳐서 나게 할 수 있다.

	**Account마다  VPC를 보통 생성한다. 공유할 수도 있다. 10.1 데브, 10.2 테스트 .. 등등 온프레미즈, 다중 클라우드.. 이런 환경에서**VPC IPEM*을 이용하면 Scope가 생성되고 Private, Public. 이 풀을 단위로 모니터링 및 리소스 할당을 관리할 수 있다. 

		* 다른 VPC와 오버래핑 되는지 여부도 확인

* tf로 생성한 자원들을 웹에서 수정하려고 하면 경고 문구를 뛰운다.

## AWS VPC 트래픽 제어

* SG (ENI에 설정하는 가상 방화벽) 주의!‼ EC2에는 ENI(ethernet network interface)가 붙는다. Default all deny, SG changing, Prefix list 활용

	* in + out bound → soft limit 60 개 한계

	* Network Interface 에 붙일 수 있는 SG는 soft limit 5개

	* AWS 요청하면 하드리밋까지 늘릴 수 있음

	* 핑을 보내면 리눅스에선 랜덤 포트로 리스폰스를 던진다. 스테이트풀 하기에 SG를 통과할 수 있게 된다.

	* chaning : CIDR형태가 아닌 SG를 연결하는걸 말한다. 이렇게 관리하면 IP가 바뀌어도 데이터를 안바꿔도 된다. 다른 VPC간엔 연결(Peering)이 되어있을때 Chaining이 가능하다.

		* Transit gateway는 SG를 지원하지 않는다.

	* prefix list

		* 자주 사용하는 IP 대역들을 관리(SG를 수 없이 연결하기는 힘들잖아)

		* 예를 들어 사무실 대역

* NACL 

	* Stateless, rule number가 낮은걸 우선, subnet 단위, allow & deny

* SG + NACL 전략 → 3 TIER arch

	* public - 서비스하는 서브넷, 인바운드는 22 막고

	* private - ELB SG만 허용 

	* RDS  - EC2 SG만 허용

	* 	NACL은 외부에서 ELoadBalancer 앞에 있다가 DDOS를 차단한다.

![](/BearImages/053BF0F4-5507-40F7-9DA3-887430F7098A-76434-000010E74D09C4D5/4E31F0DA-0AB3-40E1-AFD2-9567EC5D7217.png)

* ANF (Network Firewall)

## AWS VPC 프라이빗링크 엔드포인트

* EC2가 참조하는 서비스는 VPC 밖에 있는 경우가 많다. 별도의 로직이 없다면 이럴 땐 NAT를 통해서 나가게 된다. NAT 부하 비용 + 만약 컴플라이언스 이슈가 굉장히 강한 비즈니스라면 이런 외부로 나갔다가 다시 들어가면 안되는 니즈가 있다. 

![](/BearImages/B09B6713-ECC1-4843-AEBA-F59C11E467F5-76434-000010ECCAC4F83A/FF12DDFC-092B-4B4F-961A-89EE100248AA.png)

* 그럴땐 인터넷으로 나가는 것은 프록시를 통해 나가도록 처리할 수 있다. (프록시의 코스트가 들어간다) 심리스하지 못하다 (간단)

* 이런 니즈를 충족하기 위해 VPC PrivateLink

	* VPC -> AWS 서비스, 다른 AWS Account 서비스, AWS Marketplace 서비스

	* IGW, NAT, G/W, DX, VPN 을 안써도 된다!

* Endpint 는 프로듀서와 컨슈머 둘로 나뉜다.



Consumer 입장에서 사용할 수 있는 2가지 Endpoint

* Private LINK링크형 엔드포인트

	* 특정 ENI에 서비스로 가는 링크를 만든다.

	* SUBNET에 맞는 IP를 받는 ENI. ENI에 SG도 붙일 수도 있고 IAM policy도 붙일 수도 있다. 

* 게이트형 엔드포인트 (GW endpoint, GW LoadBalancer endpoint)

	* S3, DynamoDB 서비스만 지원

	* Routing 규칙을 추가해서 사용

	* SG, IAM Policy (X)

	* AWS 외부에서는 사용 (X)

* Producer - Endpoint Service

	* 우리가 사업자라면? 엔드포인트 서비스를 이용해 다른 사람들이 우리 서비스를 consume할 수 있게 설정해야한다.

		* NLB(endpoint service) - interface endpoint

		* GWLB - gwlb endpoint

	* 위 두가지 타입을 이용해 컨슘을 할 수 있다.

* VPC를 통해 연결하고 S3로 연결시키면 패킷을 인터넷망에 노출 안시키고 보낼 수 있다.

## AWS  VPC 프라이빗링크 GWLoadBalancer 엔드포인트

* 네트워크 관리자의 니즈

	* 네트워크 시큐어를 배포 및 확장, 관리

	* IDS, IPS도 하고 싶고, egress domain base filtering도 하고 싶다.

	* IG와 EG가 방화벽으로 트래픽을 보내는 구조로 쓰는데

* Firewall로 트래픽을 몰면 failover 문제가 생기니 HA를 준비한다. 이런 문제를 해결하기 위해 GWLoadBalancer 가 출시

	* GWLoadBalancer 터널링 프로토콜 사용

	* L3 Gateway L4 부하 분산ㅁ

	* VPC  Endpoint service 등록 가능 (by Service producer) -> RT에 등록하면 됨

![](/BearImages/988132F1-9EAB-4C74-8DDF-3AC699F094F1-76434-000011462BFD7B43/FDEF81FA-D297-4A33-9A24-8E6661D9359E.png)

* 이런 아키텍트를 하고 싶을때 3rd 파티 제품이 GENEVE tunneling 프로토콜을 지원하는지 확인

## AWS Network firewall (ANF)

* stateless + stateful Policy ~~> NACL 과 비슷함, Pass-Drop~~Forward(to Stateful)

![](/BearImages/DFA2291D-BB4E-4EE6-8885-EE4C5DB1F372-41471-000011E76646707C/3A58FBF8-B578-4FFB-940D-98D3CD826A60.png)



*  suricata, domain 필터링, 통합관리

![](/BearImages/2A6414FE-ADE2-4B23-A9C3-9236BB21777B-41471-000011F18C7787C0/CD11A5D8-A7BC-49C7-99F3-BB4CEE0B98D8.png)

* 나가고 들어오는 패킷들은 방화벽 서브넷의 엔드포인트를 거치게 되고 이때 AFN을 한번 거치는 구조로 설계한다.

* only Stateful 리퀘스트만 로깅을 지원한다. 방법은 CloudWatch, Kinesis, S3

	* Unique Contributor Insider 기능을 통해 요청 소스를 시각화 할 수 있다. 

* ANF는 여러개 일 수 있고 이런걸 중앙관리할 수 있도록 매니저를 제공 하고 있다.

	* 허브 앤 스포크 형태로 VPC를 엮어서 관리할 수 있게 해주는 `AWS Transit Gateway` Firewall이 피어링을 지원하지 않기 때문에 유일한 선택지.

* VPC FIRE WALL -> 패스, 포워드, 드랍을 결정하고 포워드를 하게 되면 도메인 기반으로 허용하게 된다.

* suritaka 지원

```suri.rules

alert tcp any any -> any 80 (msg:"80site.com Access"; content:"GET /"; content:"Host: "; content:"80site.com"; sid:10001; rev:1;)

alert tcp any any -> any 443 (msg:"443site.com Access"; flow:to_server,established; tls_sni; content:"443site.com"; sid:10002; rev:1;)

```

이런 형식으로 line으로 정의하는걸 말함 (왜 써야하지? 웹에서 룰을 만드는 것도 잘 되어 있는거 같은데)

* 정리

1. AWS managed fire wall

2. SG나 NACL보다 더 복합적 기능을 제공

3. TG와 함께 하면 엔드포인트 아키텍트가능

4. 여러 account를 통합해 관리할 수 있는 기능


---

## AWS WAF

![](/BearImages/D6608CCE-62C3-4D60-9666-A1EEAA34F57E-41471-00001209AB65A747/62A4C680-9862-4A34-A3FF-70EC8F030F17.png)

**L7 보안 위협 대응 서비스, 지원(API GW, App sync, ALoadBalancer, CloudFront)**

* SQL injection, export code, malware → WAF

* AWS Shield (DDOS), 방화벽(AFN), 접근제어(NACL, SG), 격리(VPC)

* 전통적인 3티어 구성과 CloudFront-EdgeLocation이라는 기본적인 서비스 운영

	* 이런 구조에 SQLi, XSS 공격이 들어오면 막아낼 수가 없다. WAS가 부하를 먹고 요금만 왕창

	* 그래서 이걸 앞에서 막아주는게 WAF를 통해 악의적 공격을 차단

* 셋팅

	* Web ACL 생성

	* 보호할 서비스 연결

	* 규칙 정의 (Rule group, IP set, Regex set)

* WAF 규칙

	* AWS managed rule -> 1500개 안에서 쓰면 무료

	* Marketplace

	* Custom rule 룰을 false-positive같은 규칙을 지정할 수 있다. 워크로드에 맞는 조정 가능

![](/BearImages/81B141C1-9BA6-4889-ADB2-8133AF8970E0-41471-000012135A37DC3B/2D629EB7-D83D-4BD3-962F-FFE641B3AA37.png)

* 룰 순서에 따라 적용하고 뒤로 포워드

* 로그도 되는데 룰에 대해 어떤 검사를 받았는지 다 남는다. 로그 양이 방대하다.

* 관리할게 많다보니 자동화에 대한 니즈가 있고 이걸 해주는게 처음 이미지에 나오는 Athena, Lambda를 활용한 커스터마이징

* DDOS를 대응하기 위한 전략

	1. ALB만 트래픽을 받도록 접근제어를 구성

	2. EC2가 죽어도 서비스 되도록 HA구성

	3. AWS가 제공하는 !‼SLA(Service-Level Agreement

)를 잘 분석해보기

	4. NACL에 로그기반으로 정책을 심는 방법도 고려해보기 (과도한 접속 차단)

	5. 정적인 서비스를 프론트에 배치하면 디도스 대응이 된다.(비용이 나가는거 아닌가?!‼)

	6. 디도스를 탐지하는게 중요하다 (메트릭 기반의 알람, 람다 트리거, WAS로그를 통해 메트릭화)




---

## AWS Shield

* 디도스의 공격은 패턴이 명확하지는 않지만 weak-point를 최소화하고 HA 구성, 공격 대응르 위한 계획을 수립하는게 필요하다.

* Shield Advanced

	* Standard 는 리스크를 공유하기 위해 기본적으로 제공

	* Advanced는 DRT(Response Team)의 24x7 지원, DDOS 가시성 제공(CloudWatch metric, 공격 진단 리포트, 글로벌 위협 대시보드)

	* DDOS 사용비용 경감

		* standard 써도 로그 증빙자료를 만들어서 보내면 경감 받을 수 있다. (!‼ 이런 체계를 내가 만든다면 어떻게 해야할까?)


---

## AWS VPC 트래픽 로그 (VPC flow log)

* 사용할 속성들을 문서를 참조해서 tf 생성. 클라우드 와치로 연결 (접속 로그를 메트릭화)

* 바로 로그를 쌓자 마자 중국에서 SSH접근을 했네

* 아테나 쿼리 결과를 저장하는 S3설정

## AWS 보안탐지

### CloudTrail

* Single or Multi region, 로그는 다른 리전에 남는 경우가 있으므로 멀티 리전 감시를 권고

* 90일로 한정되어 있지만 S3, CloudWatch 로 전달하면 된다. SNS와 연동도 가능

* 기능에 따라 dev, test, prod, security 테넌트를 구분했다고 하자. 그러면 각 어카운트의 클라우드 트레일에서 로그가 생기게 되는데 S3버킷에 모아서 보면 된다.

	* 데브옵스가 여러 테넌트를 다 컨트롤 해야할때 Organization 그룹을 쓰는데 클라우드 트레일에서도 `Enable all account in my organization`옵션을 제공한다.

* CloudWatch -> lambda (정제) -> Kafka ~~> elascticSearch <~~ logstash 중앙 집중화 아키텍트를 쓰기도 한다.

* 클라우드 트레일을 활성화하면 최초에는 management event(무료)가 활성화 되어 있다. (최대 5개까지 활성화 가능)

* M event - control plane operation, AWS 리소스에 대한 작업 행위

	* KMS 인-디크립션이 굉장히 과정이 많은데 이건 제외시켜서 볼 수 있다. 

* Data event

	* Data plane operation - ex) S3 object api activity (Get Object), Lambda (Invoke API)

* insight event

	* AWS AI 기반 기계학습을 통해 비정상적인 행위 로깅

	* API Call rate

	* API error rate

* 로그에 남는 useridentity 의 종류

	* Root, IAMUser, AssumeRule, FederatedUser, Directory, AWSAccount, AWSService(Beanstalk처럼 알아서 움직이는 애들), Unknown

### GuardDuty

* 위험 유형 (Port Scan, 브루트) 인스턴스 침해 (C&C Activity, Bitcoin Mining), 어카운트 침해(소스코드에 계정정보가 있다면 자원을 마음대로 사용가능)

	* 인스턴스가 침해되면 메타데이터로 키를 가져와 자원을 가져온다. v2를 쓰면 막을 수 있음

* 로그를 기준으로 워크로드 동작 감지, 위협탐지, 미승인 활동 모니터링, No Agent, Sensor, Appliance, 머신러닝 기반

* Support - ec2, IAM, eks, S3

* 데이터 소스 - VPC Flow logs, DNS logs, CloudTrail, EKS Audit logs

![](/BearImages/CEBD8550-2317-4B94-B81A-76598B523291-41471-0000149A3C18F53C/3CC934CB-71BE-4FB5-98AA-401B2A93DB51.png)

* member account max 5000, 통합된 조회 및 관리 기능, 신뢰 및 위협 IP 업로드 기능

* Security Level (low, medium, High)

* Reputation IP ( 각 비즈니스에 맞는 Trusted 정보, SaaS를 빌려쓴다거나) 를 등록해 탐지 효율 증가

	* CrownStrike

	* ProofPoint

	* 고객정보

* S3 protection 

	* AWS Macie 기능 포함

	* 활동에 대한 이상 및 위협 탐지 기능

![](/BearImages/535F8780-2469-4858-81FE-CB7A9881319B-41471-0000149C57491F97/FF5FB368-BDC3-4714-8571-A7B09256F69A.png)

* 템플릿을 정해서 알림 가능

* 자동화 아키텍트

![](/BearImages/300A474E-F35B-4B4A-838F-C2BBF2F81513-41471-0000149D14F8DF9C/4677711A-9E0A-4232-B09A-01B919AEAD5A.png)

* 가드 듀티에서 찾아낸 파인딩들을 다른 서브에 접목할 수 있다.

### AWS Macie

* 민감 정보 검색 및 보호 서비스, 기계 학습 및 패턴 일치를 활용, S3에 저장된 데이타에 대한 보안 및 프라이버시의 가시성 제공

* Public access, sharing, encription

* `Discovery result` 에서 버킷을 만들어 정보를 담아야 한다.

* Custom data identifiers`에서 반응할 키워드를 셋팅

* `JOB`메뉴에서 이제 버킷을 대상으로 검색을 할 수 있다. (과금도 예측해서 보여준다) 샘플링 기능이 있어서 어느정도 가려서 볼 수 도 있다. 스케쥴 설정 가능, 특정 태그의 오브젝트만 검색 할 수도 있다. 가드에서 쓰면 싸게 쓸 수 있는데 Macie를 쓴다는건 커스텀 룰이나 스코프를 사용하기 위해서다.

* 발견한파인딩에 대해 SNS, CHATBOT을 이용해 모니터

### Security Hub

![](/BearImages/959E2DB9-B24E-4D99-8238-99D86D7FB9D6-41471-000014A6B6912141/C5256FB9-C251-4897-BAD6-75A0DBE3897E.png)

* 특성

	* 멀티 어카운트 & 서비스를 중앙화

	* ASFF (Security Finding Format)

		* 이 포맷을 지키면 다 통합될 수 있다. 

	* 규정 위반 및 체크 자동화, 통합 대시보드, 손쉬운 사용

* EKS의 정보는 Aqua 큐브벤치가 잡으로 존재하며 허브에 전달 -> 

![](/BearImages/5FC26E7E-F1A8-41F5-9FE8-E374F9BB4CEE-41471-000014A7D546F7DD/3A889130-ADF4-4007-8DC6-E7869C054DD4.png)

* 규정준수에 대한 스코어링을 제공한다. 제공 기준.

	* PCI DSS (Payment Card Industry Data Security Standard)

	* CIS AWS (CIS AWS Foundations Benchmark standard - AWS Security Hub)

* Insight (필터링)

	* 연관 검색 필터, 우선 순위 지정, AWS pre-defined Insight

	* Custom Insight 사용 가능

* 굉장히 많은 서비스들이 다 인터그레이션이 된다.

* Custom actions - 여기서 정의한 값을 다른 서비스에서 사용할 수 있다. 파인딩이 너무 많으니 필요한 기능

* 


---

# bonus Part AWS EKS


---



# AWS 관리형 쿠버네티스 클러스터 EKS

### 개요

* 제어 영역(Control Plane)을 직접 프로비저닝하거나 관리하지 않아도된느 편의성

* 노드 구성의 자유도

* 멀티 AZ 고가용

* 클러스터 업그레이드 편리

![](/BearImages/48B44BEF-01CE-4A19-80B7-22C4F9E19537-41471-00001602007626D6/046624F2-5C67-4558-94A3-5276FF1E53D0.png)

* 구성도

	* customer VPC (사용자의 VPC)

	* EKS VPC (Controll Plane) -> 대신 컨트롤

	* ENI (Private Link)를 통해 컨트롤 받는다.

* 로드밸런싱

	* 서비스 (ExternalName, Node 등), CLoadBalancer로 구성, annotation 설정을 통해 NLB로 구성 가능

	* 인그레스 L7기능을 위해선 추가애드온 설치필요. ALoadBalancer 로 구성

* 파드 네트워킹

* AWS VPC CNI

	* 기본적으로 설치되어 있는 네트워크 애드온

	* EC2는 모두 ENI를 가지고 IP를 받는다. ENI의 secondary IP를 통해 노드 내 파드가 동일한 VCP IP 대역의 IP 할당 ( ENI IP주소 제한 만큼 노드의 파드 개수가 제한됨) -> but 요즘에는 IP prefix 기능이 생겨 제한이 풀림

![](/BearImages/8E422652-6B46-42AE-8098-D0328F1AFE56-41471-0000160ABEA39294/A90D3B2A-30D6-4FCA-B1E3-9E7897760690.png)

* 저장소. EBS built-in StorageClass

	* gp2 타입의 EBS에 대한 StorageClass 내장되어 바로 사용 가능

	* EBS & EFS CSI Driver -> CSI 드라이버 구성을 통해 EBS/ EFS의 최신 기능 사용 가능

* 로그 및 메트릭

	* 로깅 옵션을 통해 API Server, Audit, Scheduler, Controller Manager 등 CloudWatch 로 수집

	* 노드 -> 기본 기능엔 없지만 Fluentd, Fluent Bit을 통해 CloudWatch 하라고 가이드하는 중 

* EKS 를 사용해야하는 이유

	* 클러스터 운영보다는 실제 비즈니스 운여에 집중하기 위해 (Control plane)이해하는게 쉬운 일이 아니라

	* 인프라 비용을 넘어 관리비용도 고려 (직접 제어를 프로비저닝 하는게 비용은 더 쌀 수 있지만 인력이나 시간을 고려)



### EKS 클러스터 구성 (웹콘솔)

* 사전준비. 

	* EKSClusterPolicy, EKSVPCResourceController 두개의 정책을 연결 시킨다. 

	* SG for Control plane : Cluster SG 라는 기본 그룹이 생성된다.

* 클러스터 구성 마법사

	1. 추가해놓은 IAM ROLE 추가

	2. VPC, EKS, SUBNET, Private 서브넷에서 운영.

	3. 클러슽처 엔드포인트 엑세스: 퍼블릭 및 프라이빗으로

	4. Kubernetes 애드온 설정

	5. 제어 플레인로깅 로깅량이 많기 때문에 비용을 아끼기 위해 비활성화.

### EKS 클러스터 구성 (테라폼)

1. 테라폼 레지스트리 - tedilabs - eks-cluster 모듈을 사용

2. define을 보면 웹콘솔에서 만들때 쓰는 정보가 다 들어있음. 엔드포인트에 대한 접근은 allow all 비추천

### Kubectl을 이용하여 EKS 클러스터 연결

* 클러스터 연결에 필요한 정보추가

	* `aws eke update~~kubeconfig -~~region= ~~-name -~~alias=`

	* `cluster kubeinfo` 



### aws-auth ConfigMap 관리

* EKS 제공 연결방법 aws-auth ConfigMap

	* aws~~aim~~authenticator

	* EKS NodeGroup Fargate도 클러스터 연결을 위해 동일 인증방식을 사용. 노드그룹과 파게이트 사이에서도 인증이 필요하다. 

``` IAM User 매핑 예시

mapUsers: |

  - userarn

    username

    groups:

      - system:masters  (중략)

```



```IAM Role

data:

  mapRoles:

    - roleARN: 

```

### 노드그룹 생성 (웹콘솔)

* 관리형 노드그룹 (managed NodeGroup)

	* ASG(Auto scaling Group) LaunchTemplate 기반

	* EKS가 EC2 인스턴스의 프로비저닝과 라이프사이클 관리

	* 안전한 버전 업그레이드 및 노드 종료 지원

* 사용자 관리 노드 Self managed Nodes

	* AWS EKS 에서 제공해주는 EC2 AMI 사용

	* 설정 자유도 높음

* 클러스터 만들기

	1. IAM 에서 정책 3가지 연결

	2. SG for node Group - 기본적으로 Cluster SG 에 연결됨. self managed node를 쓸때 이부분을 생성해줘야함

	3. 노드 생성 후 해야 하는 작업 EKS에 클러스터 접근 정보를 줘야한다. 

* 노드 만들기

	1. 앱 이름

	2. IAM (ec2CNI_policy, worker node policy, ec2containerReadonly) 정책을 가진 역할 생성

	3. 시작 템플릿 ( 고급설정 ) 

	4. Label, Taint 값을 설정할 수 있음

	5. 노드 그룹 조정 구성 2개

	6. 노드 그룹 네트워크  서브넷 ( ec2가 실행될 넷), 원격 액세스 설정

* Auto scaling 그룹, 인스턴스도 만들어진걸 볼 수 있다. 

	* `kubectl get node -o wide`로 조

### 노드그룹 생성 (by TF)

* 레지스트리 (모듈)에서 Auto Scaling, kubernates***conifg***map 두가지 모듈을 쓸거다.

* 리소스 구성

	* Launch Template - Auto-scaling Group 구성 목적

	* ConfigMap - Kubernetese~~system 네임 스페이스에 aws~~auth ConfigMap 구성 -> 클러스트 인증 제어 기

* 생성한 뒤에 `cat node-groups.tf`


---

# EKS 클러스터 활용

## IRSA

* Service Account, 파드가 클러스터 내 리소스에 접근하기 위해 존재. 하나의 파드는 하나의 Service Account를 가진다. 

* 쿠버네티스의 SA를 위한게 IRSA

	* 파드가 S3, DyamlnmoDB, SQS 에 접근하고 싶어함. 액세스키를 주자니 IAMUSER에 기밀값을 줘야하는 문제가 생김

	* 그래서! ServiceAccount에 IAM Role을 연결시키는 기술이 IRSA.

		* Role 생성시 OIDC Provier를 Trusted Entity로 붙이면된다.

* 절차

	1. 클러스터를 생성하고 나면 Identity 프로바이더 정보가 생성됨

	2. IAM Identity Provier 등록 -> EKS OIDC Provier 정보 기입

	3. 신뢰하게 된다. (HTTPS CERT랑 비슷하네)



``` 

kind: ServiceAccount

metadata:

	annotations:

		eks.amazon.com/role-arn: "arn: ... rol/irsa-test"

```

```

kind: Pod

spec:

	serviceAccountName: irea-test

```



	4. 위와 같이 서비스 어카운트 생성해서 파드에 연결 

	5. iras.tf 에서 모듈을 사용해 `oidc***proviers***uirls` `trusted***service***accounts` `inline_policies`를 설정하여 계정과 정책을 연결한다.  

	6. POD을 프로비전 하면 `aws sts get~~caller~~identity`를 통해 생성한 권한을 어슘한것을 확인할 수 있음.

## metric server 구성

* 필수 애드온, HPA(Horizontal), VPA (vertical pod Autoscaling)의 기준이 되는 메트릭을 수집

* 설치

	1. 설치는 제조사의 스크립트 참고 ( minikube 에선 `minikube addons enable metric-server`

	2. 설치가 안되어 있으니 kubectl top node | pod 이용이 불가능

	3. 준비해놓은 스크립트를 실행하여 리소스를 설치

## external-secrets 구성

* external-secrets 구성하여 외부 비밀 정보를 import, Secrets 리소스를 이용할 경우 선언적 관리가 없다. base64로 코딩되어 있으니 다 보인다. 그걸 문제를 해결할 수 있는게 ExternalSecrets.

	* AWS Secrets Manager

	* HashCorp Valult

	* Alibaba KMS Secret Manager

	* AWS system manager Parameter Store

* External Secrets Contoroller

	* 1) Kubernetese-APIserver의 리소스의 변경상태를 감지 2) ExSecrets을 가져와 3) Secret오브젝트를 생성하거나 갱

* USE case

	* backendType: 외부 저장소 종류

	* data: Key 단위 기밀 데이터 매핑

	* dataFrom : 여러 기밀 데이터 한 번에 매핑

* 사용절차

	* yamlml로 external 을 쓰겠다고 정의해놓고

```external-secret.yaml

kind: ExternalSecret

sepc:

	DataFrom:

	- app/mysql # 이렇게 정의 해놓고 실제로 시크릿 밸류도 지정해주면 사용 끝!

```



	2. Store new secret 에서 `app/mysql` 생성

	3. `kustomize . build`를 통해 적용될 코드를 보고. `kubectl apply . -k` 실행

	4. 이제 파드에 들어가면 적용한 시크릿이 환경변수에 있는걸 확인 할 수 있다.

	5. AWS Secret Manager에선 한번 만든 값은 삭제하는데 7일 이 걸린다. (7~30일)

## aws~~LoadBalancer~~controller 구성 

* ≈ 인그레스 컨트롤러 , 원래 이름은 ALoadBalancer~~ingress~~controller

	* 원래 컨트롤러는 ELoadBalancer, NLoadBalancer 를 적용가능한데 쿠버네티스 버전에  종속되어 있어서 업데이트에 불리했음. 그래서 aws-LoadBalancer 로 독립시켜서 별도로 컨트롤 가능하게 해줌

	* Feature: API 서버를 계속 보면서 ingress 오브젝트를 계속보고 변경 사항이 있으면 ALoadBalancer의 리스너나 룰을 추가

	* Target Type 

		* instance클러스터 노드의 NodePort 를 바라봄. 

		* ip: 로드밸런서가 PodIP를 직접 바라봄

* 자동 서브넷 디스커버리 ( 리소스 태그 기반으로 로드밸런서를 어디에 생성할지 결정), ALoadBalancer는 두개 이상의 AZ로 구성된 서브넷 필요. 이때 annotation기능을 통해 직접 지정이 가능

* 인터넷 페이싱 ALB(public), Internal ALoadBalancer (Private) 두가지로 쓸 수 있다.

	* `ebl1=1` `internal-elb=1` 각 각 이렇게 값을 설정하면 됨.

### 설치

1. 현재 ALB Contoller 는 Cert Manager에 의존성을 가지고 있음. 설치는 전용 스크립트로 진행 (install~~cert~~manager.sh) 스크립트를 통해 설치.

2. `rbac.yaml` 의 IRSA ARN 값을 본인 데이터 값으로 수정

3. `kubectl apply -k .`

4. kubectl get pod 

### 실행

* 실행 내용 분석

	* ALoadBalancer에서 적용하는 다른 서비스들의 권한도 들어가 있는걸 볼 수 있다.  WAF같이

	* 서브넷에서 태그를 정해서 디스커버리가 동작할 수 있도록 셋팅 


---

# EKS Fargate

## 소개

* Control Plane을 구성하고 노드를 만들때 EC2와 Fargate를 지원했다. 

	* Fargate 노드를 직접관리하지 않고 컨테이너를 띄어서 쓰는 서버리스

	* Data Plane에 대해선 반쯤 매니저 해줬었음.  Fargate를 씀에 따라 이제 데이터 노드도 완전 관리로 할 수 있게 되었다. ( 모든 문제를 해결 할 수는 없다)

![](/BearImages/C1A1C436-B081-469B-A3D7-AC7F1132D89B-73175-00001DA913C2A61E/E83D4622-9DFE-4D12-8C2E-74CB9B96B47E.png)

* Pod Execution Role (≈ Instance Profile)

	* Fargate에서 실행하기 위한 롤 ECR 이미지 다운로드, 로그 전달 등의 목적으로 생성하는 롤

	* 파드 컨테이너는 해당 권한을 적용받지 못한. IRSA로 할것

* Fargate Profile

	* 어떤 파드를 파게이트로 어떤 서브넷을 실행 시킬지 결정

![](/BearImages/227DBB9D-0F59-4BC7-955D-6F1E9ABEFA43-73175-00001DAAD19D6C27/F2239BCE-E7D2-47A2-BC7F-6CA4297D47EF.png)

* 파게이트 유즈케이스

	* 배치성 워크로드 24시간 가동이 아닌 일시적 잡에 유용함. 

	* 클러스터 애드온, 다른 워크로드로부터 영향을 최소화하고 싶은 클러스터 애드온

		* 메트릭서버, 코어 DNS

		* 독립저으로 구성하면 앱 파드가 부하를 먹을때에도 영향을 받지 않는다.

* 특징

	* 파드 1개에 노드 1개. 공식적으로 지원하는 파드의 갯수는 정해져있다.

	* 10pod, 매일 1시간 한달 0.25vpc 로 한달 5$

* 장점

	* 노드를 직접 관리하지 않아도 됨

	* 실행시간만 작다면 비용절감 가능

	* VM 수준의 격리 가능. 다른 파드와 자원을 공유하지 않음. 

* 단점

	* 데몬셋을 지원하지 않음. 데몬셋(1+1)에 구성이 있다면 사이드카 아키텍 도입필요 (로그, 메트릭)

	* 리소스 제약사항 문제 ( 최대 4vCPU와 30GB 메모리)

	* GPU 사용 미지원

	* ALB/NLoadBalancer 에서 파드를 바라볼 때 타겟을 노드가 아닌 IP로 구성해야 함.

	* 추가 권한이 부여된 파드는 활용 불가

	* IG와 직접 연결되지 않은 Private서브넷에서만 실행 가능 즉 NAT를 붙여야한다. 월 7만원 나옴. 

## 사용해보기

PublicSubnet 에 0000을 IG에, PrivateSubnet 은 0000을 NAT로 설정

### 사용방법

1. 	EKS 클러스터 생성

2. Fargate Pod Execution Role 생성

3. aws-auth ConfigMap 에 pod Execution Role 등록

4. Fargate Profile 생성

	* PrivateSubnet  설정, 가장 중요한건 selector { }

5. Fargate Profile 조건에 맞는 Pod 생성

	* 21~~eks~~fargate 디렉토리에서 `deployment.yaml`에서 DP 매니페스트가 있음. 

```

	lables:

		app: hello

		eks.amazone.com/compute-type: fargate

```

	* 


---

