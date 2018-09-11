/*
 *   笔记类型
 *   默认﻿(美食、旅游、时尚、科技、汽车、其他)
 *   @params  notename  笔记类型名称
 * */
var mongoose = require('./../../db/dbmongo');
var Schema = mongoose.Schema;
var noteTypeSchema = new Schema({
    notename: String,
    memo:String
}, {
    timestamps: {
        createdAt: 'createtime',
        updatedAt: 'updattime'
    }
});
var schema = mongoose.model('NoteType', noteTypeSchema);
module.exports = schema;
