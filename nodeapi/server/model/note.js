/*
 *   笔记
 *   @params  notename  笔记名称
 *   @params  noteText  笔记内容
 * */
var mongoose = require('./../../db/dbmongo');
var Schema = mongoose.Schema;
var noteSchema = new Schema({
    notename: String,      // 笔记名称(该功能未添加，默认都是测试)
    noteType: String,      // 笔记类型()
    noteAuthor: {
        id:String,
        nickname:String,
        portrait:String
    },                     // 作者
    noteText: String,      // 内容
    picture: Array,        // 展示图片路径
    fabulous: Number       // 点赞数量
}, {
    timestamps: {
        createdAt: 'createtime', // 创建时间
        updatedAt: 'updattime'   // 更新时间
    }
});
var schema = mongoose.model('note', noteSchema);
module.exports = schema;