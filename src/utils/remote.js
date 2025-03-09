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

export const addPlayerScore = async (sessionId, playerScore) => {
    console.error(`${sessionId}.${playerScore.wonder.id}`)

    return await databases.createDocument(
        '67b64d2d0017d8ef2b54',
        '67b6daee003dfa0cb7ee',
        `${sessionId}.${playerScore.wonder.id}`,
        localToRemote(sessionId, playerScore)   
    );
}

const localToRemote = (sessionId, localPlayerScore) => {
    return {
        session_id: sessionId,
        name: localPlayerScore.name,
        wonder_id: localPlayerScore.wonder.id,
        wonder_side_a: localPlayerScore.wonder.side === 'A',
        wonder_stage_built: localPlayerScore.wonder.stageBuilt,
        coin_count: localPlayerScore.coinCount,
        military_points: localPlayerScore.militaryPoints,
        culture_points: localPlayerScore.culturePoints,
        trade_points: localPlayerScore.tradePoints,
        science_clay_tablet_count: localPlayerScore.science.clayCount,
        science_square_and_compass_count: localPlayerScore.science.measurerCount,
        science_cog_count: localPlayerScore.science.cogCount,
        guild_points: localPlayerScore.guildPoints
    }
}

export const updatePlayerScore = async (sessionId, playerScore) => {
    console.error(`getPlayerScores(sessionId: ${sessionId}, playerScore: ${JSON.stringify(playerScore)})`)

    return await databases.updateDocument(
        '67b64d2d0017d8ef2b54',
        '67b6daee003dfa0cb7ee',
        `${sessionId}.${playerScore.wonder.id}`,
        localToRemote(sessionId, playerScore)
    )
}

export const deletePlayerScore = async (sessionId, wonderId) => {
    console.error(`deletePlayerScore(sessionId: ${sessionId}, wonderId: ${wonderId})`)

    return await databases.deleteDocument(
        '67b64d2d0017d8ef2b54',
        '67b6daee003dfa0cb7ee',
        `${sessionId}.${wonderId}`
    )
}

export const getPlayerScoreByWonderId = async (sessionId, wonderId) => {
    console.error(`getPlayerScoreByWonderId(sessionId: ${sessionId}, wonderId: ${wonderId})`)    
    
    return await databases.listDocuments(
        '67b64d2d0017d8ef2b54',
        '67b6daee003dfa0cb7ee',
        [
            Query.equal('session_id', [sessionId]),
            Query.equal('wonder_id', [wonderId]),
        ]).then((result) => {
            console.error(`result: ${JSON.stringify(result)}`)
                const playerScores = result.documents.map (remoteToLocal)
                console.error(`playerScores: ${JSON.stringify(playerScores)}`)
                return playerScores[0]
            }).catch((error) => {
                console.error(error)
                return null
            })    
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
            side: remoteDoc.wonder_side_a ? 'A' : 'B',
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
