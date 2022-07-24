chrome.runtime.onInstalled.addListener(() => {
  // default state goes here
  // this runs ONE TIME ONLY (unless the user reinstalls your extension)
  chrome.storage.local.set({
    storefronts: [
      {
        "fUrl": "e-liquids.com",
        "bUrl": "e-liquids-1"
      },
      {
        "fUrl": "beyouonline.co.uk",
        "bUrl": "beyouonline"
      },
      {
        "fUrl": "vapesupplier.co.uk",
        "bUrl": "vapesupplier"
      },
      {
        "fUrl": "vitalitycbd.co.uk",
        "bUrl": "vitalitycbd"
      }
    ]
}, function (){})
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
      chrome.scripting.insertCSS({
          target: { tabId: tabId },
          files: ["./foreground_styles.css"]
      })
          .then(() => {
              console.log("INJECTED THE FOREGROUND STYLES.");

              chrome.scripting.executeScript({
                  target: { tabId: tabId },
                  files: ["./foreground.js"]
              })
                  .then(() => {
                      console.log("INJECTED THE FOREGROUND SCRIPT.");
                  });
          })
          .catch(err => console.log(err));
  }
});

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['action_script.js']
  });
});