const { app, BrowserWindow } = require('electron');
const path = require('path');
var request = require('request');
var fs = require('fs');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

//File downloading function
/* USEAGE -->
downloadFile({
  remoteFile: "https://someurl/foo.bar",
  localFile: `${__dirname}/tmp/foo.bar`,
  onProgress: function (received,total){
      var percentage = Math.trunc((received * 100) / total);
      console.log(percentage + "% | " + received + " bytes out of " + total + " bytes.");
  }
}).then(function(){
  console.log("File succesfully downloaded");
});
*/
function downloadFile(configuration){
  return new Promise(function(resolve, reject){
      // Save variable to know progress
      var received_bytes = 0;
      var total_bytes = 0;

      var req = request({
          method: 'GET',
          uri: configuration.remoteFile
      });

      var out = fs.createWriteStream(configuration.localFile);
      req.pipe(out);

      req.on('response', function ( data ) {
          // Change the total bytes value to get progress later.
          total_bytes = parseInt(data.headers['content-length' ]);
      });

      // Get progress if callback exists
      if(configuration.hasOwnProperty("onProgress")){
          req.on('data', function(chunk) {
              // Update the received bytes
              received_bytes += chunk.length;

              configuration.onProgress(received_bytes, total_bytes);
          });
      }else{
          req.on('data', function(chunk) {
              // Update the received bytes
              received_bytes += chunk.length;
          });
      }

      req.on('end', function() {
          resolve();
      });
  });
}