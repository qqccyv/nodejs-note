function serializeToJson(form) {
    let result = {};
    let f = form.serializeArray();
    f.forEach(function(item) {
        result[item.name] = item.value;
    });
    return result;
}

function animate(obj, target, callback) {

    clearInterval(obj.timer);
    obj.timer = setInterval(function() {

        if (obj.offsetTop == target) {
            clearInterval(obj.timer);
            if (callback) {
                callback();
            }
        }
        obj.style.top = obj.offsetTop - 1 + 'px';

    }, 15);
}
document.onclick = function(e) {
    var box = document.createElement('div');
    var heart = document.createTextNode("❤");
    box.appendChild(heart)
    box.style.position = 'absolute';
    box.style.left = e.clientX + 'px';
    box.style.top = e.clientY + 'px';
    box.style.color = "rgb(" + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + ")";
    box.style.zIndex = 100000;

    document.body.appendChild(box);
    let target = e.clientY - 20
    animate(box, target, function() {
        document.body.removeChild(box);
    })
}