# test ⭐️
```diff
\+ Sync conflict! External update: 2022-07-07 at 11:21
```

[Click here to see original Bear note](bear:*/x~~callback-url*open-note?id=C026DB37-57BB-4D63-B26D-BF8F5AD21A84-67965~~000005B4CA4ACA15)
!헤드는 바꾸지 않아도 된다.

!라인세퍼레이터



---
세퍼레이터는 개행---으로 바꿔준다. 위쪽 글자가 두꺼워져보이도록 바꾸는데 불필요하다.

***볼드체***
***BOLD***은 ***NOT BOLD***로 바꿔주고

**이태릭**
***논 이태릭*** 으로 바꿔주고
**논
이테릭**

***언더라인***
언더라인은 ****언더라인**** 으로 바꿔주고 ***또더라인***

~~스트라이크~~
"스트라이크는 ~~이렇게~~

* 불릿
	* 불릿2
		* 불릿3
		* 불릿3-1
"불릿은 \t * 으로 바꿔준다

1. 오더1
	1. 오더2
		1. 오더3
아***이것이****인생

> 쿼트.. 이것이 인생
1
- 투두
+ 투두완료
이게 그냥 블릿으 처리되 아래와 같이 바꿔준다.

**/ -tab은
- [ ]
/** +tab은
- [x]


`var a = 10;`


```json
{
  "cleanOutputDir": true,
  "exportTrash": false,
  "exportImages": true,
  "exportFiles": true,
  "outputDir": "*****~*****Bear Notes"
}
```


```diff
\+ marked String
```

=>
```diff
+ marked String
```
그냥 이렇게 강제 개행시키고 기능을 지원하는게 좋겠다.

file
[file:5C01D883~~4077~~4954-8E28-B7C91ED285B7~~67965~~000005BA6002A679**myimsi.txt]
이런 패턴을 보면
[💾myimsi.txt](https:/**github.co*****m*****PlayGroun*****d*****maste*****r*****file*****s*****myimsi.txt)
이렇게 바꿔준다.


image
![](BearImages/89C5883A~~B535~~4FB6-907A-3B29FF56E088~~82667~~0000032FC3D87CF3**Bear 3 columns.png)
이런 텍스트가 보이면
![alt text](image*****s*****Pro.jpg)
이렇게 바꿔준다.

태그패턴 처리방법 정리
<!~~- #welcome**Bear -~~>
1) #으로부터 한덩이를 자르고 제일 마지막까지 '**'으로 잘라서 nested한 구조로 저장한다.(+예상되는 URL도 쌍으로) 파싱과정에서 notag문서는 여기에 없다.
2) 이제 파싱을 시작한다. 이때는 이걸 만나면 찾아서 URL로 replace하면된다.
3) Navi.md 에선 가장 nested한 구조를 표현해서 링크를 표시한다.
4) 본문에선 아래와 같이 표현
[🔗welcom*****e****Bear**Welcome***to***Bear.md)
4) URL은 부모면 내비게이트 md, 말단 노트 풀패스 md

<!-- {BearID:79A70F71-3273-4C53-8795-13E1238519BD-76434-000006075B065F90} -->
