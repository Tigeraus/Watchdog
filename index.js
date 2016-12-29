/**
 * @name:watchdog
 * @author:huzi
 * @version:0.0.1
 */

var watch = require('watch');
var fs = require('fs');
var config = require('./config/config.json');

/**
 * load config
 */
var mainfolder;
var welcomewords = config.welcomewords;

console.log(config.filedir)

if (config.filedir=="default"){
    mainfolder = './maindir';
}
else {
    mainfolder = config.filedir;
};



/**
 * main process
 */

watch.createMonitor(mainfolder, function (monitor) {
    //monitor.files['./maindir/test.txt'] // Stat object for my zshrc.
    monitor.on("created", function (f, stat) {
        var current_time = new Date().toLocaleString()
        console.log('created new file')
      // Handle new files
    });
    monitor.on("changed", function (f, curr, prev) {
        var current_time = new Date().toLocaleString()
        console.log('file changed!')
      // Handle file changes
    });
    monitor.on("removed", function (f, stat) {
        var current_time = new Date().toLocaleString()
        console.log('file removed!')
      // Handle removed files
    });
    //monitor.stop(); // Stop watching
});


/**
 * update pages
 */
function createpage(current_path,update_time, words){
    var htmltext = '';
    fs.writeFile(current_path + "index.html", htmltext, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });


};