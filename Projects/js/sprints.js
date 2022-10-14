"use strict"
/*
    FIT2101: Assignment 3
    Agile Iteration 2

    This file contains the JavaScript code necessary to run the functionality of the Sprints page.

    Written by: Luke Phillips (32511760), Dasun Mahamadachchi (32488580), [add name and ids here]
 */

// document ids
let addButtonRef = document.getElementById('add-button');
let addDialogRef = document.getElementById('add-sprint');
let viewDialogRef = document.getElementById('view-sprint');
let viewCompleteRef = document.getElementById('view-sprint-completed');
let viewButtonRef = document.getElementById('open-button');
let completeButtonRef = document.getElementById('mark-button');
let confirmDialogRef = document.getElementById('confirm-complete-dialog');
let burndownDialogRef = document.getElementById('burndown-task-dialog');
let burndownButtonRef = document.getElementById('burndown-button');




// document id for test item (view item dialog)
let testItemRef = document.getElementById('test-item')
let viewTaskDialogRef = document.getElementById('view-task-dialog')

let burnDownRef = document.getElementById('burndown-chart');
let ctx = document.getElementById('myChart').getContext('2d');

// button to open dialog event listeners
addButtonRef.addEventListener('click', function() {
    addDialogRef.showModal();
});
/*
viewButtonRef.addEventListener('click', function() {

        viewDialogRef.showModal();
        listTasks()
        console.log(33)
});
    */
completeButtonRef.addEventListener('click', function() {
    confirmDialogRef.showModal();
});
testItemRef.addEventListener('dblclick', function() {
    viewTask(1,0,0)
});
burndownButtonRef.addEventListener('click', function() {
    burndownDialogRef.showModal();
    showChart()
});



// close dialog event listeners
addDialogRef.querySelector('.close').addEventListener('click', function() {
    addDialogRef.close();
});
viewDialogRef.querySelector('.close').addEventListener('click', function() {
    viewDialogRef.close();
});
confirmDialogRef.querySelector('.close').addEventListener('click', function() {
    confirmDialogRef.close();
});

showSprint()

//Function for the burndown chart -- not functional
function showChart(){
    let taskList=sys.activeSprint.sprintBacklog._allTask
    console.log(taskList)
    let SPTotal=0
    for(let i=0;i<taskList.length;i++){
        SPTotal+=taskList[i].storyPoints
    }
    SPTotal*=4
    let start= sys.activeSprint.startDate
    let end = sys.activeSprint.endDate
    let times =[start]
    let empty=[]

    ///THIS CODE IS TAKEN FROM https://stackoverflow.com/questions/4413590/javascript-get-array-of-dates-between-2-dates
    Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }
    function getDates(startDate, stopDate) {
        var dateArray = new Array();
        var currentDate = startDate;
        while (currentDate <= stopDate) {
            dateArray.push(new Date (currentDate));
            currentDate = currentDate.addDays(1);
            empty.push(0)
        }
        return dateArray;
    }
    //////

    
    let timds = getDates(start,end)
    console.log(timds)
    times=timds



    let len=times.length
    let increment = SPTotal/(len-1)
    

    let graph=[[times[0],SPTotal,0]]
    for(let i=1;i<times.length;i++){
        let last=graph[graph.length-1]
        graph.push([times[i],last[1]-increment,0])
    }

    for(let i=0;i<taskList.length;i++){
        console.log(taskList[i]._timespent)
        for(let j=0;j<taskList[i]._timespent;i++){
           for(let k=0;k<times.length;k++){
            if(taskList[i]._timespent[j][0].toDateString==times[k].toDateString){
                empty[k]+=taskList[i]._timespent[j][1]
            }
           }
        }
    }
    let logged=[empty[0]]
    for(let i=1;i<empty.length;i++){
        logged.push(logged[i-1]+empty[i])
    }
    for(let i=0;i<logged.length;i++){
        let ite=SPTotal-logged[i]
        if(ite<0){
            logged[i]=0
        } else{
            logged[i]=ite
        }
    }
    console.log(graph)
    console.log(logged)
    
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
            }
          },
    });
}


//Function to log time
function logTimeForTask(list,index,sprintID){
    let hours = document.getElementById("log-hours").value
    console.log(document.getElementById("log-date").value)
    let date = new Date(document.getElementById("log-date").value)


    
    let sprint = sys._allSprint[sprintID]._sprintBacklog
    let task

    console.log(date)
    console.log(sprint.endDate)
    if(date>sprint.endDate){
        return
    }
    console.log(sprint)
    if (list==0){
        task=sprint.notStarted[index]
    } else if (list==1){
        task=sprint.started[index]
    } else if (list==2){
        task=sprint.completed[index]
    }
    task.logTime(parseInt(hours),date)
    console.log(task)
    listTasks(sprintID)
    viewTaskDialogRef.close();
    
}



// STUFF BELOW THIS IS TO 
///Testing view sprints

//Function for view task dialog
// list is 0 to 2 -> NS or IP or Comp
// index is the place of it
function viewTask(list,index,sprintID){
    viewTaskDialogRef.showModal()
    console.log("viewing")
    let sprint = sys._allSprint[sprintID].sprintBacklog
    let task
    if (list==0){
        task=sprint.notStarted[index]
    } else if (list==1){
        task=sprint.started[index]
    } else if (list==2){
        task=sprint.completed[index]
    }
    let teamMemberText=''
    console.log(task.developers)
    for(let i=0;i<task.developers.length;i++){
        let tm = task.developers[i]
        teamMemberText+=`<li class="mdl-list__item">
            <span class="mdl-list__item-primary-content">
                <i class="material-icons mdl-list__item-icon">person</i>
                    ${tm.name}
            </span>
        </li>`
    }

    let prio=task.priority;
    let tag=task.tags;
    let type = task.type;
    let status = task.status
    let typeCSS;
    let prioCSS;
    let tagCSS;
    let statusCSS;
    if(prio=="Low"){
        prioCSS="low-p"
    }
    else if(prio=="Medium"){
        prioCSS="med-p"
    }
    else if(prio=="High"){
        prioCSS="high-p"
    }
    else if(prio=="Critical"){
        prioCSS="crit-p"
    }

    if(tag=="UI"){
        tagCSS= "ui-tag"
    }
    else if(tag=="Core"){
        tagCSS="core-tag"
    }
    else if(tag=="Testing"){
        tagCSS="testing-tag"
    }

    if (type === "userStory"){
        typeCSS = 'userstory';
    } 
    else if (type == "bug"){
        typeCSS = 'bug';
    }
    if (status=="Not Started"){
        statusCSS="not-started"
    } else if (status =="In Progress"){
        statusCSS="in-progress"
    } else if (status =="Completed"){
        statusCSS=="finished"
    }

    let viewText=`<div class="mdl-grid" style="padding-right: 0">
                <div class="mdl-cell mdl-cell--10-col" style="margin: 0 0 0 10px;">
                    <h4 style="font-size:2.5rem; margin: 9px 0 0;">Add Sprint Functionality</h4>
                </div>
                <div class="mdl-cell mdl-cell--2-col">
                    <div style="float:right; font-size: 12pt">
                        <span class="mdl-chip not-started">
                            <span class="mdl-chip__text ${statusCSS}">${task.status}</span>
                        </span>
                    </div>
                </div>
            </div>
            <div class="mdl-dialog__content" style="font-family:Roboto, sans-serif; padding:0;">
                <div class="mdl-grid" style="padding-right: 0; padding-top:0; height: 256px">
                    <div class="mdl-cell mdl-cell--6-col task-info">
                        <b>Description:</b>
                        <p>${task.description}</p>
                        <b>Story points:</b> ${task.storyPoints}
                        <div style="padding-top:5px"><b style="position:absolute;margin-top:8px">Tags:</b>
                            <span class="mdl-chip ${tagCSS}" style="margin-left:40px">
                                        <span class="mdl-chip__text">${task.tags}</span>
                                    </span>
                        </div>
                        <div><b style="position:absolute;margin-top:8px">Priority:</b>
                            <span class="mdl-chip ${prioCSS}" style="margin-left:58px">
                                        <span class="mdl-chip__text">${task.priority}</span>
                                    </span>
                        </div>
                    </div>
                    <div class="mdl-cell mdl-cell--6-col">
                        <p><b>Team Members:</b></p>
                        <ul class="demo-list-icon mdl-list" id="team-list">
                            ${teamMemberText}
                        </ul>
                    </div>
                </div>
                <div class="task-divider">
                    <h4 style="margin: -4px 0 0;color:black; font-size:1.3rem;">Sprint Information</h4>
                </div>
                <div class="mdl-grid" style="padding-right: 0">
                    <div class="mdl-cell mdl-cell--3-col task-info" style="text-align: center">
                        <b>Time logged: </b>${task.getTotalTime()} hours
                    </div>
                    <div class="mdl-cell mdl-cell--9-col">
                        <b>Log a time:</b>
                        <form action="#">
                            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                <input class="mdl-textfield__input" type="text" id="log-hours">
                                <label class="mdl-textfield__label" for="log-hours">Enter hours...</label>
                            </div>
                        </form>
                        <div class="mdl-textfield--floating-label has-placeholder">
                            <div class="mdl-textfield mdl-js-textfield">
                                <input class="mdl-textfield__input" type="date" id="log-date">
                                <label class="mdl-textfield__label" for="log-date">Enter log date:</label>
                                <span id="log_date_err" class="mdl-textfield__error" style='visibility: visible;'></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mdl-dialog__actions">
                <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" onclick="logTimeForTask(${list},${index},${sprintID})">LOG TIME</button>
                <button type="button" class="mdl-button close" onclick="closeView()">CLOSE</button>
                </div>
    </div>`

    document.getElementById('view-task-dialog').innerHTML=viewText

    
    
}

function closeView(){
    viewTaskDialogRef.close();
}



// Function for showing actual tasks of a sprint
function listTasks(sprintID){

    let sprint=sys._allSprint[sprintID];
    console.log(sprint)
    let notStartedList=sprint._sprintBacklog.notStarted
    let startedList=sprint.sprintBacklog.started
    let completedList=sprint.sprintBacklog.completed
    let nsHTML=""
    let ipHTML=""
    let comHTML=""
    console.log(sprint)
    console.log(notStartedList)
    console.log(startedList)
    console.log(completedList)
    for(let i=0; i<notStartedList.length;i++){
        nsHTML+=`<li class="mdl-list__item list-item" id='test-item' style="padding-top:8px;padding-bottom:8px"  ondblclick="viewTask(${0},${i},${sprintID})">
        <span class="mdl-list__item-primary-content" style="font-size:10pt">
            ${notStartedList[i].name}
        </span>
        <span class="mdl-list__item-secondary-action" style="margin-left:5px">
            <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="list-checkbox-ns-${i}">
                <input type="checkbox" id="list-checkbox-ns-${i}" class="mdl-checkbox__input" />
            </label>
        </span>
    </li>`
    }
    for(let i=0; i<startedList.length;i++){
        ipHTML+=`<li class="mdl-list__item list-item" id='test-item' style="padding-top:8px;padding-bottom:8px"  ondblclick="viewTask(${1},${i},${sprintID})">
        <span class="mdl-list__item-primary-content" style="font-size:10pt">
            ${startedList[i].name}
        </span>
        <span class="mdl-list__item-secondary-action" style="margin-left:5px">
            <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="list-checkbox-s-${i}">
                <input type="checkbox" id="list-checkbox-s-${i}" class="mdl-checkbox__input" />
            </label>
        </span>
    </li>`

    }
    for(let i=0; i<completedList.length;i++){
        comHTML+=`<li class="mdl-list__item list-item" id='test-item' style="padding-top:8px;padding-bottom:8px"  ondblclick="viewTask(${2},${i},${sprintID})">
        <span class="mdl-list__item-primary-content" style="font-size:10pt">
            ${completedList[i].name}
        </span>
        <span class="mdl-list__item-secondary-action" style="margin-left:5px">
            <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="list-checkbox-c-${i}">
                <input type="checkbox" id="list-checkbox-c-${i}" class="mdl-checkbox__input" />
            </label>
        </span>
    </li>`

    }

    document.getElementById("ns-list").innerHTML=nsHTML
    document.getElementById("ip-list").innerHTML=ipHTML
    document.getElementById("com-list").innerHTML=comHTML
    localStorage.setItem(SYSTEM_KEY, JSON.stringify(sys));
}

//completed list
function listCompletedSprintTasks(sprintID){

    let sprint=sys._allSprint[sprintID];
    console.log(sprint)
    let notStartedList=sprint._sprintBacklog.notStarted
    let startedList=sprint.sprintBacklog.started
    let completedList=sprint.sprintBacklog.completed
    let nsHTML=""
    let ipHTML=""
    let comHTML=""
    for(let i=0; i<notStartedList.length;i++){
        nsHTML+=`<li class="mdl-list__item list-item" id='test-item' style="padding-top:8px;padding-bottom:8px"  ondblclick="viewTask(${0},${i},${sprintID})">
        <span class="mdl-list__item-primary-content" style="font-size:10pt">
            ${notStartedList[i].name}
        </span>
        <span class="mdl-list__item-secondary-action" style="margin-left:5px">
            <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="list-checkbox-ns-${i}">
                <input type="checkbox" id="list-checkbox-ns-${i}" class="mdl-checkbox__input" />
            </label>
        </span>
    </li>`
    }
    for(let i=0; i<startedList.length;i++){
        ipHTML+=`<li class="mdl-list__item list-item" id='test-item' style="padding-top:8px;padding-bottom:8px"  ondblclick="viewTask(${1},${i},${sprintID})">
        <span class="mdl-list__item-primary-content" style="font-size:10pt">
            ${startedList[i].name}
        </span>
        <span class="mdl-list__item-secondary-action" style="margin-left:5px">
            <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="list-checkbox-s-${i}">
                <input type="checkbox" id="list-checkbox-s-${i}" class="mdl-checkbox__input" />
            </label>
        </span>
    </li>`

    }
    for(let i=0; i<completedList.length;i++){
        comHTML+=`<li class="mdl-list__item list-item" id='test-item' style="padding-top:8px;padding-bottom:8px"  ondblclick="viewTask(${2},${i},${sprintID})">
        <span class="mdl-list__item-primary-content" style="font-size:10pt">
            ${completedList[i].name}
        </span>
        <span class="mdl-list__item-secondary-action" style="margin-left:5px">
            <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="list-checkbox-c-${i}">
                <input type="checkbox" id="list-checkbox-c-${i}" class="mdl-checkbox__input" />
            </label>
        </span>
    </li>`

    }

    document.getElementById("ns-list-completed").innerHTML=nsHTML
    document.getElementById("ip-list-completed").innerHTML=ipHTML
    document.getElementById("com-list-completed").innerHTML=comHTML
    localStorage.setItem(SYSTEM_KEY, JSON.stringify(sys));
}


// ----------------------------------------------------------------------------------
// Add task to sprint backlog

let addTaskDialogRef = document.getElementById('add-task-dialog')

let addTaskToSprintRef = document.getElementById('add-toSprint-button')
addTaskToSprintRef.addEventListener('click', function() {
    addTaskDialogRef.showModal();
    addTaskWindow()
});




addTaskDialogRef.querySelector('.close').addEventListener('click', function() {
    addTaskDialogRef.close();
});
confirmDialogRef.querySelector('.close').addEventListener('click', function() {
    confirmDialogRef.close();
});

function addToSprintBacklog(i,sprintID)
{
    let task = productBacklog[i]
    
    // add task to sprintBacklog
    let sprint = sys._allSprint[sprintID].sprintBacklog
    sprint.add_task(task)

    // remove the task from product backlog
    productBacklog.splice(i,1)

}


//-------------------------------------------------------------------------------------------------------
// Add sprint

function addSprint()
{
    let id = document.getElementById("sprint-name").value
    let start = document.getElementById("start-date").value
    let end = document.getElementById("end-date").value


    let start_date = new Date(start)
    let end_Date = new Date(end)

    //date verification
    validateDate(start_date, end_Date)

    //verifications
    if (id == null)
    {
        alert("Sprint name cannot be null!")
        return;
    }
    for (let i=0; i<sys._allSprint.length; i++)
    {
        if (id == sys._allSprint[i]._sprintId)
        {
            alert("Sprint name already exists")
            return;
        }
    }
    console.log(end_Date)
    sys.createSprint(id, start_date,end_Date)
    console.log(sys)
}

function addSprintConfirm()
{
    addSprint()
    addDialogRef.close()
    showSprint()
    localStorage.setItem(SYSTEM_KEY, JSON.stringify(sys));
}


function validateDate(startDate,endDate)
{
    if (startDate == null || endDate == null)
    {
        alert("Start date or end date cannot be null!");
        return
    }
    if (startDate > endDate)
    {
        alert("Start date cannot be after end date!")
        return
    }
}


// -------------------------------------------------------------------------------------
// implement showSprint
function showSprint()
{
    showNotStartedSprint()
    showActiveSprint()
    showCompletedSprint()
    localStorage.setItem(SYSTEM_KEY, JSON.stringify(sys));
}


//add task
function addTaskWindow(sprintID){
    /*
    console.log(sprintID)
    console.log(sys._allSprint)
    if(sys._allSprint[sprintID]._endDate<new Date()){
        console.log("L")
        return
    }*/
    let taskList=""

    for(let i=0; i<sys.productBacklog.tasks.length; i++){
        taskList+=`<li class="mdl-list__item list-item" id='test-item' style="padding-top:8px;padding-bottom:8px">
        <span class="mdl-list__item-primary-content" style="font-size:16pt">
            ${sys.productBacklog.tasks[i].name}
        </span>
        <span class="mdl-list__item-secondary-action" style="margin-left:5px">
            <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="add-task-${i}">
                <input type="checkbox" id="add-task-${i}" class="mdl-checkbox__input" />
            </label>
        </span>
    </li>`
    }
    document.getElementById('add-task-html').innerHTML=taskList
    
}

function addTask(){
    for(let i=sys.productBacklog.tasks.length-1; i>=0; i--){
        console.log(`add-task-${i}`)
        if(document.getElementById(`add-task-${i}`).checked){
            let task = sys.productBacklog.tasks[i]
            sys._allSprint[SiD].sprintBacklog.add_task(task)
            sys.productBacklog.removeTask(i)
            
        }
    }
    console.log(sys)
    listTasks(SiD)
    addTaskDialogRef.close();
    localStorage.setItem(SYSTEM_KEY, JSON.stringify(sys));
}







function showNotStartedSprint()
{

    // get all not started prints
    let notStartedSprints = sys.notStartedSprints
    let value = ""

    // view it
    let sprintViewRef = document.getElementById("notstarted")
    
    console.log(notStartedSprints.length)
    for (let i = 0; i<notStartedSprints.length; i++)
    {
        value += 
            `
            <div class="mdl-cell mdl-cell--4-col">
            <div class="demo-card-wide mdl-card mdl-shadow--2dp" id="notstarted${i}">
                    <div class="mdl-card__title" style="background: orange">
                        <h2 class="mdl-card__title-text">Sprint ${notStartedSprints[i].sprint_id}</h2>
                    </div>
                    <div class="mdl-card__supporting-text" style="font-family:Roboto, sans-serif">
                    <span class="mdl-chip start-time">
                        <span class="mdl-chip__text">Set to start: ${notStartedSprints[i]._startDate.toDateString()} </span>
                    </span>
                        <span class="mdl-chip finish-time">
                        <span class="mdl-chip__text">Set to finish:${notStartedSprints[i]._endDate.toDateString()} </span>
                    </span>
                        
                    </div>
                    <div class="mdl-card__actions mdl-card--border" style="padding-right:15px">
                        <!-- Accent-colored raised button with ripple -->
                        <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" id='manage-button${i}' onclick='manage(${i})' style="float:right">
                            MANAGE
                        </button>
                    <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" id='setActive-button${i}' onclick = "setActive(${i})" style="float:right">
                        Set Active
                    </button>
                    </div>
                    
                </div> 
            </div>`
    }

    sprintViewRef.innerHTML = value

    localStorage.setItem(SYSTEM_KEY, JSON.stringify(sys));
}

function showActiveSprint()
{
    // get the active sprint
    let activeSprint = sys.activeSprint
    // view it
    let sprintViewRef = document.getElementById("active-sprint-view")
    let value = ""

    if (activeSprint == null)
    {
    }
    else
    {   
        console.log(activeSprint)
        value += 
                `<div class="mdl-card__title" style="background: lightcoral">
                            <h2 class="mdl-card__title-text">Sprint ${activeSprint.sprint_id}</h2>
                        </div>
                        <div class="mdl-card__supporting-text" style="font-family:Roboto, sans-serif">
                                    <span class="mdl-chip start-time">
                                        <span class="mdl-chip__text">Started on: ${activeSprint._startDate.toDateString()}</span>
                                    </span>
                            <span class="mdl-chip finish-time">
                                        <span class="mdl-chip__text">Set to finish: ${activeSprint._endDate.toDateString()}</span>
                                    </span>
                        </div>
                        <div class="mdl-card__actions mdl-card--border" style="padding-right:15px">
                            <!-- Accent-colored raised button with ripple -->
                            <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" id='open-button' style="float:right" onclick = "manageActive()">
                                VIEW
                            </button>
                        </div>`
    }

    sprintViewRef.innerHTML = value


}


function showCompletedSprint(){
    // get all completed sprints
    let completedSprints = sys.completedSprints
    let value = ""

    // view it
    let sprintViewRef = document.getElementById("completed")
    
    for (let i = 0; i<completedSprints.length; i++)
    {
        value += 
            `
            <div class="mdl-cell mdl-cell--4-col">
            <div class="demo-card-wide mdl-card mdl-shadow--2dp" id="completed${i}">
                    <div class="mdl-card__title" style="background: orange">
                        <h2 class="mdl-card__title-text">Sprint ${completedSprints[i].sprint_id}</h2>
                    </div>
                    <div class="mdl-card__supporting-text" style="font-family:Roboto, sans-serif">
                    <span class="mdl-chip start-time">
                        <span class="mdl-chip__text">Set to start: ${completedSprints[i]._startDate.toDateString()} </span>
                    </span>
                        <span class="mdl-chip finish-time">
                        <span class="mdl-chip__text">Set to finish:${completedSprints[i]._endDate.toDateString()} </span>
                    </span>
                        
                    </div>
                    <div class="mdl-card__actions mdl-card--border" style="padding-right:15px">
                        <!-- Accent-colored raised button with ripple -->
                        <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" id='open-button' style="float:right" onclick = "manageCompleted(${i})">
                                VIEW
                        </button>
                    </div>
                    
                </div> 
            </div>`
    }

    sprintViewRef.innerHTML = value


}
// -----------------------------------------------------------------------------------------------------
// implement set active
function setActive(i)
{

    if (sys._activeSprint == null)
    { 

        // make it active, add it to active
        let sprint = sys._notStartedSprints[i]
        console.log(sprint)
        // check if sprint is empty
        if ((sprint.sprintBacklog._allTask.length == 0) && (sprint.sprintBacklog._completedTask.length == 0) && (sprint.sprintBacklog._notStarted_task.length == 0))
        {
            // print "sprint is empty" to UI
            alert("Sprint is empty!")
            return;
        }

        sys._activeSprint = sprint

        // remove it from the not_started list
        sys.notStartedSprints.splice(i,1)

    }
    showSprint()
}



//-------------------------------------------------------------------------------------------------------------------------------------------
function viewActiveButton()
{
    viewDialogRef.showModal()
    listTasks()
}

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// implement Incomplete or in progress tasks get added back to product backlog

function markSprintAsComplete()
{

    let sprint = sys._activeSprint

    sys._activeSprint = null
    sys._completedSprints.push(sprint)

    confirmDialogRef.close()
    viewDialogRef.close()


    //check any uncompletedSprint, put them back to product backlog
    let startedTask = sprint._sprintBacklog._started_task
    let not_startedTask = sprint._sprintBacklog._notStarted_task
    for(let i=0;i<startedTask.length; i++){
        sys._productBacklog._tasks.push(startedTask[i])
    }
    for(let i=0;i<not_startedTask.length; i++){
        sys._productBacklog._tasks.push(not_startedTask[i])
    }

    console.log(startedTask)
    console.log(not_startedTask)

    sprint.sprintBacklog._started_task = []
    sprint.sprintBacklog._notStarted_task = []

    

    showSprint()
    console.log(sys)
}

// function to move from not started to in progress
function nsToIp(sprintID=SiD){
    if(sys._allSprint[sprintID].endDate<new Date()){
        console.log("L")
        return
    }
    let sprint=sys._allSprint[sprintID];
    let notStartedList=sprint.sprintBacklog.notStarted
    for(let i=notStartedList.length-1; i>=0;i--){
        console.log(`list-checkbox-ns-${i}`)
        if(document.getElementById(`list-checkbox-ns-${i}`).checked){
            sprint.sprintBacklog.move_task(0,i,1)
        }
    }

    listTasks(sprintID)
}
//function to move from in progress to not started
function ipToNs(sprintID=SiD){
    if(sys._allSprint[sprintID].endDate<new Date()){
        console.log("L")
        return
    }
    let sprint=sys._allSprint[sprintID];
    let startedList=sprint.sprintBacklog.started
    for(let i=startedList.length-1; i>=0;i--){
        if(document.getElementById(`list-checkbox-s-${i}`).checked){
            sprint.sprintBacklog.move_task(1,i,0)
        }
    }
    listTasks(sprintID)
}
//function to move from in progress to complete
function ipToCom(sprintID=SiD){
    if(sys._allSprint[sprintID].endDate<new Date()){
        console.log("L")
        return
    }
    let sprint=sys._allSprint[sprintID];
    let startedList=sprint.sprintBacklog.started
    for(let i=startedList.length-1; i>=0;i--){
        if(document.getElementById(`list-checkbox-s-${i}`).checked){
            sprint.sprintBacklog.move_task(1,i,2)
        }
    }  
    listTasks(sprintID)
}
//function to move from complete to in progress
function comToIp(sprintID=SiD){
    if(sys._allSprint[sprintID].endDate<new Date()){
        console.log("L")
        return
    }
    let sprint=sys._allSprint[sprintID];
    let completedList=sprint.sprintBacklog.completed
    for(let i=completedList.length-1; i>=0;i--){
        if(document.getElementById(`list-checkbox-c-${i}`).checked){
            sprint.sprintBacklog.move_task(2,i,1)
        }
    }
    listTasks(sprintID)
}

let SiD;
function manage(sprintID){

    viewDialogRef.showModal();
    document.getElementById('view-start-date').innerText="Started on: "+sys._notStartedSprints[sprintID]._startDate.toDateString()
    document.getElementById('view-end-date').innerText= "Set to finish: "+sys._notStartedSprints[sprintID]._endDate.toDateString()
    document.getElementById('view-name').innerText= "Sprint "+sys._notStartedSprints[sprintID].sprint_id;
    SiD = sys.find_sprint_index(sys._notStartedSprints[sprintID])
    listTasks(SiD)
}

function manageActive(){

    viewDialogRef.showModal();
    document.getElementById('view-start-date').innerText="Started on: "+sys._activeSprint._startDate.toDateString()
    document.getElementById('view-end-date').innerText= "Set to finish: "+sys._activeSprint._endDate.toDateString()
    document.getElementById('view-name').innerText= "Sprint "+sys._activeSprint.sprint_id;
    SiD = sys.find_sprint_index(sys._activeSprint)
    console.log(sys._activeSprint)
    listTasks(SiD)
}


function manageCompleted(sprintID){

    viewCompleteRef.showModal();
    document.getElementById('view-start-date-completed').innerText="Started on: "+sys._completedSprints[sprintID]._startDate.toDateString()
    document.getElementById('view-end-date-completed').innerText= "Finished on: "+sys._completedSprints[sprintID]._endDate.toDateString()
    document.getElementById('view-name-completed').innerText= "Sprint "+sys._completedSprints[sprintID].sprint_id;
    SiD = sys.find_sprint_index(sys._completedSprints[sprintID])
    listCompletedSprintTasks(SiD)
}

function closeCompleted(){
    viewCompleteRef.close();
}


showSprint()
