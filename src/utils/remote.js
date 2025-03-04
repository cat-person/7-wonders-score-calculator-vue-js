import { Client, Account, Databases, Query } from "appwrite";

const client = new Client()

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('cat-person-7w') // Your project ID 

const account = new Account(client);

const databases = new Databases(client);


export const getUnauthSession = async () => {
    return await account.createAnonymousSession(); // <== not sure if it needed
}

export const getPlayerScores = async (sessionId) => {
    console.error(`getPlayerScores(sessionId: ${sessionId})`)    
    
    return await databases.listDocuments(
        '67b64d2d0017d8ef2b54',
        '67b6daee003dfa0cb7ee',
        [
            Query.equal('session_id', [sessionId]),
        ]).then((result) => {
            console.error(`result: ${JSON.stringify(result)}`)
                const playerScores = result.documents.map (remoteToLocal)
                console.error(`playerScores: ${JSON.stringify(playerScores)}`)
                return playerScores
            }).catch((error) => {
                console.error(error)
                return []
            })    
}

const remoteToLocal = (remoteDoc) => {
    return {
        name: remoteDoc.name,
        wonder: {
            id: remoteDoc.wonder_id,
            side: remoteDoc.wonder_side_a,
            stageBuilt: remoteDoc.wonder_stage_built
        },
        coinCount: remoteDoc.coin_count,
        militaryPoints: remoteDoc.military_points,
        culturePoints: remoteDoc.culture_points,
        tradePoints: remoteDoc.trade_points,
        science: {
            clayCount: remoteDoc.science_clay_tablet_count,
            measurerCount: remoteDoc.science_square_and_compass_count,
            cogCount: remoteDoc.science_cog_count
        },
        guildPoints: remoteDoc.guild_points
    }
}


export const addPlayerScore = async (sessionId, score) => {
    console.error(`${sessionId}.${score.wonder.id}`)

    return await databases.createDocument(
        '67b64d2d0017d8ef2b54',
        '67b6daee003dfa0cb7ee',
        `${sessionId}.${score.wonder.id}`,
        {
            session_id: sessionId,
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