# 🐍Python lang

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

* args -> [] 명령행에 문자열 혹은 입력될 인자들을 공백으로 자른 결과를 넣는다. eg. If u want use next command `rsync -l ~~a`  then insert  `['rsync', ‘~~l’, '-a’]` args



## a

`rsync [File Name] [User]@[IP Address]:[Path]`



## argparse

* like SHELL getups, it provide API that controlling args.

* 

## 파일 시스템 순회

```python

for (root, dirnames, filenames) in os.walk(export_path):

```




---

#Devops*language*python

