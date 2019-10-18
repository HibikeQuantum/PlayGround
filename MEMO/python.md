#python
- - - - - -
## 기본적인 파이선 컨트롤
- python --version      버전확인
- pip3      3버전으로 프로그램 실행
- python3     CLI 실행모드
- Ctrl + D 종료     CLI 모드종
- - - - - - -

## PYCHARM
- CMD-R: Replace  
- source myvenv/bin/activate  ::: 버츄얼 환경 활성화
- deactivate ::: 버츄얼 환경 비활성화
- cdvirtualenv ::: 가상환경 이
- wipeenv ::: 현재 가상환경 서드파티 지우기
- rmvirtualenv ::: 가상환경삭제


##프로젝트 셋팅

#### virtualenv
sudo pip install virtualenv
source venv/bin/activate

#### project start
python3 manage.py runserver
python3 manage.py makemigrations
python3 manage.py migrate               // 안먹음 몽고엔진에선

* 가상환경때문에 IDE에러 뜨는건 실행환경을 등록해주면 됨;

from rest_framework.compat import unicode_to_repr

* 깔려있는 패키지 위치 확인
python -m site
which python3


초기 설정한 이름 DuckServer
use duck
db.comments.remove({})

ssh -i "/Users/mac/Documents/forDuck.pem" ec2-user@ec2-54-180-82-249.ap-northeast-2.compute.amazonaws.com
esMONGO

mongo
<!-- db.changeUserPassword("developer","20JKF#*12we") -->

db.createUser({user: "ROOT_ID", pwd: "ROOT_PASSWO", roles:["root"]})

use duck
db.createUser({ user: "developer",
  pwd: "duckdev1984",
  roles: [ "userAdminAnyDatabase",
    "dbAdminAnyDatabase",
    "readWriteAnyDatabase"
  ]
})


vi /etc/mongod.conf

mongo -u developer -p --host 54.180.82.249 --authenticationDatabase duck

mongod --bind_ip_all --fork --logpath /var/log/mongodb.log
tail -f /var/log/mongodb.log


db.createUser( {user: "developer",
    pwd: "duckdev1984",
    roles: ["readWrite", "dbAdmin"] } )

    mongo -u developer -p duckdev1984 --host 54.180.82.249 --authenticationDatabase duck

    use admin
    db.createUser({
      "user" : "admin",
      "pwd" : "amdin1984",
      roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
    })

nc -z 54.180.82.249 27017



pip install --upgrade pip
// PIP 업데이트


C02L257NDV33:~ jjohnson$ brew install pip
Error: No available formula for pip
Homebrew provides pip via: `brew install python`. However you will then
have two Pythons installed on your Mac, so alternatively you can:
    sudo easy_install pip
C02L257NDV33:~ jjohnson$ sudo easy_install pip



FLASK_APP=hello.py flask run

filename = os.getcwd() + "/title-image-example.jpg"
==> 현재 경로 얻기



__dir로 현재 PATH 입력 가능
