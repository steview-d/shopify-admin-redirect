// Run this when the extenstion icon is clicked

const currentUrl = new URL(window.location.href);

chrome.storage.local.get('storefronts', function (d) {
  let currentStore = d.storefronts.filter(s => {
    if (currentUrl.host == s.fUrl) return s;
  })[0];

  if (currentUrl.host == currentStore.fUrl) {
    switch (true) {
      case currentUrl.pathname.includes('/products'):
        redirect(
          currentUrl,
          currentStore,
          'products',
          'var meta = {"product":{"id":',
          ',"gid":"gid:'
        );
        break;

      case currentUrl.pathname.includes('/collections'):
        redirect(
          currentUrl,
          currentStore,
          'collections',
          '"resourceType":"collection","resourceId":',
          '}};'
        );
        break;

      case currentUrl.pathname.includes('/pages'):
        redirect(
          currentUrl,
          currentStore,
          'pages',
          '"resourceType":"page","resourceId":',
          '}};'
        );
        break;

      default:
        window.open(`https://${currentStore.bUrl}.myshopify.com/admin`);
    }
  }
});

async function redirect(url, store, template, startSplit, endSplit) {
  let response = await fetch(url);
  let rText = await response.text();
  let id = rText.split(startSplit)[1].split(endSplit)[0];
  window.open(
    `https://${store.bUrl}.myshopify.com/admin/${template}/${id}`
  );
}
