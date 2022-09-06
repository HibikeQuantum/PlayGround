# YAML 정리

#Devops



* Optional define

`---`문서시작

`...`문서 끝

* 줄바꿈

`|`은 블록내 줄바꿈. `|-`마지막 개행 무시 `>` 개행만 있는 경우 무시함.



* 정의(&) 호출(*) merge(<<)



```yaml

foo: &myanchor

  key1: “val1”

  key2: “val2”



bar:

  << : *myanchor

  key2: “val2-new”

  key3: “val3”

```



* 확장표현

	* `“my\nbag”`은 줄바꿈이 되지만 `’my\nback’`은 돼지 않는다.

* 배열

`[a, b, c]`  또는 

```

key:

  key: value

  key: value

```