const getList = (author, keyword) => {
    return [{
            id: 1,
            title: '标题A',
            content: '内容A',
            createTime: 1578205925836,
            author: '张三'
        },
        {
            id: 2,
            title: '标题B',
            content: '内容B',
            createTime: 1578205991307,
            author: '李四'
        },

    ]
}
const getDetail = (id) => {
    return {
        id: 1,
        title: '标题A',
        content: '内容A',
        createTime: 1578205925836,
        author: '张三'
    }
}
const newBlog = (blogData = {}) => {
    // console.log(blogData);

    return {
        id: 3
    }
}
module.exports = {
    getList,
    getDetail,
    newBlog
}