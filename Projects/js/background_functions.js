/**
 * File Name: backgrounf_functions.js
 * File Purpose: This file is designed to contain the background functions needed for the system to operate, primarly local storage functions for data maintenance.
 * Authors: Dasun, Sok Ear, Luke, Parul, Laetitia
 * Date modified: 29/09/2022
 */
function sum(array){
    return array.reduce((x,y)=>x+y)
}
 
 
 //credit: ENG1003 :^)

 //checks
 /*
    This function checks whether the local storage contains elements.
    It will only return the local storage if there is something in it.
 */
 function checkLSData(key)
 {
     return localStorage.getItem(key) != null
 }

//gets
 function loadLS(key)
 {
     let data = localStorage.getItem(key);
     try
     {
         data = JSON.parse(data);
     }
     catch(exception){
        console.log(exception)
     }
     finally
     {
         return data;
     }
 }
 
//updates
 function saveToLS(key, data)
 {
     localStorage.setItem(key, JSON.stringify(data));
 }
