const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const characterLen = characters.length;
var prevSeed = 0;

export const getPseudoRandom = (seed, length) => {
  let result = "";

  for (var idx = 0; idx < length; idx++) {
    result += getRandomCharFrom(seed);
  }

  return result;
};

const getRandomCharFrom = (seed) => {
  prevSeed = Math.floor(((seed * 73) % 31) + ((prevSeed * 113) % 31));
  return characters.charAt(prevSeed % characterLen);
};
