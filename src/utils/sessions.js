const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const characterLen = characters.length
var prevSeed = 0

export const getSessionId = (seed) => {

    // const sessionIdLength = 8    
    
    // let result = '';

    // for (var idx = 0; idx < sessionIdLength; idx++) {
    //     result += getRandomCharFrom(seed);
    // }

    // return result;

    return 'AAAAAAAA'
}

const getRandomCharFrom = (seed) => {
    prevSeed = Math.floor((seed * 73 % 31) + (prevSeed * 113 % 31))
    return characters.charAt(prevSeed % characterLen)
}