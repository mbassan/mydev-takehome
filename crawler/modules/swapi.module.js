const axios = require("axios");
const Log = require("../db/util");
const baseUrl = "https://swapi.dev/api/";

async function init() {
  const data = await axios.get(baseUrl);
  return !!data;
}

async function get(url, throwError) {
  try {
    const res = await axios.get(
      (url.indexOf("http") >= 0 ? "" : baseUrl) + url
    );
    return res.data;
  } catch (err) {
    if (!throwError) {
      Log.error(`Could not GET ${url} - ${err?.response?.status}`);
    } else {
      throw new Error(err);
    }
  }
  return null;
}

module.exports = {
  init,
  get,
  baseUrl,
};
