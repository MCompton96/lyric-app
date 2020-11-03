export const formatLyrics = (lyrics) => {
    const lyricArray = lyrics.split(' ');
    return lyricArray.length;
}

// export const formatLyrics = (lyrics) => {
//     return lyrics.map(song => {
//         if (!song.value) {
//             return null
//         } else {
//             const lyricArray = song.value.data.lyrics.split(' ');
//             return lyricArray.length;
//         }
//     })
// }

export const getAverage = (array) => {
    return array.reduce((a, b) => a + b, 0) / array.length;
}

export const getMin = (array) => {
    return Math.min(...array);
}

export const getMax = (array) => {
    return Math.max(...array)
}

export const filterResults = (results) => {
    const resultCopy = [...results];
    resultCopy.map(result => {
        return {...result}
    });
    resultCopy.filter(result => result.status === 'fulfilled');
    return resultCopy
}