/**
 *  @Description:
 *  @date   2018/8/30
 *  @author liuzhenchao
 *
 **/

/*
* 封装 http 请求,用于图灵机器人对话
* 调用方法
*   var HttpRequest = require('./request');
*   const httpRequest = new HttpRequest();
*   httpRequest.entry(url,data,cb);
*   @params:url{host:'',path:'',method:''}
*   @params:data{key:'',info:'',userid:''}
*
* */
const createError = require('http-errors');
const http = require('http');
const querystring  = require('querystring');

class httpRequest {
    constructor(url) {
        this.url = url;
    }

    entry(url, data,cb) {
        var text = querystring.stringify(data);
        var options = {
            hostname: url.host,
            path: url.path,
            method: url.method,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        };
        // 发起请求
        var req = http.request(options,(res) => {
            // 设定
            res.setEncoding('utf8');
            res.on('data',(result) => {
                cb(null,result);
            });
            res.on('error',(err) => {
                console.error('err: ' + err);
                cb(err);
            });
        });
        req.on('error',(err) => {
            console.error('err: ' + err);
            cb(err);
        });
        req.write(text);
        req.end();
    }
}

module.exports = httpRequest;