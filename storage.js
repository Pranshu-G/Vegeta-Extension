export class Configs{
    urls = [];

}
export const localStorage = {
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

