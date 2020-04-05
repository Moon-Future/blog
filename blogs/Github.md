# Github 

### 本地设置用户信息
git config --global user.name "Your Name"  
git config --global user.email "email@example.com"

### 本地Git仓库和GitHub仓库连接
第1步：创建SSH Key。在用户主目录下，看看有没有.ssh目录，如果有，再看看这个目录下有没有id_rsa和id_rsa.pub这两个文件，如果已经有了，可直接跳到下一步。如果没有，打开Shell（Windows下打开Git Bash），创建SSH Key：
```cmd
ssh-keygen -t rsa -C "youremail@example.com"
```
你需要把邮件地址换成你自己的邮件地址，然后一路回车，使用默认值即可，由于这个Key也不是用于军事目的，所以也无需设置密码。

如果一切顺利的话，可以在用户主目录里找到.ssh目录，里面有id_rsa和id_rsa.pub两个文件，这两个就是SSH Key的秘钥对，id_rsa是私钥，不能泄露出去，id_rsa.pub是公钥，可以放心地告诉任何人。

第2步：登陆GitHub，打开“Account settings”，“SSH Keys”页面：

然后，点“Add SSH Key”，填上任意Title，在Key文本框里粘贴id_rsa.pub文件的内容：


# vultr
/etc/shadowsocks-python

### 更换端口-1：
open tcp port  
firewall-cmd --zone=public --add-port=8023/tcp --permanent

open udp port  
firewall-cmd --zone=public --add-port=8023/udp --permanent

firewall-cmd --reload  
reboot

### 更换端口-2：
vi /etc/shadowsocks.json

启动：/etc/init.d/shadowsocks start  
停止：/etc/init.d/shadowsocks stop  
重启：/etc/init.d/shadowsocks restart  
状态：/etc/init.d/shadowsocks status  


### 安装
- wget --no-check-certificate https://raw.githubusercontent.com/teddysun/shadowsocks_install/master/shadowsocks.sh

- chmod +x shadowsocks.sh

- ./shadowsocks.sh 2>&1 | tee shadowsocks.log

- aes-256-cfb 7