const mongoose = require('mongoose');

let url = 'mongodb://127.0.0.1:27017/admin';
mongoose.connect(url, {
    user: 'root',
    pass: 'root@123'
});

mongoose.connection.on('connected', function (s) {
    console.log('连接到mongodb成功');
});
mongoose.connection.on('error', function (e) {
    console.log(e);
});

module.exports = mongoose;