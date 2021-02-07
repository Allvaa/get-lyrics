const fetch = require("node-fetch");
const { load } = require("cheerio");

const baseURL = "https://genius.com/api";

const reqOpt = {
    headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36"
    }
};

const search = (query) => {
    return new Promise((resolve, reject) => {
        fetch(`${baseURL}/search/song?q=${encodeURIComponent(query)}`, reqOpt)
          .then(res => res.json())
          .then(body => body.response.sections[0].hits.length ? body.response.sections[0].hits[0].result : undefined)
          .then(resolve)
          .catch(reject);
    });
}

const getLyrics = async (query) => {
    if (!query || typeof query !== "string") return;
    const song = await search(query);
    if (!song) return;
    const html = await (await fetch(song.url, reqOpt)).text();
    const lyrics = load(html)(".lyrics").text().trim();
    return {
        title: song.full_title,
        image: song.song_art_image_url,
        geniusUrl: song.url,
        lyrics
    };
}

module.exports = getLyrics;
