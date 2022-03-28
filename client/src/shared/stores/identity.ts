import { writable } from 'svelte/store';

import { get, put } from '../../util';
import type UserProfile from '../components/user-profile-form/user-profile';
import APIStatusCode from '../enums/api-status-code';
import type ApiResponse from '../interfaces/api-response';
import type User from '../interfaces/user';

const { subscribe, update } = writable<IdentityStatus>({
    isFetchingUsers: false,
    isFetchingUser: false,
    isUpdatingUser: false
});
interface Identity {
    subscribe: typeof subscribe;
    updateUser: typeof updateUser;
    getUser: typeof getUser;
    getAllUsers: typeof getAllUsers;
}
interface IdentityStatus {
    isFetchingUsers: boolean;
    isFetchingUser: boolean;
    isUpdatingUser: boolean;
}

async function updateUser(user: UserProfile): Promise<ApiResponse<UserProfile>> {
    
    let response: ApiResponse<UserProfile>;
    let statusCode: APIStatusCode;

    try {

        update((state) => {
            return {
                ...state,
                isUpdatingUser: true
            };
        });
  
        // update API should not require the email address as
        // dynamic parameter in its own route
        response = await put(`/user/${user.email}`, user);
  
        statusCode = APIStatusCode.OK;
  
      } catch (error) {
  
        statusCode = APIStatusCode.GENERIC_ERROR;
  
      } finally {
  
        update((state) => {
            return {
                ...state,
                isUpdatingUser: false
            };
        });
  
      }

      return {
        ...response,
        status: statusCode
    };

}

async function getUser(email: string): Promise<ApiResponse<UserProfile>> {

    let response: ApiResponse<UserProfile>;
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
    updateUser,
    getUser,
    getAllUsers
} as Identity;


