/** 
######################################################################
############################# APP STRUCTS ############################
######################################################################
*/

import { SampleInterface } from './app.interfaces';

/** Reverse Mapping */
export let SampleMap: SampleInterface;
(function (reverseQuota) {
    reverseQuota[(reverseQuota['A'] = 'Abcdef')] = 'A';
    reverseQuota[(reverseQuota['B'] = 'Bcdef')] = 'B';
})(SampleMap || (SampleMap = <SampleInterface>{}));
