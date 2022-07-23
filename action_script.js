// Run this when the extenstion icon is clicked

const currentUrl = new URL(window.location.href)

if (currentUrl.pathname.includes('/products')) {
  redirectProduct(currentUrl)
} else if (currentUrl.pathname.includes('/collections')) {
  redirectCollection(currentUrl)
} else if (currentUrl.pathname.includes('/pages')) {
  redirectPage(currentUrl)
}

async function redirectProduct(url) {
  let response = await fetch(url)
  let rText = await response.text()
  let productId = rText.split('var meta = {"product":{"id":')[1].split(',"gid":"gid:')[0]
  window.open(`https://e-liquids-1.myshopify.com/admin/products/${productId}`);
}

async function redirectCollection(url) {
  let response = await fetch(url)
  let rText = await response.text()
  let collectionId = rText.split('"resourceType":"collection","resourceId":')[1].split('}};')[0]
  window.open(`https://e-liquids-1.myshopify.com/admin/collections/${collectionId}`);
}

async function redirectPage(url) {
  let response = await fetch(url)
  let rText = await response.text()
  let pageId = rText.split('"resourceType":"page","resourceId":')[1].split('}};')[0]
  window.open(`https://e-liquids-1.myshopify.com/admin/pages/${pageId}`);
}