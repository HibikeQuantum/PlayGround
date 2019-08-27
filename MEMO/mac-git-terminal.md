# [XOS, Terminal, Git]
- - -

## 맥
* Ctrl-Cmd-G  : 파인더 이동 입력창
* NTFS 시스템 : 맥에는 마운트 신경써서하기

## iTerm
* iTerm : command 클릭으로 파일 열 수 있음
* command + K 버퍼 삭제

#웹스톰
* Ctrl-G  : 멀티셀렉션
* Cmd+T: 리팩토링

##명령어
* top
*  -sudo renice -20 -p [Process id]
* find ./ -name abc*

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
```git rm -r --cached .
git add .
git commit -m "fixed untracked files”```

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

* 원격 저장소
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
