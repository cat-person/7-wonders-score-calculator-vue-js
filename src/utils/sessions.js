const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const characterLen = characters.length;

// Better seed generation using multiple sources
const generateSeed = () => {
  return Date.now() ^ (Math.random() * 0x100000000) ^ (performance?.now() || 0);
};

// Improved PRNG using xorshift algorithm
class SimplePRNG {
  constructor(seed = generateSeed()) {
    this.state = seed || 1;
  }

  next() {
    this.state ^= this.state << 13;
    this.state ^= this.state >> 17;
    this.state ^= this.state << 5;
    return this.state >>> 0; // Convert to unsigned 32-bit integer
  }

  nextFloat() {
    return this.next() / 0x100000000;
  }

  nextInt(max) {
    return Math.floor(this.nextFloat() * max);
  }
}

let prng = new SimplePRNG();

export const getPseudoRandom = (length, seed = generateSeed()) => {
  // Reset PRNG with new seed if provided
  if (seed) {
    prng = new SimplePRNG(seed);
  }

  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters[prng.nextInt(characterLen)];
  }
  return result;
};
