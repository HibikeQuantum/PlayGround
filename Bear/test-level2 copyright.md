# test/level2 copyright

#copyright #test

```배시

 ***DONT CHANGE***```	

```

``

건드리지마! 버전투!

``



!헤드는 바꾸지 않아도 된다.



line_conv (밑에 두번 개행이 정상)


---

세퍼레이터는 개행---으로 바꿔준다. 깃허브 디폴트는 위쪽 글자가 두꺼워져보이는 이펙트를 가지는데 불필요



bold_conv

**Bear BOLD 1 ast**는 ***GIT BOLD TALIC 2 ast***로 바꿔주고

**합** 일반 텍스트 **내 껀 이것도 해준다!** gogo



italic_conv

*베어 이태릭*은 **깃 이태릭**으로



/논이

테릭 2줄 문장/



underline_conv

***베어 언더라인*** → ****깃 bold italic으로 치환** 3개 *** 

***베어 언더라인 두번째***



~~스트라이크ed~~

~~베어 스트라이크ed~~ 는  ~~깃 스트라이크~~ 으로 바꿔준다.



* 불릿

	* 불릿2

		* 불릿3

		* 불릿3-1

"불릿은 \t * 으로 바꿔준다



1. 오더1

	1. 오더2

		1. 오더3



> 쿼트.. 이것이 인생



todo***box***conv

-	[ ] 투두가 완성되느냐 1

+	[x] 투두완료가 완성되느냐







// -tab은 엠프티박스

-	[ ] 엠프티

// +tab는 체크드박스

+	[x] 체크드



코드문법 예제 1

`var a = 10;`



긴 코드 문법 1

```json

{

  "cleanOutputDir": true,

  "exportTrash": false,

  "exportImages": true,

  "exportFiles": true,

  "outputDir": "**Bear Notes**" //conv 문법은 코드 내의 내용에 대해 동작하지 않아야함

}

```



mark_conv



:: not marked String::



```diff
+ 순수 marked String
```




안녕하세요! 
```diff
+ marked String
```
 안녕하세요!


=>

```diff

+ marked String

```

위와 같이 보여야 한다. 그냥 이렇게 강제 개행시키고 기능을 지원하는게 좋겠다.



image_conv

![](/BearImages/857FEE57-5AE8-496F-990A-2C57ED2BD202-979-00001857014E6B40/Screen_Shot_2022-07-03_at_7.47.50.png)

이런 _가 들어간 이미지가 텍스트가 보이면 바꿔주고 프리뷰에서 보이도록 한다.

image_conv2

![](/BearImages/1D7EB121-E87C-4437-ACB6-CAA19DA70E4D-979-00001857014ED0BA/::image::.png)

잘 보이십니까?



태그패턴 처리방법 정리 (후순위)



1) 한덩이를 자르고 제일 마지막까지 ‘/‘으로 잘라서 nested한 구조로 저장한다.(+예상되는 URL도 쌍으로) 파싱과정에서 notag문서는 여기에 없다.

2) 이제 파싱을 시작한다. 이때는 이걸 만나면 찾아서 URL로 replace하면된다.

3) Navi.md 에선 가장 nested한 구조를 표현해서 링크를 표시한다.

4) 본문에선 아래와 같이 표현

[🔗welcomeBear/Welcome***to***Bear.md)

4) URL은 부모면 내비게이트 md, 말단 노트 풀패스 md5



갈릴리 마을 테스트 1

<!-- {BearID:B434F232-64F1-4E35-B4E1-546366EE8E0B-979-00001857014E63BE} -->
