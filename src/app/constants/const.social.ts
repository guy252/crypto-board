import {BASE_URL} from "./const.global";

export const SOCIAL_NETWORKS = {
  facebook: {
    fbUrl: "https://www.facebook.com/sharer/sharer.php",
    websiteUrl: BASE_URL,
    messageTitle: "Crypto Board",
    message: "Crypto Currencies Dashboard (Powered by CoinMarketCap)"
  },
  twitter: {
    twrUrl: "https://twitter.com/intent/tweet",
    message: BASE_URL + " - Crypto Currencies Dashboard (Powered by CoinMarketCap)"
  },
  whatsapp: {
    waUrl: "whatsapp://send",
    message: BASE_URL
  },
  telegram: {
    tgUrl: "https://telegram.me/share/url",
    websiteUrl: BASE_URL,
    message: "Crypto Currencies Dashboard (Powered by CoinMarketCap)"
  }
}
