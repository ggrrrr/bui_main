# bui-main

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

https://www.shareicon.net/pack/outdoor-activitiess

https://dev.vuetifyjs.com/en/components/menus/

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

https://github.com/Jebasuthan/Vue-Facebook-Google-oAuth

https://github.com/rmartide/vue-google-login/blob/master/src/GoogleAuth.js

# config.json is not stored in the GIT repo.
`./public/json/config.json`
```json
{
  "BASE_URL": "http://localhost:8000",
  "oauth2": {
    "google": {
      "oauth2_endpoint": "https://accounts.google.com/o/oauth2/v2/auth",
      "client_id": "XXXX.apps.googleusercontent.com",
      "redirect_uri": "http://localhost:8080/callback",
      "response_type": "code",
      "scope": "email",
      "include_granted_scopes": "true"
    },
    "facebook": {
      "oauth2_endpoint": "https://www.facebook.com/v12.0/dialog/oauth",
      "client_id": "XXXX",
      "redirect_uri": "http://localhost:8080/callback",
      "response_type": "code",
      "scope": "email public_profile",
      "include_granted_scopes": "true"
    }
  }
}

```

```bash
aws ec2 create-vpc --cidr-block 10.100.100.0/24  \
  --tag-specifications 'ResourceType=vpc, Tags=[{Key=Name,Value=bui-public}]'

aws ec2 create-subnet \
  --vpc-id  vpc-03709735ca606d033 \
  --cidr-block 10.100.100.0/24

aws ec2 modify-subnet-attribute \
  --subnet-id subnet-083d2104622215d7b \
  --map-public-ip-on-launch 

aws ec2 create-internet-gateway

aws ec2 attach-internet-gateway \
  --vpc-id vpc-03709735ca606d033 \
  --internet-gateway-id igw-0b4bf4b18f510c840

aws ec2 create-route-table \
  --vpc-id vpc-03709735ca606d033 > routing-table.json


aws ec2 create-route \
--route-table-id rtb-0e6a81a12102c7612 \
--destination-cidr 0.0.0.0/0 \
--gateway-id  igw-0b4bf4b18f510c840 > route.json

aws ec2 associate-route-table \
  --subnet-id subnet-083d2104622215d7b \
  --route-table-id rtb-0e6a81a12102c7612  > associate-route-table.json

aws ec2 create-security-group  \
  --group-name bui-public-sg  \
  --description 'bui public fw'  \
  --vpc-id vpc-03709735ca606d033 > create-security-group.json

aws ec2 authorize-security-group-ingress \
  --group-id sg-044836e0a1aad4ba4 \
  --protocol tcp \
  --port 80 \
  --cidr 0.0.0.0/0 

aws ec2 authorize-security-group-ingress \
  --group-id sg-044836e0a1aad4ba4 \
  --protocol tcp \
  --port 22 \
  --cidr 0.0.0.0/0 

aws ec2 create-key-pair \
  --key-name bui-public-key-pair \
  --output text \
  --query "KeyMaterial" > ./bui-public-key-pair.pem


aws ec2 describe-key-pairs \
  --key-name bui-public-key-pair

aws ec2 describe-images \
 --filters Name=name,Values=ubuntu/images/hvm-ssd/ubuntu-trusty-14.04-amd64* \
 --query 'Images[*].[ImageId,CreationDate,Name]' --output text \
 | sort -k2 -r \
 | head -n1

# https://wiki.debian.org/Cloud/AmazonEC2Image/Bullseye

aws ec2 run-instances \
  --image-id ami-0faddff36e930fbd2 \
  --count 1 \
  --instance-type t2.nano \
  --key-name bui-public-key-pair \
  --security-group-ids sg-044836e0a1aad4ba4  \
  --subnet-id subnet-083d2104622215d7b

sudo update

sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io


apt-cache madison docker-ce

sudo apt-get install docker-ce=<VERSION_STRING> docker-ce-cli=<VERSION_STRING> containerd.io



```