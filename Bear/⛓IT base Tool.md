# ⛓IT base Tool

## Git 의 내부구조

```git

	.Git 

		/Obejct	(실데이터)

		/Ref		(브랜치 및 최신 커밋값)

		/logs

		HEAD		(현재 로컬저장소가 가르키는 커밋)

```



## 슬로기운 Git 탐구생활

* 일반

`git rm -r —cached ` -> ‼️ 뭐하는거더라

`git stash` 명령어를 실행하면 현재의 변경사항이 저장되고 워킹디렉토리는 HEAD 상태로 돌아가게 된다. 그리고 다시 스태시된걸 엎어서 작업으로 돌아오는 방식으로 브랜치간 이동을 자유롭게 한다. 



* git branch 옵션

```git branch -b toy1

git checkout master

git pull —rebase upstream master     // 업데이트된걸 다시 덮어쓰기

````



* git rest 옵션

```

git reset —soft 스테이징된걸 끄집어 내린다.  헤드^를 붙이면 커밋롤백 + 스테이징상태 => 잘못 커밋했을때 다시 하기좋겠다.  + 스테이징된거 끌어 내릴떄.

git reset —mixed [default] 하면 스테이징에서 끌어내린다. 헤드를 붙이면 커밋롤백 + 언스테이지 => 커밋 조차도 잘못 했을때 스테이징에서 끌어내릴떄.

git reset —hard 하면 스테이지 끌어내리고 파일도 바구고 다

```



### 오브젝트 분석

`git count-objects -vH`



## Tmux

* 백그라운드에서 여러가지 세션을 유지하고 접근하고 동시에 볼 수 있게 해줌.



## Gitlab CI 워크숍 자료

* [https:*/workshop.infograb.io/gitlab~~ci/00***workshop***info/](https://workshop.infograb.io/gitlab~~ci*00***workshop***info/) 

* SPRING 코드 따라서 플로우를 따라해보기 좋음.



## GitHub Actions

* Market place가 있는걸 뺴면, 빌트인 템플릿이 없고

* CICD 를 하기 위해선 추가적인 조치가 필요하고 설정도 다 해줘야 한다. CI가 코드를 기준으로 자동으로 환경을 설정을 해주는것과 많은 차이가 있다.

* 콘테이너 등록이 CICD에 통합되어 있지 않다. Gitlab은 통합됨.



## Circle CI

* 빌드/배포를 실행하기 위해 리소스를 대여해주는 방식으로 수익을 얻는다.

* 잡플로우는 텍스트 형식으로 컨트롤할 수 있고 웹사이트에서 제공하는 메뉴에서 조작한다.

* 초기에 어울리는 서비스인듯



## jetty

* 제티는 자바 HTTP (웹) 서버이자 자바 서블릿 컨테이너이다. 웹 서버가 보통 문서를 사람들에게 제공하는 것과 관련된 반면, 제티는 대규모 소프트웨어 프레임워크에서 기계와 기계의 커뮤니케이션에 사용된다.



## HSQLDB (Hyper SQL Database, 하이퍼 SQL 데이터베이스)

* 자바로 작성된 관계형 데이터베이스 관리 시스템.  인메모리, 파일기반 둘다 지원

사용예: 오픈오피스 베이스, 리브레오피스 베이스, 스탠드얼론 롤러 데모, Jitsi VoIP 



## in SVN, Replace와 modify의 차이

* Item has been replaced in your working copy. This means the file was scheduled  for deletion, and then a new file with the same name was scheduled for addition 

in its place.



* 지라 CLI

	* API 문서  [https:*/bobswift.atlassian.net/wiki/spaces/JCLI/pages/1059397481/getIssueList](https://bobswift.atlassian.net/wiki/spaces/JCLI/pages/1059397481*getIssueList) 

	* - -outputFormat

		* 1 - standard fields, 2 - standard fields plus custom fields, 3 - standard fields plus security fields, 4 - standard fields plus security fields and custom fields, 101 - simple text list of issue keys only, not CSV for this special case, 102 - key and summary fields, 998 - all fields including link information but excluding custom fields, 999 - all fields including link information and custom fields

		* 포맷마다 주는 정보가 다르다.





## 톰캣은 java코드를 실행하는 순수 java http 웹 서버

* 그 톰캣의 코어 컴포넌트가 카탈리나 

* 재스퍼는 JSP전담



## Catalina

* 톰캣을 쓰는 어플리케이션들은 카탈리나.sh 를 자신의 쉘로 감싸서 서비스한다.



## gradlew

유닉스용 wrapper 실행 스크립트이다. 컴파일, 빌드 등을 하는 경우 사용한다. ./gradlew {task} 형태로 실행한다.

Graddle은 사용자 지정 task도 지원한다.



* /builld.gradle 이 뼈대, 모듈별로 .gradle을 가질 수 있다.





# Virtual OS

* Container 에서 실행되는 명령어는 Host-OS의 스케쥴에서 실행됨

* Hypervisor : 하드웨어 스케쥴링을 커널대신 해주는 도구

* VM이란 무엇인가? 왜 도커가 나와도 VM은 쓰는가?

: 머신이 죽거나 확장켜야할 때 컨테이너를 관리해줄 기술이 필요하다.

* 도커 오버헤드 0% ~ 5%

* VM은 OS를 구분되게 사용하기 위해서 쓰이는것. 커널을 공유하지 않아서 보안성이 높음.

* 도커는 커널을 공유하기 때문에 Docker 에 윈도우를 돌리게 되면 제약이 걸린다. (OS커널에 대한 별도 작업 필요)



## ORACLE ALTER LOG

* 시스템, 에러 메시지가 남는 로그



## 프로메테우스

* 쿠버네티스에 특화

* 각 서버에 대해 풀링 방식으로 데이터를 저장



## Grafana

* 쌓인 데이터를 시각화함..



## Wide column DB

* 로우마다 다른 컬럼을 가질 수 있음

* 한마디로 스킴리스

* join이 안되고 transaction안됨

* 확장성과 빠른 성능 (짱인데)

* 카산드라, HBAS

* 로깅에 최적화



## Doc DB

* Wide column 장점

* 쓰기가 까다롭고, join가능

* 대부분의 app에 범용



## Graph

* SQL + NoSQL 장점

* Graph QL은 클라이언트측에서 자유롭게 데이터를 다루게 하기 위한 뭔가.. 편의 위주의 디비인듯



## Search

* 엘라스틱서치 장문의 스트링 검색에 최적화

* update에 압도적으로 좋지않음



# CICD

## Jenkins

* 젠킨스가 별 하찮은 이유로 잡이 실패하는 경우에 대한 설명

"Jenkins is executing shell build steps using *bin*sh -xe by default. -x means to print every command executed. -e means to exit with failure if any of the commands in the script failed." 그렇기 때문에 만약 에러를 무시하고 진행할 필요가 있다면 다음 처럼 에러 코드를 반환하지 않도록 처리하면 된다.

```

set +e

your code

set -e

```





# BUILD

## Maven

### sonar

The SonarScanner for Maven is default scanner for Maven projects. The ability to execute the SonarQube analysis via a regular Maven goal makes it available anywhere Maven is available (developer build, CI server, etc.) ~~> 현재 OSS~~OM에선 코드인스펙트를 하고 보고서를 작성하는 용도로 사용중이다. 현재 프로젝트에서 사용중인 `pom.xml`을 보면 `<ruleset>.xml</>`을 지정해준다. 안에 보면 리턴하지 않는 함수, 선택지가 하나뿐인 case등에 대해 경고를 하는 룰이 지정되어있다.



### Release vs Snapshot

* RELEASE 최종 배포될 때 사용, Artifact의 수정이 거의 없을 때 사용한다. (로컬에 있으면 로컬에 것을 사용한다)

* SNAPSHOT Artifact를 개발중에 다른곳에서도 자주 사용할 때 사용한다. Artifact의 수정이 빈번할 경우 사용한다. 왜냐하면 항상 원격레포지터리에서 받아온다. 

* `mvn deploy`를 이용해 RemoteRepository 에 배포할때도 동작하는 특성이 다르다. Release는 시맨틱버전에 따라 생성되므로 동일 아티팩트를 덮어쓰기 하는 반면, Snapshot은 고유네임을 유지하도록 빌드번호가 붙으므로 항상 새로운 쓰기가 된다.



### JAVA XML 파싱 (SAX parser 활용)




---



#Devops/tools