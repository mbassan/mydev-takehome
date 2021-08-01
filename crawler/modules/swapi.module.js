const axios = require("axios");
const baseUrl = "https://swapi.dev/api/";

async function init() {
  const data = await axios.get(baseUrl);
  return !!data;
}

async function get(url) {
  const res = await axios.get(
    (url.indexOf("http://") >= 0 ? "" : baseUrl) + url
  );
  return res.data;
}

module.exports = {
  init,
  get,
  baseUrl,
};
