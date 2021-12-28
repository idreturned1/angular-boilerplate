/** 
######################################################################
############################### APP URLS #############################
######################################################################
*/

import { SERVER_URL } from './configuration';

class ApplicationUrls {
    private static appUrlsInstance: ApplicationUrls;
    public serverUrl: string;

    public static getInstance(): ApplicationUrls {
        if (!ApplicationUrls.appUrlsInstance) {
            ApplicationUrls.appUrlsInstance = new ApplicationUrls();
            ApplicationUrls.appUrlsInstance.serverUrl = `${SERVER_URL}`;
        }
        return ApplicationUrls.appUrlsInstance;
    }

    /**
     * Accounts
     */

    get loginUrl() {
        return this.serverUrl + '/login';
    }
    get registrationUrl() {
        return this.serverUrl + '/register';
    }
    get logoutUrl() {
        return this.serverUrl + '/logout/';
    }
}

export let applicationUrls = ApplicationUrls.getInstance();
