# 🫘JAVA

#Devops*language*java 


---



 [Java 제네릭(Generics)이란?](https:*/gangnam-americano.tistory.com*47) 

# Generic 제너릭 `<>` 

* <T>, <String>, <Obejct String> 같은 패턴 모두에 해당한다.

`ArrayList<String> arrList = new ArrayList<String>();`

	****이렇게 배열안에 사용할 타입을 선언하는 것을 칭함*

	* 필요성 (1) 제너릭을 쓰면 입력시 형변환이 필요없고 (2) 코드의 안정성을 확보할 수 있다.



* 클래스를 다음과 같은 구조라면

`class Soccer extends Sports{}`

Array, List 같은 자료형(컬렉션)에만 국한되는게 아니라 다양하세 사용가능. **예를 들어 클래스도 가능**

다형성(*알고리즘을 건드리지 않고 그대로 유지하면서 뮤테이트*)을 지원하기 때문에

부모의 제너릭에 자녀 제너릭을 저장할 수있다. (다만 다시 자녀의 타입으로 저장하려면 형변환이 필요하다) 

 `Soccer mySoccer = (Soccer) arrList.get(1);`



```java

ArrayList<?> arrList // 아무 타입이나 사용가능

ArrayList<? extends Skating> arrList		// Skating과 자녀 클래스만 사용가능

ArrayList<? super Golf> arrList		// 골프와 그 부모만 사용가능



class Player<T, S>{ public T team, public S name }

→ 이렇게 복수의 제너릭을 선언할 수도 있다.

```