/**
 * Created by yu on 2016/6/30.
 */
var child_process = require("child_process"),
    url = "http://www.baidu.com";
var cmd;

console.log(process.platform)
if(process.platform == 'wind32'){

    cmd  = 'start http://www.baidu.com';

}else if(process.platform == 'linux'){

    cmd  = 'xdg-open';

}else if(process.platform == 'darwin'){

    cmd  = 'open';

}

child_process.exec(cmd,(err,stdout,stderr)=>{
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    if (err !== null) {
        console.log(`exec error: ${err}`);
    }
})