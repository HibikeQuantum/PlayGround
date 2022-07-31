# 🌏 Terraform

#Devops/language

---



### tfvar 문제

```

*.tfvars // 이렇게 선언하고

  compute_platform = "Server"



mina.tf // 이렇게 사용. 결국 var를 정의하는 여러 방법 중 하나

  compute_platform = local.compute_platform



```