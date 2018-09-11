/**
 * Created by liu on 2018/5/9.
 */
/**
 * fatch
 * @params:请求参数
 * url 请求接口
 * obj 请求数据(post)
 * params 文件(图片上传，formdata)
 * vm  vue实例
 * 使用方法：
 * 引入 import fetchR from '@/assets/javascripts/fetchAsync';
 * get  : fetchR.getFatch(url，vm).then().catch()
 * post : fetchR.postFatch(url, obj, vm).then().catch()
 * img upload : fetchR.uploadFile(url, params,vm).then().catch()
 */
import conf from '@/assets/pubConf';
import vm from '@/main'

export default class FetchAsync {
    // get方法
    static getFatch(url) {
        let geturl = url;
        return new Promise((resolve, reject) => {
                var url = conf.serverIp + geturl;
                /*var headers = new Headers();
                headers.append('Accept', 'application/json');
                headers.append('Content-Type', 'application/json');
                headers.append('Token', localStorage.getItem('token'));*/
                fetch(url, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        // "Content-Type": "application/json;charset=utf-8",
                        'token': localStorage.getItem('token')
                    }
                }).then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        reject({status: response.status})
                    }
                }).then((res) => {
                    if (res.status == 403) {
                        vm.$toast('请先登录');
                        vm.$router.push('/login');
                    } else {
                        resolve(res)
                    }
                }).catch((err) => {
                    console.log(err);
                    reject(err)
                })
            }
        )
    }

    // post方法
    static postFatch(url, params) {
        var url = conf.serverIp + url;
        return new Promise((resolve, reject) => {
                fetch(url, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                        'token': localStorage.getItem('token')
                    },
                    body: JSON.stringify(params)
                }).then(response => response.json()).then((res) => {
                    if (res.status == 403) {
                        vm.$toast('请先sss登录');
                        vm.$router.push('/login');
                    } else {
                        resolve(res)
                    }
                }).catch((err) => {
                    reject(err)
                });
            }
        )
    }

    // upload file
    static uploadFile(url, params) {
        var url = conf.serverIp + url;
        return new Promise((resolve, reject) => {
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'token': localStorage.getItem('token')
                    },
                    body: params
                }).then(response => response.json()).then((res) => {
                    if (res.status == 403) {
                        vm.$toast('请先登录');
                        vm.$router.push('/login');
                    } else {
                        resolve(res)
                    }
                }).catch((err) => {
                    reject(err)
                });
            }
        )
    }
}

