# ☁ AWS 서비스에 대한 메인스트림

#devops/Mainline #mainline

---

## IAM

### IAM 신뢰 정책에 대해

[링크](https://aws.amazon.com/ko/blogs/korea/how-to-use-trust-policies-with-iam-roles-html/)

**신뢰 관계** – 이 정책은 역할을 맡을 수 있는 보안 주체와 조건을 정의합니다. 이를 IAM 역할에 대한  [리소스 기반 정책](https://docs.aws.amazon.com/IAM/latest/UserGuide/access***policies***identity-vs-resource.html)  이라고도 합니다. 이 정책을 간단히 ‘신뢰 정책’이라고 지칭합니다.

이렇게 관계를 맺어놓고 Principal, Condition 속성을 이용해 신뢰를 강화할 수 있다.

“정책 로직이 항상 간단한 것은 아니므로 샌드박스 계정을 사용하여 아이디어를 시험해 보는 것이 좋습니다. 일반적으로 단순함이 영리함을 이겨야 합니다.”

---

## S3

###  퍼블릭 공개 정책 예제

```json

{

    “Version”: “2012-10-17”,

    “Statement”: [

        {

            “Sid”: “AddPerm”,

            “Effect”: “Allow”,

            “Principal”: “*”,

            “Action”: “s3:GetObject”,

            “Resource”: “arn:aws:s3:::duckhoogosa/*”

        }

    ]

}

```



### S3 SDK connect in JS

Amazon Cognito 인증 공급자 초기화

```

AWS.config.region = ‘ap-northeast-2’; // 리전

AWS.config.credentials = new AWS.CognitoIdentityCredentials({

    IdentityPoolId: ‘ap-northeast-2:coginto-pool-id’,

});

```

---



## CloudFront 셋팅

* `*.xxx.site`로 도메인 지정된 인증서를 발급해서 사용

* CloudFormation Dist, Route53 CNA 설정하고 30분 뒤 확인 예정

---



## MSK (managed Apache Kafka)

- Apache kafka(Message Queue) SaaS

- 구성 및 프로비저닝, 가용성, 데이터 보안 등을 처리해주는 솔루션

---



## CloudWatch

- EC2에서 기본제공하는건 5분, 유료로가면 1분단위

- 만들어놓은 지표와 로그용량 등에 따라 과금

---



## VPC(Virtual Private Cloud)

- 계정전용 가상 서브넷, 안쪽에서 엔드포인트와 게이트웨이를 설정하여 격리된 인프라환경 구성

- 인터넷에 연결되어 있다면 Public, 아니면 Private

- NAT 게이트웨이를 쓰면 Private 공간의 리로스가 인터넷에 접속할 수 있게 된다.

- `피어링` 연결을 사용하면 VPC간 트래픽을 라우팅할 수 있다.





## lightsail

Cache by AWS lightsail -  [https://blog.lael.be/post/7605](https://blog.lael.be/post/7605)