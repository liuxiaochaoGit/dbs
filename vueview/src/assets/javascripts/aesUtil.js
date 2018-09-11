import Vue from 'vue';
import CryptoJS from 'crypto-js';
const KEY = 'wojiazhuangmiyao';
class AesUtil {

    encrypt(word) {
        let key = CryptoJS.enc.Utf8.parse(KEY);
        let srcs = CryptoJS.enc.Utf8.parse(word);
        let encrypted = CryptoJS.AES.encrypt(srcs, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
        return encrypted.toString();
    }

    decrypt(word) {
        var key = CryptoJS.enc.Utf8.parse(KEY);
        var decrypt = CryptoJS.AES.decrypt(word, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
        return CryptoJS.enc.Utf8.stringify(decrypt).toString();

    }
}

export default AesUtil;
