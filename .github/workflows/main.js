// pranpriya-admin-v2-desktop — a thin desktop shell around the newer
// unified admin dashboard (pranpriya-admin-v2.ausmart304.workers.dev),
// which lets you edit text/images directly across every site in the
// network (main, TMPS, TMAH, Sonawa, ไทยสยาม, พันธมิตรนวด) from one place
// with tabs.
//
// This is a SEPARATE program from "ปราณปรียา แอดมิน" (which opens the
// older admin-ui dashboard) -- install both side by side, they don't
// conflict with each other.
//
// This does NOT reimplement the admin -- it just opens the same live
// site inside its own window. Any future updates to the web admin show
// up here automatically, since it's the same site.

const { app, BrowserWindow, Menu, shell } = require("electron");
const path = require("path");

const ADMIN_URL = "https://pranpriya-admin-v2.ausmart304.workers.dev/";

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 960,
    minHeight: 640,
    title: "ปราณปรียา แอดมิน 2",
    backgroundColor: "#f4f1e8",
    icon: path.join(__dirname, "build", "icon.ico"),
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  win.loadURL(ADMIN_URL);

  // Links that try to open a new window (target="_blank") go to the
  // user's normal browser instead of spawning another Electron window.
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  const menu = Menu.buildFromTemplate([
    {
      label: "เมนู",
      submenu: [
        { label: "รีเฟรชหน้า", accelerator: "CmdOrCtrl+R", click: () => win.reload() },
        {
          label: "ย้อนกลับ",
          accelerator: "Alt+Left",
          click: () => {
            if (win.webContents.canGoBack()) win.webContents.goBack();
          },
        },
        { type: "separator" },
        {
          label: "เต็มจอ",
          accelerator: "F11",
          click: () => win.setFullScreen(!win.isFullScreen()),
        },
        {
          label: "เครื่องมือนักพัฒนา",
          accelerator: "F12",
          click: () => win.webContents.toggleDevTools(),
        },
        { type: "separator" },
        { label: "ออกจากโปรแกรม", role: "quit" },
      ],
    },
  ]);
  Menu.setApplicationMenu(menu);

  return win;
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
