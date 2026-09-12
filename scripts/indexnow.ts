const HOST = "clandestagency.vercel.app";
const KEY = "c1a4d952e8f1496a928db641e780a15c";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const URL_LIST = [
  `https://${HOST}/`,
  `https://${HOST}/about`,
  `https://${HOST}/services`,
  `https://${HOST}/process`,
  `https://${HOST}/contact`
];

async function submitIndexNow() {
  console.log(`[IndexNow] Submitting ${URL_LIST.length} URLs to IndexNow API...`);

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: URL_LIST
  };

  try {
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(payload)
    });

    console.log(`[IndexNow] Response status: ${response.status} ${response.statusText}`);
    if (response.status === 200 || response.status === 202) {
      console.log(`[IndexNow] SUCCESS! URLs successfully submitted for instant indexing across Bing, Copilot, Yandex, and Naver.`);
    } else {
      const text = await response.text();
      console.warn(`[IndexNow] Response body:`, text);
    }
  } catch (error) {
    console.error(`[IndexNow] Error submitting to IndexNow:`, error);
  }
}

submitIndexNow();
