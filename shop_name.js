// ** Send shop name to content script
try {
  document.dispatchEvent(
    new CustomEvent('shopNameEvent', { detail: Shopify.shop })
  );
} catch (ReferenceError) {
  // Non-shopify store - move along
}
