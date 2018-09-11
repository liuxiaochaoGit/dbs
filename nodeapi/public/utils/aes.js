const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

// 读取秘钥文件
const priKey = fs.readFileSync(path.join(__dirname, '../pem/private_key.pem')).toString('ascii');

/*
*  aes256 加密
*  @params {str} 需要加密的字符
*
*  使用方法:
*  解密：
*  var AES = new Aes('解密字符');
*  AES.deCryto();
*  加密：
*  var AES = new Aes('加密字符');
*  AES.enCryto();
*
* */
class Aes {
    constructor(str) {
        this.pass = str;
    }

    enCryto() {
        let cipher = crypto.createCipher('aes256', priKey);
        let encrypted = cipher.update(this.pass, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }
    deCryto(){
        let cipher = crypto.createDecipher('aes256', priKey);
        let decrypted = cipher.update(this.pass, 'hex', 'utf8');
        decrypted += cipher.final('utf8');
        console.log(decrypted);
        return decrypted;
    }
}

/*var AES = new Aes('ce12c0f34b58af411d80752fb72031a1');
AES.deCryto();*/
module.exports = Aes;


