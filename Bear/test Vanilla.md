# test Vanilla

#test

```배시

 ***DONT CHANGE***```	 깃헙에서 확인할 수 있음 바닐라 123 123 123 123 123

이건 바닐라

```

---

세퍼레이터는 개행---으로 바꿔준다. 깃허브 디폴트는 위쪽 글자가 두꺼워져보이는 이펙트를 가지는데 불필요



**bold_conv 1** 이건 볼드로 유지되는가?

*italic_conv12* 이건 이태릭이다.



/논이

테릭 2줄 문장/



~~베어 스트라이크~~

~~깃 스트라이크~~ 



* 불릿 1단계

	* 불릿 2단계

		* 불릿 3단계

		* 불릿 3-1

"불릿은 \t * 으로 바꿔준다



1. 오더1

	1. 오더2

		1. 오더3



> 쿼트.. 이것이 인생

> 쿼트 두번째 줄





- [ ] 엠프티 투두

- [x] 완료된 투두



넥스트 코드

`var a = 10;`



넥스트 코드블록

```json

{

  "cleanOutputDir": true,

  "exportTrash": false,

  "exportImages": true,

  "exportFiles": true,

  "outputDir": "**Bear Notes**" //conv 문법은 코드 내의 내용에 대해 동작하지 않아야함

}

```



mark_conv 테스트

여기서 줄바꿈 후 :: marked String::



---

```diff
+ marked Stringㄹㅇ 여기테스트
```


안녕하세요! 
```diff
+ marked String
```
 안녕하세요!


=> 좋은 결과물

```diff

+ marked String ㄹㅇ 여긴 안움직여도 됨

```

위와 같이 보여야 한다. 그냥 이렇게 강제 개행시키고 기능을 지원하는게 좋겠다.



image_conv

[image:C9BC8F82-6A30-4165-B911-55C63AC4718E-76434-0000075928935A8B/Screen Shot 2022-07-03 at 7.47.50.png]

이런 _가 들어간 이미지가 텍스트가 보이면 바꿔주고 프리뷰에서 보이도록 한다.

image_conv2

[image:001DC9A8-B6F9-4C3E-98E6-01BDDEA6AA83-76434-0000077576BE419E/::image::.png]

잘 보이십니까?



태그패턴 처리방법 정리 (후순위)

1) 한덩이를 자르고 제일 마지막까지 ‘/‘으로 잘라서 nested한 구조로 저장한다.(+예상되는 URL도 쌍으로) 파싱과정에서 notag문서는 여기에 없다.

2) 이제 파싱을 시작한다. 이때는 이걸 만나면 찾아서 URL로 replace하면된다.

3) Navi.md 에선 가장 nested한 구조를 표현해서 링크를 표시한다.

4) 본문에선 아래와 같이 표현

[🔗welcomeBear/Welcome***to***Bear.md)

4) URL은 부모면 내비게이트 md, 말단 노트 풀패스 md5



갈릴리 마을 테스트 1



이미지 테스트

[image:B25140F8-15D9-4D39-89DD-ED3D7405B3D7-11497-0000092D200FFB21/Screen Shot 2022-06-03 at 6.36.00 AM.png]