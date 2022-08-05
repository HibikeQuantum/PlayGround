# 🏔bash

#Devops/language/bash 

---



## 기본적 규칙

* 기본적으로 변수는 모두 전역. 함수 안에선 local 키워드 지원

* 로그인쉘 ≠ 스크립트쉘

* 쉘프롬프트(`$`)는 입력대기를 뜻함



## 유닉스 기초... 기초

* 쉘의 역사

	* sh는 POSIX 표준을 따름 ( Bourne sh)	

bash는 이제 표준을 따르지 않는다.



* 입력을 넣는 방식

	* command line 	`./test.sh 1 2 "string"`

	* STDIN			`echo "1\n2\nstring" | ./test.sh`



## echo

개행하지 않기

```

/bin/echo -n "do not new line"; /bin/echo " yes";

do not new line yes

 /bin/echo "do new line"; /bin/echo "yes";

do new line

yes

```

MAC은 `-n` 옵션이 없다.



## 예약변수(Reserved Variable)

* HOME, PATH, LANG, PWD, FUNCNAME, SECONDS(실행된 시간),  SHLVL(쉘 실행의 중첩된 깊이) 

* OSTYPE, TERM(로긴 터미널 타입), HOSTNAME, HOSTYPE, LOGNAME(로그인 이름)

* UID, USER, USERNAME, GROUPS, TMOUT



## 특수 매개 변수 (Special Parameters)

* $$ 현재 스크립트 PID

* $? 최근에 실행된 명령어의 exit code

* $! 최근에 실행한 백그라운드(비동기) 명령의 PID

* $- 현재의 옵션 플래그

* $_ 지난 명령의 마지막 인자로 설정된 특수 변수

* $0 쉘 파일의 이름

* $1 첫번째 파라미터

* $* 전체 파라미터

* $# 파라미터의 갯수



## 매개 변수 확장(Parameter Expansion)

* ${var} $var  같은 기능 이지만 전자가 더 범용성 있는 표현

* ${var:위치} 문자열 추출

* ${var:위치:길이} 문자열 길이만큼 추출

* ${var:-단어}

## 배열 (Array variable)

* 배열 변수사용은 반드시 괄호를 사용 ${array[1]} 

* array=(“a” ”b” ”c”)

* array[4]=“d”

* array=(${array[@] “e”)

* echo "배열 전체 출력: ${array[@]}"

* `echo "배열 전체 개수 출력: ${#array[@]}"`

* 특정 요소 지우기 `unset array[4]`

* 배열 전체 지우기 `unset array`



## 논리연산 (arithmetic Operators)

`&&, -a   논리 AND`

`||, -o   논리 OR`

```

	* ** 거듭제곱(power)

	* % 나머지값

	* += -= *= /= %=

```



---

# 문자열

## 문자열 비교 String comparison

<, > 아스키 알파뱃 순서에 더 작음

-z    문자열이 NULL, 길이가 0인 경우

-n    문자열이 null이 아닌경우



## test, [

* `type [` 을 해보면 이게 문자가 아니라 `a shell builtin` 으로 나온다. 

* `[`도 하나의 명령어고 test 명령어다.  `]`은 인수를 닫는 마지막 인수로 사용된다.

* 사용할 수 있는 옵션은 다음과 같다.

	* -e 파일이 존재

	* -s 파일이 존재하고 0보다 큰 경우

	* -d 파일이 존재하고 디렉토리인 경우

	* -x 파일이 존재하고 실행가능하면 (더 궁금하면 그때 검색해서 쓰라구 호호)

	* -nt 더 최신의 파일인지 newer than (>)

* if 할때 꼭 test를 안써도 된다. (`-q` 결과 미출력)

```

if grep -q "bin" sample.txt ; then

```

잡으면 0, 못잡으면 1을 반환하는걸 활용할 수 있다.

* `-eq`옵션을 쓰면 **숫자로 비교**하게 된다. **== 은 문자열 비교**

	* 까먹지마~ 기본중에 기본

* **쉘은 비교문에 값이 비어있는걸 오류로 본다. 주의** `if [ ]` 이렇게 되는 꼴이 되면 안된다. 



## 🔥쉘 문법 검사

sh -nv [script]

* 실행전 명령어 검사 + verbose 



## IFS(internal field separator) 

* bash 의 기본값은 공백이다. 별도로 선언할 수 있다. 

* `IFS=''` 이렇게 정의하고 개행을 넣는식으로 자주 쓴다. (파이프를 쓰면 개행이 기준이니까)

`mkdir test;cd app; cd` 성공 여부 상관없이 계속 다음 명령어 수행

`mkdir test&&cd test&&` 성공을 하면 다음 명령어 수행

`mkdir test& cd test&` 백그라운드에서 실행을 의미



## 쉘 환경변수 지정

* `set -e`

git pull;	make clean; 	make;

* 이런 연속된 과정에서 $? 의 값이 0이어도 계속 실행을 하게 한다. 반대로 종료하려면 set +e

* +x는 불필요한 로그를 찍는 원인이 될 수 있으므로 리트라이 할 때만 해줄 수 도 있다. 끄고 싶으면 set +x +e

* set -o pipefail

	* 파이프 사용시 이전 단계의 오류(non-zero exit code)를 승계하도록 하는 설정

* set-o errtrace

	* 일종의 디버그 모드 어디 함수에서 생겼는지 말해준다.

 * 쉘 환경변수 관리

	* 그냥 선언한 변수는 로컬취급으로 set 으로만 조회가능하나

	* export로 선언하면 전역변수가 된다. env, set 조회가능



##  exec 

* 주어진 명령어를 실행하는데 새로운 프로세스를 실행하지 않고, 실행중인 쉘 프로세스를 대체하여 실행한다. 

* 이 경우 실행이 끝나면 쉘이 끝나기 때문에 다른곳에서 ssh로 접근했다면 터미널은 끝나게 된다.

* 쉘안에서 실행하는 명령어들도 별도의 프로세스라는걸 인식



## EOF 를 통한 입출력



```cat <<EOF > /etc/resolv.conf

nameserver 8.8.8.8

EOF



cat <<EOF >> /etc/resolv.conf // 이렇게 덮어쓰거나 append 가능

nameserver 8.8.8.8

EOF

```



## echo

* 배시쉘 함수에선 return 대신 echo를 쓰면 반환된다.

* echo의 이런 동작특성이 햇갈린다면 값을 반환할때 외부 스코프 변수에 값을를 할당해라

* echo 는 실행한 환경으로 값을 돌려준다. 그래서 [프로그램] > text 하면 에코에서 찍은걸 그대로 값으로 저장하고 유저는 볼수없다.

`echo -e`  escape 문자를 사용하게 해주는 옵션 carriage return, new line 

---

유닉스 쉘 스크립트 예제 사전내용.





## 리다이렉트

`>`	명령 프롬프트 대신 장치에 명령 출력 (`>>`  append)

`<` 	키보드나 핸들에서 입력을 읽지 않고 파일에서 입력을 읽기

`>&` 	한 핸들의 출력을 다른 핸들의 입력으로

`<&` 	다른 핸들의 입력을 읽어서 다른 핸들의 출력으로 

`|` 	다른 출력을 읽어서 다른 명령의 입력으로

`sort < file.txt > result.txt` 이렇게 쓰는것도 순차적으로 하는것과 같은 결과를 낳는다. `sort file.txt > result.txt`  입력을 지정해주는게 `<` 개념만 말고 가면 된다.



## getopts 	

* etopts 를 이해기 위한 기본 지식

	* optionString ≈ flag

	* optionArgument(옵션인수) 옵션스트링 뒤에 입력되는 값

	* $1 이렇게 포지션 기반으로 하는것보다 좀 더 유연한 입력을 받기위한 getopts

	* 옵션은 -abc 이렇게 사용해도 된다. 

	* --구분자를 쓸 경우 우측에 있는 값은 옵션으로 해석되지 않아야한다.

	* `$OPTIND` →  Option Indicator 처음 값은 1 이 값은 옵션의 포지션을 가르킴. 옵션과 옵션인자를 모두 카운트한다.

		* `set -- -a 123; getopts; // 이렇게 호출하면 $OPTIND 는 3`

	* 파일명이 들어오면 그 뒤의 옵션은 무시된다.

* set -- [옵션]

	* positional parameters 를 설정

	* $@ 파라미터 전부를 참조



* 입력받은 인수를 처리하는 명령어

	* 이걸 실행할때마다 다음 $opt 값이 변함.

	* $OPTIND는 구분자 '\s'마다 변함.

```

getopts "abh "

	// arg없이 플래그만 있다

getopts a:b:h 

	// a와 b는 arg를 가진다. h는 플래그만 있다.

	// a의 arg는 $arg_a 이렇게 호출 할 수 있다.

while getopts "ab:h" opt

do 

  case $opt in

    a) arg_a=$OPT

  esac

done

```



## case

```bash

for filename in *

do 

  case "$filename" in 

    *.htm | *.html) // 이렇게 정규식을 이용하여 분기하고 

      headname=$(filename%.*) // 파라미터 확장으로 값을 추출할 수 있다. (%)

      mv "$filename"  "${headname}.tet"

    ;;

  sac

done

```

```

  192.168.1.*) // 이런 패턴도 가능하고

  *bin/sh|*bash*) //이런 방법으로 분기도 할 수 있다

```



## Regular Expression 

	* Bash는 특수 명령을 통해 regex를 처리할 수 있다. 주로 조건문에서 사용한다. 그걸 지원하지  않는 sh에서 쓰는 명령어

```bash

$ AA="foo 12345 bar"

$ expr "$AA" : "foo [0-9]\+"

```

	* length STRING 

	* index STRING CHARS 

	* substr STRING POS LENGTH

		* 이렇게 문자열을 처리하는데 특화

	* STRING 에 예약어가 있으면 + "$STRING"

* 문자열을 찾고 자르고 하는거 다 할 수 있으므로 String을 다룰때 꼭 다른 스크립트 언어를 써야한다고 생각하지 않아도 된다. 다만 다른 스크립트를 쓸때 다양한 라이브러리를 쓸 수 있으니 



* 문자열을 찾아서 반환하는 테크닉

```bash

t="MULTI: primary virtual IP for xyz/x.x.x.x:44595: 10.0.0.12"

searchstring="IP for"



rest=${t#*$searchstring}  // #* 이렇게 처리하면 searching 뒤의 문자를 캐치한다.

echo $(( ${#t} - ${#rest} - ${#searchstring} ))

```





## shift

* `positional params`를 왼쪽으로 민다. `$#` 은 감소한다.

* `shift $(expr $OPTIND - 1)`

	* 이렇게 사용하면 $1이 무조건 타깃만 가르키도록 할 수 있다.



## trap

	* signal을 받았을때 처리하는 예약함수

`trap 'echo try count: $count'exit ' INT    `



## `/dev/null

* 이곳으로 다이렉트를 하면 출력을 버릴 수 있다. 굳이 화면에 보거나 저장하지 않는다면 쓰면 깔끔

* 파일 설명자

```

0> /dev/null 	표준 입력 무시

1> /dev/null 	표준 출력 무시

2> /dev/null 	오류출력을 무시

.sh > /dev/null			// 또는 2>&1 표준 출력과 오류출력 모두 무시

```

>> 결과 오류는 출력안하고 무시하고 값을 붙임

& >> 오류 출력하고 값을 붙임



## `wait

인수 없이 이걸 쓰면 실행 중인 프로세스가 포크한 모든 프로세스가 종료될때까지 기다린다. 백그라운드로 돌린 프로그램의 결과를 출력하고 싶을때 쓰면 된다.

```

ping -c 6 1.1.1.1 > host.log & (이하 반복)

wait

cat host1.log host2.log

```



`echo HellWorld 1> ok.txt 2> fail.txt`  이렇게 하면 출력과 오류 둘다 구분할 수 있다. 

(op. 파일관련 attr로 실행 중 오류를 체크하도록 활용할수 있겠다)



## read

* 사용자의 입력을 받음. 한번에 여러 인자를 받기 가능. 쉘을 실행한 뒤 press button 으로 같은 방법으로 응용!< tty

* `-r` 옵션은 CR같은 개행문자를 그대로 받아들인다. 



## stty

* 터미널을 관리하는 명령어다. 암호를 입력받고 싶을때 사용하면 좋다.

* `-echo` 플래그 → 출력을 끄는 옵션 (echo의 옵션도 꺼지므로 암호를 받고 다시 켜준다. (`ssty echo`)

* `state=$(stty -g)`   // 현재 터미널의 설정을 저장

* `stty raw`

* `stty $state` 		// 터미널의 상태값 설정



## dd

* 블럭 단위로 파일을 복사, 변환하는 명령어.

`$(dd bs=1 count=1)`// 1bs, 1번을 읽음. 이 경우 키보드의 입력을 받는다.

* `dd if=dev/urandom of=tmp.dat count=1024 bs=1024` urandom은 압축률이 낮은 실제 데이터처럼 동작한다. `of`는 출력파일 `bs`는 복사할 블록크기. 즉 1024 블럭을 1024회 반복





## 명령어 치환

```bash

message=`echo message.txt`  // 그레이브로 감싸면 이렇게 하면 출력값이 스트링을 대신한다.

tty=`tty`

read dir < tty

이렇게 하면 터미널에서 벌어지는 입력을들 dir로 받을 수 있다.

``` 



## tty

`/dev/ttys000`  이 경로는 터미널 가상 디바이스를 반환한다. 



## loop 에 대한 리다이렉트

```bash

while read [라인변수]; do

	[Do somthing]

done < [작업대상이 개행된 파일]

```

이렇게 하면 능동적으로 loop할 대상을 설정할 수 있다. 굳이 변수로 그걸 만들 필요 없이 바로 file to code 가능. 쉘을 쓰는 이유가 이것 아니겠어?

* cat으로 라인 변수를 받는 방법

```bash

cat [파일명] | while read [라인변수명]; do

	[Do something]

done

``` // cat을 하고 



## \033

* 문자, 백그라운드에 컬러부여하는게 가능하다.

`echo "\033[31;31m 하이여\033[0m"` 



## dialog

* 볼 수 있고 GUI 프로그래밍이 가능

* 라디오 체크박스, 인풋박스, 라디오, 파일선택 다 가능



## pv (pipe viewer)

`tar -cf file1 file2. | pv | gzip > f.tar.gz`

* pv 파이프는 진행상황을 보여주는 툴

	* -L : 파이프 초당 전송량에 리밋을 건다. 1g (이것도 좋네 혼자서 CPU쓰는건 최악이야)

	* -s : 사용할 자원의 최대치 지정 (이건 쓸만하네 너무 큰 작업을 하지 않게!)  

---

## 매개변수 확장

* 테크닉 환경변수 유무를 체크해서 초기화하기

```bash

// 변수 미선언 혹은 NULL일때 에만 기본값 지정, 위치 매개 변수 사용 가능(예: 

echo ${string:=HELLO})

```



`:{$TMPDIR:=/tmp}`



## `:`(null)

 * 콜론도 명령어다. 이걸로 초기화도 할 수 있다.

`cp file1 ${TMPDIR:=/tmp}`  이렇게 바로 인자로 쓰는 방법도 된다.



## ${var:} 추가적인 문법



```bash

	${var:?message} // var의 값을 참조하는건데 없으면 message를 보여주고 종료

	${var:+message} // var가 빈 문자가 아니면 message를 반환

```





## : (null)

: 문자는 아무것도 안한다는 것을 명시적으로 쓰는 용도로 사용가능



## "expr 변수명 : 패턴"

* `String="This is a pen"`

* `echo "$String" : "This is a \(.*\)."`

이렇게 하면 'pen'이 결과물

* expr은 패턴이 일치하면 0을 반환



## 확장치환

: 그레이브는 실행하고, 큰 따움표는 확장치환을 지원하고, 작은 따움표는 값을 그대로 표현한다. 스트링을 표현할때 최적화



## 닷 명령어 (bash 는 source도 된다)

`sh ./(쓰고 싶은 쉘)`이렇게만 하면 끝. 마치 소스에 붙인것 처럼 참조 및 수정 가능. 단 실행하는 쉘에선 부모 쉘을 참조할 수 없다.

`[ -f file] && . /env.sh`

`. ./setting.conf` 이렇게 하면 파일의 내용을 그대로 읽어 들여 쉘의 변수로 만든다.



* 문자열을 처리할때 항상 큰 따움표를 쓰는걸 습관을 들여야한다. (공백처리에 용이)

* 변수를 쓸때는 이게 빈값을 참조하고 있을 수도 있다는걸 염두해야한다.

* 중괄호참고를 통해 연속적 스트링을 표현.  "$melong haha" == "${melong} haha"

	* Bash 배열의 경우 무조건 Curly braket으로 호출해야한다.



## @curl

`curl -sO`  silent + 표준출력이 아닌 파일로 저장

굳이 내용물까지 필요없고 서비스만 확인하고 싶다면 `curl -I`를 쓴다. 헤드만 받음.

## `sed

* `-n`  옵션을 주면 기본적으로 출력을 따로 안한다. "s/some/thing/p" 마지막 인자로 p를 주면패턴을 찾았을때만 출력한다.

`branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')` -> 브랜치 이름을 받고 패턴 찾아서 그룹핑해서 파이프라인으로 이전

* `sed -n "s/<code>\(.*\)><\/code>/\1/p"` -> code 블럭 사이의 내용만 잡아서 \1로 replace

* `sed “s/\(…\)/\1-/“` 이것도 정규식이다. 3개의 문자를 그룹으로(후방참조를 위해) 그리고 \1 로호출하고 -를 붙여서 Replace

* 0001 같은 문자열을 숫자만 남기기. `$(echo “$str” | sed “s/^0*//“)`



## tr -d 

특정문자 삭제에 사용 `’\n’`



## POSIX 문자클래스

`[[blank:]]` 스페이스, 탭 같은 공백에 해당하는 문자를 칭함



## eval

쉘 스크립트를 동적으로 생성하는데 용이한 명령어. 메타프로그래밍. 보안에는 취약. 만약에 사용자로부터 입력을 받아 실행하는 코드가 있다면 공격코드를 실행하게 된다. OS Injection



## 문자열 실수 줄이기

```bash

err_coint=`grep -c "ERROR" /var/log/\`host_anme\`.log`

```

이런식의 그레이브 문자열 처리는 실수를 유발하기 쉽다

`err_count=$(grep -c "ERROR" /var/log/$(hostname).log)` 

→  서브쉘을 실행시켜 결과값을 받는 구조가 더 깨끗하다.





## Shell option

`-u ( set -o pipefail; true|false|true); echo $?`

	연결된 명령중 하나라도 false면 실패

`-e`  명령이 에러로 종료하면 종료 (if, while, untill, ||, && 같은 분기문은 예외)

`-v verbose`

`-x`  명령 시행전에 매개변수확장, 명령치환, 산술확장이 완료된 결과를 보여줌

`-f  → no glob == 와일드카드 `  표현을 사용하지 않음.



## 확장도큐먼트, HERE DOCUMENT

pure mode

```bash

cat << '__EOT__'  

$변수 //$변수 출력

\$변수 //이렇게 쓰면  \$변수

__EOT__

```



```bash

cat <<- EOT

		# 이렇게 하면 탭을 넣어도 출력값에 탭은 반영되지 않는다. 코드를 읽을땐 편하게 보고 값은 순수하게 전달!

EOT  

```



## HERE STRING

```bash

`cat <<< "안녕하세요

이런 방법도 있습니다. $hello "

```

→  이렇게 쓰면 EOT 없이도 확장표현을 처리할 수 있다.



## 절대경로실행	

`cd "$(dirname "$0")"	`	//  디렉토리까지만 반환해주는 명령어 

`cd "${0%/*}"			`	//  확장쉘을 사용하여 실행 경로의 위치로 이동



## basename 현재파일명을 이용하여 이식성 높히기

`program=$(basename "$0")`	//  이렇게 하면 어떤 프로그램을 실행했든 유연하게 이름을 받아온다.

```BASH

if [ $# -ne 1 ]; then

  echo "Usage : $program <string>" 1>&2

  exit 1

fi

echo "Start: $program, arg 1: $1, Stop: $program"

```

`program=${0$$*/}`  // 이것도 가능하다. (확장표현인듯)



* 서브쉘을 활용하면 좋은때?

	* cd 처럼 실행환경을 바꾸는 일을 회피하여 독립적 작업을 구현

	* 부모의 변수값을 호출 할 수 있으므로 독립성을 보장 (Write는 불가)



## find

`find -type [dfl]`

* -type -d  할 때 찾는 디렉토리도 숫자에 포함되므로 1을 빼서 사용한다.

`$dirCount=$(expr $count - 1 )`

* f는 일반 파일, l은 심볼릭 링크를 의미한다.



## ':' command

: > now.log

echo "" > now.log 보다 짧음!!

touch 는 이미 파일이 있을때는 time만 갱신한다. 널 커맨드가 초기화에 최적



## touch

원래 타임스탬프를 수정하기 위해 쓰는게 원래 의도. 자동으로 파일을 생성하지 않기를 원한다면 -c 플래그

```bash

*besename [-s suffix] string *

basename -s .py bear_import

```

-s 플래그: 확장자를 지운 값을 반환 받는다.



## cat > my_file

// 이렇게 하면 파일 내용을 바로 쓸 수 있게 스트림을 터미널 입력에 건다.



## tree

`tree [-L] depth [-d] [-f] path`

 * 디렉토리 구조 보기 좋은 명령어, 뎁스 및 디렉토리만 보기 지원



## mtime 이용한 파일시스템 운영

`find $dir -mtime -3` 3일 미만으로 변경된 파일만 검색 `+3` 은 3일 초과한 `3`은 3~4일



## xargs (파이프라인)

* `find $dir -mtime +364 -print | xargs ls`  이렇게 미리 어떤 명령이 실행되는지 확인해라. `rm`은 무서우니까

* `find $dir -mtime +364 -print0 | xargs -0 rm -fv`  앞에선 구분자를 null로 하여 사용한다고 하고 , `-print0`을 통해 구분자를 null로 하도록 파이프를 연결하면 하면 띄어쓰기 등으로 인한 예외를 처리할 수 있다.

* xargs는 넘겨 받은 명령들을 운영체제에서 지정한 명령행 인수의 상한값 (`getconf ARG_MAX`) 을 넘지 않도록 알아서 나눠서 실행하는 좋은 녀석이다. `find ... -print | xargs grep "ERROR" /dev/null` 이렇게 하면 find의 결과물 내용이 길어서 에러가 나는 문제(`Argument list too long`)를 피할 수 있다. 여기서 `dev/null`이 있는건 그랩이 늘 복수개를 대상으로 실행함으로서 결과에 파일명이 나오게 하기 위함이다. (이거 좋다야). zsh에선 항상 파일이름이 표시되네



## date

* $( ) 명령어 치환 `$(date '+%Y%m%d%H%M.%S')` 이렇 포맷으로 쓰면된다.

* 말일을 판단하기. 아래 쉘을 매일 실행하도록 cron에 등록하면 된다.

```bash

tomorrow=$(date "+%d" -d '1 day')

// -d [날짜 지정] 는 보고 날짜를 출력한다. 

if [ "$tommorow" = "01" ]; then

// 이렇게 활용하면 오늘 날짜가 월말일인지 아닌지 알 수 있다.

```

* date를 이용하여 두 날짜의 차이를 구하는 것, 30 days ago 대신 -1 month ago 를 사용해 저번달에 해당하는 날짜를 정확히 고르는것도 가능하다.



## rsync

* 디렉토리의 내용을 다른 장소와 일치시키는 명령어다. 증분방식으로 작업을 하고 타임스탬프와 소유, 퍼미션을 그대로 유지하고 원격에서도 된다. 정말 유용한 명령어

* `-v --verbose` `-a --archieve` → 메타데이터 동일하게 `-n --dryrun` 테스트용 예행실행

* 명령어를 지정할때 `rsync -av path/log/ /target/ `이라 쓰면 log 디렉토리는 복사하지 않고 내용물만 복사한다. 주의~ 디렉토리를 복사하고 싶지 않다면 디렉토리를 지정해라. 

* 원격지에 하고 싶다면 목적지 경로 앞에 `사용자명@호스트명:/TargetPath` 

* 복사만 하고 원본에서 지워진 파일은 지우지를 않는다. 지우고 싶다면 `--delete` 옵션



## tar

* 로컬에 파일을 압축해서 넘겨주는게 아니라 바로 압축파일을 넘겨주고 싶을때가 생길것이다. (1테라 10테라 짜리를 압축해서 전송한다고 생각해보자 비용이 장난이 아니다) 유연하게 작동하게 만들기 위해 다른 호스트에 파이프라인을 꼽고 파일을 쓰는 방법을 쓰면 된다.

`tar cvfz - myapp/log | ssh {$user}@{server} "cat > /backup/myapplog.tar"`

1. `-` 옵션은 표준출력에 'tar 아카이브'를 출력하도록 한다.

2. 아카이브가 화면에 출력되는건 목적이 아니니까. cat으로 리다이렉트 한다.

3. 파일이 써진다!

반대로 원격의 압축을 로컬에서 풀고 싶다면?

`ssh {$user}@{server} "cat > /backup/myapplog.tar" | tar xvfz - ` 

* `--exclude` 옵션을 이용해 원하지 않는 이름, 디렉토리를 제외할 수 있다. 리스트에서 제외하고 싶다면 `-X`을 사용해 파일을 지정해주면 된다. 

* `tar rvf $archieveFile $targetFile`  -r (append) 를 이용해 기존 아카이브에 파일을 추가할 수 있다.

```diff
+ 아카이브 파일이 없으면 에러 안내고 생성하므로 주의)
```




## zip

`zip -e -r log.zip log` 

* -e 옵션으로 인해 패스를 묻게된다. `tar.gz` 가 암호를 지원하지 않는다. zip은 윈도우와도 바로 통신이 되니 굳. 암호도 호환된다. 



## gizp, bzip2

* 용량을 더 확보하고 싶을땐 이런걸 쓴다.

`tar cf - log | gzip -9 -c > archive.tar.gz`   중간 과정을 생략하고 아카이브 + 압축

옵션을 매번 주는게 귀찮으면  `GZIP='-9'; export GZIP`



## cp

* 그냥 하면 TimeStamp, Permission 이 명령어를 쓰는 유저의 umask 기준으로 바뀐다. 유지하고 싶다면 `-a` 옵션을 주면 된다.

* `-R --recursive` `-p --preserve` 파일속성유지

* `-L link` 심볼링 링크를 실제로 복사하고 싶을때

	* 메타데이터를 유지하고 싶어도 유지못할땐 사용자의 정보로 대체된다. (root파일을 일반유저가 복사했다면)



## time

`time -p cp file1 file2`

이렇게 하면 시간을 측정할 수 있다. `-p`단순히 초만 표시

* **CPU처리** 시간은 user + sys

* **IO 대기** 시간은 real - (user + sys)









## umask

* umask 값은 계정마다 설정할 수 있으며, root의 umask는 /etc/profile에서 설정

* 권한은 초기 값은 파일은 666, 디렉토리는 777인데 `umask`를 빼면 실제 파일의 기본값이 된다. umask가 0002 라면 파일은 664 그룹외 리드,  디렉토리는 775 그룹외 리드 및 실행 



## comm

* diff 같이 파일을 비교하고 싶을때 사용

* 1열에 출력되면 첫번째 파일, 2열은 두번쨰 파일, 3열은 같을때 출력된다.



## du

`du -sm ${data-dir}/*/ | sort -rn`

* mega kilo 단위로 하면 솔트가 가능하다. h 옵션은 솔트가 안됨

* `-s` 서브디렉토리를 어디까지 보는지 지정한다. `/*/` 했으니 아랫쪽에   



## sort

`-r` 사용량이 많은것부터 정렬한다.

`-n` 숫자로 문자열 정렬



## strings

* 스크립트 언어로 작성된 에러메시지는 바로 grep 이 가능하지만 컴파일된 바이너리는 검색이 불가능하다. 이때 strings를 사용한다. 파일에서 문자열을 출력하는 명령어를 찾아낼 수 있다. 

`strings -ff /home/user1/myapp/bin/* | grep "$message"`

* `-f` 결과값을 출력할때 파일명도 같이 출력



## od hexdump

* od는 아스키 문자열로 바꿔서 바로 보여주고

* hexdump는 헥사값만 보여주는데 `-c`로 아스키 문자열도 볼 수 있게 할 수도 있다.

* 프로그램이 동적으로 에러 메시지를 출력할때는 바이너리 파일을 찾을 수 없다.  





## 이중실행을 염두한 파일네이밍

`tmpfile="tmp.$$"`

이렇게 매번 실행할때 마다 자기만의 파일을 가지고

sleep 하고 rm -f $tmpfile 하면 된다.

`mktemp` 명령어가 이걸 하기 위해 만들어진 명령어



## sed

* 심볼릭 링크를 수정할때를 대비해서 옵션이 있음. 그래서 심볼릭링크를 쫒아가서 작업을 할거냐 그냥 안할거냐 구분이 가능 (그런데 이걸 어디에 쓰나)



## 유닉스타임에 대해

* unix time이라 부르는거 정식으로는 epoch라고 부른다.

* 정수기 때문에 빼고 초로 나누면 날짜의 차이를 구할 수 있다.

`day1_epoch=date -d "$day1" '+%s'`  일반적으로 쓰는 시간에서 epoch를 뽑아내는 방법

---

# 네트워크

## route

`Gateway=$(route -n | awk '$1 == "0.0.0.0" {print $2})'`

* `-n`은 호스트네임 대신 IP를 쓰도록 한다.  

* 컬럼 0.0.0.0의 두번째 칼럼을 추출하는 명령어

* 이렇게 뽑아낸 게이트웨이에 `ping -c`을 보내고 $? 으로 반환값을 검사하면 된다.

	* `-c [numb]` 에 인자값을 안주면 딱 한번만 보내게 한다. (중요함. 쉘 무한실행 방지)



## arp

`arp -an | awk “/\($target_ip\)/ {print \$4}”)` → 지정한 ip에 대해 MAC을 얻는다. 이제 타겟 IP, MAC 을 echo로 출력하면 깔끔하게 맥을 얻는 명령어 마냥 동작한다. arp -an | grep ip 로 해도 비슷할듯.

## host

* 입력한 호스트이름에 대해 DNS반환하는 IP 주소를 모두 보여준다. 하나의 도메인에 대해 여러 서버가 서비스하는 경우가 많다보니 그걸 고려한 명령어. (DNS에 질의 하는 명령어 이므로 `/etc/host` 파일의 내용을 무시하는 점을 주의)

```

host ($target_host) | \ 

awk '/has address/ {print $NF, “IPv4”} \

/has IPv6 address/ {print $NF, “IPv4”}’

```

* $NF 는 마지막 칼럼을 참조한다.  Result: 한 호스트 네임을 서비스하는 모든 IP를 출력한다.

* IP를 입력하면 호스트 네임을 반환한다. 따라서 IP 리스트가 담긴 파일을 넘겨주고 호스트네임을 달아주는 작업도 가능하다. 

* `[리스트] | revlookup.sh` 

```revlookup.sh

while read ipadd

  revlookup=$(host "$ipadd")

  if [ -$? -eq 0 ]; then

    echo "$revlookup" | awk '{print $NF}' | sed 's/\.$//'

// \.$ 온점을 캐치하는 패턴이다. host 마지막 컬럼에 . 이 있는걸 제거하기 위해 사용

```



## nc

* 서버의 개방 포트 점검 스크립트

점검할 Port 리스트를 준비해놓고 

`while port in 80 2777 3000`

`nc -w 5 -z $ipaddr $port` 이렇게 처리하면 포트의 개방 체크

`-w` 는 응답없음에 대해 타임아웃 `-z`은 핸드쉐이크만 하고 실제 통신을 하지 않는 옵션이다.

* 간이 TCP 서비스 열어서 서비스가 동작을 흉내내기

`nc -v -k -l $PORT`

`—-verbose`, `-k`는 상태를 계속 유지하겠다는 플래그 `-l`은 듣기 플래그



## FTP

* ftp 동작을 스크립트로 하기. `ftp -n $server” << _***EOT******` 가 핵심. 히어 도큐먼트로 `user "$user" "$passwd"`  `binary` `get "$file"` 등등 쓰고 싶은 명령어를 쭉쭉쓰다가 `******EOT***_`를 해주면 된다. 

* 이런 시크릿을 담은 스크립트는 700 권한으로 관리한다.



## 통신연결 성능 테스트

* `wget “ftp://<user>:<pw>@<host>/<path>”`

* `curl -u “<user>:<pw> -0 “ftp://<host>/<path>”` 

* `time -p ftp -n <server>` 를 이용해 시간을 측정하고 `expr` 명령어로 계산하는 방법도 있지만 wget, curl 에는 전송결과를 요약해주는 기능이 있어서 활용하면 좋다.



## ssh

* 원격에 로컬 스크립트를 실행시키기

```

cat $scirpt | ssh ${username}@${ipAdd} "sh"

//...(반복), 또는 while로 처리할 수도 있겠지

```

* 위와 같은 실행방법은 비인터렉티브 셸이다. 



---

# 문자열처리

## rev (reverse)

리스트를 끝 문자로 정렬한다. 

## env

* 환경 변수를 키=밸류 형식으로 출력한다.

`env | cut -f 1 -d "=" > env.lst`

구분자를 ‘=‘으로 지정해 구부낳고 `-f`는 추출할 칼럼의 번호를 지정하기 위해 사용된다. 

`grep -q “^${env_name}$”  env.lst` 의 ExitCode 를 검사해서 리스트를 검사한다. 환경변수가 똑바로 있다면 원하는 작업을 실행하도록 스크립트를 짜면된다.

## head ←→ tail

* `head -n 1 “$1”` 을 이용해 첫줄을 읽고 `case $headline in` 을 이용하여 분기하여 작업한다. 

* 확장자가 없는 파일을 읽어서 확장자를 붙이는 작업을 셔벙(Shebang)이라고 한다.  굳이 이렇게 분기를 하지 않고 `file`명령어를 사용해 구분하는 방법도 있다.



## `tail

```

tail -F -n 0 $logfile \| 

while read line

do

  case "$line" in

   *"File Not Fount"*) // 이렇게 케이스를 잡아서 처리할 수 있다. 

```

* 실시간으로 파일을 감시하면서 스탠다드 아웃풋을 read하는게 핵심포인트

* `-F`는 파일명 변경과 로테이션도 감시한다.  (로테이션을 해서 application .log.1 이 되어도 계속 작동)







## md5sum

* `echo -n “$line | md5sum | awk ‘{print $1}’ >> $tmpFile`

해시값을 만들고 그중에 첫번째 컬럼 값을 저장하는 스크립트

* 엑셀같은 문서는 stat 타임스탬프값을 가지고 있어서 열어보기만 해도 해시값이 변한다. 변하지 않는것도 있다.



## paste

* 두개의 텍스트 파일을 횡으로 연결하는 명령어, `-d` 옵션은 CSV 로 저장하도록 한다. (디폴트는 tab구분자)

## cut

* while 로 라인을 돌면서 `cut -f 1 -d ','`   `-f 2`  `-f 3`  이렇게 하면 CSV를 간단하게 다룰 수 있다.

	* 다만 구분자가 값으로 들어올 수 있는 경우라면 사용할 수 없다. 

## while

* CSV를 다룰때 자주 쓰는 패턴

```

while IFS=, data1 data2 data3

do

  ...(중략)

fi

done < "$csvfile

```



## `awk

```

awk -F, ‘{sum += $3} END {print sum / NR}’ "$1" > ${filename}.avg

```

* `-F` 옵션(구분자)는 바로 이렇게 넣어도 되고 쉼표로 입력해도 된다.

* `{code that exec each line} END {code that exec at last}` 표현이 awk출력을 좌우하게 된다. 

	* 추출하는 값의 좌우의 공백을 없앨때도 자주 활용가능하다.

* `df -P awk ‘NR >=2 {print $5,$6}’`  ->  첫번째 줄을 무시하는 패턴

* BSD, Mac의 `devfs`, `map`은 항상 사용률이 100%다. 이런 디바이스는 제외한다.



## `vmstat

* 메모리 상태를 확인하기 위해 사용 `vmstat 1 3 ` 1 초 마다 3회 측정

## `mpstatl

* 시피유 상태를 확인. %idle을 기준으로 부족한것을 탐지하면 된다. 결과값의 AVERAGE만 신경 쓰면 됨. vmstat과 포맷은 비슷함.

* `echo “1.1 > 2.5” | bc` 이렇게 하면 0 , 등식이 틀리면 1 출력

* 맥은 `iostat 을 사용한다.

예시: ` iostat -xd`

설명:  `lsblk` 디바이스 이름 조회, `SHR` 리눅스 공유라이브러리

, `VMG` 가상메모리, `RES` 실제 물리 메모리



## `cmp

`cmp -s $newfile $oldfile`  -> 0 이면 동일, 1이면 차이 존재 

*  웹의 동적인 변경을 감시하고자 할떄 이걸 주기적으로 실행하면 된다.







## Useful code snippet - 최고 높은 값 기준 추출하기

`max=$(awk -F, ‘{print $3}’ “$csvfile” | sort -nr | head -n 1)`

like this, CALC max point

`markprint $(expr $GRAPH_WIDTH \* $score/$max)`

Deginate numb of * by func arg as 

```markprint

  do

    echo -n "*" // -n 옵션은 개행을 하지 않는다.

    i=$(expr $i +1)

  done

```



* Useful Code Snippet - 컬럼 위치를 바꾸기

`awk '{print $4, $5, $1}' "$1" > "{1}.lst"`

	* 	$1 : target list

	* {$1} : first Column in CSVps 



* Useful Code Snippet - 특정 값만 취득하기

`awk '$(NF-1)=404 {print $7}' "$logfile" > "{logfile}.404"` 

	* { } -> 액션, *액션값 앞에는 조건식이 올 수 있다.*





* grep -v , except grep like vgrep

* grep -c 라인당 해당 패턴을 한번씩 카운트, 못찾으면 1반환

* [ -n ] null 이 아니면 참 

* `grep ‘^[0-9]\{7\}$’ ` -> 숫자 7자리. 이런식으로 정규식을 쓸 수도 있구나.

* 



## unique

`sort | unique -c | sort -nr`

`asd`

---



### ID 끝 문자 숫자로 목록 정렬

`rev “$1” | sort | rev > $tmpfile`

### rev

문자열의 숫자를 반전시켜 출력. 뒤에서 있는 정보를 기준으로 처리하고 싶을때 사용.

### file

매직 사전이라는게 있는데 이걸 보고 파일의 종류를 판별해주는 명령어

### paste -d

파일을 횡방향으로 연결



## printf

1. 몇칸을 차지할지 정렬을 어디로 할지 지정 가능

`var=$(printf "$UR_tpl" $i)` 이렇게 해놓고. i는 `for i in $(seq 10)` 하면 필요한 URL을 양산 해낼 수 있다. `%03d`같은 문자열은 `$i`으로 치환된다. 맥이나 BSD에선 `jot`를 쓴다.



# MYSQL

## mysqldump

mySQL을 쓴다면 이렇게 내장명령어도 오니까 이걸로 주기적으로 크론 잡을 만들어 쓰고 만들어진 덤프는 지우도록 한다. 이때 실행할 계정에 mysql 권한이 있는지 본다. 이런 스크립트 비번을 넣게되는건 주의. 스크립트가 담긴 디렉토리를 볼 수 없게 해놔야한다.

* mySQL 레플리케이션을 감시하는 명령어 `MYSQL -h {host} -u {user} -p {pwd} -e “SHOW SLAVE STATUS \G” 이렇게 ` 해놓고 받은 값을 awk 로 편집해서 출력한다.

* sql 문을 짜놓고 필요할때 마다 쿼리를 해놓고 csv로 저장할 수도 있다.

`MYSQL .... -D {DBNAME} -N < "$sqlfile" | tr "\t" ","> "${path}/data.csv`

이때 `-N`은 커러럼을 표시하지 않는 플래그 “\t” 을 “,”쉼표로 바꾸는 것도 포인트

`SELECT id FROM user info ORDER BY substring(id, -1, 1);`

* 마지막 글자를 자르는 함수



---



# bash 전용

## 시그널

* bash 전용 시그널도 있다. 참고

## declare

* 쉘스크립트엔 자료형이 없다. 이 문제를 해결하게 해준다. 

`declare -i count=0` 으로 정의하고 `declare -p count` 참조 정의한 함수 이름도 참조할 수 있다. -f

$을 붙이지 않아도 되고 +=1 같은 것도 동작한다. 



## bash vs sh

* CentOS는 /bin/sh 가 bash를 참조하지만 햇갈릴 수 있다. `#!/bin/bash`로 하자. 

* 굳이 bash만으로 할 필욘없다. 파이선도 좋다.



## 브레이스 확장

* `for ip in 192.168.2.{1..5}` 이렇게 쓰면 된다. 파이선 range() 가 생각나네. 더 간편하다.



## 산술확장

`for i in {1..100}`  &  `echo $((i*3))) > ${i}.txt`

이 확장식 안에선 사칙연산, 나눗셈, 나머지, 제곱, 시프트 연산을 지원한다. 

`$(expr $i \* $i) `가 sh 에서 산술 계산방법이라면

` $((i * i))` bash의 산술확장을 이용한 방법

## 산술평가

`((i++))` 이렇게 써버리면 굉장히 깔끔해진다.

## 문자열

`[“${id:0:2}” = “AC”]` 이렇게 문자열을 자를 수 있다. 편해.. ${변수명:오프셋:문자수} , 문자수가 없으면 전부를 취한다. 이안에서 산술연산도 할 수 있다. `{id:num+2:2}`

`#id`로 len을 받을 수 있다.

* `echo $[id:${#id}-1}` 마지막 글자만 추출.

## 문자열 내부를 치환

sed 없이 바로 할 수도 있다.`${변수명/패턴/치환문자열}` 마지막에 일치하는 것만 바꾼다. `${변수명//패턴/치환문자열}`  모든 매치를 바꾼다. ==`s/패턴/치환/g`

(정규식과 비슷하지만)패턴을 쓸때 * ? 다 사용된다. 첫글자를 표현할때는 ^ 대신 `#` 을 쓴다. 끝짜리는  $대신 /%를 쓴다.



## 프로세스 치환

`명령어 < (명령어2) 

이렇게 하면 중간에 파일로 쓰지 않고 명령어로 넘겨줄 수 있다.

instead of `ls $dir > dir1.tmp; $dir2 > dir2.tmp; comm dir1.tmp dir1.tmp` 

use this `comm <(ls “$dir1”) <(ls “$dir2”)`

이 때 <() 이렇게 붙여써야 치환표기법이 동작한다. 스페이스 있으면 에러. 

`my_calc>(cat -n)` 출력을 연결 할 수도 있다.



## 종료 스테이터스

sh 에서는 파이프라인 중간의 종료스테이터스를 알 수 없었다.

`PIPESTATUS`는 이걸 알 수 있게 해준다. ${PIPESTATUS[0]} 이렇게 첫번째 결과부터 조회 할 수 있다. 

물론 $?과 마찬가지로 다른 명령어하지말고 바로 써야한다. echo만 해도 바로 사라진다.

`pipe_status=(“${PIPESTATUS[@]}”)` 이렇게 저장하고 쓰자.



## 간단한 메뉴 표시로 사용자가 선택할 수 있게 하기

```

select 변수 in 리스트

do 

 cmd

done

```

배쉬로 하면 인터렉티브를 편하게 짤 수 있다.

## 정수 난수 얻기 `RANDOM

* `RANDOM %10 +1`  이렇게 하면 1~10까지 얻을 수 있다.

* `RANDOM`은 1~32767 정수를 돌려준다. 



## bash 고유 변수

BASH - 실행 시점의 전체 경로

DIRSTACK

SHELLOPTS - 유효한 셀 옵션

SECONDS - 실행시간

HOSTNAME

UID

GROUPS

더 궁금하면 `man bash`로 확인



## 터미널

echo “hello” > /dev/pts/1 이런 명령을 통햄다른 터미널에 아웃풋을 전달한다.

`--color `이런 옵션을 롱옵션이라고 부른다. 유닉스에는 없다.

`-n 2` 이런 지정방식에서 2를 옵션 인수라고 한다.

파일 이름이 하이픈으로 시작할땐 `-- -sample` 이렇게 쓰면 된다.

## 컨벤션

상수는 대문자. 변수는 소문자, 환경변수는 대문자. 카멜보단 스네이크를 쓴다. 

경로 마지막에 `/`를 넣고 안넣느냐는 실제 영향이 없다. 다만 넣지 않아야 다른 경로 표현식과 합칠때 겹치지 않는다.

## cron

맥에선 launchd를 사용한다.

## 바이너리 설치

```

tar xvzf pv-1.4.tar.gz

./configure

make

su 

make install

```

기본 경로는 /usr/local



## SET

-u nil 참조 종료

-e 종료

-x 디버그 

-n 검증