// Run script to gain access to the store name via the Shopify.shop value
var s = document.createElement('script');
s.src = chrome.runtime.getURL('shop_name.js');
s.onload = function () {
  this.remove();
};
(document.head || document.documentElement).appendChild(s);

// ** listen for shop name
if (!document.body.classList.contains('hasEvent')) {
  document.addEventListener('shopNameEvent', function (e) {
    document.body.classList.add('hasEvent');
    var shopName = e.detail;

    // ** send message to background.js
    if (chrome.runtime?.id !== undefined) {
      chrome.runtime.sendMessage({
        message: 'shop_name',
        payload: shopName,
      });
    }
  });
}
