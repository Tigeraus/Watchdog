/**
 * @name:watchdog
 * @author:huzi
 * @version:0.0.1
 */

var watch = require('watch');
var fs = require('fs');
var rd = require('rd');
var config = require('./config/config.json');
var pug = require('pug');
var compiledFunction = pug.compileFile('./config/index.pug');



/**
 * load config
 */
var mainfolder;
var welcomewords = config.welcomewords;
if (config.filedir=="default"){
    mainpath = process.cwd()+'/maindir';
}
else {
    mainpath = config.filedir;
};



/**
 * main process
 */

watch.createMonitor(mainpath, function (monitor) {
    monitor.on("created", function (f, stat) {
    if (f.slice(-10)!= 'index.html'){
        var current_time = new Date().toLocaleString()
        filelist = getfilelist(mainpath);
        createpage(mainpath,current_time,welcomewords,filelist);
    }
    });
    monitor.on("changed", function (f, curr, prev) {
    if (f.slice(-10)!= 'index.html'){
        var current_time = new Date().toLocaleString()
        filelist = getfilelist(mainpath);
        createpage(mainpath,current_time,welcomewords,filelist);
    }
    });
    monitor.on("removed", function (f, stat) {
    if (f.slice(-10)!= 'index.html'){
        var current_time = new Date().toLocaleString()
        filelist = getfilelist(mainpath);
        createpage(mainpath,current_time,welcomewords,filelist);
    }
    });
    //monitor.stop(); // Stop watching
});


/**
 * update pages
 */
function createpage(current_path,update_time, words,filelist){
    var htmltext = compiledFunction({
        welcomewords: words,
        uptime: update_time,
        filelist: filelist
    });
    fs.writeFile(current_path + "/index.html", htmltext, function(err) {
        if(err) {
            return console.log(err);
        };
    });
};


function getfilelist(path){
    prefix = path;
    var filedic = {};
    var rawfilelist = rd.readSync(path);
    var filelist = new Array();
    for (var i=0;i< rawfilelist.length;i++){
        if (rawfilelist[i].match('index.html')!=null || rawfilelist[i].match('.DS_Store')!=null ){
            continue
        }
        else {
            filelist.push(rawfilelist[i]);
        }
    };
    var contentlist = new Array();
    for (var i=1;i<filelist.length;i++){
        filelist[i] = '.'+filelist[i].slice(prefix.length)
        filename = filelist[i].slice(2);
        contentlist.push({'name':filename,'path':filelist[i]});
    }
    return contentlist;
};