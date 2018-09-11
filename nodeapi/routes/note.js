const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

var noteType = require('../server/model/noteType');
var note = require('../server/model/note');
var user = require('../server/model/user');

var SortByKey = require('../public/utils/sort');
const sortByKey = new SortByKey();
// 每页的数据条数
global.limit;
// 展示list
router.post('/getList', (req, res) => {
    var page = req.body.page;
    var noteType = req.body.noteType;
    // const limit = 2;
    new Promise((resolve, reject) => {
        let param = noteType ? {'noteType': noteType} : {};
        let data = note.find(param);
        data.sort({_id: 1}).skip(global.limit * page).limit(global.limit);
        resolve(data);
    }).then((result) => {
        res.send({
            status: 200,
            data: result
        });
    }).catch((err) => {
        console.err(err);
        res.send({
            status: 500,
            data: '查询失败'
        })
    });
});

// 添加
router.post('/noteInfo', (req, res) => {
    var id = req.body.id;
    if (!id || id == '') {
        new Promise((resolve, reject) => {
            let note1 = new note({
                notename: '测试',      // 笔记名称
                noteType: req.body.noteType,      // 笔记类型
                noteAuthor: req.body.noteAuthor,    // 作者
                noteText: req.body.noteText,      // 内容
                picture: req.body.picture,       // 展示图片
                fabulous: 0       // 点赞数量
            });
            note1.save((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        }).then((result) => {
            res.send({
                status: 200,
                msg: '添加成功'
            });
        }).catch((err) => {
            console.err('添加笔记失败,err:' + err);
            res.send({
                status: 500,
                msg: '添加失败'
            });
        })
    } else {
        new Promise((resolve, reject) => {
            note.update({_id: id}, {
                $set: {
                    notename: req.body.notename,
                    noteType: req.body.noteType,
                    noteAuthor: req.body.noteAuthor,
                    noteText: req.body.noteText,
                    picture: req.body.picture,
                    fabulous: req.body.fabulous
                }
            }, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        }).then((result) => {
            res.send({
                status: 200,
                msg: '编辑成功'
            })
        }).catch((err) => {
            console.err('编辑笔记失败,err:' + err);
            res.send({
                status: 500,
                msg: '编辑失败'
            });
        });
    }
});

// delete
router.get('/deleteNote', (req, res) => {
    var id = req.query.id;
    new Promise((resolve, reject) => {
        note.remove({_id: id}, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    }).then((result) => {
        res.send({
            status: 200,
            msg: '删除成功'
        });
    }).catch((err) => {
        console.err('删除笔记失败,err:' + err);
        res.send({
            status: 500,
            msg: '删除失败'
        });
    });
});

// 点赞
router.get('/fabulous', (req, res) => {
    var id = req.query.noteId;
    var userId = req.query.userId;
    new Promise((resolve, reject) => {
        note.findOne({_id: id}, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.fabulous);
            }
        })
    }).then((result) => {
        return new Promise((resolve, reject) => {
            user.findOne({_id: userId}, (err, doc) => {
                if (err) {
                    reject(err);
                } else {
                    let obj = {
                        num: result,
                        storeAtricles: doc.storeAtricles
                    }
                    resolve(obj);
                }
            });
        })
    }).then((obj) => {
        return new Promise((resolve, reject) => {
            let storeAtricles = obj.storeAtricles;
            if (storeAtricles.toString().indexOf(id) == -1) {
                storeAtricles.push(id);
                user.update({_id: userId}, {$set: {storeAtricles: storeAtricles}}, (err, doc) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(obj.num);
                    }
                });
            } else {
                res.send({
                    status: 201,
                    msg: '已经点过了'
                });
            }
        })
    }).then((result) => {
        var num = result + 1;
        note.update({_id: id}, {
            $set: {fabulous: num}
        }, (err, rel) => {
            if (err) {
                res.send({
                    status: 500,
                    msg: '失败'
                });
            } else {
                res.send({
                    status: 500,
                    msg: num
                });
            }
        })
    }).catch((err) => {
        console.error(err);
        res.send({
            status: 500,
            msg: '失败'
        });
    });
});

// 查询笔记类型
router.get('/getNotetype', (req, res) => {
    new Promise((resolve, reject) => {
        noteType.find({}).exec((err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    }).then((result) => {
        res.send({
            status: 200,
            data: result
        });
    }).catch((err) => {
        console.err('查询笔记类型失败,err' + err);
        res.send({
            status: 500,
            data: '查询失败'
        });
    });
});

// 添加/编辑笔记类型
router.post('notetypeInfo', (req, res) => {
    var id = req.body.id;
    var typeObj = {
        notename: req.body.notename,
        memo: req.body.memo
    };
    if (!id || id == '') {
        new Promise((resolve, reject) => {
            let addNoteType = new noteType(typeObj);
            addNoteType.save((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        }).then((result) => {
            console.log('添加笔记类型成功');
            res.send({
                status: 200,
                msg: '添加笔记类型成功'
            });
        }).catch((err) => {
            console.err('添加笔记类型失败,err:' + err);
            res.send({
                status: 500,
                msg: '添加笔记类型失败'
            });
        });
    } else {
        new Promise((resolve, reject) => {
            noteType.update({_id: id}, {$set: typeObj}, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        }).then((result) => {
            console.log('编辑笔记类型成功');
            res.send({
                status: 200,
                msg: '编辑笔记类型成功'
            });
        }).catch((err) => {
            console.err('编辑笔记类型失败,err:' + err);
            res.send({
                status: 500,
                msg: '编辑笔记类型失败'
            });
        });
    }
});

// 删除笔记类型
router.get('/deleteType', (req, res) => {
    var id = req.query.id;
    new Promise((resolve, reject) => {
        noteType.remove({_id: id}, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    }).then((result) => {
        res.send({
            status: 200,
            msg: '删除成功'
        });
    }).catch((err) => {
        console.err('删除笔记类型失败,err:' + err);
        res.send({
            status: 500,
            msg: '删除失败'
        });
    });

});

// 发现
router.get('/search', (req, res) => {
    let keyword = req.query.keyword;
    let page = req.query.page;
    console.log(keyword);
    new Promise((resolve, reject) => {
        // note.find()
        var keyWord = new RegExp(keyword, 'i');
        /*var options = {};
        if (keyword != '') {
            options = {
                $or: [
                    {'﻿notename': {$regex: keyword, $options: 'i'}},
                    {'﻿noteType': {$regex: keyword, $options: 'i'}},
                    {'﻿noteText': {$regex: keyword, $options: 'i'}}
                ]
            };
        }*/
        // or([{'﻿noteText':{$regex:keyword,$options:'i'}}]).
        // .skip(global.limit * page).limit(global.limit).
        /*let seachD = note.find({
            $or: [
                {'noteText': {$regex: keyWord}}
            ]
        });
        let result = seachD.skip(global.limit * page).limit(global.limit);
        console.log(seachD);
        console.log(result);
        resolve(result);*/
        console.log(global.limit);
        console.log(page);
        note.find({
            $or: [
                {'noteText': {$regex: keyWord}}
            ]
        }).sort({_id: 1}).skip(global.limit * page).limit(global.limit).exec((err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    }).then((result) => {
        res.send({status: 200, msg: 'this is finder', data: result});
    }).catch((err) => {
        console.error(err);
        res.send({status: 500, data: []});
    })
});

/*
* 发表帖子图片上传 并返回图片路径
* */
router.post('/uploadImg', (req, res) => {
    let form = new formidable.IncomingForm();
    let imgPath = '../static/images';
    // 设置编码格式
    form.encoding = 'utf-8';
    // 如果目录不存在则创建
    try {
        if (!fs.existsSync(imgPath)) {
            fs.mkdirSync(path.join(__dirname, imgPath));
        }
    } catch (e) {
        console.log(e);
    }

    // 设置上传目录
    form.uploadDir = path.join(__dirname, imgPath);
    // 保留后缀
    form.keepExtensions = true;
    // form.maxFieldsSize = 6 * 1024;
    new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) {
                reject(err);
            } else {
                resolve(files.file);
            }
        });
    }).then((file) => {
        let nameArray = file.name.split('.');
        let type = nameArray[nameArray.length - 1];
        var name = '';
        for (var i = 0; i < nameArray.length - 1; i++) {
            name = name + nameArray[i];
        }
        let date = new Date().getTime();
        let avatarName = 'note_' + date + '.' + type;
        let newPath = form.uploadDir + "/" + avatarName;
        let host = req.headers.host;
        let clientPath = 'http://' + host + '/static/images/' + avatarName;
        return new Promise((resolve, reject) => {
            fs.rename(file.path, newPath, (err) => {
                if (err) {
                    reject(err);
                } else {
                    res.setHeader('content-type', file.type);
                    res.send({
                        status: 200,
                        files: newPath,
                        path: clientPath
                    });
                }
            });

        });
    }).catch((err) => {
        console.error(err);
        res.send({
            status: 500,
            files: []
        });
    });
});

// 删除图片
router.get('/delImage', (req, res) => {
    let imgUrl = req.query.imgUrl;
    let imgArr = imgUrl.split('/');
    let imgName = imgArr[imgArr.length - 1];
    let imgPath = '../static/images/' + imgName;
    let delPath = path.join(__dirname, imgPath);
    fs.unlink(delPath, (err) => {
        if (err) {
            console.error(err);
            res.send({status: 200});
        } else {
            res.send({status: 200});
        }
    })
});

/*
* 获取用户发帖
* */
router.post('/getNoteByUser', (req, res) => {
    let id = req.body.id;
    new Promise((resolve, reject) => {
        note.find({'noteAuthor.id': id}).exec((err, docs) => {
            if (err) {
                reject(err);
            } else {
                resolve(docs);
            }
        });
    }).then((result) => {
        res.send({
            status: 200,
            data: result
        });
    }).catch((err) => {
        console.error(err);
        res.send({
            status: 500,
            data: null
        });
    });
});
/*
* 获取用户关注
* */
router.post('/getNoteByFollow',(req,res) => {
    let id = req.body.id;
    let obj = {
        id:id,
        noteKey:'noteAuthor.id',
        userKey: 'followAuthors'
    };
    getNote(obj,(err,result) => {
        if(err){
            res.send({
                status:500,
                data:null
            })
        }else{
            res.send({
                status:200,
                data:result
            });
        }
    });
});
/*
*  获取用户收藏
* */
router.post('/getNoteByStore',(req,res) => {
    let id = req.body.id;
    let obj = {
        id:id,
        noteKey:'_id',
        userKey:'storeAtricles'
    };
    getNote(obj,(err,result) => {
        if(err){
            res.send({
                status:500,
                data:null
            })
        }else{
            res.send({
                status:200,
                data:result
            });
        }
    });
});
function getNote(obj,cb){
    new Promise((resolve,reject) => {
        user.findOne({_id:obj.id}).exec((err,doc) => {
            if(err){
                reject(err);
            }else{
                resolve(doc[obj.userKey]);
            }
        });
    }).then((result) => {
        var arr = [];
        let key = obj.noteKey;
        return new Promise((resolve, reject) => {
            result.forEach((item,index,ses) => {
                note.find({[key]:item}).exec((err,docs) => {
                    if(err){
                        reject(err);
                    }else {
                        arr = arr.concat(docs);
                        if(index == ses.length - 1){
                            resolve(arr);
                        }
                    }
                })
            });
        })
    }).then((result) => {
        console.log('关注查询成功');
        // let arr = result.sort({'createtime':1});
        let arr = sortByKey.sort(result,'createtime',1);
        cb(null,arr);
        /*res.send({
            status:200,
            data:arr
        });*/
    }).catch((err) => {
        console.error(err);
        cb(err,null);
        /*res.send({
            status:500,
            data:null
        })*/
    })
}
module.exports = router;