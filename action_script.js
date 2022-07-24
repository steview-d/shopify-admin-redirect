// Run this when the extenstion icon is clicked
chrome.storage.local.get('storefronts', function (d) {
  const currentUrl = new URL(window.location.href);
  const templates = ['product', 'collection', 'page'];

  const currentStore = d.storefronts.filter(s => {
    if (currentUrl.host == s.fUrl) return s;
  })[0];

  if (currentUrl.host == currentStore.fUrl) {
    let templateMatched = false;
    templates.forEach(template => {
      if (currentUrl.pathname.includes(`/${template}s/`)) {
        templateMatched = true;
        redirect(currentUrl, currentStore, template);
      }
    });

    if (!templateMatched)
      window.open(
        `https://${currentStore.bUrl}.myshopify.com/admin/`
      );
  }
});

async function redirect(url, store, template) {
  let response = await fetch(url + '.json');
  let json = await response.json();
  window.open(
    `https://${store.bUrl}.myshopify.com/admin/${template}s/${json[template].id}`
  );
}
