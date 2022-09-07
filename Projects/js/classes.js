"use strict"

class System {
    //constructor
    constructor() {
        this._productBacklog = new ProductBacklog();
        this._teamMembers = new TeamMembers();
        this._activeSprint;
        this._completedSprints = [];
        this._notStartedSprints = [];
    }


    //accessors
    get productBacklog() {
        return this._productBacklog;
    }

    get teamMembers() {
        return this._teamMembers;
    }

    get activeSprint() {
        return this._activeSprint;
    }

    get completedSprints() {
        return this._completedSprints
    }

    get notStartedSprints() {
        return this._notStartedSprints;
    }

    //No methods done yet



        // saves to LS
    save(){
        saveToLS(SYSTEM_KEY,this);
    }
        //pretty sure it needs to recursively do it for every object
        // loads LS
    load(){
        //loadLS(SYSTEM_KEY)
    }
}

class ProductBacklog {
    constructor(){
        this._tasks=[];
        this._sortType="order"
    }

    get tasks(){
        return this._tasks;
    }

    addTask(task){
        this._tasks.push(task);
    }

    removeTask(task){
        let index = this._tasks.indexOf(task);
        if(index>-1){
            this._tasks.splice(index,1)
        }
    }

    updateTask(oldTask,newTask){
        index = this._tasks.indexOf(oldTask);
        if(index>-1){
            this._tasks[index]=newTask;
        }
    }

    showTasks(){
        return this._tasks;
    }

    sortTasks(sortBy){
        array=this._tasks
        // name, priority, tag, that stuff i guess
        //turn what you get into an index, so its easier
        //summarise ==> [this.name(),this.tags(),this.priority(),this.storyPoints()]
        if(sortBy=="name"){
            type=0
            this._sortType="name"
        }
        for(let i=0;i>array.length;i++){
            for(let j=i;j>array.length-1;j++){
                left=array[j].summarise();
                right=array[j+1].summarise();
                if (left[type]>right[type]){
                    array[j],array[j+1]=array[j+1],array[j]
                }
            }
        }     
        
    }

    filterTasks(condition){
        array=this._tasks
        result=[]
        //fix
        for(let i=0;i>array.length-1;i++){
            if(array[i].tags()==condition){
                result.push(array[i])
            }
        }
        return result
    }
}



class Task {
    constructor(name, description, type, storyPoints, tags, priority,status){
        //this if statement can be broken and make more specific but
        if(typeof(name)=="string" && typeof(description)=="string" && typeof(type)=="string" 
        && typeof(tags)=="string" && typeof(priority)=="string" &&
        (typeof(storyPoints)=="string" || typeof(storyPoints)=="number")
        && name.length>0 && description.length>0 && type.length>0 && tags.length>0 && priority.length>0){

            this._name=name;
            this._description=description;
            this._type=type;
            this._storyPoints=parseFloat(storyPoints)
            this._tags=tags;
            this._priority=priority;
            this._status=status;
            this._timeSpent=[];
            this._developer;//##################

        }
        else{
            console.log(typeof(name)=="string");
            console.log(typeof(description)=="string");
            console.log(typeof(type)=="string");
            console.log(typeof(tags)=="string");
            console.log(typeof(priority)=="string");
            console.log(typeof(storyPoints)=="number");
            console.log(typeof(storyPoints)=="number");
            console.log(name.length>0);
            console.log(description.length>0);
            console.log(type.length>0);
            console.log(tags.length>0);
            console.log(priority.length>0);
            throw "Incorrect task specifications"
        }
    }

    //accessors
    get name(){
        return this._name;
    }
    get description(){
        return this._description;
    }
    get type(){
        return this._type;
    }
    get storyPoints(){
        return this._storyPoints;
    }
    get tags(){
        return this._tags;
    }
    get priority(){
        return this._priority;
    }
    get developer(){
        return this._developer;
    }
    get status(){
        return this._status;
    }
    //mutators
    // not editable part is the responsibility of the function not the class
    set name(newName){
        this._name=newName;
    }
    set description(newDesc){
        this._description=newDesc;
    }
    set type(newType){
        this._type=newType;
    }
    set storyPoints(newSP){
        this._storyPoints=newSP;
    }
    set tags(newTag){
        this._tags=newTag;
    }
    set priority(newPriority){
        this._priority=newPriority;
    }
    set developer(newDeveloper){
        this._developer=newDeveloper;
    }
    set status(newStatus){
        this._status=newStatus;
    }




    //methods
    summarise(){
        return [this.name(),this.tags(),this.priority(),this.storyPoints()]
    }
        //will return everything in the range inclusive, will not put in empty days
    getTimeDuring(start,end){
        start.setHours(0,0,0,0)
        end.setHours(0,0,0,0)
        
        //bad algorithm
        array=this._timeSpent
        if(array.length==0){
            return array
        }
        s_index=[];
        e_index=[];
// today is always after start
// today is always before end 
        for(let i=0; i<array.length;i++){
            today=array[i][0]
            if(today>=start){
                s_index.push(i)
            }
            if(today<=end){
                e_index=i
            }
        }
        return this._timeSpent.slice(s_index[0],e_index+1)
    }

    getTotalTime(){
        array=this._timeSpent
        total=0
        for(let i=0; i<array.length;i++){
            total+=array[i][1]
        }
        return total
    }
    changeStatus(newStatus){
        this._status=newStatus;
    }
        
    logTime(timeToAdd, date){
        date.setHours(0,0,0,0)
        if(this._timeSpent[this._timeSpent.length-1][0]==date){
            this._timeSpent[this._timeSpent.length-1][0]+=timeToAdd
        }
        else{
            this._timeSpent.push([date,timeToAdd])
        }
    }


}



class Sprint {
}

class SprintBacklog {
}

class TeamMembers {
}

class Developer {

}

let sys = new System();
