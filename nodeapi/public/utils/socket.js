// const io = require('socket.io');
// 图灵机器人apikey: b8922571b395466598091d8ac29ffa30
/*

var options = {
     hostname: 'www.google.com',
     port: 80,
     path: '/upload',
     method: 'POST',

};



var info = {
            "key": data.key,
            "info": data.info,
            "userid": data.userId
        },
        url = {
            hostname: url.host,
            path: url.path,
            method: url.method,
        }



*/
var HttpRequest = require('./request');
const httpRequest = new HttpRequest();

class SocketUtil {
    constructor(server) {
        this.server = server;
    }

    connect() {
        var vm = this;
        var io = require('socket.io').listen(this.server);
        var allSocket = {};
        io.on('connection', (socket) => {
            console.log(123);
            //
            socket.on('join', (data) => {
                console.log('======');
                console.log(data.userName + '加入成功');
                allSocket[data.userName] = data;
                // vm.allScokets = allSocket;
                socket.emit('joined', {msg: '保存成功', data: allSocket});
            });
            socket.on('sendMsg', (data) => {
                if(data.user == '图灵机器人'){
                    vm.toTuling(data,(result) => {
                        socket.emit('reciveMsg', result);
                    });
                }else{
                    let id = allSocket[data.user].socketId;
                    let userId = allSocket[data.user].userId;
                    socket.emit('reciveMsg', {msg:'维护中...'});
                }
                // socket.broadcast.to(id).emit('reciveMsg', {data: data});
                // if(userId == data.msf){
                //     socket.emit('reciveMsg', {msg: '这是推送给'+ data.user +'的消息',data:data.msg});
                // }else{
                //     socket.broadcast.to(id).emit('reciveMsg', {msg: '这是推送给'+ data.user +'的消息',data:data.msg});
                // }
            });
            socket.on('msg', (order) => {
                console.log(order);
                socket.broadcast.emit('message', {result: order, msg: '这是页面a发送过来的'});
            });
        });
    }
    //
    toTuling(data,cb){
        let vm = this;
        let urlObj = {
            host: 'www.tuling123.com',
            path: '/openapi/api',
            method: 'POST',
        };
        let msgInfo = {
            // b8922571b395466598091d8ac29ffa30
            "key": 'b8922571b395466598091d8ac29ffa30',
            "info": data.msg,
            "userid": data.msf
        };
        console.log('=========');
        httpRequest.entry(urlObj,msgInfo,(err,res) => {
            if(err){
                console.log('err:' + err);
                let obj = {
                    msg:'请检查网络，我没有收到信息',
                    user:'图灵机器人'
                };
                cb(obj);
            }else{
                let obj = {
                    msg:JSON.parse(res).text,
                    user:'图灵机器人'
                };
                cb(obj);
            }
        });
    }
}

module.exports = SocketUtil;