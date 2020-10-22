# @allvaa/get-lyrics
Scrape lyrics of given song title from Genius.

## Install
```sh
# npm
npm i @allvaa/get-lyrics

# yarn 
yarn add @allvaa/get-lyrics
```

## Using
```js
const song = require("@allvaa/get-lyrics");

(async () => {
    const result = await song("title here");
    console.log(result); // returns Song object
})();
```

#### `Song` object
```ts
interface Song {
    title: string; // song title
    image: string; // song image
    geniusUrl: string; // lyrics url from Genius
    lyrics: string; // scraped lyrics
}
```