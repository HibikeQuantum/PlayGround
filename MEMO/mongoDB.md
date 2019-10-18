#mongoDB

##연결관리
- 클라이언트 터미널
 ```
 mongo
 ```

- 패스워드변경
 ```
 db.changeUserPassword("id","password")
 ```

- 유저만들기
```
db.createUser({user: "ROOT_ID", pwd: "ROOT_PASSWO", roles:["root"]})
```

- 디비선택
```
use duck
```

- 유저로그인
~~~
mongo -u "ROOT" -p "id" --authenticationDatabase "admin"
mongo -u developer -p --host 54.180.82.249 --authenticationDatabase duck
~~~

- 디비초기유저 만들기 (정석)
~~~
db.createUser({ user: "developer",
  pwd: "password",
  roles: [
  "userAdminAnyDatabase",
  "dbAdminAnyDatabase",
  "readWriteAnyDatabase"]
})

db.createUser( {user: "developer",
    pwd: "duckdev1984",
    roles: ["readWrite", db: "testDB"] } )

db.createUser({
      "user" : "admin",
      "pwd" : "amdin1984",
      roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
    })

~~~

## DB관리
- DROP
```
db.students.drop()
```

##Daemon management

####켜고 끄기
- brew services start mongodb
- brew services stop mongodb

- 바인드 옵션주면서 켜기
~~~
mongod --bind_ip_all --fork --logpath /var/log/mongodb.log
tail -f /var/log/mongodb.log
~~~

~~~
sudo mongod --fork --logpath /var/log/mongodb.log --bind_ip_all
sudo mongod --bind_ip_all
~~~


##주요설정
vi /etc/mongod.conf
