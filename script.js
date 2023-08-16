const ERROR =
  "Error: Tabs cannot be edited right now (user may be dragging a tab).";
async function redirect(tabId, changeInfo, tab) {
  console.log("Updated to URL:", tab.url);
  try {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      let url = tabs[0].url;
      console.log("inside redirect");
      console.log(url);

      let blocked_url = [];
      localStorage.get((userData) => {
        console.log(userData.urls);
        userData.urls.forEach(async (element) => {
          if (url.includes(element)) {
            await chrome.tabs.update(tab.id, { url: "./image.html" });
            return;
          }
        });
      });
    });
  } catch (error) {
    if (error == ERROR) {
      setTimeout(() => redirect(tabId, changeInfo, tab), 50);
    } else {
      console.error(error);
    }
  }
}
chrome.tabs.onUpdated.addListener(redirect);

class Configs {
  urls = [];
}
const localStorage = {
  get: function (callback) {
    chrome.storage.sync.get({ configs: new Configs() }, function (storage) {
      callback(storage.configs);
    });
  },
  set: function (configs, callback) {
    chrome.storage.sync.set({ configs: configs }, function () {
      if (callback) {
        callback();
      }
    });
  },
  listen: function (callback) {
    chrome.storage.onChanged.addListener(function (changes) {
      if (changes.configs) {
        callback(changes.configs.newValue);
      }
    });
  },
};
