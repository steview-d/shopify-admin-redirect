// Run this when the extenstion icon is clicked

const currentUrl = new URL(window.location.href)

if (currentUrl.pathname.includes('/products')) {
  redirectProductPage(currentUrl)
}

async function redirectProductPage(url) {
  let response = await fetch(url)
  let rText = await response.text()
  let productId = rText.split('var meta = {"product":{"id":')[1].split(',"gid":"gid:')[0]
  window.open(`https://e-liquids-1.myshopify.com/admin/products/${productId}`);
}