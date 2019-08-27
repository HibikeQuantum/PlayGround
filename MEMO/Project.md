개발로그 프로젝트 로그

DEBUG=picktalk:* npm start
lsof -i tcp | grep node

mongo "mongodb+srv://cluster0-2ukow.mongodb.net/test" --username firstmongo

open .


__dir로 현재 PATH 지원함.


재귀함수로 SQURE 접근하는거 추정.

$ brew services start mongodb
 ps -ef | grep mongo
$ brew services stop mongodb

mongo -u "ROOT" -p "xogns1" --authenticationDatabase "admin"

db.createUser({user: "developer", pwd:"developer", roles:["readWrite"]});



개발로그 -
7/5 지금까지는 가장 기본적인걸로 장난감 가지고 놀았다. 장난감을 가지고 노는건 실제로 생산적인걸 하기 위한 준비과정이다. 이제 나는 진짜 엄격하게 데이터를 변환하면서 쓸만한 물건을 만드는 단계에 진입했다. 머리 아파도 괜찮아. 머리아픈것도 의미있는 희생.




API 문서
{"username":"General","text":"HARRY POTTER","roomname":"한국??"}%{"username":"rrr","text":"HARRY xxxx","roomname":"어디보장?"}%{"username":"rrr","text":"HARRY xxxx","roomname":"imaiamaaa"}%{"username":"rrr","text":"HARRY xxxx","roomname":"imaiamaaa"}%{"username":"rrr","text":"HARRY xxxx","roomname":"imaiamaaa"}%




ESLINT

{
    "rules" : {
        "no-console" : "off",
        "no-alert" : 1,
        "quotes" : ["error", "double"]
    }
}
console.log = function(){};


open -na Google\ Chrome --args --disable-web-security --user-data-dir="/tmp/chrome_dev"
xos 개발자모드 크롭 켜기 (옵션 안전 끔)

process.on('uncaughtException', (err) => {

  console.error("죽지마 ㅠㅠ");
  console.error(err);
 
  // retruen것이 없기 때문에 process를 종료시켜 줘야함돠!
  process.exit(1);
});


Quakke
Cmd + Shift + N

스크래치 js 생성 작성되고 나면 f5로 저장


<<DOM>>
target.insertBefore(msg$, target.childNodes[0]);	// UL 같은데 첫번째 차일드로 붙여주기
insertAdjacentHTML

<<express>> ** bodyParse가 되야 req.body 가 사람꼴이 된다.

어크컨 식슈
img src // p // span // br


백업


<< 상속 >>
Object.create() 는 프로토라인을 잇는 의미만 있다. 독립적 프로퍼티를 주는건 아니다.
Object.create(*.prototype) 프로토타입은 주지만 생성자를 실행하지않는다. new는 실행도 한다. 연결도 해주고

binary tree 에서 삭제 logn. 찾기 logn!
Linked List에선 인덱스 알아도 작업 빨라지는거 없어. 그냥 주소로 지우고 넣는것만 빨라질뿐. 다이렉트로 지우면 되니까. 탐색의 내용이 들어가면 무조건 O(n)

콜백이든 뭐든 클로져의 모양이 되면 같혀있는 자기 외부함수껄 먼저 참조한다.


import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import App from './App'

const Root = () => {
  return (
      < BrowserRouter>
        < App>
          < /BrowserRouter>
) } default export Root;;


<<< Deploy >>>
yarn build

fetch('http://127.0.0.1:5000/write', {
  method: 'post',
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({name: name})
})

헤더 잘 지정 안하면 빈거 가니까 기억해라 천재 야야아ㅏㅏ앙아

Node >> HTML ELE  뭐가 비어 있으면 배열확인해야함


mySQL  // Ver 8.0.17 for osx10.14 on x86_64 (Homebrew)

brew services start mysql
brew services stop mysql
mysql.server start 		(Terminal 모드);

mysql -u root -p		// root 로긴


When you insert a value of NULL(recommended) or 0 into an indexed AUTO_INCREMENT column, the column is set to the next sequence value.

어소시에이션을 걸어놓으면 포린키! 장점이 있다.  이런거 없어도 조인은 되. 대신 데이터를 완결성을 관리해준다.


다대다(M:N) 구현하기
논리적으로 다대다관계의 표현은 가능하지만, 2개의 테이블만으로 구현하는 것은 불가능 합니다. 다대다관계를 실제로 구현하기 위해선 각 테이블의 PrimaryKey를 외래키(FK)로 참조 하고 있는 연결테이블(매핑테이블)을 사용해야 합니다. 이를 ERD로 표현하면 아래와 같습니다. 


3306 admin t
mysql -u admin --host deploy-db.cyskonfnpdla.ap-northeast-2.rds.amazonaws.com -P 3306 -p

포트검사
nc -zv deploy-db.cyskonfnpdla.ap-northeast-2.rds.amazonaws.com 3306
