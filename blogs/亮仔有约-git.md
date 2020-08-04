## 本地设置用户信息

git config --global user.name "Your Name"  
git config --global user.email "email@example.com"

## 本地 Git 仓库和 GitHub 仓库连接

第1步：创建 SSH Key。在用户主目录下，看看有没有 .ssh 目录，如果有，再看看这个目录下有没有 id_rsa 和 id_rsa.pub 这两个文件，如果已经有了，可直接跳到下一步。如果没有，打开 Shell（Windows 下打开 Git Bash），创建 SSH Key：

```cmd
ssh-keygen -t rsa -C "youremail@example.com"
```

你需要把邮件地址换成你自己的邮件地址，然后一路回车，使用默认值即可，由于这个 Key 也不是用于军事目的，所以也无需设置密码。

如果一切顺利的话，可以在用户主目录里找到 .ssh 目录，里面有 id_rsa 和 id_rsa.pub 两个文件，这两个就是 SSH Key 的秘钥对，id_rsa 是私钥，不能泄露出去，id_rsa.pub 是公钥，可以放心地告诉任何人。

第2步：登陆 GitHub，打开“Account settings”，“SSH Keys”页面，然后点“Add SSH Key”，填上任意Title，在 Key 文本框里粘贴 id_rsa.pub 文件的内容：
