export const formatLyrics = (lyrics) => {
    const lyricArray = lyrics.split(' ');
    return lyricArray.length;
}

export const getAverage = (array) => {
    return array.reduce((a, b) => a + b, 0) / array.length;
}

export const getMin = (array) => {
    return Math.min(...array);
}

export const getMax = (array) => {
    return Math.max(...array)
}