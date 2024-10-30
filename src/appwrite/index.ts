import { Models, OAuthProvider } from 'appwrite';
import { account } from './config';

export { account, client } from './config';
export { db } from './database';

export type User = {
    name: string;
    email: string;
    $id: string;
    prefs: Models.Preferences;
}

let _user:User | null = null;

export function login(provider:OAuthProvider) {
    account.createOAuth2Session(provider);
}

export function getUser(): User | null {
    return _user;
}

export async function init(): Promise<void> {
    try {
        const res = await account.get();
        if (!res?.$id) {
            _user = null;
            return;
        }
        _user = {
            name: res.name,
            email: res.email,
            $id: res.$id,
            prefs: res.prefs,
        }
    }
    catch (error) {
        _user = null;
    }
}

export async function logout() {
    await account.deleteSession('current');
}

export async function clearUserPrefs() {
    if (!_user) {
        throw new Error('User not logged in');
    }

    const { prefs } = await account.updatePrefs({});
    _user.prefs = prefs;
    return _user.prefs;
}

export async function updateUserPrefs(data:Models.Preferences, merge:boolean = true): Promise<UserPrefs> {
    if (!_user) {
        throw new Error('User not logged in');
    }

    const newData = merge ? {..._user.prefs, ...data} : data;
    const { prefs } = await account.updatePrefs({...newData});
    _user.prefs = prefs;
    return _user.prefs;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any)['updateUserPrefs'] = async (data:Models.Preferences) => {
    const res = await updateUserPrefs(data);
    console.log('prefs', res);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any)['logout'] = async () => {
    await logout();
    console.log('loged out!');
}

