import { writable } from 'svelte/store';

import { get } from '../../util';
import APIStatusCode from '../enums/api-status-code';
import type ApiResponse from '../interfaces/api-response';
import type User from '../interfaces/user';

const { subscribe, update } = writable<IdentityStatus>({
    isFetchingUsers: false,
    isFetchingUser: false
});

interface Identity {
    subscribe: typeof subscribe,
    getUser: typeof getUser,
    getAllUsers: typeof getAllUsers
}

interface IdentityStatus {
    isFetchingUsers: boolean;
    isFetchingUser: boolean;
}

async function getUser(email: string): Promise<ApiResponse<User>> {

    let response: ApiResponse<User>;
    let statusCode: APIStatusCode;

    try {

        update((state) => {
            return {
                ...state,
                isFetchingUser: true
            };
        });

        response =  await get(`/user/${email}`);

        if (response?.error) {

            statusCode = APIStatusCode.ALREADY_EXISTS;
        
            } else {
        
            statusCode = APIStatusCode.OK;
        
            }

    } catch {

        statusCode = APIStatusCode.GENERIC_ERROR;

    } finally {

        update((state) => {
            return {
                ...state,
                isFetchingUser: false
            };
        });

    }

    return {
        ...response,
        status: statusCode 
    };

}

async function getAllUsers(): Promise<ApiResponse<User[]>> {

    let response: ApiResponse<User[]>;
    let statusCode: APIStatusCode;

    try {

        update((state) => {
            return {
                ...state,
                isFetchingUsers: true
            };
        });

        response =  await get(`/users`);

        if (response?.error) {

            statusCode = APIStatusCode.NOT_FOUND;
        
            } else {
        
            statusCode = APIStatusCode.OK;
        
            }

    } catch {

        statusCode = APIStatusCode.GENERIC_ERROR;

    } finally {

        update((state) => {
            return {
                ...state,
                isFetchingUsers: false
            };
        });

    }

    return {
        ...response,
        status: statusCode 
    };

}

export default {
    subscribe,
    getUser,
    getAllUsers
} as Identity;


