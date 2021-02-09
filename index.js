const { app, Tray, Menu } = require("electron");
const path = require("path");
let ping = require("ping");
let host = "google.com";
let tray = null;
const contextMenu = Menu.buildFromTemplate([
  {
    label: "Exit",
    type: "radio",
    click() {
      console.log("Exit Clicked from Menu");
      app.quit();
    },
  },
]);

app.whenReady().then(() => {
  let icon = path.join(__dirname, "assets/Loading.png");
  tray = new Tray(icon);
  tray.setToolTip("Checking....");

  tray.setContextMenu(contextMenu);
  setTimeout(() => {
    pingNow();
  }, 1000);
});

app.on("before-quit", function () {
  console.log("Quitting App.... ");
  tray.destroy();
});

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
  let icon = path.join(__dirname, "assets/Online.png");
  tray.setImage(icon);
};

const setOffline = () => {
  tray.setToolTip("Offline!");
  let icon = path.join(__dirname, "assets/Offline.png");
  tray.setImage(icon);
};
