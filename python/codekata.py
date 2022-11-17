# if __name__ == '__main__':
  # make_negative(-1)
  # print("make_negative(-1)", make_negative(-1))
  # print("make_negative(-1)", make_negative(0))
  # print("make_negative(-1)", make_negative(1))

# def grow(arr):
#     result = 1
#     for index, v in enumerate(arr):
#         if type(v) is "array":
#             v = grow(v)
#         result *= v
#     return result

# def hi(year):
#     return (year % 100)


# def is_palindrome(s):
#   char1 = []
#   char2 = []
#   list = []
#   list[:0] = s
#   while (len(list)>=2):
#     char1 = list.pop(0)
#     char2 = list.pop(-1)
#     if (char1.capitalize() == char2.capitalize()):
#       continue
#     else:
#       return False
#   return True

from __future__ import annotations


def is_palindrome(s):
  print(s[::-1], "P!")
  # extended string 표현. 건너뛰거나 탐색 방향을 결정할 수 있는 세번째 인자. [::2]를 하면 024.. 을 반환 
  # 즉 거꾸로한 값을 얻을 수 있다. 그리고 한번에 비교하면 된다.
  # 팬린드럼은 거꾸로 해서 비교해도 같은 값이 나온다는 특성을 활용한 풀이
  s = s.lower()
  return s == s[::-1]
  # 이렇게 슬라이스하면 스트링을 반환한다.

print(is_palindrome("abcd"))

def test(arr):
  result = 0
  for x in arr:
    result += x
  return result

def sum_machine(arr):
  return sum(arr)

print(sum_machine([1,2,3]))

def format(name):
  return f'hello {name} this is logos'

print(format("jade"))

def positive_sum(arr):
  return sum(x for x in arr if x > 0)
  # return sum(x for x in arr if x > 0)
  # sum 함수를 이렇게 호출하면 조건식에 맞는걸 뱉어준다고 생각하면 될것 같다.  

print(positive_sum([10,1,2,3,-16]))

print(dir()) #['__annotations__', '__builtins__', '__cached__', '__doc__', '__file__', '__loader__', '__name__', '__package__', '__spec__', 'format', 'is_palindrome', 'positive_sum', 'sum_machine', 'test']

print(divmod(10,3))

resultValue = 0
for x in filter(lambda x: x > 0, [1,2,3,-1,-2,-3]):
  resultValue += x

print("resultValue", resultValue)


def square(numbers):
  return sum(x ** 2 for x in numbers)
  # ** mean power
  # exceute // for x in numbers 이렇게 도치적인 상용이 가능하다. 그 구 자체를 인자로 넘겨주는것도 가능하다. pythonic한 사용방법이구나 이게

print(square([1,2,3]))


def get_count(sentence):
    count = 0
    vowels = ("a","e","i","o","u") #tuple did not allow duplicated value
    for char in sentence:
        if vowels.count(char) == 1:
            count = count + 1
    return count

#array, tuple 모두 index 메서드를 가지고 있지만 없는걸 찾으면 에러. count를 쓰자.
# return sum(1 for let in inputStr if let in "aeiouAEIOU") 
# sum이 ierater를 받기 때문에 쓸 수 있는 구조다. 여기에 L. comprehension을 넣으면 알아서 더해준다.

print(get_count("abc edfg yyy"))


def is_isogram(string):
  list = list(string)
  for x in string:
    if list.count(x) != 1:
      return False
  return True 
  
def is_isogram(string):
    return len(string) == len(set(string.lower()))
# 그냥 SET 의 성격을 활용한 방법이구나. SET 메서드/

num = '3212'
base = 5

answer = 0
for idx, number in enumerate(num[::-1]):
  print(idx, number)
  answer += int(number) * (base ** idx)
  # C-method -> 숫자를 뒤집은 다음. 이터레이트. base power id를 하면 10진법이 된다. 초등학교때 배운거 같아.


# ljust, center, rjust


def solution(mylist):
  # 다 꺼낸 하나의 큐에 넣고 리스트의 길이 만큼의 리스트를 생성해 순차적으로 담으면 된다.
    myQueue = []
    answer = []
    row = []
    length = len(mylist)
    print(length)
    for subList in mylist:
        for eachValue in subList:
            myQueue.append(eachValue)
    
    for idx in range(length):
        row = myQueue[idx::length]
        answer.append(row)

    return answer

print(solution([[1, 2, 3], [4, 5, 6], [7, 8, 9]]))

# ## 이렇게 이중 for문을 하고 좌표를 뒤집어도 행렬을 뒤집는 효과를 볼 수 있다. 하지만
# for i in range(len(mylist)):
#     for j in range(len(mylist[i])):
#         new_list[i].append(mylist[j][i])

# newList = list(map(list, zip(*mylist)))
# 이렇게 해도 뒤집을 수 있다. zip은 받는 iterable한 인자들을 묶어서 튜플을 만들어준다.

# for x,y,z in zip(xList, yList, zList):
#   print(x,y,z)
# dict(zip(list, list2)) 이렇게 하면 DICT를 정의할 수있다. 아주 간단하게


def solution22(mylist):
    answer = []
    for idx, value in enumerate(mylist):
        # print(idx, value, len(mylist), "show me")
        answer.append(abs(mylist[idx] + mylist[idx+1]))
        if (idx + 2 == len(mylist)):
            break
    return answer

print(solution22([1,2,3,4,5]))

## 위 처럼 말고 그냥 zip으로 두개를 묶어서 계산 하는 방법도 있다.
def solution(mylist):
    answer = []
    for number1, number2 in zip(mylist, mylist[1:]):
        answer.append(abs(number1 - number2))
    return answer

if __name__ == '__main__':
    mylist = [83, 48, 13, 4, 71, 11]    
    print(solution(mylist))

# 파이선을 문자열을 곱하는것 뿐만 아니라 리스트의 인자를 반복 생성할 수도 있다!
# answer = "123" * n
# answer= [123, 456] * n

import itertools

# iterable1 = '1'
# iterable2 = 'xyz'
# iterable3 = 'ㄱㄴㄷ'
# print(list(itertools.product(iterable1, iterable2, iterable3)))
# itertools.combinations()

# list comprehension으로 for 문과 if를 간단하게 표현하기
answer = [number ** 2 for number in mylist if number % 2 == 0]


def bisect(a, x, lo=0, hi=None):
    if lo < 0:
        raise ValueError('lo must be non-negative')
    if hi is None:
        hi = len(a)
    while lo < hi:
        mid = (lo + hi) // 2
        if a[mid] < x:
            lo = mid + 1
        else:
            hi = mid
    return lo

mylist = [1, 2, 3, 4, 5, 6, 7]
print(bisect(mylist, 9))


def solution3(a, b):
    result = 0
    for x , y in zip(a, b):
        print(x,y, x * y)
        result = result + (x * y)
        
    return 

print(solution3((1,2,3),(-1,2,-3)))



def solution31(now, finish):  
  cnt = 0
  while (now < finish):
    if ( now + 3 >= finish):
      if ((finish - now) % 2) == 0:  
        return cnt + 2
      else:
        return cnt + 1
    cnt + 1
    now = now + 3
        

print(solution31(1,5), "noop")


def disemvowel(str):
    mylist = list(str)
    vowels = list("aiueoAIUEO")
    answer = []
    for idx, cha in enumerate(mylist):
        if cha not in vowels:
            answer.append(cha)
    return "".join(answer)
    # complexcity O(N)

def disemvowel2(str):
  return "".join(c for c in str if c.lower() not in "aiueo")
  #O(N)

def disemvowel3(str):
  for cha in "aiueoAIUEO":
    str.replce(cha,'')
    return str
    # nO(N)

print(disemvowel2("Your writing is among the worst I've ever read"), " < my value")
print("Yr wrtng s mng th wrst 'v vr rd", " < answer")
#pop을 쓰면 인덱스가 밀린다. 주의
# 너무 낭비만 아니라면 Performace는 따질 필요없다. 하드한 작업은 파이선으로 하지 않을것이다. 가독성과 테스트 커버리지가 더 중요하다.

def square_digits(numbers):
    return "".join( [ str(int(num) ** 2) for num in str(numbers)])

def square_ditgit2(numbers):
    answer = ""
    for x in str(numbers):
        answer += str(int(x)**2) #문자열 사칙을 사용하면 여러가지 활용이 가능하구나
    return answer


print(square_ditgit2("919191"))


def high_and_low(numbers):
    V1 = max(list(map(int, numbers.split(' '))))
    V2 = min(list(map(int, numbers.split(' '))))
    return f'{V1} {V2}'

print(high_and_low("8 3 -5 42 -1 0 0 -9 4 7 4 -4"))

import re

import re

def contact(hallway):
    pairs = re.findall('>-*<', hallway)
    return min(map(len, pairs)) // 2 if pairs else -1
# 파인드 올하면 짝을 잡아서 묶어준다. 묶은 다음 각 그룹에 대해 len을 잰다. 그 중에서 제일 짧은것에서 // 나누기 2하면 되는 값이 contact
# 정답의 수학적 특성을 뽑아낸 다음. 필요한 것만 잘라서 시뮬레이터를 하면된다. // 2가 정답이라면 2가 나오는 가능성은 무엇인가? 역설계
# 무작정 시뮬레이터식으로 하는건 쉽고 복잡하지만 잘못된길.. 시뮬레이션을 하기위해 복잡도가 급속도로 올라간다.    

print(contact("->------<------->>---<<"),"쇼미")
