/** 
######################################################################
############################# APP UTILITIES ##########################
######################################################################
*/

import { StorageHelper } from './storage';

export namespace Utils {
    /**
     * Interface for Storage Helper Class
     */
    export const storageHelper = new StorageHelper();

    /**
     * Function to check is User is Authenticated
     */
    export function isAuthenticated(): boolean {
        const userInfo = storageHelper.userInfo;
        const access_token = userInfo && userInfo.access_token;
        if (access_token) {
            return true;
        }
        return false;
    }
}
