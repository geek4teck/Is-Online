const { app, BrowserWindow, Menu, Tray } = require("electron");
const path = require("path");
var ping = require("ping");
var host = "google.com";

let tray = null;
app.whenReady().then(() => {});
function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  //createWindow();
  setTimeout(() => {
    pingNow();
  }, 1000);
  tray = new Tray("./Loading.png");
  tray.setToolTip("This is my application.");
  //   tray.setContextMenu(contextMenu);

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

const pingNow = () => {
  ping.sys.probe(host, function (isAlive) {
    var msg = isAlive
      ? "host " + host + " is alive"
      : "host " + host + " is dead";
    console.log(msg);
    if (isAlive) setOnline();
    else setOffline();
    setTimeout(() => {
      pingNow();
    }, 1000);
  });
};

const setOnline = () => {
  tray.setToolTip("Online!");
  tray.setImage("./Online.png");
};

const setOffline = () => {
  tray.setToolTip("Offline!");
  tray.setImage("./Offline.png");
};

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
