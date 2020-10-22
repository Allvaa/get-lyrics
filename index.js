const fetch = require("node-fetch");
const { load } = require("cheerio");

const baseURL = "https://genius.com/api";

const search = (query) => {
    return new Promise((resolve, reject) => {
        fetch(`${baseURL}/search?q=${query}`)
          .then(res => res.json())
          .then(body => body.response.hits.length ? body.response.hits[0].result : undefined)
          .then(resolve)
          .catch(reject);
    });
}

const getLyrics = async (query) => {
    if (!query || typeof query !== "string") return;
    const song = await search(query);
    if (!song) return;
    const html = await (await fetch(song.url)).text();
    const lyrics = load(html)(".lyrics").text().trim();
    return {
        title: song.full_title,
        image: song.song_art_image_url,
        geniusUrl: song.url,
        lyrics
    };
}

module.exports = getLyrics;
