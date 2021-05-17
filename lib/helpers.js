function showLog(type, text) {
    let color = "\x1b[0m%s\x1b[0m";

    if(type == 'error'){
        color = "\x1b[31m%s\x1b[0m";
    }else if(type == 'info'){
        color = "\x1b[36m%s\x1b[0m";
    }else if(type == 'success'){
        color = "\x1b[32m%s\x1b[0m";
    }
    console.log(color,text);
}

module.exports = {
    showLog: showLog
}