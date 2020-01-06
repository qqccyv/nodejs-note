var a = function(name) {
    console.log('hello' + name);

}
exports.sayHai = a
console.log(module.exports === exports);