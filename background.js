chrome.runtime.onInstalled.addListener(() => {
  // ** default state, only runs once, on install
});

// ** load content.js script

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
//     chrome.scripting.executeScript({
//       target: { tabId: tabId },
//       files: ['./content.js'],
//     });
//   }
// });

chrome.tabs.onActivated.addListener(cb => {
  console.log(cb);
  chrome.scripting.executeScript({
    target: { tabId: cb.tabId },
    files: ['./content.js'],
  });
});

// ** listen for message sending shopName from content script
let shopName;
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message == 'shop_name') {
    shopName = request.payload;
    sendResponse('success');
    // return true;
  }
});

// ** listen for extension icon click
chrome.action.onClicked.addListener(tab => {
  console.log('shopName', typeof shopName, shopName, tab);
  if (typeof shopName === 'string' || shopName instanceof String) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: iconClickAction,
      args: [shopName],
    });
  }
});

/**
 ** Action to take when extension icon is clicked
 * @param {str} shopName | The 'myshopify.com' shop name
 */
function iconClickAction(shopName) {
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
    console.log(url);
    let response = await fetch(url.href.replace(url.search, '') + '.json');
    let json = await response.json();
    window.open(`https://${shopName}/admin/${template}s/${json[template].id}`);
  }
}
