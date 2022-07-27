# 💾 Linux

# 리눅스를 부팅하면 내부에서 어떤 과정을 거치는가?

`BIOS > bootloader > linux kernel > initramfs (램기반FS) > init (systemd) > Init.d (*etc*init.d)`

* init.d 시스템 부팅 후 첫 프로세스 init 이 사용하는 스크립트들을 담고 있음. 서비스에 대한 start reload 컨트롤하는 스크립트 가짐.

**`*etc*init` 이 디렉토리는 Upstart가 사용하는 설정파일들을 담고 있음. Upstart가 서비스 start reload 컨트롤하는 설정.**Upstart 는 systemd로 대체 예정 (ubuntu 12, cent7 부터는 systemd를 쓴다)*



# 프로세스 컨트롤 hot-key

	* CTRL+C 

	* CTRL+Z

	* fg %{PID}

		* 이걸로 정지된 프로세스 재개 가능

		* fg = foregrond

	* bg %{PID}

		* Background 로 보내기



# 파일 시스템

* *proc*

	* 리눅스의 커널과 사용자 영역 사이에 일어나는 통신 채널로 사용하는 가상 파일 시스템

* /opt 

	* 사용자가 설치하지 않은 하지만 시스템 기본 프로그램도 아닌것이 깔린다.

* *dev*

	* 디바이스 (리소스)



# Shell

* 정의

	* 사용자와 커널 사이의 인터페이스를 감싸는 층이라서 붙은 이름

	* NT는 CMD.EXE, Linux는 bash 가 기본

* LoginShell 

	*  .profile .bashprofile 이 해당

	* .bash_profile  .profile 은 매번 로그인할때 한번 실행

* Non Login Shell 

	* ssh 접근 후 bash를 실행하거나 GUI세션에서 여는 경우, su 같은 상황을 말함.

	* 맥은 모든 쉘을 LoginShell 취급함. 이 말은 일반 POSIX는 아니란 거고 Profile의 내용이 잘 적용되지 않을 수 있단 이야기.

	* .bashrc는 로그인한 상태에서 새 터미널 열때마다 실행

* bash 관리 정석

	* [관리자환경파일] *etc*profile

		* .profile 은 환경변수 등

	* [사용자환경파일] ~/.bash_profile

	* [사용자환경파일] ~/.bashrc

		* .~rc파일에 alias , 함수등 정의 (run configuration)

* ~/. 에서 설정하는 것들은 사용자에게만 한정된다. 다른 사용자에게 영향 없음.



# systemd

	* systemd : init 데몬

	* systemd-journald : 다른 데몬(프로세스)들의 출력(syslog, 표준, 에러 출력), 로그 저장 데몬

	* systemd-logind : 사용자 로그인, 세션 등 관리 데몬 

	* systemd-udevd : 장치 관리자 데몬

	* systemd-networkd : 네트워크 관리 데몬. DHCP 뿐만 아니라 Virtual Lan 설정까지 가능

	* systemd-resolved : DNS 해석 데몬

	* systemd-timesyncd : NTP로 컴퓨터 시간 동기화 데몬

	* systemd-boot : UEFI 부트로더

	* systemd 의 시대로 오면서 systemctl 명령어로 데몬을 컨트롤하기만 하면 되는구조로 바뀜



ssh-keygen -t rsa

ssh~~copu~~id -i [공개키] [키를 받을 호스트] 이렇게 하면 ssh 비번없이 된다. 키만 준다고 될게 아니다. sshd 를 다시 불러오는 방법도 있다.



리눅스의 파일시스템. 디바이스 > 파티션 > 마운트

버전마다 같은 명령어라도 출력 포맷이 다르다.. awk 를 잘 써야함.. 뭔가 스마트한 방법 없나





# /proc

## *[pid]*fd

### 여기서 열려있는 심볼링 링크들이 

`9999 -> pipe:[numbers]` 이렇게 표현되는데 numbers는 inode다. `find / -inum 아이노드번호 2>*dev*null` 검색이 필요할땐 이렇게



## iNode 100% 문제

1. `df -l`

2. `*var/log` `var*spool’` 에서 많은 숫자의 파일을 생성했을때 증상이 발생한다.

3. 지우거나 옮기고 심볼릭을 건다

```

sudo mv /var/log/* /home/사용자명/log

sudo ln -s /home/사용자명/log /var/log

```

4. `’*var/spool/mail*`의 파일을 지우거나 다른 곳에 백업해준다. (스풀은 발송하지 못한 메일이 쌓이는 곳이며 어디서 쏘는지 알아내서 막으면 된다)







#Devops/OS