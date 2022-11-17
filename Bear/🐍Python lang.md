# 🐍Python lang

#Devops/language/python

---





## 문자열

* `index` 메서드는 못찾으면 에러. -1을 뱉는건 `find`

#### 파이선 함수이름 출력하기

```

def ilaya1():

    current_func_name = sys._getframe().f_code.co_name

    print ("The current running function name : {}".format(current_func_name))

```





## pyenv 사용

* 가상환경을 이동하면서 디펜던시 관리가능해짐

* pyenv로 설치할것!

* `pyenv versions` 현재 관리중인 버전들 확인

* `pyenv global [V]`으로 버전 선택



`pyenv virtualenv test***env***08` 글로벌 버전으로 환경 생성

`pyenv virtualenv 3.5.3 test***env***08_3.5.3` → 버전 지정

`pyenv shell test***env***08` --> pyenv 활성화



pip list 해보면 해당 환경에 대한 패키지 정보가 하나도 없는걸 확인가능



## 의존성 저장 및 구현

```

pip3 freeze > requirements.txt

pip3 install -r requirements.txt

```



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





## 내장함수. 

`IO == Iterable Object`

* all(IO)

* abs

* any(IO)

* bin(x, /) -> 정수를 “0b” 가 앞에 붙은 이진 문자열로 변환합니다.

* bool(x=False, /) -> Return a Boolean value, i.e. one of True or False

* callable -> `_***call***_`메서드를 구현한 객체에 한해 답을 받는다. 

* chr(유니코드정수)

* ord(문자) -> 유니코드정수

* dict

* dir(object) -> 오브젝트가 가진 메서드 리스트를 보여줌. 오브젝트 없으면 현재 스코프 메서드를 보여줌

* divmod -> 나눈값과 MOD 값을 가진 튜플 반환

* enumerate(iterable, start=0)

* eval 간단한 값 평가 (쉘과 비슷)

* len

* list

* map

* max (IO) , min(IO)

* type

* str 캐스트 용도

* round()

* sorted() NlogN = O 복잡도 

* range(start, end, numb)

* in



## 논리연산자의 특징

###### 파이선의 Truthy 기준

1. `_***bool***_` 메서드에 대한 호출이 최우선

2. 그렇지 않다면 `_***len***_`메서드에 대한 답이 nonzero면 True, 아니면 False

3. 둘다 구현되어 있지 않다면 True, 



###### Falsy

```

	•	False None

	•	0, 0.0, 0L, 0j

	•	""	[]	()	{}

```



###### 파이선은 비교연산할때 참조하는 마지막 값을 반환(return)한다.

`a = Truthy1 == Truthy2` // a -> Truthy2

`a = Truthy1 or Truthy2` // a -> Truthy1





## 자료형

### dict

`dict(‘x’:’1’, ‘y’:’2’)` 의 형태로 선언

### tuple

`()`

### list

`[]`

List comprehension 리스트 내포 문법

* `리스트 명 = [표현식 for 변수 in 반복 가능한 대상 if 조건문]`

* 실제 사용예

```python

numbers = range(1,4)

[num * 3 for num in a]

```



---



공부할 키워드

@classmethod



---



## 패킹

```python

def func(*args):

      print(args)

		print(type(args)

(1, 2, 3, 4, 5, 6, 'a', 'b')

<class 'tuple'>

```

튜플을 만드는 패킹도 되고 funcName(x=1, y=2, *args) 이런 구조로 쓰면 iterable한 클래스로 인자를 만들어서 호출 할 수 있다.



funcName(**args): 이렇게 쓰면 이건 **키워드인자패킹**으로 딕셔너리가 생성된다.





파이선 함수 인자에 대한 정리

```

위치로 매칭하는 방법

func('py', 'thon')

키워드로 매칭하는 방법

func(b='thon', a='py')

```



## 언패킹

` sum(*numbers)` 패킹할때와 반대로 이제는 풀어서쓴다. 이렇게 하면 numbers라는 클래스가 아니라 각 값을 가지는 INT들이 sum의 인자로 들어간다. 키워드 인자에 할당을 하고 싶으면

```python	

dictArgs={‘a’:1,’b’:2} 

sum(**dictArgs)

``` 

이렇게 하면 된다. 





## ljust, center, rjust

String의 메서드로서 stirngs.ljust(int) 이렇게 해주면 int값 만큼 공백패딩을 넣어준다.



## 파이선 상수

```

import string 



string.ascii_lowercase *# 소문자 abcdefghijklmnopqrstuvwxyz*

string.ascii_uppercase *# 대문자 ABCDEFGHIJKLMNOPQRSTUVWXYZ*

string.ascii_letters *# 대소문자 모두 abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ*

string.digits *# 숫자 0123456789*

string.punctuation

string.whitespace #This includes the characters space, tab, linefeed, return, formfeed, and vertical tab.

```



## 딥카피

`copy.deepcopy` 를 사용하거나 

```python

copiedArr = copy.deepcopy(originalArr)

copiedArr = [i for i in originalArr]

copiedArr.sort() 

```

이렇게 할 수도 있지만

`copiedArr = sorted(originalArr)`해도 정렬된 값을 얻을 수 있다.





## 행렬 뒤집기

```

newList = list(map(list, zip(*mylist)))

# zip은 받는 iterable 인자들을 묶어서 튜플을 만들어준다.

```

```

for x,y,z in zip(xList, yList, zList):

	print(x,y,z)

# zip으로 만들어진 튜플을 바로 iterate

dict(zip(list, list2)) # 이렇게 하면 DICT 쉽게 정의할 수있다.

```



## map 함수

**map(function, iterable)**

* 자바스크립트에서 맵이랑 비슷하네. 순회하면서 함수적용한 이터레이블 객체 반환.

* `lambda x: x * 2` 함수 자리에 람다를 넣으면 완성



## 파이선을 파이선답게 강의

* 내장함수, comprehension을 이용해 파이선에서만 가능한 패턴으로 코드를 짠다.



## join

```

my_list = [‘1’, ‘100’, ’33’]

answer = ‘’.join(my_list)

```





## 곱집합을 만들고 싶을때 (모든 엘리먼츠를 하나씩 가지는 모든 경우의 수 생성)

```

import itertools



iterable1 = ‘ABCD’

iterable2 = ‘xy’

iterable3 = ‘1234’

print(list(itertools.product(iterable1, iterable2, iterable3)))

```



* 리스트 합치는 방법

	* [1,2,3] + [4,5,6]

	* sum(a, b)

```

import itertools

list(itertools.chain.from_iterable(my_list))

```

	* [ele for array in my_list for ele in array]

```

from functools import reduce

list(reduce(lambda x, y: x+y, my_list))

# JS에 있는 리듀스 함수를 이용하여 결과물을 거듭하여 더 할 수 있다.

```



	* 방법 7 - numpy 라이브러리의 flatten 이용*

```

import numpy as np

np.array(my_list).flatten().tolist()

# _score.js에 있던 flatten 과 유사.	

```



## 순열 조합 만들기

```

pool = ['A', 'B', 'C']

print(list(map(''.join, itertools.permutations(pool)))) # 3개의 원소로 순열 만들기

print(list(map(''.join, itertools.permutations(pool, 2)))) # 2개의 원소로 순열 만들기

```

각자 다르다. 

* 순열 permutations

* 조합 with 순서 X combinations

* 중복순열 `list(product(dataset, repeat = 2))`

* 중복순열 with 순서 X `list(combinations***with***replacement(dataset, 3))`







## 가장 많이 등장하는 숫자 카운트

```not pythonic

my_list = [1, 2, 3, 4, 5, 6, 7, 8, 7, 9, 1, 2, 3]

answer = {}

for number in my_list:

    try:

        answer[number] += 1 # 굳이 초기화를 시켜주는 값을 넣지 않아도 except로 잡아서 설정할 수도 있구나.

    except KeyError:

        answer[number] = 1



```





```pythonic

import collections

my_list = [1, 2, 3, 4, 5, 6, 7, 8, 7, 9, 1, 2, 3, 3, 5, 2, 6, 8, 9, 0, 1, 1, 4, 7, 0]

answer = collections.Counter(my_list)



print(answer[1]) # = 4

print(answer[3])  # = 3

print(answer[100]) # = 0

```

answer = collections.Counter(my_list)

answer[1] => 갯수 반환





## 분해할당을 이용한 SWAP

a = 3

b = ‘abc’



a, b = b, a *# 참 쉽죠?*

안되는게 없는 애네 파이선



## 이진탐색 알고리즘

```

import bisect

mylist = [1, 2, 3, 7, 9, 11, 33]

print(bisect.bisect(mylist, 3))

```

두번째 인자의 값의 위치를 찾는 이진탐색. 오른정렬된 데이터에 유효.



## _***str***_

print로 호출할때 출력할 데이터를 정하는 클래스의 내부 메서드. 이미 구현되어 있고 다른 포맷으로 보이기를 원하면 오버라이딩하면 된다 .

* 클래스 정보를 출력하기 위해 외부에서 `print***class`이런 함수는 만들고 클래스로 인자로 받기보다는 미리 클래스에서 `******str***_ `을 구현해놓고 그냥 print(class) 하면 호출에 일관되게 응답한다.



## 파이선 연산 

**//**

나누기 연산 후 소수점 이하의 수를 버리고, 정수 부분의 수만 구함



파이선에서 비교 연산을 할 때 데이터가 아주 큰 경우, 정상 작동하지 않을 수 있습니다. 

`float(inf)` inf를 정의하면 어떤 숫자와 비교해도 무조건 크다고 판정됩니다.

```

min_val = float(‘inf’)

min_val > 10000000000 → True

```





## 시퀀스 ( 리스트 같은 애들)를 뒤집는 reversed 함수