# ⚙️ k8s

#Devops/kubernetes #Devops

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