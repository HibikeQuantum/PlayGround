#AWS

##S3
####S3 퍼블릭 공개 정책 백업
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AddPerm",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::duckhoogosa/*"
        }
    ]
}
- - -
#### S3 SDK connect in JS
// Amazon Cognito 인증 공급자를 초기화합니다
AWS.config.region = 'ap-northeast-2'; // 리전
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'ap-northeast-2:ba805140-83ec-4793-8736-0641dd7d6f71',
});


## cloud front
`*.xxx.site`
로 도메인 지정된 인증서를 발급해서 사용
Dist, Route53 CNA 설정하고 30분뒤 확인예정

#### AWS msk
- Apache kafka(Message Queue) 를 쉽게 사용하도록 해주는 서비스
- 구성 및 프로비저닝, 가용성, 데이터 보안 등을 처리해주는 솔루션

####CloudWatch
- EC2에서 기본제공하는건 5분, 유료로가면 1분단위
- 만들어놓은 지표와 로그용량 등에 따라 과금

#### VPC(Virtual Private Cloud)
- 계정전용 가상 서브넷, 안쪽에서 엔드포인트와 게이트웨이를 설정하여 격리된 인프라환경 구
- 인터넷에 연결되어 있다면 Public, 아니면 Private
- NAT 게이트웨이를 쓰면 Private 공간의 리로스가 인터넷에 접속할 수 있게 된다.
- `피어링` 연결을 사용하면 VPC간 트래픽을 라우팅할 수 있다.
