##MYSQL
내 MAC에 설치환경


#### 로컬 켜고 끄기
- 서비스
`brew services start mysql`
`brew services stop mysql`
- (Terminal 모드);
`mysql.server start`

#### RDS 접속
`
mysql -u root -p --host [HOST] --port [PORT]
`

#### 로컬접속
`
mysql -u root -p
`

어소시에이션을 걸어놓으면 포린키! 장점이 있다.  이런거 없어도 조인은 되. 대신 데이터를 완결성을 관리해준다.


다대다(M:N) 구현하기
논리적으로 다대다관계의 표현은 가능하지만, 2개의 테이블만으로 구현하는 것은 불가능 합니다. 다대다관계를 실제로 구현하기 위해선 각 테이블의 PrimaryKey를 외래키(FK)로 참조 하고 있는 연결테이블(매핑테이블)을 사용해야 합니다. 이를 ERD로 표현하면 아래와 같습니다. 
