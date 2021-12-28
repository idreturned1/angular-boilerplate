/** 
######################################################################
############################ APP INTERFACES ##########################
######################################################################
*/

/**
 * User Info
 */
export interface UserInfo {
    name?: string;
    username: string;
    email?: string;
    access_token?: string;
    refresh_token?: string;
    access_token_expiry?: string;
}

/**
 * Sample Interface
 */
/** Used to create Reverse Mapping of Sample */
export interface SampleInterface {
    A: string;
    Abcdef: string;
    B: string;
    Bcdef: string;
}
