/*
 *   用户登录/注册
 *   @params  username  用户名
 *   @params  password  密码
 * */
var mongoose = require('./../../db/dbmongo');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    username: String,       // 用户名
    password: String,       // 密码
    portrait: String,       // 头像
    nickname: String,       // 昵称
    backgoundPic: String,   // 背景图像
    selfsign: String,       // 签名
    storeAtricles: Array,   // 收藏文章列表
    followAuthors: Array,   // 关注的作者
    fans:Array              // 粉丝
},{
    timestamps: {
        createdAt: 'createtime',
        updatedAt: 'updattime'
    }});
var schema = mongoose.model('User',userSchema);
module.exports = schema;
