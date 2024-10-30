import { databases } from "./config";
import { ID, Models } from "appwrite";

type Collection = {
    dbId: string;
    id: string;
    name: string;
};

type Database = {
    [key: string]: {
        create: (
            payload: Record<string, any>,
            id?: string,
            permissions?: string[]
        ) => Promise<Record<string, any>>;
        update: (
            id: string,
            payload: Record<string, any>,
            permissions?: string[]
        ) => Promise<Models.Document>;
        delete: (id: string) => Promise<boolean>;
        list: (queries?: string[]) => Promise<Models.DocumentList<any>>;
        get: (id: string) => Promise<Models.Document>;
    };
};

export const db:Database = {};

const collections:Collection[] = [
    {
        dbId: '671c52d30020ace09443', // import.meta.env.VITE_DATABASE_ID,
        id: '671c5313001aa69eb772', // import.meta.env.VITE_COLLECTION_ID_NOTES,
        name: "notes",
    },
];

collections.forEach((col) => {
    db[col.name] = {
        create: (payload, permissions, id = ID.unique()) =>
            databases.createDocument(
                col.dbId,
                col.id,
                id,
                payload,
                permissions
            ),
        update: (id, payload, permissions) =>
            databases.updateDocument(
                col.dbId,
                col.id,
                id,
                payload,
                permissions
            ),
        delete: async (id) => {
            try {
                databases.deleteDocument(col.dbId, col.id, id);
                return true;
            }
            catch (e) {
                return false;
            }
        },
        list: (queries = []) =>
            databases.listDocuments(col.dbId, col.id, queries),
        get: (id) => databases.getDocument(col.dbId, col.id, id),
    };
});
