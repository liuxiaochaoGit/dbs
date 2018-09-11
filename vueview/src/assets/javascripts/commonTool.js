/**
 *  @Description:
 *  @date   2018/8/29
 *  @author liuzhenchao
 *
 **/

/*
*  工具
* */
// 解密工具
import Aes from '@/assets/javascripts/aesUtil';
const aes = new Aes();

export default {
    // 获取信息
    getUser(){
        return JSON.parse(aes.decrypt(localStorage.getItem('u')));
    },
    // 更改信息
    updateUser(key,val){
        let author = this.getUser();
        author[key] = val;
        this.set('u',JSON.stringify(author));
    },
    // 存储信息
    set(key,val){
        window.localStorage.setItem(key, aes.encrypt(val));
    },
    // 初始用户
    initUser(vm){
        let author = this.getUser();
        /*vm.nickname = author.nickname;
        vm.signSelf = author.signSelf;
        vm.portrait = author.portrait;*/
        vm.nickname = author.nickname ? author.nickname : '这个人太懒了...';
        vm.portrait = author.portrait ? author.portrait : require('../images/timg.jpeg');
        vm.selfsign = author.selfsign ? author.selfsign : '这个人太懒了...';
        vm.storeAtricles = author.storeAtricles;
        vm.followAuthors = author.followAuthors;
        vm.fans = author.fans ? author.fans : 0;
    }
};
