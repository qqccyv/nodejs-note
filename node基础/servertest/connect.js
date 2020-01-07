const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/player', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('连接成功'))
    .catch((err) => console.log(err, '连接失败'))

//设置规则
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    isPublishen: Boolean
});
//创建模板
const Course = mongoose.model('Course', courseSchema);





//创建插入数据库的实例
// const course = new Course({
//         name: 'dengyu',
//         author: 'dengyu',
//         isPublishen: true
//     })
//     //插入数据库
// course.save();


Course.create({
    name: 'dengyu11',
    author: 'dengyu11',
    isPublishen: true
}).then((result) => {
    console.log(result);

})

// mongoimport -d 数据库名称 -c 集合名称 --file 要导入的数据文件  在控制台中批量导入