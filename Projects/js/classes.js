"use strict"
/**
 * Contains all the necessary classes: System, ProductBacklog, Task, Sprint, SprintBacklog, TeamMember, Developer
 */


class System {
    //constructor
    constructor() {
        this._productBacklog = new ProductBacklog();
        this._teamMembers = new TeamMembers();
        this._allSprint = []
        this._activeSprint=null;
        this._completedSprints = [];
        this._notStartedSprints = [];
    }


    //accessors
    get allSprint()
    {
        return this._allSprint
    }
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
    //
    createSprint(id, start,end){
        let sprint = new Sprint(id,start,end)
        this._allSprint.push(sprint)
        this._notStartedSprints.push(sprint)
    }

    //setter
    moveSprint(list,index){
        let sprint
        if (list==0){
            sprint=this._notStartedSprints[index]
            if(this._activeSprint==null){
                this._activeSprint=sprint
                this._notStartedSprints.splice(index,1)
            }

        } else if (list==1){
            sprint=this.activeSprint()
            this._completedSprints.push(sprint)
            this._activeSprint=null
        }


    }

    //No methods done yet
    fromData(data){
        this._productBacklog.fromData(data._productBacklog)
        this._teamMembers.fromData(data._teamMembers);

        for(let i=0; i<this._productBacklog.tasks.length; i++){
            this._productBacklog.tasks[i].replaceMember(this._teamMembers.equivalentMember(this._productBacklog.tasks[i].developers[0]))
        }
        
        let developerINFO=this._teamMembers;

        console.log(data._activeSprint)



        if(data._activeSprint!=null){
        
            let toPush=Sprint.fromData(data._activeSprint,developerINFO);
            for(let i=0; i<toPush._sprintBacklog._allTask.length; i++){
                toPush._sprintBacklog._allTask[i].replaceMember(this._teamMembers.equivalentMember(toPush._sprintBacklog._allTask[i].developers[0]))
            }
            for(let i=0; i<toPush._sprintBacklog._notStarted_task.length; i++){
                toPush._sprintBacklog._notStarted_task[i].replaceMember(this._teamMembers.equivalentMember(toPush._sprintBacklog._notStarted_task[i].developers[0]))
            }
            for(let i=0; i<toPush._sprintBacklog._started_task.length; i++){
                toPush._sprintBacklog._started_task[i].replaceMember(this._teamMembers.equivalentMember(toPush._sprintBacklog._started_task[i].developers[0]))
            }
            for(let i=0; i<toPush._sprintBacklog._completedTask.length; i++){
                toPush._sprintBacklog._completedTask[i].replaceMember(this._teamMembers.equivalentMember(toPush._sprintBacklog._completedTask[i].developers[0]))
            }
            this._activeSprint=toPush

        }else{
            this._activeSprint=null
        }

        let cs=[]
        let ns=[]
        let as=[]
        for(let i=0;i<data._completedSprints.length;i++){
            let toPush=Sprint.fromData(data._completedSprints[i],developerINFO)
                    /*
        this._allTask = []
        this._notStarted_task = []
        this._started_task = []
        this._completedTask = []
        */
            for(let i=0; i<toPush._sprintBacklog._allTask.length; i++){
                toPush._sprintBacklog._allTask[i].replaceMember(this._teamMembers.equivalentMember(toPush._sprintBacklog._allTask[i].developers[0]))
            }
            for(let i=0; i<toPush._sprintBacklog._notStarted_task.length; i++){
                toPush._sprintBacklog._notStarted_task[i].replaceMember(this._teamMembers.equivalentMember(toPush._sprintBacklog._notStarted_task[i].developers[0]))
            }
            for(let i=0; i<toPush._sprintBacklog._started_task.length; i++){
                toPush._sprintBacklog._started_task[i].replaceMember(this._teamMembers.equivalentMember(toPush._sprintBacklog._started_task[i].developers[0]))
            }
            for(let i=0; i<toPush._sprintBacklog._completedTask.length; i++){
                toPush._sprintBacklog._completedTask[i].replaceMember(this._teamMembers.equivalentMember(toPush._sprintBacklog._completedTask[i].developers[0]))
            }

            cs.push(toPush)
            as.push(toPush)

        }
        for(let i=0;i<data._notStartedSprints.length;i++){
            let toPush=Sprint.fromData(data._notStartedSprints[i],developerINFO)
            for(let i=0; i<toPush._sprintBacklog._allTask.length; i++){
                toPush._sprintBacklog._allTask[i].replaceMember(this._teamMembers.equivalentMember(toPush._sprintBacklog._allTask[i].developers[0]))
            }
            for(let i=0; i<toPush._sprintBacklog._notStarted_task.length; i++){
                toPush._sprintBacklog._notStarted_task[i].replaceMember(this._teamMembers.equivalentMember(toPush._sprintBacklog._notStarted_task[i].developers[0]))
            }
            for(let i=0; i<toPush._sprintBacklog._started_task.length; i++){
                toPush._sprintBacklog._started_task[i].replaceMember(this._teamMembers.equivalentMember(toPush._sprintBacklog._started_task[i].developers[0]))
            }
            for(let i=0; i<toPush._sprintBacklog._completedTask.length; i++){
                toPush._sprintBacklog._completedTask[i].replaceMember(this._teamMembers.equivalentMember(toPush._sprintBacklog._completedTask[i].developers[0]))
            }

            ns.push(toPush)
            as.push(toPush)
        }


        this._completedSprints=cs;
        this._notStartedSprints=ns;
        this._allSprint=as;
    }

}

/**
 * Class for the product backlog
 */

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

    removeTask(i){
        if(i>-1){
            this._tasks.splice(i,1)
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

/**
 * Class for each task
 */

class Task {
    constructor(name, description, type, storyPoints, tags, priority,status){
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

    replaceMember(newDeveloper){
        this._developers=[newDeveloper];
    }

    addMember(developer){
        this._developers.push(developer)
    }

    removeMember(developer){
        let index = this._developers.indexOf(developer);

        if(index>-1){
            this._developers.splice(index,1)
        }
    }
    
    checkMember(developer){
        let index = this._developers.indexOf(developer);

        if(index>-1){
            return true
        }
        else{
            return false
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
        let array=this._timeSpent
        if(array.length==0){
            return array
        }
        let s_index=[];
        let e_index=[];
        let today;
// today is always after start
// today is always before end 
        for(let i=0; i<array.length;i++){
            today=new Date(array[i][0])
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
        let array=this._timeSpent
        let total=0
        for(let i=0; i<array.length;i++){
            total+=array[i][1]
        }
        return total
    }
    changeStatus(newStatus){
        this._status=newStatus;
    }
        
    logTime(timeToAdd, date){
        this._developers[0].logTimeD(timeToAdd, date)

        date.setHours(0,0,0,0)
        date=date.toString()
        if (this._timeSpent.length==0){
            this._timeSpent.push([date,timeToAdd])
            return
        }
        //loop through and see if it hits
        for(let i=0; i<this._timeSpent.length; i++){
            if(this._timeSpent[i][0]==date){
                this._timeSpent[i][1]+=timeToAdd
                return
            } else if(new Date(this._timeSpent[i][0])>new Date(date)){
                this._timeSpent.splice(i,0,[date,timeToAdd])
                return
            }
        }
        this._timeSpent.push([date,timeToAdd])
    }

    // updating local storage
    static fromData(data,developerINFO=false)
    {
        let task = new Task(data._name,data._description,data._type,data._storyPoints,data._tags,data._priority,data._status)
        task._developers=[]

        let next_developer= Developer.fromData(data._developers[0]);
        task.addMember(next_developer);

        

        for(let i=0;i<data._timeSpent.length;i++){
            let current = data._timeSpent[i]
            task._timeSpent.push([current[0],parseFloat(current[1])])
        }

        return task
    }


}

/**
 * Class for each sprint
 */

class Sprint {
    // please don't call this directly; call sys.createSprint() instead
    constructor(sprint_id, start_date, end_date)
    {
        this._sprintId = sprint_id;
        this._startDate = start_date;
        this._endDate = end_date;
        this._sprintBacklog = new SprintBacklog();
    }

    // getters
    get sprint_id()
    {
        return this._sprintId
    }
    get startDate()
    {
        return this._startDate
    }
    get endDate()
    {
        return this._endDate
    }
    get sprintBacklog()
    {
        return this._sprintBacklog
    }

    //setters
    set sprint_id(newId)
    {
        this._sprintId = newId
    }
    set startDate(newDate)
    {
        this._startDate = newDate
    }
    set endDate(newDate)
    {
        this._endDate = newDate
    }
    set sprintBacklog(backlog)
    {
        this._sprintBacklog = backlog
    }

    static fromData(data,developerINFO){
        let sb = SprintBacklog.fromData(data._sprintBacklog,developerINFO);
        let start = new Date(data._startDate)
        let end = new Date(data._endDate)
        console.log(data)
        let sprint = new Sprint(data._sprintId,start,end)
        sprint._sprintBacklog=sb
        return sprint
        
    }
}

/**
 * Class for the sprint backlog 
 */

class SprintBacklog {
    constructor()
    {
        this._allTask = []
        this._notStarted_task = []
        this._started_task = []
        this._completedTask = []
    }

    // get task
    get notStarted()
    {
        return this._notStarted_task
    }
    get started()
    {
        return this._started_task
    }
    get completed()
    {
        return this._completedTask
    }

    // add a task
    add_task(taskClass){
        
        // whenever a task is added, add it to all tasks first
        this._allTask.push(taskClass)

        // assign it to not started section
        this.assign_task(taskClass)
    }

    // assign task to relevant array
    assign_task(taskClass)
    {
        if (taskClass._status == "prog" || taskClass._status == "dev" || taskClass._status == "test"|| taskClass._status == "In Progress")
        {
            // push it to in started task array
            this._started_task.push(taskClass)
        }
        else if (taskClass._status == "N/S" || taskClass._status == "Not Started")
        {
            // assign it to not started array
            this._notStarted_task.push(taskClass)
        }
        else if (taskClass._status == "comp" || taskClass._status == "Completed")
        {
            // assign it to completed array
            this._completedTask.push(taskClass)
        }
    }


    // move task
    move_task(list,index, destination){
        console.log(list)
        console.log(this._notStarted_task)
        let task
        if(list==0){
            task = this._notStarted_task[index]
            this._notStarted_task.splice(index,1)
        } else if (list==1){
            task = this._started_task[index]
            this._started_task.splice(index,1)
        } else if (list==2){
            task = this._completedTask[index]
            this._completedTask.splice(index,1)
        }

        if(destination==0){
            task.status = "Not Started"
            this._notStarted_task.push(task)
        } else if (destination==1){
            task.status = "In Progress"
            this._started_task.push(task)
        } else if (destination==2){
            task.status = "Completed"
            this._completedTask.push(task)
        }

    }
    /* indexToMove: is the index of the task to move, relative to this._allTask
        dest
    */
    
        // find the task and 
    static fromData(data,developerINFO){
        let sb=new SprintBacklog()

        let at=[]
        let ns=[]
        let st=[]
        let co=[]
        for(let i=0;i<data._allTask.length;i++){
            at.push(Task.fromData(data._allTask[i],developerINFO))
        }
        for(let i=0;i<data._notStarted_task.length;i++){
            ns.push(Task.fromData(data._notStarted_task[i],developerINFO))
        }
        for(let i=0;i<data._started_task.length;i++){
            st.push(Task.fromData(data._started_task[i],developerINFO))
        }
        for(let i=0;i<data._completedTask.length;i++){
            co.push(Task.fromData(data._completedTask[i],developerINFO))
        }
        sb._allTask=at
        sb._notStarted_task=ns
        sb._started_task=st
        sb._completedTask=co
        return sb
    }
        
    
}

/**
 * Class for all the team members
 */

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

    equivalentMember(developer){
        //console.log(developer)
        for(let i=0; i<this._teamMembers.length; i++){
            let checkDev=this._teamMembers[i]
            //console.log(checkDev)
            if(checkDev.name==developer.name && JSON.stringify(checkDev.tasks)==JSON.stringify(developer.tasks) && JSON.stringify(checkDev.hoursWorked)==JSON.stringify(developer.hoursWorked)){
                return checkDev
            }
        }
        return false
    }

    fromData(data){
        this._teamMembers=[]

        for(let i=0;i<data._teamMembers.length;i++){
            let next_developer= Developer.fromData(data._teamMembers[i]);
            this.addMember(next_developer);
        }

    }

}

/**
 * Class for each developer/ team member
 */

class Developer {
    constructor(name, email){
        this._name=name;
        this._hoursWorked=[];
        this._email = email
    }
    get name(){
        return this._name
    }

    get hoursWorked(){
        return this._hoursWorked
    }

    getTimeDuring(start,end){
        start.setHours(0,0,0,0)
        end.setHours(0,0,0,10)
        
        //bad algorithm
        let array=this._hoursWorked
        if(array.length==0){
            return array
        }
        let s_index=[];
        let e_index="None";
        let today
        for(let i=0; i<array.length;i++){
            today=new Date(array[i][0])
            if(today>=start){
                s_index.push(i)
            }
            if(today<=end){
                e_index=i
            }
        }
        if (e_index=="None" || s_index.length==0){
            return []
        }
        return this._hoursWorked.slice(s_index[0],e_index+1)
    }
    
    getSummedTimeDuring(start,end){
        let array = this.getTimeDuring(start,end)
        console.log(array)
        let total=0
        for(let i=0; i<array.length;i++){
            total+=array[i][1]
        }
        return total
    }

    getTotalTime(){
        let array=this._hoursWorked
        let total=0
        for(let i=0; i<array.length;i++){
            total+=array[i][1]
        }
        return total
    }

    logTimeD(timeToAdd,date){
        date.setHours(0,0,0,0)
        date=date.toString()
        if (this._hoursWorked.length==0){
            this._hoursWorked.push([date,timeToAdd])
            return
        }
        //loop through and see if it hits
        for(let i=0; i<this._hoursWorked.length; i++){
            if(this._hoursWorked[i][0]==date){
                this._hoursWorked[i][1]+=timeToAdd
                return
            } else if(new Date(this._hoursWorked[i][0])>new Date(date)){
                this._hoursWorked.splice(i,0,[date,timeToAdd])
                return
            }
        }
        this._hoursWorked.push([date,timeToAdd])
    }


    static fromData(data){
        let developer = new Developer(data._name, data._email);
        console.log(data)
        for(let i=0;i<data._hoursWorked.length;i++){
            let current = data._hoursWorked[i];
            developer._hoursWorked.push([current[0],parseFloat(current[1])])
        }
        return developer
    }
}

