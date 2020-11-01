import axios from 'axios';

const API = axios.create({
    baseURL: 'https://api.lyrics.ovh/v1'
});

export const getLyrics = (artist_name, song_title) => {
    return API.get(`/${artist_name}/${song_title}`)
};