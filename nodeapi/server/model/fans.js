/**
 *  @Description:
 *  @date   2018/9/6
 *  @author liuzhenchao
 *
 **/

/*
* 粉丝关联表
* */

var mongoose = require('./../../db/dbmongo');
var Schema = mongoose.Schema;
var fansSchema = new Schema({
    author:String,          // 作者
    fans:Array              // 粉丝
},{
    timestamps: {
        createdAt: 'createtime',
        updatedAt: 'updattime'
    }});
var schema = mongoose.model('Fans',fansSchema);
module.exports = schema;