function sum(array){
    return array.reduce((x,y)=>x+y)
}
 
 
 //credit: ENG1003 :^)

 //checks
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
