# [XOS, Terminal, Git]
- - -

## XOS 계통 명령어

* ```Ctrl-Cmd-G``` 파인더 이동 입력창
* NTFS 시스템 : 맥에는 NTFS를 마운트시킬때 제대로 제거를 하지 않으면 읽히지 않는 문제가 있다. (윈도우로 가서 disk 검사를 해주면 복구된다)

* SHIFT-OPT-CMD-V : 텍스트 붙여넣*
* ``` cd -``` 기억되어 있는 이전 다이렉트 이동하기

- - -
## iTerm
* iTerm : command 클릭으로 파일 열 수 있음
* command + K:  버퍼 삭제
* open . : 현재 디렉토리 파인더로 열기

- - -
##Atom
CMD + SHIFT + P : 팔레트 ( enhanced 키워드 사용해서 마크다운 추가기능 사용 )
CMD + SHIFT + M : Toggle preVIEW
CMD + K , 화살표 : 화살표로 SPILIT
CMD + Ctrl + Space : 특수문자
- - -
#Webstorm
* Ctrl-CMD+G  : 멀티셀렉션
* Cmd+T: 리팩토링
* CMD+D: 줄 복사
* CMD+I : 리포맷
* CMD+OPT+L: 프리티어 리포맷
* CMD+K: 커밋
* OPT + WASD;
* CMD + SHIFT + [-/+] 코드 접기 펴기
#Dbeaver
* 데이터베이스 오른쪽 클릭 ctrl [ 에디터 열기
* sql 실행 ctrl enter
mysql -u admin -p --host hello-wright-database.cyskonfnpdla.ap-northeast-2.rds.amazonaws.com --port 3306
- - -
----
## UNIX 계통 명령어
```top ``` 자원모니터링
```-sudo renice -20 -p [Process id]``` 프로세스 우선순위 조정
``` find ./ -name abc* ``` 파일시스템 탐색
``` lsof -i tcp | grep [프로세스네임]``` 프로세스 네임으로 tcp 포트 사용 현황 확인
``` lsof -i :[포트 번호] ``` 포트번호로 확인
```sudo kill -9 [ProessID] ``` 프로세스 강제종료 시그널 보내기
nc -z 호스트주소 포트번호
nc -z 54.180.82.249 27017
netstat -ntlp | grep :8000
하고 죽이고 다시켜기

- - -
##git 명령어 모음
###Basic
```git branch -a``` 브랜치 종류와 현재 사용중인 브랜치 확인
```git checkout - b <name>``` 브랜치 만들기
```git log``` git 이력보기
```git stash``` [마지막 커밋으로부터 모든 변경상황을 임시 저장소에 저장하고 마지막 커밋상태가 됨(파일변경)```
```git stash apply``` [stash된 상태를 다시 적용시킴]
```git reset --soft``` 스테이징 취소
```git reset HEAD [file] ``` 인덱스(add) + 스테이징 취소
```git reset --hard HEAD	``` 파일 내용까지 되돌림.
```git commit --amend``` 커밋 코멘트 변경
```git pull [풀링 대상]``` 원격저로부터 .git을 업데이트 시킨다.
```git commit -m —no-verify```
```git add .``` [현재 디렉토리 기반  애드]
```git add -A 	```[전체 디렉토리 기반 애드]
```git add -A -p ```[변경상황을 하나하나 체크해면서 add 좋은 commit을 하기 위해 필수적이다.]

- - -
###Advance
*  .gitignore 에 등록된 파일이 무시가 되지 않을때
```
git rm -r --cached .
git add .
git commit -m "fixed untracked files”
```
*  원격 저장소와 로컬 저장소에 있는 파일을 삭제한다.
 ``` git rm [File Name]```

* 원격 저장소에 있는 파일을 삭제한다. 로컬 저장소에 있는 파일은 삭제하지 않는다.
 ```git rm --cached [File Name]```

* git log 시각적으로 조회
 ```git log --graph --decorate --oneline```

* 로컬쪽이 확실한 원본이라고 확신함에도 pull 하라는 메시지 뜰때 강제로 푸시 (헤드를 한단계 높여쓰는개념)
 ```git push origin +master```

* 현재 헤드에서 한단계 과거에것을 브랜치로 선택 (헤드를 옮긴다)
 ```git checkout master^	```

* 원격 저장소를 pair란 닉네임으로 추가
 ```git remote add pair < Repo URL for pairs fork >```

* 원격 저장소 버전확인
 ```git remote -v```

 * git clone을 하면 origin 이라는 이름의 저장소에 master라는 브랜치를 .git가 기억하게 된다.
  upstream을 지정하면 git push만 써도 자동으로 push가 된다.
  ``` git push origin master( or other branch name )```

* pair 로 지정된 원격 저장소의 것으로 git을 업데이트
 ```git pull pair master ( or other branch name )```

* 현재 파일내용을 다 마지막 커밋기준으로 바꾼다. 파일명이 없으면 프로젝트 전체 reset --hard와 비슷
 ```git checkout . [파일명]```

* pull을 안한 상태로 로컬에서 작업하다가 버전이 안맞게 된 경우 강제로 덮어 씌우고 싶을때
 ```git push origin master --force```

*  브랜치 이름 바꾸기
  ```git branch -m Old_branch_name New_branch_name```

* 브랜치 삭제
  ```git branch -d feature/TEST-860```

* 원격지 브랜치 삭제
  ```git push origin --delete feature/TEST-860```


### GIT 전략
- git merge는 리시브 하는 쪽에서 해줘야 한다. git reabase 본줄기가 업데이트 됬을떄 뒤늦었지만 그 시점부터 코드를 시작하고 싶을때 사용

- rebase -i 옵션으로 별거아닌 브런치를 다 시마스터로 쑤셔넣을 수도 있다. 큰 이유가 없다면 그냥 머지로 하는게 좋다. 마스터는 무조건 잘 돌아가는것만 있어야 한다. 리베이스를 하면 브런치의 커밋들이 마스터에 얹혀지게 되니까

- 깃플로우 FEAT DEV, REAL, PRODUCT 구분해놓고 깃을 관리하는 기법. 프로덕트에선 처음 DEV를 따고 나중엔 핫픽스 용도로만 브랜치를 딴다. 핫픽스를 한것은 프로덕트 데브 양쪽에서 머지를 해야한다. 릴리즈는 프로덕트와 데브에서 머지시킨다.
