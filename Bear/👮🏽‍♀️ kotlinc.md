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





## Spring 패키지 구조 및 IDE

![](/BearImages/29897363-B6FA-4DA4-A7F2-DE3E7D47C2ED-151-00000E704FD443E8_1FCC2964-40D3-43B4-9341-7B5221BEC1A6.png)

* 이렇게 `main/[lang]/[이하 PackageNamePath]` 

TestController.kt는`me.solutuion.mycui.controller` 패키지 소속이 된다.  

* IDE상에선 하나의 폴더처럼 보이지만 자세히보면 package 타입의 아이콘인데 이는 subdirectory를 축약해놓은 것이다. 

* CLI로 가보면 실제 구조는 `me/solution/mycui/controller`다. 

* 스프링 개발시 패키지를 추가한다는 의미는 src me.solution 이런 패키지의 뿌리에 브랜치를 추가한다는 것

##



## Java bean

**데이터 전달 오브젝트 파일 DTO(Data Transfer Object)**

* JSP같은 동적 생성에서 데이터 로직을 분리해 재사용성을 높히기 위해 만든다. 데이터 로직을 따로 때어놔서 미리 만들어 놨으니 관리자 페이지에서 게터 세터를 조작하는 페이지를 만들기도 쉬워진다. 

* `public class MemberInfo implements Serializable` 이렇게 선언하고 public getter, setter 메서드를 가진다.



### Java Bean Flow

1. Request by User

2. Received by Servlet

	1. Check Mapping at Controller

	2. Toss to Mapped Controller

	3. Service(middleware) process is request task to DAO 

* 자바 빈 에러가 발생하는 시점은 두가지. 프로세스 시작 or 매핑을 확인하는 시점



## 개념

* Spring 에서 3티어 아키텍처 (presentation, Business,  persistence Layer)를을 구현하는 Controller, service, repository

 ![](/BearImages/A1DA8031-81B3-42F3-8ABE-E021F18F2F1E-3350-0000100E979ABB8C_R1280x0.png)

* 계층별 설계가 응집도를 높이고 결합도를 낮춘다. (Persistence Layer)는 분리되기도 한다.



* DAO(Data Access Object) SQL하는 단위 

```

public class TestDao {



 public void add(DTOBean dto) throws ClassNotFoundException, SQLException{

  

  Connection c= DriverManager (중략)

  

  PreparedStatement ps = c.prepareStatement("insert into users(id,name,password) value(?,?,?)");

  

  ps.setString(1,  dto.getName());

  ps.setInt(2,  dto.getValue());

  ps.setString(3,  dto.getData());

  

  ps.executeUpdate();

  

  ps.close();

  c.close();

 }

}



```

	* express 에서 많이 봤던거다. 디비 컨트롤 하는걸 하나를 쪼개서 DAO 

* Controller 하나의 REQ를 담당하는 업무 단위, Service는 트랜잭션 단위, DAO는 DB SQL 단위입니다. (옛날에 라우트, 컨트롤러 .. 구조로 생성했던거 생각나네)

* DTO가 계층간 데이터를 옮기기 위한 getter setter 클래스 (Data Transfer Obejct) <예전에 자바스크립트를 억지로 타입스크립트처럼 쓰려고 애썼던게 기억나네>







## Spring data

* 특정 DB와 결합성을 가지게 되면 유연함이 떨어진다. `Repository`란 Generic interface를 사용하면 이 문제를 해결하는데 스프링의 이 개념의 구현체가

Spring data 



- Java EE, ORM 표준 -> JPA 는 Hibernate의 구현체

* spring-data-jpa에서 entity information을 생성할 떄 `@Entity`로 등록한 JPA entity 목록을 통해서 `ManagedType`을 결정한다.



---

#### etc

* I made IntelliJ auto reload when build.gradle value has any changes.





## 시스템 분석

Spring 3.1.1 Release 사용중