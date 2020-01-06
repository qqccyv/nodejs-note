const fs = require('fs');
fs.readFile('./file.txt', 'utf8', (err, doc) => {
    if (err == null) {
        console.log(doc);

    } else {
        console.log(err);

    }
})