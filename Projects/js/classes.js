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
    fromData(data){
        this._productBacklog.fromData(data._productBacklog)
        //this._teamMembers.fromData(data._teamMembers)
        //this._activeSprint.fromData(data._activeSprint)
        //this._completedSprints.fromData(data._completedSprints)
        //this._notStartedSprints.fromData(data._notStartedSprints)

        this._teamMembers.fromData(data._teamMembers);


        this._activeSprint=data._activeSprint;
        this._completedSprints=data._completedSprints;
        this._notStartedSprints=data._notStartedSprints;
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

    // methods 

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
        let index = this._tasks.indexOf(oldTask);
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
        // returns the index instead
        let array=this._tasks
        let result=[]
        //fix
        for(let i=0;i<array.length;i++){
            if(array[i]._tags == condition){
                result.push(i)
            }
        }
        return result
    }

    fromData(data){
        this._tasks=[]
        for(let i=0;i<data._tasks.length;i++){
            let next_task= Task.fromData(data._tasks[i]);
            this.addTask(next_task);
        }

        this._sortType=data._sortType
    }
}


class Task {
    constructor(name, description, type, storyPoints, tags, priority,status){
        //this if statement can be broken and make more specific but
        if(typeof(name)=="string" && typeof(description)=="string" && typeof(type)=="string" 
        && typeof(tags)=="string" && typeof(priority)=="string" &&
        (!isNaN(Number(storyPoints)) || typeof(storyPoints)=="number")
        && name.length>0 && description.length>0 && type.length>0 && tags.length>0 && priority.length>0){

            this._name=name;
            this._description=description;
            this._type=type;
            this._storyPoints=Number(storyPoints)
            this._tags=tags;
            this._priority=priority;
            this._status=status;
            this._timeSpent=[];
            this._developers=[];

        }
        else{
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
    get developers(){
        return this._developers;
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
    set status(newStatus){
        this._status=newStatus;
    }

    addMember(developer){
        this._developers.push(developer)
    }

    removeMember(developer){
        let index = this._tasks.indexOf(developer);

        if(index>-1){
            this._developers.splice(index,1)
        }
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

    // updating local storage
    static fromData(data)
    {
        let task = new Task(data._name,data._description,data._type,data._storyPoints,data._tags,data._priority,data._status)
        task._developers=[]
        for(let i=0;i<data._developers.length;i++){
            let next_developer= Developer.fromData(data._developer[i]);
            task.addMember(next_developer);
        }

        return task
    }


}



class Sprint {
}

class SprintBacklog {
}

class TeamMembers {
    constructor(){
        this._teamMembers=[];
    }

    get teamMembers(){
        return this._teamMembers;
    }

    addMember(developer){
        this._teamMembers.push(developer)
    }

    removeMember(developer){
        let index = this._tasks.indexOf(developer);

        if(index>-1){
            this.teamMembers.splice(index,1)
        }
    }

    removeAll(){
        this._teamMembers=[];
    }

    fromData(data){
        this._teamMembers=[]

        for(let i=0;i<data._teamMembers.length;i++){
            let next_developer= Developer.fromData(data._teamMembers[i]);
            this.addMember(next_developer);
        }

    }

}

class Developer {
    constructor(name){
        this._name=name;
        this._tasks=[];
        this._hoursWorked=[];
        

    }
    get name(){
        return this._name
    }

    static fromData(data){
        let developer = new Developer(data._name);
        this._tasks=data._tasks;
        this._hoursWorked=data._hoursWorked;
        return developer
    }
}

