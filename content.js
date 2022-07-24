// Run script to gain access to the store name via the Shopify.shop value
var s = document.createElement('script');
s.src = chrome.runtime.getURL('shop_name.js');
s.onload = function () {
  this.remove();
};
(document.head || document.documentElement).appendChild(s);

document.addEventListener('shopNameEvent', function (e) {
  var shopName = e.detail;
  console.log('received', shopName);

  // TODO trying to send message...
  chrome.runtime.sendMessage({
    message: 'shop_name',
    payload: shopName
  });
});
