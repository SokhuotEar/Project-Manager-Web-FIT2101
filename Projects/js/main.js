"use strict"
/**
 * File Name: main.js
 * File Purpose: The purpose of this file is to create the homepage/splash page for the website, so that the other pages are easily accessible.
 * Authors: Dasun, Sok Ear, Luke, Parul, Laetitia
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

