import { Client, Databases, Account } from "appwrite";

const client = new Client();

// client
//     .setEndpoint(import.meta.env.VITE_ENDPOINT)
//     .setProject(import.meta.env.VITE_PROJECT_ID);

// client.setProject('671c0b30001cb5e6fbef');

client
.setEndpoint('https://cloud.appwrite.io/v1')
.setProject('671c0b30001cb5e6fbef');

const databases = new Databases(client);
const account = new Account(client);

export { client, databases, account };
