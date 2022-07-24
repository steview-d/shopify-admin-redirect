chrome.runtime.onInstalled.addListener(() => {
  // default state goes here
  // this runs ONE TIME ONLY (unless the user reinstalls your extension)
  chrome.storage.local.set(
    {
      storefronts: [
        {
          fUrl: 'e-liquids.com',
          bUrl: 'e-liquids-1',
        },
        {
          fUrl: 'beyouonline.co.uk',
          bUrl: 'beyouonline',
        },
        {
          fUrl: 'vapesupplier.co.uk',
          bUrl: 'vapesupplier',
        },
        {
          fUrl: 'vitalitycbd.co.uk',
          bUrl: 'vitalitycbd',
        },
      ],
    },
    function () {}
  );
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
    chrome.scripting
      .insertCSS({
        target: { tabId: tabId },
        files: ['./foreground_styles.css'],
      })
      .then(() => {
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ['./content.js'],
        });
      })
      .catch(err => console.log(err));
  }
});

// ** listen for extension icon click
chrome.action.onClicked.addListener(tab => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: iconClickAction,
    args: [shopName],
  });
});

// ** listen for message sending shopName from content script
let shopName;
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message == 'shop_name') {
    shopName = request.payload;
    return true;
  }
});

// ** What to do when extension icon is clicked
function iconClickAction(shopName) {
  console.log('foooooo', shopName);

  // Run this when the extenstion icon is clicked
  const currentUrl = new URL(window.location.href);
  const templates = ['product', 'collection', 'page'];

  let templateMatched = false;
  templates.forEach(template => {
    if (currentUrl.pathname.includes(`/${template}s/`)) {
      templateMatched = true;
      redirect(currentUrl, shopName, template);
    }
  });

  if (!templateMatched) window.open(`https://${shopName}/admin/`);

  async function redirect(url, shopName, template) {
    let response = await fetch(url + '.json');
    let json = await response.json();
    window.open(
      `https://${shopName}/admin/${template}s/${json[template].id}`
    );
  }
}
