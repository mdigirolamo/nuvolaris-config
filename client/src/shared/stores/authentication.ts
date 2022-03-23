import { writable } from 'svelte/store';

import type User from '../interfaces/user';
import type UserCredentials from '../interfaces/user-credentials';
import type ApiResponse from '../interfaces/api-response';

import APIStatusCode from '../enums/api-status-code';

// TO DO: worth perhaps replacing the utility
// methods with Axios or a similar package
import { post } from '../../util';

const initialValue: User = {
    id: '',
    token: '',
    role: '',
    email: '',
};

const sessionValue = <User>JSON.parse(localStorage.getItem('auth'));

const { subscribe, set } = writable<User>(sessionValue || initialValue);
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

    /* let response: User & ApiResponse; */

    let response;

    return new Promise<APIStatusCode>(async (resolve) => {

        try {

            response = await post('/login', credentials);

            if (response?.error) {

                resolve(APIStatusCode.USER_NOT_FOUND);
    
            } else {

                const user: User = {
                    id: response.loggedId,
                    token: response.token,
                    role: response.loggedRole,
                    email: response.loggedEmail
                };

                set(user);

                localStorage.setItem('auth', JSON.stringify(user));

                resolve(APIStatusCode.OK);

            }
    
        } catch (error) {
            
            resolve(APIStatusCode.GENERIC_ERROR);
    
        }

    });

}

function logout() {

    set(initialValue);
    
    localStorage.removeItem('auth');

}

export default {
    subscribe,
    login,
    logout
} as Authentication;

