import axios from 'axios';

const API = axios.create({
    baseURL: 'http://musicbrainz.org/ws/2'
});

export const getReleases = (artist_name) => {
    return API.get(`release-group/?query=artist:${artist_name}&fmt=json`)
    .then(({ data }) => {
        console.log(data['release-groups'])
        const artist_id = data['release-groups'][0]['artist-credit'][0].artist.id;
        return getReleasesById(artist_id)
    })
};

export const getReleasesById = (artist_id) => {
    return API.get(`/recording/?query=arid:${artist_id}&limit=100&fmt=json`)
}