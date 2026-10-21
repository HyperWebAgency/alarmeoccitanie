// Tells Bing (and the other IndexNow engines: Yandex, Seznam, Naver…) that pages changed,
// so they recrawl them right away instead of waiting.
// Run it AFTER a deploy is live:   npm run indexnow            → every URL in the live sitemap
//                                  npm run indexnow -- /contact → only the given pages
// The key proves we own the domain: public/<key>.txt must stay online with the same content.

const host = "www.alarmeoccitanie.fr";
const key = "6b17c2f6c5664c1704ab2ecf6b2ad647";
const keyLocation = `https://${host}/${key}.txt`;

async function sitemapUrls() {
  const xml = await (await fetch(`https://${host}/sitemap.xml`)).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const args = process.argv.slice(2);
const urlList = args.length ? args.map((path) => new URL(path, `https://${host}`).href) : await sitemapUrls();

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation, urlList }),
});

// 200 = received, 202 = received (key check still pending). 403 = key file not found online.
console.log(`IndexNow: ${res.status} ${res.statusText} — ${urlList.length} URL(s)`);
urlList.forEach((url) => console.log(`  ${url}`));
if (!res.ok) process.exit(1);
