# ⚙️ k8s

#Devops/kubernetes #Devops

---

## 

---

## 

---

## 

---

## 

---

## Design patterns

* 사이드카

* Ambassador

* 

---

## Node Selectors

* 특정 노드에만 파드가 배치되록 만들기 위한 방법 (1)

```yaml

	nodeSelector:

		size: Large # Node 가 가지는 속성

```

`k label nodes node-1 size-Large` -> Make node-1 size: Large

#### 노드 셀렉터로는 처리할 수 없는건 Node Affinity

```

spec:

  affinity:

    nodeAffinity:

      requiredDuringSchedulingIgnoredDuringExecution:

        nodeSelectorTerms:

        - matchExpressions:

          - key: disktype

            operator: In 	# 아래의 값 중에 하나라도 충족하면 스케쥴

            values:

            - Large     

```

* NotIn(한 개도 없으면), Exists (라벨이 있으면 충족

* 한개도 충족되지 않으면 ? Affinity엔 두가지가 존재한다. TYPE1 - required,  TYPE - 2 prefer 타입이 존재. REQ 타입은 스케쥴을 하지 않는다.  prefer 타입은 없으면 그냥 스케쥴해준다. 뒤에 나오는 `DuringExcecution`은 런타임 중 편경사항을 지정한다. Ignore or required TYPE 3 - req-req 속성을 가진다.

* SPEC - affinity 이렇게 정의되어야 하는데. Deploy는 spec에 어피니티를 가지지 않는다. 대신 템플릿을 가지고 템플릿이 스펙으로 어피니티를 가진다. 파드는 직접 가진다. **따라서 컨테이너와 동급 레벨에 설정해주기!**



---

## Taints and Tolerations

*  Node human, Pod mosquito.

* 	k taint nodes node1 app=blue:[NoSchedule NoExecution, Noprefer]

* 파드의 할당은 보증되지 않는다. 그저 통과여부만 결정하는 taint

```yaml 

spec:

	tolerations:

	- key: "app"

	  operator: "Equal"

	  value: "blue"

	  effect: "NoSchedule"

```

Master node는 ‘master’로 taint 되어 있다. 마스터에 뭐 실행안하는게 좋다. `master:noSchedule`로 되어있음

`k taint nodes node01 spray=mortein:NoSchedule` -> 이렇게 테인트 설정

* `run pod-name —dry-run > bee.yaml` 이렇게 하면 구조를 쉽게 만들 수 있음

		* 이걸로 생성해놓고 toleration포맷을 검색한거 붙여넣으면 된다.

---

## Resource Requirements

* default pod use `0.5 cpu , 256Mi`

* 컨테이너의 스펙과 파드의 스펙은 다르다…

---

## Service Account

*  모니터링, 빌드배포를 위해 접근하는 서비스를 위해 제공하는 계정

* `k create serviceaccount <name>`

* `serviceAccountName: dash-` 삭제후 재시작이 필요함. 

* `automountServiceAccountToken: False`

* 1.24 변경점 각 NS는 디폴트 SA를 가진다. 자동으로 마운트를 하도록 되어있다. 그래서 쿼리를 해온다. 경로에서 token이 실제 값. no expiry token으로 되어있다. 1.22에선 좀더 스케일에이블한 Bound를 설정하게 되었고 시간을 설정하게 되었다. 1.24에선 자동으로 SA, Secret을 만들지 않는다. 수동으로 만ㄷ르어 줘야한다. `create token dash-…`

* 1.24에서 무제한 토큰을 만드는게 가능하다. API기반 리퀘스트가 추천사항. 무제한 토큰은

* `k describe get pods my-pod -o yaml ` 여기서 서비스어카운트 이름을 확인할 수 있다. 

---



## Docker Security

* root유저로 도커가 돌면 호스트를 침해할 수 있다. 낫굳

* 도커를 실행할때 어떤 레벨의 권한을 줄지 플래그로 값을 정해줄 수 있다. `--cap-add`

#### Security Context

* 어떤 주체에서 명령어를 실행할것인가. 설정

`kubectl exec ubuntu-sleeper --  whoami` -> 명령어 전달하는방법!

```

spec:

	securityContext:

    runAsUser: 1000

```



```yaml

      capabilities:

        add: ["NET_ADMIN", "SYS_TIME"]

```

---

## ETCD 

여기에 시크릿 저장해서 운영할 수 있다. 하지만 저장할때 암호화가 되어있지 않다. 그래서  암호화를 해주는 조치를 해야한다.

ps -ef | grep kube-api | kube-encrytion-config 

-> 설정을 했다면 잡혀야 한다.

`identity={}` 암호화 안함

providers:

`header -c 32 /dev/urandom | base64` 랜덤 값을 받아서 시크릿 솔트로 사용

<encrytion configuration 활성화>

`kubectl create secret generic my-2 —from-`

이렇게 생성하면 ETCD에 암호화된 상태로 저장되는걸 볼 수 있다.



---



## Secrets

* `base64 명령어로 인코딩 할 수 있다.`

* “Base64를 사용하는 가장 큰 이유는 Binary 데이터를 텍스트 기반 규격으로 다룰 수 있기 때문이다. JSON과 같은 문자열 기반 데이터 안에 이미지 파일등을 Web에서 필요로 할때 Base64로 인코딩하면 UTF-8과 호환 가능한 문자열을 얻을 수 있다.  끝에 ‘=‘과 같은 패딩 기호가 있다면 이는 구분자로써 사용되므로 대부분 Base64로 생각할 수 있다.”

* “기존 ASCII 코드는 시스템간 데이터를 전달하기에 안전하지 않다. 모든 Binary 데이터가 ASCII 코드에 포함되지 않으므로 제대로 읽지 못한다. 반면 Base64는 ASCII 중 제어문자와 일부 특수문자를 제외한 53개의 안전한 출력 문자만 이용하므로 데이터 전달에 더 적합하다.”

* it is not encrypt. so never checkout at git.

* Valut 나 AWS같은 곳에서 제공하는 시크릿 매니저를 고려할것

* kubectl describe secrets dashboard-token

```yaml

evnFrom:

- secretRef:

		name: db-scret

# 이런식으로 정의된 값을 불러와서 쓴다.

# : 뒤에 값을 안썼으니 오브젝트 타입이 되는거고 첫번째 값이니 프로퍼티의 의미로 - 을 써줬다. 오브젝트의 키밸류니 한번 더 인덴트. 

```



## YAML 문법 핵심

```yaml

# 기본 자료형

num: 12345

pi: 3.14

str: 문자열

null_key: ~

object:

  str2: 문자열2

  object2:

    number2: 12345

num_array:

- 1



# 앵커

number: &num 12345 # 이제 이 변수는 *num으로 접근 가능.

number2: *num # number2 값은 number 값(12345)을 참조함.



# 앵커된 값을 고치기

default: &default

    min_log_level: info

<<: *default # 이렇게 앵커된 값을 호칭한 다음 값을 추가하거나 변경 가능

	  min_log_level: verbose

```



* 인덴트를 넣는건 오직 Object ->  키:밸류를 담을때만



---



## ConfigMaps

`kubectl create configmap [configname> --from-literal=<key>=<value>`

`kubectl create -f ` ->  yaml 파일 수정. kind configMap



```yaml

# ConfigMap 참조하기

- name : APP_COLOR

  valueFrom:

		name: webapp-config-map

		key: APP_COLOR

```

---



## ENV Variables

- [ ] 1회차

- [ ] 2회차

- [ ] 3회차 

```yaml

env:

	- name; APP

	  value: pink

env:

	- name: APP

	  envFrom:

		configMapRef: webapp-config-map

		-또는-

		secretKeyRef:

```



---



## Commands and args in Kubernetes

- [x] 1회차

- [ ] 2회차

- [ ] 3회차

*  dockfile 에 있는 `ENTRYPOINT/CMD`항목은 yaml의 `COMMAND/ARGS`에 의해 오버라이드 된다.

* `kubectl edit pod <pod name>` 현재 사용중인 파드를 수정한다. 바로 반영된다고 함 (컨테이너 이름 같은것들이)

* `kubectl get pod webapp -o yaml > my-new-pod.yaml` -> 현재 운영중인 파드의 정의를 export할 수 있다. 

```올바른 포맷

command:

	- sleep 

	- 1200

```

* dockerfile에서 ENTRYPOINT가 실행명령어 CMD는 아규먼트를 붙이는 역할을 한다. 

* `Dockerfile - ENTRYPOINT` would be overridden by  `yaml - command`에 덮힌다. 
```diff
+ (우선순위: yaml-command > dockfile-ENTRYPOINT)
```


* LOOK describe -> command

* Available pattern (1) 

 `command: [“sleep”, “5000”]`

Pattern (2)

```

command:

	- "sleep"

	- "5000"

```

---



### Imperative Commands

`—dry-run=client` 명령어를 검증하기 위해 사용. 실제로 실행하지는 않는다.

* `kubectl run nginx —image=nginx —dry-run=client -o yaml > nginx-depoy.yaml`  실제로 실행하지 않고 yaml로만 출력

* `kubectl create deployment nginx --image=nginx --replicas=4` 레플리카 4개로 디플로이먼트 생성

* `kubectl expose pod redis --port=6379 --name redis-service` -> 서비스를 만들기 위해 포트를 노출시킨다.

* `kubectl expose pod nginx --port=80 --name nginx-service --type=NodePort --dry-run=client -o yaml` -> ‘포트라벨’을 자동으로 셀렉터로 쓰는 방법. 셀렉트 해주니 selector는 해당 포트를 서비스 중인 파드의 이름이 들어간다. 

* `kubectl create service nodeport nginx --tcp=80:80 --node-port=30080 --dry-run=client -o yaml` -> 포트라벨을 셀렉터로 쓰지 않는다.  그 대신 `node-port`로 직접 연결해줘야함.

* `kubectl expose pods redis --name=redis-service --port=6379 --type=ClusterIP` service 를 만들고 특정 파드를 향해 서비스하는 클러스터아이피를 생성했다.

* `kubectl create deployment webapp --image=kodekloud/webapp-color --replicas=3` -> deploy 를 생성할때는 run 대신 create를 쓴다. 

* `kubectl run pods httpd --image=httpd:alpine --port=80 --expose` -> 파드를 런 시키고 알아서 노출시킨다.  <파드> + <서비스clusterIP> 둘다 한번에 해주는 명령

---

`kubectl get all`

`kubectl create namespace test-123 —dry-run -o yaml`  이런식으로 출력형식을 결정해주면 명령어로 규정한 내용을 define에 필요한 포맷으로 바꿔서 보여준다. 

`kubectl get pods -o wide` 추가적인 정보를 보여주는 가장 쓸모있는 `-o` 플래그

* 네임스페이스 없이 명령어 치면 default 에서 쿼리한다. `—namespace=dev` 이렇게 지정

* 디폴트를 변경하고 싶을때는 `kubectl config set-context $(kubectl config current-context) --namespace-dev` 이렇게 해주면 입력을 안해줘도 된다. 

* `--all-namespaces` -> GET ALL

`kubectl run redis --image=redis -n finance` -> 수동 파드 생성

---



`kubectl get pods —all-namespaces` -> 모든 네임 스페이스에서 pod 정보 획득

`kubectl run nginx-first-pod --image='nginx'` -> 파드를 시작하는 방법

`kubectl describe nodes <node-name>`

`kubectl describe pods <pod-name>` -> 

`kubectl get pods -o wide ` -> 파드에 대한 상세정보 조회

`kubectl describe pods my-pod` -> 포드의 상태 정보 확인

`kubectl get pod <pod-name> -o yaml > pod-definition.yaml` -> pod 정의 정보 추출

`kubectl edit pod <pod-name>` -> Pod 프로퍼티 수정 (라이브 상태)

-> kubectl edit replicaset <rs-name> 해준다음 레플리카를 삭제해줘야 수정한 내용 (특히 컨테이너)가 적용된다. 아니면 wait상태로 기다린다.

---

**selector** : 어떤 파드를 모니터링하고 생성할지 결정하는 변수

`kubectl create -f ‘re…yml`

`kubectl get replicates`

`kubectl delete repllicaset <my>`

`kubectl replace -f re….yml`

**레플리카 스케일업 방법 3가지**

1. 더 배포하고 싶을때 replicas: 6! 

2. kubectl scale —replicas=6 -f re….. .yml // 임시

3. kubectl scale -replicas=6 replicates myapp-replicaset // 임시

`

---



* 쿠버렛이 시작이자 끝 status kubelet

* `systemctl start kubelet`

* 설치 및 설정 문제는 푸는걸 추천



`kuberadm` 을 설치하는 것도 시험 중 필 마스터에서 설치하면 워크노드들도 알아서 설티먹스 설치해서 쪼갤것

* 필요한면 Sudo - i 걱정하지 말고 써도 된다.

	* 일반 계정은 리드밖에 없다. 루트만 라이트가 있다. 그래서 써야함



완전 네이티브 상태에서 설치하는게 7점 callico 같은거 해야함.



Enable kubectl autocomplete tmux 	두개 설정은 하자. 시험장 가자 마자

- 마스터가 여러개 일땐 티먹스 익숙해지기



Do not need remember everything just let you know where



컨텍스트 이동하면서 문제를 풀어야 한다.

문제를 보면 다 보인다. 

sudo를 하면 컨텍스트가 바뀜

`kubectl config current-context` 로 확인한다.

ik8s 에 워커가 없으니 여기서 워커노드를 굿성하란거구나. 



* Choose a question strategically

	* 점수따기 좋은 문제 골라서 풀기

* Check compatibility before exam





## 업그레이드 절차

* 버전을 한단계씩 올려야함.

**절차**

1. eskctl로 업그레이드 절차를 진행





## 네임스페이스

단일 클러스터 리소스 그룹 격리 메커니즘. 리소스의 이름은 네임스페이스 내에서 유일해야함, 네임스페이스 간은 독립성 보장을 한다.  다만 네임스페이스 기반 스코핑은 네임스페이스 기반 오브젝트 (예: 디플로이먼트, 서비스 등) 에만 적용 ←→ 클러스터 범위의 오브젝트 (예: 스토리지클래스, 노드, 퍼시스턴트볼륨 등) 에는 적용 불가능

## k8s Node

노드는 다른 레플리카셋을 크로스하게 가진다.