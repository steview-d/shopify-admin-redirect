# Shopify Admin Redirect

A simple chrome extension that when click, if you are on a Shopify store, and you have admin access, it will take you to the relevant page in the Shopify Admin.

## Issues

### One
Service worker throws an error if trying to load a non webpage, for ex a chrome extension page
```
Uncaught (in promise) Error: Cannot access a chrome-extension:// URL of different extension
```

### Two
If clicking the action icon on a non-shopify store page, nothing will happen. If however a Shopify store page has been previously loaded in another tab, the extension will attempt to load the admin page of that store.


### Three
Action icon stops working if the extension is reloaded. To get working again, you need to reload the shopify page, and reactivate the tab (by clicking a different tab, then clicking back to the Shopify store tab).

This is due to the below error when trying to execute `chrome.runtime.sendMessage({...`
```
Uncaught Error: Extension context invalidated.
```

Currently supressed by checking for `chrome.runtime?.id !== undefined` but this just hides the problem (sort of) and doesn't fix it.
