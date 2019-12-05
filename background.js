browser.contextMenus.onClicked.addListener(function(info, tab) {
    browser.tabs.executeScript({
        file: "beautiful-doggos.js"
      });
});