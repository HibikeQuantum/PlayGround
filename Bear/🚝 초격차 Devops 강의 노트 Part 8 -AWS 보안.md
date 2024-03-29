# 🚝 초격차 Devops 강의 노트 Part 8 -AWS 보안-

#Devops/lesson #lesson

---



# Part 8 AWS 기반 보안

* 클라우드가 완벽하지 않다 .정보유출사건이 간간이 있었다.

* **AWS Shared Responsibility Model**

	* 클라우드의 보안(서비스 제공자의 보안) + 클라우드에서의 보안(유저의 보안)

	* PaaS -> CaaS -> SaaS 순서로 AWS의 책임이 커진다. 하지만 결국 data는 항상 사용자의 책임.

* Security Service 소개

![](/BearImages/68C968BD-1F9F-4EE6-8D7B-DA2223D07EC1-647-000004C333F0F85F_EA88D17B-DB0C-401F-9FAC-829770588D4E.png)

	* CloudTrail, Audit 서비스  CloudWatch 

	* Amazon GuardDuty 보안 자동화 서비스

	* Amazon Inspector 검사 서비스

	* S3 - Amazon Macie —> Security Hub (보안 중앙관리)

	* AWS WAF (엣지단계 동작) AWS Shield(DDOS)

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

	* Principle (대상, 누가?)

	* Action (행위) 

	* Resource (무엇을) `"Resource":"are:aws:s3:::DOC/*/test/*”`

	* Condition

		* 컨디션 오퍼레이터를 통해 태그를 정책을 강제할 수 있다 .



* `Event Bridge(AWS의 cron)` -> lambda -> IAM Policy 



* User Group

	* 여기에 User와 Policy를 Attach

* IAM Role

	* Policy를 Attach를 해서 리소스나 아이덴티티에 권한 부여 가능

* Access Management 절차

	* Identity에 붙이는 권한, 리소스 베이스 권한의 교집합이 사용가능하다. 모든 리소스가 리소스 베이스 policy를 가지는건 아니다.

	* Permission boundary && Identity based Policy && Resource base Policy

		* SCP 에서 Organisation SCP 를 걸었으면 또 이것도 추가

* 동일계정일때는 한쪽 (아이덴티티, 베이스) 만 되어도 되지만

	* 다른 계정일때는 교집합이 되어야 한다. 

---



### Assume (‼️재밌는 기능)

*  Concept - 모든 EC2에 필요한 정책을 Attach하려면 작업량이 많아진다. EC2의 롤이 접근하려는 서비스에 관련된 롤을 Assume하게 만들면 된다.

	1. 예를 들어 한 `Master-Role`이 `Master Policy`를 가지고 있다.

	2. `Master-Role`의 `Trust Relationship` 탭에서 `Action:AssumeRole` `Principle: {role:prod_role}`이라고 설정

	3. 하면 `prod_role`은 `Master-Role`을 Assume할 수 있게 된다. 

	4. 이렇게 하면 `prod_role`에는 아무것도 attach 되지 않았다.

	5. `vi  ~/.aws/credentials`

	6. `[assume] region: , credential***source:, role***arn:master_role:` 이렇게 profile을 만들어놓고

	7. `aws —profile assume s3 ls` 이렇게 하면 assume이 되고 녹인 권한을 적용받는다.

### Switch Role 컨셉

	1. 위와 같은 assume 설정을 해놓고 계정 메뉴에서 스윗치를 한다.  할 때 마스터 롤이 A에서 Token을 준다. 



![](/BearImages/0647A1A2-222A-45B5-ADAA-D5FC0AEB465F-647-000004C333F20058_C9EF4E61-A7BD-4D4F-A47E-00C4C713BEAD.png)

### terraform runner Role

* 각 유저가 이 권한을 Assume하도록 권한을 구조를 짜면 편리하게 권한 관리 가능

	1. runner 롤을 만들고 dj(서비스 이름)에 대해 `trust relationship`을 등록해준다.

	2. `aws configure` -> `profile  dj-partial` -> 액세스키를 물어보면 runner role에서 발급한 액세스키를 입력한다.

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

## EC2 보안 Best Practice

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

* 	파드가 노드의 권한을 assume하는 문제를 해결하기 위해 KUBEIAM 같은 서비스를 쓴다. 

	* what is `KUBE IAM` - IAM 컨트롤러 서비스, assume 여부를 판단해주는 서비스, 별도로 설정할 필요가 없으니 좋지) 

	* 이런 서비스를 안쓴다면 `OIDC(Oauth2.0)`를 쓰는 대안이 있다.

![](/BearImages/29C99096-EEC5-40B3-9658-1DE23F3E1409-647-000004C333F52821_96919664-63B8-4A1A-8DFF-B44909EA9723.png)

* IRSA 사용방법

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

1. 퍼블릭 -> 프라이빗존 구조를 가장 많이 쓴다. 이 구조는 외부에 열려있다는게 문제(SG, RACL로 막긴 하지만)

2. VPN -> 프라이빗 존 이 방법이 좋다.

* EC2 들어가면 authorized_keys에 키페어에 등록한 pem이 등록이 되어있지. 그래서 ec2유저로 접속을 할 수 있잖아 당연한 거지

* 정책상 다른 일반 유저를 쓰고 싶다면

	1.  `ssh-keygen -t rsa`로 키를 생성하면 `test, test.pub` 파일이 생성된다.

	2. 이제 EC2가서 `useradd -m test`  유저 생성 `cat /etc/passwd | grep test` 확인

	3. su - test   `vi ~/.ssh/authorized_keys` 에 `cat ~/.ssh/test.pub | pbcopy`의 결과물을 넣는다.

	4. `chmod 700 ~/.ssh` `chmod 644 ~/.ssh/authorized_keys` 

	5. 이제 기본 키페어가 아니라 추가한 유저로 좁속을 할수 있다.

* 서버마다 별도의 키페어를 설정하면 가장 좋지만 운영코스트가 높아진다.

---



##  CH03-01 세션매니저 Systems Manager(previous: SSMSimple Systems Manager) 

* 기본적으로 사용하는 AMI에는 설치안해도 SSM 매니저 에이전트가 설치되어 있다. 다른 이미지를 쓸때는 설치해줘되는데 문서참고

* SSM이 에이전트와 통신을 하게되는데 권한도 필요하다.

	* *EC2를 생성할때 정책에 SSM Assume 을 주면된다.*

* SSM이 있으면 웹으로도 바로 접속이 가능 (ssm-user, sudo 권한이 있음) 

* 이걸 쓰면 22번 포트 닫아버리고 SG를 비워버릴 수 있음

* 보안 세션을 로깅하는 니즈가 있다면 `AWS system manager` -> session manager

	* idle session time

	* KMS encryption

	* default user 설정

	* CloudWatch 설정 (실시간 파이프라인을 할 수도 있고, 로그를 업로드 하는 방식 두가자 지원), 이걸 활용해서 명령어 감시도 할 수 있음. 이런 키관리, 명령어 감시, 솔루션들이 많다. 이런걸로도 충분히 활용할 수 있다~ 압도적이다.. 떠 먹기만 하면된다. 데이터는 이미 시스템에 충분하니 조금만 건들여주면 상용 솔루션에서 하는걸 다 해줌.

###  aws-cli 에서 SSM을 호출해서 접근하는 방법

1. .ssh/config | grep -A 6 Proxy 에 보면 `aws ssh start-session ... /prod.pem` 이런 명령어를 활용할 수 있게 셋팅이 되어 있다. 이걸 셋팅해놓고 `ssh i-{instance-id}` 이렇게 바로 접근이 가능해진다. 매번 pem을 바꾸는게 아니니까 혁신..!

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

골든 이미지는 패치가 있을때 마다 자주 생긴다. devops의 관점에선 이런 이미지를 만드는 것의 절차를 자동화 시키는 방법에 대해 고민해봐야한다. (긴급 보안 이슈가 생겼다면 빨리 버전을 올려야할 경우가 생길거다)

* `Packer` (Build automated machine image tool, support multiple platform) 를 이용해서 이걸 해보자.

	* 코드푸시  -> 코드빌드로 트리거 -> 패커가 ec2 start, sensible playbook 실행 -> AMI 백업

* 위의 절차를 대신 해주는 서비스 `AWS Image Builder`

* Packer working process sample

	1. ec2를  띄우고

	2. buildspec.yml -> `패커 설치`, `패커 .hcl 검사`, `packer build -var-file …`

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

* Codebuild 로 위의 절차 똑같이 하기

	1. Code source, branch event 설정

	2. Web hook 설정

	3. Managed Image `Amazon linux 2` 고름.

	4. Service role -> 주변 라이브러리 참조하는 등 권한이 필요하다. 그래서 롤로 허락한다.

	5. 워커컨테이너 설정 - 구동 네트워크 위치  (사설 망에 있으면 사설 라이브러리를 참조 가능하겠지)

	6. compute 사양

	7. VPC내에 구동 or 밖에서 구동

	8. CloudWatch  설정

---



## CH03-02 EC2 inspector(v2)

* 자동 취약점 점검 

	* support EC2, ECR

	* Report (Severity rating, affected resource info, how to remediate)

	* Central management

	* Integration with AWS Service

![](/BearImages/9AA38BC3-BB7F-4666-AE9C-3FF68B36D757-647-000004C333EE94CA_E5277150-8640-4A1A-A7D8-9A914635F661.png)

* 관리자를 위임할 수 있고 각 계정의 인스펙터에 잡혀있는 취약점을 루트 관리자 입장에서 모아서 볼 수 있다.

* *Active*, *Suppressed*(예외처리), *Closed*(조치, 30일 뒤 삭제) 

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

	* Account마다  VPC를 보통 생성한다. 공유할 수도 있다. 10.1 데브, 10.2 테스트 .. 등등 온프레미즈, 다중 클라우드.. 이런 환경에서 *VPC IPEM*을 이용하면 Scope가 생성되고 Private, Public. 이 풀을 단위로 모니터링 및 리소스 할당을 관리할 수 있다. 

		* 다른 VPC와 오버래핑 되는지 여부도 확인

* tf로 생성한 자원들을 웹에서 수정하려고 하면 경고 문구를 뛰운다.

## AWS VPC 트래픽 제어

* SG (ENI에 설정하는 가상 방화벽) 주의!‼ EC2에는 ENI(ethernet network interface)가 붙는다. Default all deny, SG changing, Prefix list 활용

	* in + out bound → soft limit 60 개 한계

	* Network Interface 에 붙일 수 있는 SG는 soft limit 5개

	* AWS 요청하면 하드리밋까지 늘릴 수 있음

	* 핑을 보내면 리눅스에선 랜덤 포트로 리스폰스를 던진다. 스테이트풀 하기에 SG를 통과할 수 있게 된다.

	* chaining : 적용할 호스트를 지정할때 CIDR형태가 아닌 SG를 연결하는걸 말한다. 이렇게 관리하면 IP가 바뀌어도 데이터를 안바꿔도 된다. 다른 VPC간엔 연결(Peering)이 되어있을때 Chaining이 가능하다.

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

![](/BearImages/514212B1-38E3-4021-9020-3AE50CE774F3-647-000004C333F6C6C7_4E31F0DA-0AB3-40E1-AFD2-9567EC5D7217.png)

* ANF (Network Firewall)

---



## AWS VPC 프라이빗링크 엔드포인트

* EC2가 참조하는 서비스는 VPC 밖에 있는 경우가 많다. 별도의 로직이 없다면 이럴 땐 NAT를 통해서 나가게 된다. 

* NAT 부하 비용 + 만약 컴플라이언스 이슈가 굉장히 강한 비즈니스라면 이런 외부로 나갔다가 다시 들어가면 안되는 니즈가 있다. 

![](/BearImages/56FA8EA1-B386-465F-AA18-59C86364A4AC-647-000004C333EFE0F1_FF12DDFC-092B-4B4F-961A-89EE100248AA.png)

* 그럴땐 인터넷으로 나가는 것은 프록시를 통해 나가도록 처리할 수 있다. (프록시의 코스트가 들어간다) 심리스하지 못하다 (간단)

* 이런 니즈를 충족하기 위해 VPC PrivateLink

	* VPC -> AWS 서비스, 다른 AWS Account 서비스, AWS Marketplace 서비스

	* IGW, NAT, G/W, DX, VPN 을 안써도 된다!

* Endpint 는 프로듀서와 컨슈머 둘로 나뉜다.



* Consumer 입장에서 사용할 수 있는 2가지 Endpoint

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

		* GWLB - GatewayLoadBalance endpoint

	* 위 두가지 타입을 이용해 생산-컨슘을 할 수 있다.

* VPC를 통해 연결하고 S3로 연결시키면 패킷을 인터넷망에 노출 안시키고 보낼 수 있다.

---



## AWS  VPC 프라이빗링크 GWLoadBalancer 엔드포인트

* Needs of network manager

	* 네트워크 시큐어를 배포 및 확장, 관리

	* IDS, IPS도 하고 싶고, egress domain base filtering도 하고 싶다.

	* IG와 EG가 방화벽으로 트래픽을 보내는 구조를 보통 쓰는데 문제가 있다.

* Firewall로 트래픽을 몰면 failover 문제가 생기니 HA를 준비한다. 이런 문제를 해결하기 위해 GWLoadBalancer 가 만들어 졌다.

	* `GWLoadBalancer` 터널링 프로토콜 사용

	* L3 Gateway L4 부하 분산

	* VPC  Endpoint service 등록 가능 (by Service producer) -> RT에 등록하면 됨

![](/BearImages/B31887CE-010F-4559-AF97-F2DA9965817C-647-000004C333F634C6_FDEF81FA-D297-4A33-9A24-8E6661D9359E.png)

* 이런 아키텍트를 하고 싶을때 3rd 파티 제품이 GENEVE tunneling 프로토콜을 지원하는지 확인

---



## AWS Network firewall (ANF)

* stateless + stateful Policy -> NACL 과 비슷함, Pass-Drop-Forward(to Stateful)

![](/BearImages/200EBCA4-4627-4439-B1E9-00F1B5C55B40-647-000004C333F5B3B0_3A58FBF8-B578-4FFB-940D-98D3CD826A60.png)

*  suricata, domain 필터링, 통합관리

![](/BearImages/7787B6D7-D79D-4CF9-9BCF-26C4E9632C77-647-000004C333EF5366_CD11A5D8-A7BC-49C7-99F3-BB4CEE0B98D8.png)

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

![](/BearImages/060927B1-9B73-4A1D-A739-102B03BDAFC0-647-000004C333FB68AA_62A4C680-9862-4A34-A3FF-70EC8F030F17.png)

*L7 보안 위협 대응 서비스, 지원(API GW, App sync, ALoadBalancer, CloudFront)*

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

![](/BearImages/211E9919-8A73-4932-A45C-527EE92F0CD1-647-000004C333F49943_2D629EB7-D83D-4BD3-962F-FFE641B3AA37.png)

* 룰 순서에 따라 적용하고 뒤로 포워드

* 로그도 되는데 룰에 대해 어떤 검사를 받았는지 다 남는다. 로그 양이 방대하다.

* 관리할게 많다보니 자동화에 대한 니즈가 있고 이걸 해주는게 처음 이미지에 나오는 Athena, Lambda를 활용한 커스터마이징

* DDOS를 대응하기 위한 전략

	1. ALB만 트래픽을 받도록 접근제어를 구성

	2. EC2가 죽어도 서비스 되도록 HA구성

	3. AWS가 제공하는 !‼SLA(Service-Level Agreement

잘 분석해보기

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



# AWS VPC 트래픽 로그 (VPC flow log)

*실습 시나리오* 

1. 사용할 속 메트릭들을 문서를 참조해서 tf 생성

2. CloudWatch 로 연결 (접속 로그를 메트릭화해서 감시)

3. 바로 로그를 쌓자 마자 중국에서 SSH접근을 했네

4. 아테나 쿼리 결과를 저장하는 S3설정



## AWS 보안탐지

### CloudTrail

소개: CloudTrail 콘솔에서 CloudTrail에 의해 또는 AWS CLI를 사용하여 기록된 최근 90일 동안의 이벤트를 보거나 검색할 수 있습니다. 자세한 내용은  [CloudTrail 이벤트 기록에서 이벤트 보기](https://docs.aws.amazon.com/ko_kr/awscloudtrail/latest/userguide/view-cloudtrail-events.html)  단원을 참조하세요.

* Single or Multi region로 운영을 하게 될텐데, 로그는 다른 리전에 남으므로 다른 리전의 데이터를 받아서 감시하는게 베스트

* 데이터의 보간 기한은 90일로 한정되어 있지만 S3, CloudWatch 로 전달하면 보관할 수 있다. SNS와 연동도 가능

* 기능에 따라 `dev`, `test`, `prod`, `security` 테넌트를 구분했다고 하자. 그러면 각 어카운트의 클라우드 트레일에서 로그가 생기게 되는데 S3버킷에 모아서 보면 된다.

	* 데브옵스가 여러 테넌트를 다 컨트롤 해야할때 Organization 그룹을 쓰는데 클라우드 트레일에서도 `Enable all account in my organization`옵션을 제공한다.

* CloudWatch -> lambda (정제) -> Kafka -> elascticSearch <- logstash 중앙 집중화 아키텍트를 쓰기도 한다.

* 클라우드 트레일을 활성화하면 최초에는 `management event`(무료)가 활성화 되어 있다. (최대 5개까지 활성화 가능)

	* Management event - `control plane operation`, `AWS 리소스에 대한 작업 행위`

		* KMS 인-디크립션이 굉장히 과정이 많은데 이건 제외시켜서 볼 수 있다. 

	* Data event

		* Data plane operation - 예를 들어 `S3 object api activity (Get Object), Lambda (Invoke API)`

	* insight event

		* AWS AI 기반 기계학습을 통해 비정상적인 행위 로깅

		* API Call rate

		* API error rate

* 로그에 남는 useridentity 의 종류

	* Root, IAMUser, AssumeRule, FederatedUser, Directory, AWSAccount, AWSService(Beanstalk처럼 알아서 움직이는 애들), Unknown

---



### GuardDuty

감지 범위

* 위험 유형 (Port Scan, 브루트) 인스턴스 침해 (C&C Activity, Bitcoin Mining), 어카운트 침해(소스코드에 계정정보가 있다면 자원을 마음대로 사용가능)

	* 인스턴스가 침해되면 해커는 메타데이터로 키를 가져와 인스턴스가 가진 자원을 컨트롤 할 수 있다. v2 원천 차단 가능

* 로그를 기준으로 워크로드 동작 감지, 위협탐지, 미승인 활동 모니터링, No Agent, Sensor, Appliance, 머신러닝 기반

* Support - `ec2, IAM, EKS, S3`

* 데이터 소스 - `VPC Flow logs, DNS logs, CloudTrail, EKS Audit logs`

![](/BearImages/2951AEBE-934C-4D54-A133-1C536BA8026B-647-000004C333F2835E_3CC934CB-71BE-4FB5-98AA-401B2A93DB51.png)

* member account max 5000, 통합된 조회 및 관리 기능, 신뢰 및 위협 IP 업로드 기능

* Security Level (low, medium, High)

* Reputation IP (각 비즈니스에 맞는 Trusted 정보, SaaS를 빌려쓴다거나) 를 등록해 탐지 효율 증가

	* CrownStrike

	* ProofPoint

	* 고객정보

* S3 protection 

	* AWS Macie 기능 포함

	* 활동에 대한 이상 및 위협 탐지 기능

![](/BearImages/D058E03C-7B99-4E0E-AD05-1719F8B797E3-647-000004C333F304FA_FF5FB368-BDC3-4714-8571-A7B09256F69A.png)

* 템플릿을 정해서 알림 가능

* 자동화 아키텍트

![](/BearImages/919B1565-BC42-4B4E-8319-B761752A6633-647-000004C333F7E931_4677711A-9E0A-4232-B09A-01B919AEAD5A.png)

* 가드 듀티에서 찾아낸 파인딩들을 다른 서브에 접목할 수 있다.



### AWS Macie

* 민감 정보 검색 및 보호 서비스, 기계 학습 및 패턴 일치를 활용, S3에 저장된 데이타에 대한 보안 및 프라이버시의 가시성 제공

* Public access, sharing, encryption

* `Discovery result` 에서 버킷을 만들어 정보를 담아야 한다.

* `Custom data identifiers`에서 반응할 키워드를 셋팅

* `JOB`메뉴에서 이제 버킷을 대상으로 검색을 할 수 있다. (과금도 예측해서 보여준다) 샘플링 기능이 있어서 어느정도 가려서 볼 수 도 있다. 스케쥴 설정 가능, 특정 태그의 오브젝트만 검색 할 수도 있다. 가드에서 쓰면 싸게 쓸 수 있는데 Macie를 쓴다는건 커스텀 룰이나 스코프를 사용하기 위해서다.

* 발견한파인딩에 대해 SNS, CHATBOT을 이용해 모니터



### Security Hub

![](/BearImages/32B0A14F-E6A1-406E-8E0A-DFEB0DE248DC-647-000004C333FA4B08_C5256FB9-C251-4897-BAD6-75A0DBE3897E.png)

* 특성

	* 멀티 어카운트 & 서비스를 중앙화

	* ASFF (Security Finding Format)

		* 이 포맷을 지키면 다 통합될 수 있다. 

	* 규정 위반 및 체크 자동화, 통합 대시보드, 손쉬운 사용

* EKS의 정보는 Aqua 쿠베벤치가 잡으로 존재하며 허브에 전달 -> 

![](/BearImages/6DA729E2-9755-4FA1-9302-8C182404D0BB-647-000004C333F417BF_3A889130-ADF4-4007-8DC6-E7869C054DD4.png)

* 규정준수에 대한 스코어링을 제공한다. 제공 기준.

	* PCI DSS (Payment Card Industry Data Security Standard)

	* CIS AWS (CIS AWS Foundations Benchmark standard - AWS Security Hub)

* Insight (필터링)

	* 연관 검색 필터, 우선 순위 지정, AWS pre-defined Insight

	* Custom Insight 사용 가능

* 굉장히 많은 서비스들이 다 인터그레이션이 된다.

* Custom actions - 여기서 정의한 값을 다른 서비스에서 사용할 수 있다. 파인딩이 너무 많으니 필요한 기능



---



# bonus Part AWS EKS



# AWS 관리형 쿠버네티스 클러스터 EKS

### 개요

* 제어 영역(Control Plane)을 직접 프로비저닝하거나 관리하지 않아도된느 편의성

* 노드 구성의 자유도

* 멀티 AZ 고가용

* 클러스터 업그레이드 편리

![](/BearImages/A481747D-F838-4CB9-AD28-56840874E82D-647-000004C333F92856_046624F2-5C67-4558-94A3-5276FF1E53D0.png)

* 구성도

	* customer VPC (사용자의 VPC)

	* EKS VPC (Controll Plane) -> 대신 컨트롤

	* ENI (Private Link, 인스턴스에 설정하는 랜카드)를 통해 컨트롤 받는다.

* 로드밸런싱

	* 서비스 (ExternalName, Node 등), CLoadBalancer로 구성, annotation 설정을 통해 NLB로 구성 가능

	* 인그레스 L7기능을 위해선 추가애드온 설치필요. ALoadBalancer 로 구성

* 파드 네트워킹

* AWS VPC CNI

	* 기본적으로 설치되어 있는 네트워크 애드온

	* EC2는 모두 ENI를 가지고 IP를 받는다. ENI의 secondary IP를 통해 노드 내 파드가 동일한 VCP IP 대역의 IP 할당 (ENI IP주소 제한 만큼 노드의 파드 개수가 제한됨) -> but 요즘에는 IP prefix 기능이 생겨 제한이 풀림

![](/BearImages/A56E9DA2-13BA-40DB-B66C-64E15AE54E5C-647-000004C333F06AE8_A90D3B2A-30D6-4FCA-B1E3-9E7897760690.png)

* 저장소. EBS built-in StorageClass

	* gp2 타입의 EBS에 대한 StorageClass 내장되어 바로 사용 가능. (2020년 GP3타입 시작, IOPS(INodePortut/Output Operations Per Second)에서 서능이 다분히 좋고 가격도 좋으므로 변경하는게 좋다. 다만 어느정도 부하가 있는 서버에 사용해야 비용이 절감.

	* EBS & EFS CSI Driver -> CSI 드라이버 구성을 통해 EBS/ EFS의 최신 기능 사용 가능

* 로그 및 메트릭

	* 로깅 옵션을 통해 API Server, Audit, Scheduler, Controller Manager 등 CloudWatch 로 수집

	* 노드 -> 기본 기능엔 없지만 Fluentd, Fluent Bit을 통해 CloudWatch 하라고 가이드하는 중 

* EKS 를 사용해야하는 이유

	* 클러스터 운영보다는 실제 비즈니스 운여에 집중하기 위해 (Control plane)이해하는게 쉬운 일이 아니라

	* 인프라 비용을 넘어 관리비용도 고려 (직접 제어를 프로비저닝 하는게 비용은 더 쌀 수 있지만 인력이나 시간을 고려)

---



## EKS 클러스터 구성 (웹콘솔)

* 사전준비. 

	* EKSClusterPolicy, EKSVPCResourceController 두개의 정책을 연결 시킨다. 

	* SG for Control plane : Cluster SG 라는 기본 그룹이 생성된다.

* 클러스터 구성 마법사

	1. 추가해놓은 IAM ROLE 추가

	2. VPC, EKS, SUBNET, Private 서브넷에서 운영.

	3. 클러슽처 엔드포인트 엑세스: 퍼블릭 및 프라이빗으로

	4. Kubernetes 애드온 설정

	5. 제어 플레인로깅 로깅량이 많기 때문에 비용을 아끼기 위해 비활성화.

---



### EKS 클러스터 구성 (테라폼)

1. 테라폼 레지스트리 - tedilabs - eks-cluster 모듈을 사용

2. define을 보면 웹콘솔에서 만들때 쓰는 정보가 다 들어있음. 엔드포인트에 대한 접근은 allow all 비추천

### Kubectl을 이용하여 EKS 클러스터 연결

* 클러스터 연결에 필요한 정보추가

	* `aws eke update-kubeconfig --region= --name --alias=`

	* `cluster kubeinfo` 

---



### aws-auth ConfigMap 관리

* EKS 제공 연결방법 aws-auth ConfigMap

	* aws-aim-authenticator

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

---



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

	3. 시작 템플릿 (고급설정) 

	4. Label, Taint 값을 설정할 수 있음

	5. 노드 그룹 조정 구성 2개

	6. 노드 그룹 네트워크  서브넷 (ec2가 실행될 넷), 원격 액세스 설정

* Auto scaling 그룹, 인스턴스도 만들어진걸 볼 수 있다. 

	* `kubectl get node -o wide`로 조 

---



### 노드그룹 생성 (by TF)

* 레지스트리 (모듈)에서 Auto Scaling, kubernates***conifg***map 두가지 모듈을 쓸거다.

* 리소스 구성

	* Launch Template - Auto-scaling Group 구성 목적

	* ConfigMap - Kubernetese-system 네임 스페이스에 aws-auth ConfigMap 구성 -> 클러스트 인증 제어 기

* 생성한 뒤에 `cat node-groups.tf`

---



# EKS 클러스터 활용

## IRSA

* Service Account, 파드가 클러스터 내 리소스에 접근하기 위해 존재. 하나의 파드는 하나의 Service Account를 가진다. 

* 쿠버네티스의 SA를 위한게 IRSA

	* 파드가 S3, DynamoDB, SQS 에 접근하고 싶어함. 액세스키를 주자니 IAMUSER에 기밀값을 줘야하는 문제가 생김

	* 그래서! ServiceAccount에 IAM Role을 연결시키는 기술이 IRSA.

		* Role 생성시 OIDC Provider를 Trusted Entity로 붙이면된다.

* 절차

	1. 클러스터를 생성하고 나면 Identity Provider 정보가 생성됨

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

	5. `iras.tf` 에서 모듈을 사용해 `oidc***proviers***uirls`,  `trusted***service***accounts`,  `inline_policies`를 설정하여 계정과 정책을 연결한다.  

	6. POD을 프로비전 하면 `aws sts get-caller-identity`를 통해 생성한 권한을 어슘한것을 확인할 수 있음.



## metric server 구성

* 필수 애드온, HPA(Horizontal), VPA (vertical pod Autoscaling)의 기준이 되는 메트릭을 수집

* 설치

	1. 설치는 제조사의 스크립트 참고 (minikube 에선 `minikube addons enable metric-server`

	2. 설치가 안되어 있으니 kubectl top node | pod 이용이 불가능

	3. 준비해놓은 스크립트를 실행하여 리소스를 설치



## external-secrets 구성

* external-secrets 구성하여 외부 비밀 정보를 import, Secrets 리소스를 이용할 경우 선언적 관리가 없다. base64로 코딩되어 있으니 다 보인다. 그걸 문제를 해결할 수 있는게 ExternalSecrets.

	* AWS Secrets Manager

	* HashCorp Vault

	* Alibaba KMS Secret Manager

	* AWS system manager Parameter Store

* External Secrets Contoller 

	* 1) Kubernetese-APIserver의 리소스의 변경상태를 감지 2) ExSecrets을 가져와 3) Secret오브젝트를 생성하거나 갱

* USE case

	* backendType: 외부 저장소 종류

	* data: Key 단위 기밀 데이터 매핑

	* dataFrom : 여러 기밀 데이터 한 번에 매핑

* 사용절차

	1. yaml로 external 을 쓰겠다고 정의해놓고

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

---



## aws-LoadBalancer-controller 구성 

* ≈ 인그레스 컨트롤러 , 원래 이름은 ApplicationLoadBalancer-ingress-controller

	* 원래 컨트롤러는 ELoadBalancer, NLoadBalancer 를 적용가능한데 쿠버네티스 버전에  종속되어 있어서 업데이트에 불리했음. 그래서 aws-LoadBalancer 로 독립시켜서 별도로 컨트롤 가능하게 해줌

	* Feature: API 서버를 계속 보면서 ingress 오브젝트를 계속보고 변경 사항이 있으면 ApplicationLoadBalancer의 리스너나 룰을 추가

	* Target Type 

		* instance클러스터 노드의 NodePort 를 바라봄. 

		* ip: 로드밸런서가 PodIP를 직접 바라봄

* 자동 서브넷 디스커버리 (리소스 태그 기반으로 로드밸런서를 어디에 생성할지 결정), ALoadBalancer는 두개 이상의 AZ로 구성된 서브넷 필요. 이때 annotation기능을 통해 직접 지정이 가능

* 인터넷 페이싱 ALB(public) / Internal ALoadBalancer (Private) 두가지로 쓸 수 있다.

	* `ebl1=1` `internal-elb=1` 각 각 이렇게 값을 설정하면 됨.



### 설치

1. 현재 ALB Contoller 는 Cert Manager에 의존성을 가지고 있음. 둘다 설치 해야한다. 설치는 전용 스크립트로 진행 (install-cert-manager.sh) 스크립트를 통해 설치.

2. `rbac.yaml` 의 IRSA ARN 값을 본인 데이터 값으로 수정

3. `kubectl apply -k .`

4. kubectl get pod 



### 실행

* 실행 내용 분석

	* ALoadBalancer에서 적용하는 다른 서비스들의 권한도 들어가 있는걸 볼 수 있다.  WAF 같이

	* 서브넷에서 태그를 정해서 디스커버리가 동작할 수 있도록 셋팅 

---



# EKS Fargate

## 소개

* Control Plane을 구성하고 노드를 만들때 EC2와 Fargate를 지원한다고 했었고 EC2를 사용하는건 많이했으니 이제 파게이트

	* Fargate 노드를 직접관리하지 않고 컨테이너를 띄어서 쓰는 서버리스

	* Data Plane에 대해선 반쯤 매니저 해줬었음.  Fargate를 씀에 따라 이제 데이터 노드도 완전 관리로 할 수 있게 되었다. (모든 문제를 해결 할 수는 없다)

![](/BearImages/C7B67D77-A209-40AB-9383-49F8EFC4E422-647-000004C333F88761_E83D4622-9DFE-4D12-8C2E-74CB9B96B47E.png)

* Pod Execution Role (≈ Instance Profile)

	* Fargate에서 실행하기 위한 롤 ECR 이미지 다운로드, 로그 전달 등의 목적으로 생성하는 롤

	* 파드 컨테이너는 해당 권한을 적용받지 못한. IRSA로 할것

* Fargate Profile

	* 어떤 파드를 파게이트로 어떤 서브넷을 실행 시킬지 결정

![](/BearImages/686720AE-E78B-4AC4-89EE-2F5922DC4328-647-000004C333F17E38_F2239BCE-E7D2-47A2-BC7F-6CA4297D47EF.png)

* ‼️ 파게이트 USE CASE

	* *배치성 워크로드 24시간 가동이 아닌 일시적 잡에 유용함*.

	* *클러스터 애드온, 다른 워크로드로부터 영향을 최소화하고 싶은 클러스터 애드온*

		* 메트릭서버, 코어 DNS

		* 독립저으로 구성하면 앱 파드가 부하를 먹을때에도 영향을 받지 않는다.

* 특징

	* 파드 1개에 노드 1개. 공식적으로 지원하는 파드의 갯수는 정해져있다.

	* 10ea pod(0.25vpc)매일 1시간 한달쓰면 한달 5$

* 장점

	* 노드를 직접 관리하지 않아도 됨

	* 실행시간만 작다면 비용절감 가능

	* VM 수준의 격리 가능. 다른 파드와 자원을 공유하지 않음. 

* 단점

	* 데몬셋을 지원하지 않음. 데몬셋(1+1)에 구성이 있다면 사이드카 아키텍 도입필요 (로그, 메트릭)

	* 리소스 제약사항 문제 (최대 4vCPU와 30GB 메모리)

	* GPU 사용 미지원

	* ALB/NLoadBalancer 에서 파드를 바라볼 때 타겟을 노드가 아닌 IP로 구성해야 함.

	* 추가 권한이 부여된 파드는 활용 불가

	* IG와 직접 연결되지 않은 Private서브넷에서만 실행 가능 즉 NAT를 붙여야한다. 월 7만원 나옴. 



## 사용해보기

PublicSubnet 에 0000을 IG에, PrivateSubnet 은 0000을 NAT로 설정



### 사용방법

1. EKS 클러스터 생성

2. Fargate Pod Execution Role 생성

3. aws-auth ConfigMap 에 pod Execution Role 등록

4. Fargate Profile 생성

	* PrivateSubnet  설정, 가장 중요한건 selector { }

5. Fargate Profile 조건에 맞는 Pod 생성

	* 21-eks-fargate 디렉토리에서 `deployment.yaml`에서 DP 매니페스트가 있음. 

```

	lables:

		app: hello

		eks.amazone.com/compute-type: fargate

```  

---