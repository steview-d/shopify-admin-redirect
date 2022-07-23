// Run this when the extenstion icon is clicked

const currentUrl = new URL(window.location.href);

if (currentUrl.host == 'e-liquids.com') {
  switch (true) {
    case currentUrl.pathname.includes('/products'):
      redirect(
        currentUrl,
        'products',
        'var meta = {"product":{"id":',
        ',"gid":"gid:'
      );
      break;

    case currentUrl.pathname.includes('/collections'):
      redirect(
        currentUrl,
        'collections',
        '"resourceType":"collection","resourceId":',
        '}};'
      );
      break;

    case currentUrl.pathname.includes('/pages'):
      redirect(
        currentUrl,
        'pages',
        '"resourceType":"page","resourceId":',
        '}};'
      );
      break;

    default:
      window.open(`https://e-liquids-1.myshopify.com/admin`);
  }
}

async function redirect(url, template, startSplit, endSplit) {
  let response = await fetch(url);
  let rText = await response.text();
  let id = rText.split(startSplit)[1].split(endSplit)[0];
  window.open(`https://e-liquids-1.myshopify.com/admin/${template}/${id}`);
}
