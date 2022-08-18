# 🐍Python lang

#Devops/language/python

---



#### 파이선 함수이름 출력하기

```

def ilaya1():

    current_func_name = sys._getframe().f_code.co_name

    print ("The current running function name : {}".format(current_func_name))

```





## pyenv global 3.10.1

* 가상환경을 이동하면서 디펜던시 관리가능해짐

* pyenv로 설치할것!

* `pyenv versions` 현재 관리중인 버전들 확인



## Django Install

```

python -m pip install Django

python -m pip install rest_framework

```



## @ 데코레이션

* 함수를 인자로 받아 클로져처럼 동작하게 만든다. 사용자가 정의해서 사용할 수도 있다.

* 함수 성능측정 같은데 쓰면 좋지 `@perf_test`



## subprocesscall

`subprocess.call(args, *, stdin=None, stdout=None, stderr=None, shell=False, timeout=None)`

* args -> [] 명령행에 문자열 혹은 입력될 인자들을 공백으로 자른 결과를 넣는다. eg. If u want use next command `rsync -l -a`  then insert  `['rsync', ‘-l’, '-a’]` args



## resend

`rsync [File Name] [User]@[IP Address]:[Path]`



## argparse

* like SHELL getups, it provide API that controlling args.

* 

## 파일 시스템 순회

```python

for (root, dirnames, filenames) in os.walk(export_path):

```



## 기본적인 파이선 컨트롤

- python —version      버전확인

- pip3      3버전으로 프로그램 실행

- python3     CLI 실행모드

- Ctrl + D 종료     CLI 모드종

- - - - - - -



`source myvenv/bin/activate` VituralEnv 활성화

`deactivate`  → 버츄얼 환경 비활성화

`cdvirtualenv` →  가상환경 변경 

`wipeenv` → 현재 가상환경 서드파티 지우기

`rmvirtualenv` →  가상환경삭제



## virtualenv

`sudo pip install virtualenv`

`source venv/bin/activate`



## Django setting

```

python3 manage.py runserver

python3 manage.py makemigrations

python3 manage.py migrate  

```

* 가상환경때문에 IDE에러 뜨는건 실행환경을 등록해주면 됨;

* 깔려있는 패키지 위치 확인

```

python -m site

which python3

```



## pip

pip install —upgrade pip



## 플라스크 flask

JUST RUN

```

FLASK_APP=hello.py flask run

```

현재 위치 일기

`filename = os.getcwd() + “/title-image-example.jpg”` 



`_***dir***_`로 현재 PATH 획득





## 백그라운드 실행 (with log)

```

nohup python3 app.py production > app.log &   (에러출력이 터미널이 아닌 파일에 찍히는점 주의)

netstat -ntlp | grep :8000      (포트점유 확인)

tail -f app.log   (로그 확인)

```





## iterate 하다보면 궁금한것들

```python



enumerate_letters = enumerate(['A', 'B', 'C'])

>>> next(enumerate_letters)



list(enumerate([‘A’, ‘B’, ‘C’]))

>>> [(0, ‘A’), (1, ‘B’), (2, ‘C’)]

```



---