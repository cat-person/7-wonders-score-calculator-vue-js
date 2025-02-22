import { Client, Account, Databases } from "appwrite";

const client = new Client()

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('cat-person-7w') // Your project ID 

const account = new Account(client);

const databases = new Databases(client);


export const getUnauthSession = async () => {
    return await account.createAnonymousSession();
}

export const getPlayerScore = async () => {
    return await databases.listDocuments(
        '67b64d2d0017d8ef2b54',
        '67b6daee003dfa0cb7ee',
        []
    )
}

// const result = await databases.listDocuments(
//     '<DATABASE_ID>', // databaseId
//     '<COLLECTION_ID>', // collectionId
//     [] // queries (optional)
// );

// console.log(result);