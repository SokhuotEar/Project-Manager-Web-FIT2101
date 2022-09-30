"use strict"
// Retrieves data from the system 

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

