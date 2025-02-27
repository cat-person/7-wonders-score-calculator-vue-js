import { Client, Account, Databases } from "appwrite";

const client = new Client()

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('cat-person-7w') // Your project ID 

const account = new Account(client);

const databases = new Databases(client);


export const getUnauthSession = async () => {
    return await account.createAnonymousSession(); // <== not sure if it needed
}

export const getPlayerScore = async (playerId) => {
    return await databases.listDocuments(
        '67b64d2d0017d8ef2b54',
        '67b6daee003dfa0cb7ee',
        [
            Query.equal('id', ['Avatar', 'Lord of the Rings']),
            Query.equal('session', ['Avatar', 'Lord of the Rings']),
        ]
    
    )
}


export const addPlayerScore = async (playerId, score) => {
    return await databases.createDocument(
        '67b64d2d0017d8ef2b54',
        '67b6daee003dfa0cb7ee',
        playerId,
        {
            name: score.name,
            wonder_id: score.wonder.id,
            wonder_side_a: score.wonder.side === 'A',
            wonder_stage_built: score.wonder.stageBuilt,
            coin_count: score.coinCount,
            military_points: score.militaryPoints,
            culture_points: score.culturePoints,
            trade_points: score.tradePoints,
            science_clay_tablet_count: score.science.clayCount,
            science_square_and_compass_count: score.science.measurerCount,
            science_cog_count: score.science.cogCount,
            guild_points: score.guildPoints

        }    
    );
}



// const result = await databases.listDocuments(
//     '<DATABASE_ID>', // databaseId
//     '<COLLECTION_ID>', // collectionId
//     [] // queries (optional)
// );

// console.log(result);