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
