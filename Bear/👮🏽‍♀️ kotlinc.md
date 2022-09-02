# 👮🏽‍♀️ kotlinc

#Devops



## 환경구성

`kotlinc-jvm`



## Relaxed Binding



바인딩 규칙 - envProperty -> @ConfigurationProperties

이때 정확히 일치 하지 않아도 되게 해주는게 Relaxted Binding. 카멜이든 스네이크든 있으면 있다고 친다.



## 환경 프로퍼티별 네이밍

**.properties** is use Kebab case like a `spring.main.log-startup=something`



**.yml** use Kebeb case too



**Environment Varable**  Snake case, `MAIN_INFO=something`

“System properties” -> 자유(케밥 써야지)



## 개환 환경(Phase)란 무엇일까?

#### 주목할만한 포인트

* TestContainers 라이브러리. 통합테스트를 용이하게 해준다.

* develope(nightly) 환경

* beta - 약속된 배포 주기, 버전 관리하에 운영. 보통 QA를 베타에서 진행한다. 

* RC(Release Candidate) 환경 **실제 Production 환경에 배포하기 직전에 마지막 점검을 하는 환경**이다.  beta처럼 통제하지만 시스템 성능과 버전은 실제 버전을 쓴다.

* Stage - RC와 비슷하지만 DB같은 Persistent 계층을 PROD껄 쓴다. 소수의 특수 권한을 가진 운영자에게만 오픈

* Production



## Profile

* Phase 별로 다른 속성값을 쓰잖아 당연히. 근데 이게 장애의 주요 원인이다. 속성 값은 `application-{profile}.properties` 이런 형식으로 설정하는게 컨벤션. 2.4이상에선 properties/yml 롭게 써도 된다.* src/miain/resources 에 위치시키면 된다.

이제 정의한 Phase 별  변수들을 어노테이션으로 불러와 쓰면 된다.  어노테이션은 프로필을 보고 맞는 변수를 호출해준다.



## Logback

1. SLF4J 을 래핑한 Kotlin-logging

2. 디펜던시 추가, 로거 인스턴스 생성, 메서드 호출 실습

3. Logback을 쓰면 appender를 통해 파일쓰기, 전송 등을 할 수 있다. profile에 따라 appender 적용도 분기. 설정파일 ->  `logback-spring.xml`  -> 여기서 프로파일 별 설정을 include 시켜준다.

4. `<fileNamePattern>log/${LOG***FILE***BASE}.log.%d{yyyyMMdd}.%i</fileNamePattern>` 이렇게 쓰면 프로젝트가 루트다.





## MVC 

`spring-boot-starter`  has `spring-web, spring-webmvc, Sevlet Container(spring-boot-starter-tomcat)`





* @RestController는 RESTful API 형태의 요청을 쉽게 받을 수 있는 Controller 빈을 생성



---

#### etc

* I made IntelliJ auto reload when build.gradle value has any changes.