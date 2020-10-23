declare interface Song {
    title: string;
    image: string;
    geniusUrl: string;
    lyrics: string;
}

declare const getLyrics: {
    (query: string): Promise<Song | undefined>;
}

export = getLyrics;
