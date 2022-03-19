import { writable } from 'svelte/store';

import type User from '../interfaces/user';
import type UserCredentials from '../interfaces/user-credentials';

import APIStatusCode from '../enums/api-status-code';

// TO DO: worth perhaps replacing the utility
// methods with Axios or a similar package
import { post } from '../../util';

const initialValue: User = {
    id: '',
    token: '',
    role: '',
    email: ''
};

const { subscribe, set } = writable<User>(initialValue);

interface Authentication {
    subscribe: typeof subscribe,
    login: typeof login,
    logout: typeof logout
}

/**
 * TO DO: in case of error (e.g.: user not found) server APIs should send
 * an appropriate HTTP code (e.g.: 404) in order to allow the client-side
 * application to handle them in a standard way
 */
async function login(credentials: UserCredentials): Promise<APIStatusCode> {

    let user;

    return new Promise<APIStatusCode>(async (resolve) => {

        try {

            user = await post('/login', credentials) as User | APIStatusCode;

            if (user?.error) {

                resolve(APIStatusCode.USER_NOT_FOUND);
    
            } else {

                set({
                    id: user.loggedId,
                    token: user.token,
                    role: user.loggedRole,
                    email: user.loggedEmail
                });

                resolve(APIStatusCode.OK);

            }
    
        } catch (error) {
            
            resolve(APIStatusCode.GENERIC_ERROR);
    
        }

    });

}

function logout() {

    set(initialValue);

}

export default {
    subscribe,
    login,
    logout
} as Authentication;

