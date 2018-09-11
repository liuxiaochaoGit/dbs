/**
 *  @Description:
 *  @date   2018/8/28
 *  @author liuzhenchao
 *
 **/

/*
*  axios config
*  使用
*     this.axios.post(url,data).then().catch();
*     this.axios.get(url).then().catch();
* */
import axios from 'axios';
import conf from '@/assets/pubConf';
import mainV from '@/main'

const instance = axios.create({
    baseURL: conf.serverIp,
    timeout: 1000,
    headers: {
        // 'X-Custom-Header': 'foobar',
        'token': encodeURIComponent(localStorage.getItem('token'))
    }
});
console.log(localStorage.getItem('token'));
// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    console.log(response);
    if(response.data.status == 403){
        /*mainV.$toast({
            message:'请先登录',
            position:'bottom'
        });*/
        mainV.$toast('请先登录');
        mainV.$router.push('/');
    }
    return response;
}, function (error) {
    return Promise.reject(error);
});
// instance.defaults.headers.
export default instance
