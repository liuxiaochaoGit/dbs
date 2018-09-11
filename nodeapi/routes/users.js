const express = require('express');
const router = express.Router();
// const jwt = require('jsonwebtoken');
// const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const JwtUtil = require('../public/utils/jwt');
const AesUtil = require('../public/utils/aes');


const users = require('../server/model/user');
// const fans = require('../server/model/fans');

let limit = global.limit;

/* GET users listing. */
router.get('/', (req, res) => {
    res.send('respond with a resource');
});
// 注册
router.post('/register', (req, res) => {
    let username = req.body.user;
    let pass = req.body.pass;
    console.log(req.body);
    if (username != '' && pass != '') {
        new Promise((resolve, reject) => {
            var queryCount = users.count({'username': username});
            queryCount.exec((err, count) => {
                if (err) {
                    console.log(err);
                    reject();
                } else {
                    if (count <= 0) {
                        resolve();
                    } else {
                        res.send({status: 400, msg: '注册失败，账号已存在'});
                    }
                }
            });
        }).then(() => {
            let aes = new AesUtil(pass);
            let password = aes.enCryto();
            let portraitPath = 'http://' + req.headers.host + '/static/' + 'default_portrait.png';
            let user = new users({
                username: username,
                password: password,
                portrait: portraitPath,
                nickname: username,
                backgoundPic: '',
                selfsign: '',
            });
            user.save((err, result) => {
                if (err) {
                    reject();
                } else {
                    res.send({status: 200, msg: '注册成功'});
                }
            });
        }).catch((err) => {
            res.send({status: 500, msg: '注册失败'});
            console.log(err);
        });
    }
});
// 登录
router.post('/login', (req, res) => {
    console.log(req.session);
    var userName = req.body.user;
    var pass = req.body.pass;
    new Promise((resolve, reject) => {
        users.findOne({'username': userName}).exec((err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    }).then((result) => {
        console.log(result);
        if (result) {
            var aes = new AesUtil(result.password);
            var password = aes.deCryto();
            if (pass == password) {
                let author = {
                    name: result.username,
                    id: result._id,
                    portrait: result.portrait,
                    nickname: result.nickname,
                    selfsign: result.selfsign,
                    storeAtricles:result.storeAtricles.length,
                    followAuthors:result.followAuthors.length,
                    // fans:result.fans.length
                };
                // 登陆成功，添加token验证
                let _id = result._id.toString();
                let jwt = new JwtUtil(_id);
                let token = jwt.generateToken();
                res.send({status: 200, msg: '登陆成功', token: token, auth: author});
            } else {
                res.send({status: 400, msg: '账号密码错误'});
            }
        } else {
            res.send({status: 404, msg: '账号不存在'})
        }
    }).catch((err) => {
        console.log(err);
        res.send({status: 500, msg: '账号密码错误'});
    })
});
// 搜索
router.get('/search', (req, res) => {
    let keyword = req.query.keyword;
    let page = req.query.page;
    new Promise((resolve, reject) => {
        users.find({}).or([{
            'username': {
                $regex: keyword,
                $options: 'i'
            }
        }]).skip(global.limit * page).limit(global.limit).exec((err, result) => {
            if (err) {
                reject(err);
            } else {
                console.log(result);
                resolve(result);
            }
        })
    }).then((result) => {
        result.map((item) => {
            delete item.password;
        });
        res.send({status: 200, msg: 'this is finder', data: result});
    }).catch((err) => {
        res.send({status: 500, data: []});
    })
});
// 更改头像
router.post('/changeHead', (req, res) => {
    let id = req.body.id;
    let portrait = decodeURIComponent(req.body.portrait);
    new Promise((resolve, reject) => {
        users.findOne({_id: id}, (err, doc) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        })
    }).then(() => {
        return new Promise((resolve, reject) => {
            // base64 转img文件
            let imgPath = path.join(__dirname, '../static/images/');
            let imgName = 'portrait_' + new Date().getTime() + '.png';
            let portraitName = imgPath + imgName;

            // 截取图片的base64
            var base64Data = portrait.replace(/^data:image\/\w+;base64,/, "");
            var dataBuffer = Buffer.from(base64Data, 'base64');
            // 写入文件
            fs.writeFile(portraitName, dataBuffer, function (err) {
                if (err) {
                    reject(err);
                } else {
                    let host = req.headers.host;
                    // 返回图片服务端路径
                    let clientPath = 'http://' + host + '/static/images/' + imgName;
                    // 移除原来头像
                    if (req.body.oldPortrait && req.body.oldPortrait.indexOf('default_portrait') == -1) {
                        let oldPortrait = decodeURIComponent(req.body.oldPortrait).split('/');
                        let oldPortraitPath = imgPath + oldPortrait[oldPortrait.length - 1];
                        // fs.unlinkSync(oldPortraitPath);
                        fs.unlink(oldPortraitPath, () => {
                        });
                    }
                    resolve(clientPath);
                    // res.send("保存成功！");
                }
            });
            //fs.
        });
    }).then((portrait) => {
        return new Promise((resolve, reject) => {
            users.update({_id: id}, {$set: {portrait: portrait}}, (err, doc) => {
                if (err) {
                    reject(err);
                } else {
                    res.send({
                        status: 200,
                        msg: portrait
                    });
                }
            })
        });
    }).catch((err) => {
        console.error(err);
        res.send({
            status: 500,
            msg: '失败'
        });
    })
});

// 更改签名和昵称
router.post('/changeNick', (req, res) => {
    let nickname = req.body.nickname;
    let selfsign = req.body.selfsign;
    let id = req.body.id;
    let obj = {
        nickname: req.body.nickname,
        selfsign: req.body.selfsign,
    };
    new Promise((resolve, reject) => {
        users.findOne({_id: id}, (err, doc) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        })
    }).then(() => {
        return new Promise((resolve, reject) => {
            users.update({_id: id}, {$set: {nickname: nickname, selfsign: selfsign}}, (err, doc) => {
                if (err) {
                    reject(err);
                } else {
                    res.send({
                        status: 200,
                        msg: '成功'
                    });
                }
            })
        });
    }).catch((err) => {
        console.error(err);
        res.send({
            status: 500,
            msg: '失败'
        });
    })
});
// 添加关注
router.post('/addFollow', (req, res) => {
    let id = req.body.id;
    let followId = req.body.followId;
    new Promise((resolve, reject) => {
        users.findOne({_id: id}).exec((err, doc) => {
            if (err) {
                reject(err);
            } else {
                resolve(doc);
            }
        });
    }).then((result) => {
        return new Promise((resolve, reject) => {
            users.update({_id: id}, {$addToSet: {followAuthors:followId}}).exec((err,doc) => {
                if(err){
                    reject(err);
                }else{
                    resolve(doc);
                }
            });
        })
    }).then((result) => {
        console.log(result);
        res.send({
            status:200,
            data:result
        });
    }).catch((err) => {
        console.error(err);
        res.send({
            status:500,
            data:null
        });
    })
});

// test  token
router.post('/testToken', function (req, res) {
    console.log(req.headers.token);
    let token = req.headers.token;
    let jwt = new JwtUtil(token);
    let result = jwt.verifyToken();
    if (result == 'err') {
        console.log(result);
        res.send({msg: result});
    } else {
        res.send({msg: 'ok'});
    }
});

function updateUser(id, obj, cb) {
    new Promise((resolve, reject) => {
        users.findOne({_id: id}, (err, doc) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        })
    }).then(() => {
        return new Promise((resolve, reject) => {
            users.update({_id: id}, {$set: obj}, (err, doc) => {
                if (err) {
                    reject(err);
                } else {
                    cb(200);
                    /*res.send({
                        status:200,
                        msg:'成功'
                    });*/
                }
            })
        });
    }).catch((err) => {
        console.error(err);
        cb(500);
        /*res.send({
            status:500,
            msg:'失败'
        });*/
    })
}

module.exports = router;
