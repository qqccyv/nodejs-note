const { exec } = require('../db/mysql');
const getList = (author, keyword) => {
    let sql = `select*from blogs where 1=1 `
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`
    return exec(sql)
}
const getDetail = (id) => {
    const sql = `select*from blogs where id="${id}"`
    return exec(sql).then(rows => {
        return rows[0]
    })
}
const newBlog = (blogData = {}) => {
    // console.log(blogData);

    return {
        id: 3
    }
}
const updateBlog = (id, blogData = {}) => {
    // console.log(blogData, id);

    return true
}
const delBlog = (id) => {
    return true
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}