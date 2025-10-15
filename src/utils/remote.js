import { Client, Account, Databases, Query } from "appwrite";

const client = new Client();

const cache = new Map();

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject("cat-person-7w"); // Your project ID

const account = new Account(client);

const databases = new Databases(client);

export const getUnauthSession = async () => {
  return await account.createAnonymousSession(); // <== not sure if it needed
};

export const addPlayerScore = async (sessionId, playerScore) => {
  try {
    return await databases.createDocument(
      "67b64d2d0017d8ef2b54",
      "67b6daee003dfa0cb7ee",
      `${sessionId}.${playerScore.wonder.id}`,
      localToRemote(sessionId, playerScore),
    );
  } catch (err) {
    throw err;
  }
};

const localToRemote = (sessionId, localPlayerScore) => {
  return {
    session_id: sessionId,
    name: localPlayerScore.name,
    wonder_id: localPlayerScore.wonder.id,
    wonder_side_a: localPlayerScore.wonder.side === "A",
    wonder_stage_built: localPlayerScore.wonder.stageBuilt,
    coin_count: localPlayerScore.coinCount,
    military_points: localPlayerScore.militaryPoints,
    culture_points: localPlayerScore.culturePoints,
    trade_points: localPlayerScore.tradePoints,
    science_clay_tablet_count: localPlayerScore.science.clayCount,
    science_square_and_compass_count: localPlayerScore.science.measurerCount,
    science_cog_count: localPlayerScore.science.cogCount,
    guild_points: localPlayerScore.guildPoints,
  };
};

export const updatePlayerScore = async (sessionId, playerScore) => {
  return await databases.updateDocument(
    "67b64d2d0017d8ef2b54",
    "67b6daee003dfa0cb7ee",
    `${sessionId}.${playerScore.wonder.id}`,
    localToRemote(sessionId, playerScore),
  );
};

export const deletePlayerScore = async (sessionId, wonderId) => {
  return await databases.deleteDocument(
    "67b64d2d0017d8ef2b54",
    "67b6daee003dfa0cb7ee",
    `${sessionId}.${wonderId}`,
  );
};

export const getPlayerScoreByWonderId = async (sessionId, wonderId) => {
  return await databases
    .listDocuments("67b64d2d0017d8ef2b54", "67b6daee003dfa0cb7ee", [
      Query.equal("session_id", [sessionId]),
      Query.equal("wonder_id", [wonderId]),
    ])
    .then((result) => {
      const playerScores = result.documents.map(remoteToLocal);
      return playerScores[0];
    })
    .catch((error) => {
      return null;
    });
};

export const getPlayerScoresCached = () => {
  return cache.get("player_scores");
};

export const getPlayerScores = async (sessionId) => {
  return await databases
    .listDocuments("67b64d2d0017d8ef2b54", "67b6daee003dfa0cb7ee", [
      Query.equal("session_id", [sessionId]),
    ])
    .then((result) => {
      const playerScores = result.documents.map(remoteToLocal);
      cache.set("player_scores", playerScores);
      return playerScores;
    })
    .catch((error) => {
      return [];
    });
};

export const clearCache = () => {
  cache.clear();
};

export const clearCacheField = (field) => {
  cache.delete(field);
};

const remoteToLocal = (remoteDoc) => {
  return {
    name: remoteDoc.name,
    wonder: {
      id: remoteDoc.wonder_id,
      side: remoteDoc.wonder_side_a ? "A" : "B",
      stageBuilt: remoteDoc.wonder_stage_built,
    },
    coinCount: remoteDoc.coin_count,
    militaryPoints: remoteDoc.military_points,
    culturePoints: remoteDoc.culture_points,
    tradePoints: remoteDoc.trade_points,
    science: {
      clayCount: remoteDoc.science_clay_tablet_count,
      measurerCount: remoteDoc.science_square_and_compass_count,
      cogCount: remoteDoc.science_cog_count,
    },
    guildPoints: remoteDoc.guild_points,
  };
};
