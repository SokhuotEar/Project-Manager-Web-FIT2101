"use strict"
/**
 * File Name: main.js
 * File Purpose: This file is designed to create the main functions that are required for the system to function. This mainly includes data maintenance.
 * Authors: Dasun, Sok Ear, Luke, Laetitia
 * Date modified: 29/09/2022
 */

let sys = new System();
console.log(sys)
let data = localStorage.getItem(SYSTEM_KEY);
try
{
    data = JSON.parse(data);
    if(data!=null){
        sys.fromData(data)
        console.log(sys)
    }

}
catch(exception){
    console.log(exception)
}

