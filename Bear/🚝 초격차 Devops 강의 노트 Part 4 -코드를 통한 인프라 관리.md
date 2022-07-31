# 🚝 초격차 Devops 강의 노트 Part 4 -코드를 통한 인프라 관리-

#Devops/lesson #lesson 

## CHAPTER 1 소개 및 설치

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

@Terraform_v1.2 [/Users/kth/document/학습자료 참고]

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

	* aws set get-caller-identity

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

	* a/b/c 중 a가 b/c를 가져온다고 할때 a가 루트가 되고 b/c는 차일드가 된다.

* Naming and comment

	* 네이밍 규칙	: `알파뱃, 숫자(첫글자X), 언더스코어, 하이픈`

	* 주석 규칙		: `#text, //text, /*text*/`

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



## *HCL VAR & INPUT & OUTPUT*

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

	5. -var // -var-file

`tf apply -var-file=test.tfvars`

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

	* `count` 는 리스트 형식(1-2-3-4-5)으로 데이터를 관리한다.

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

소스:  `/hashicorp/aws`

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

// ${split("/",  vpc_cidr)[0] 이렇게 테라폼 내장 함수도 사용가능

```terraform

resource "aws_eip_association" "openvpn" {

  instance_id =  [aws_instance.openvpn.id] 

  allocation_id =  [aws.eip.openvpn.id] 

} // 퍼블릭 아이피로 빌드하면 매번 아이피가 바뀌지만 aws.eip를 쓰면 매번 바뀌지 않고 계속 사용가능(현업에선 꼭 이걸로 하길 바람!)

``` 



4. 생성하고 public ec2 접속!

`cat var/log/cloud-int-output.log // 생성직후엔 도커를 설치하는 서버 모습 을 볼 수 있다.`

5. sh 로 생성된 vpn config 파일을 실행하면 Tunnelblick 앱에서 연결을 해준다. 

	1. 이제 openvpn 으로 프라이빗 망에 연결

	2. 프라이빗 DNS 에서만 된다. `ip-10-222-2-6.ap.. internal`  이런 주소는 오직 내부망에서만 쿼리



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

* 그롭 명령어가 먹는다. -only="*.one"



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



### Post-processor (후처리기) (-s 복수형도 별도로 존재한다)

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

`ansible host-pattern -m module [-a 'module option'] [-i inventory] ` 	

→ 이게 기본적인 사용법

`ansible -i amazon.inv -m ping all -u ec2-user`

→ 쉘과 달리 순서가 중요하지가 않다. 이렇게 바로 접근을 위해선 ssh에이전트를 설치해놓거나  ssh-add -K [name.pem] 명령어를 통해 pem 교환을 해놔야한다. 또는 접속시 --private-key [name.pem] 을 사용한다.

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

* *Collection index*

	* ansible.builtin - 효과적인 사용을 위한 기본. 이것만 봐도 절반은 하겠다!

* `"name=fastcampus shell=bin/bash"` 	// 스페이스를 구분자로 속성을 줄 수도 있다.

* *linefile 포맷*

```yaml

name:*  //resolve.conf에서 찾고 없으면 추가해라라는 뜻

  path: /etc/resolve.conf

  line: 'nameserver 8.8.8.8' 

// 이렇게 키밸류 형식으로 속성을 줄수도

```



* *Freeform* //  프리폼은 이렇게 기술함.

`command : echo "hello world"`

* *Ansible_POSIX* 

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

`ansible-playbook -i playbook.yaml -e "user***comment=hello user***shell=/bin/sh"`

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



*loop* // 이게 권장되는 문법

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

* *conclusion 이것 말고도 다양한 루프 사용방법이 있음* 이걸로 모잘라면 API 문서 참고



### Conditional 

: 조건문은 운영체제에 따라 다른 것을 하고 싶을때 주로 사용

*when*

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