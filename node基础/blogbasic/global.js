global.console.log('global方法')
global.setTimeout(() => {
    console.log(123);

}, 2000);
setTimeout(() => {
    console.log('全局变量');

}, 2000);