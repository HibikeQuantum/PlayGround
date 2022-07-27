# 📖IT concept dictionary

#devops/Mainline



* 프로퍼티 = 필드

* PEM (Privacy Enhanced Mail)은 Base64 로 인코딩한 텍스트 형식의 파일

```bash


-----BEGIN OPENSSH PRIVATE KEY-----

```

이런 파일유형 구문을 사용한다. 

* compliance - 준법감시, 내부통제

* ALM application Lifecycle Management 더 광범위한 소프트웨어 관리 (Cm의 상위) + 품질관리

* WIP : Work in Progress 





## makefile

* make 명령에 따라 실행할 스크립트를 명세한 파일 네이밍 컨벤션

```makefile

upgrade-eks:

	helm upgrade -i aws-load-balancer-controller \

		-n kube-system \

		-f values-eks.yaml \

		.



delete:

	helm delete -n kube-system aws-load-balancer-controller



//일반적으로는 다음의 구조를 가진다. 

CC = gcc  // 매크로 정의

target1 : denpendency1 denpendency2

	command1

  command2

// 타겟절(clause), 의존성, 명령

```

* 따라서 이런 구조일 때 `make upgrade-eks`으로 명령어를 실행시켜주는 명령어라고 보면된다. 

* make -> The purpose of the make utility is to determine automatically which pieces of a large program need to be recompiled, and issue the commands to recompile them

* 그래서 그냥 세부 스크립트를 직접 실행해도 결과는 같다.


---





# Math

* 분위수 (Quantile), 확률분포에서 구간을 나누는 기준이 되는 수. 이분위수는 중앙값(median), 삼분위수(textiles), 2/3를 2삼분위수라고 읽음. 넷으로 나누면 사분위수(quartile)