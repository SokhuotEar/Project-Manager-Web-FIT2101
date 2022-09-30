"use strict"
/*
    FIT2101: Assignment 3
    Agile Iteration 2

    This file contains the JavaScript code necessary to run the functionality of the Sprints page.

    Written by: Luke Phillips (32511760), [add name and ids here]
 */

// document ids
let addButtonRef = document.getElementById('add-button');
let addDialogRef = document.getElementById('add-sprint');
let viewDialogRef = document.getElementById('view-sprint');
let viewButtonRef = document.getElementById('open-button');
let completeButtonRef = document.getElementById('mark-button');
let confirmDialogRef = document.getElementById('confirm-complete-dialog');
let burndownDialogRef = document.getElementById('burndown-task-dialog');
let burndownButtonRef = document.getElementById('burndown-button')


// document id for test item (view item dialog)
let testItemRef = document.getElementById('test-item')
let viewTaskDialogRef = document.getElementById('view-task-dialog')

let burnDownRef = document.getElementById('burndown-chart');
let burnDownButtonRef = document.getElementById('show-chart');
let ctx = document.getElementById('myChart').getContext('2d');

// button to open dialog event listeners
addButtonRef.addEventListener('click', function() {
    addDialogRef.showModal();
});

viewButtonRef.addEventListener('click', function() {
        viewDialogRef.showModal();
    });
completeButtonRef.addEventListener('click', function() {
    confirmDialogRef.showModal();
});
testItemRef.addEventListener('dblclick', function() {
    viewTaskDialogRef.showModal()
});
// burndownButtonRef.addEventListener('click', function() {
//     burndownDialogRef.showModal();
// });


// burnDownButtonRef.addEventListener('click', function() {
//     burnDownRef.showModal();
//     viewDialogRef.close();
//     showChart()
// });

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

function showChart(){
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


// ///Testing view sprints
// console.log(sys)
// sys.createSprint("ee",new Date("2022-09-20"),new Date("2022-09-28"))
// sys.moveSprint(0,0)

// let task=sys.productBacklog._tasks[1]
// task._status="prog"
// let sprint = sys.activeSprint.sprintBacklog.add_task(task)


// console.log(sys)
// console.log(task)
// //console.log(task.getTotalTime())
// console.log(task.getTotalTime())
// task.logTime(10,new Date("2022-09-25"))
// console.log(task.getTotalTime())
// task.logTime(5,new Date("2022-09-24"))
// console.log(task.getTotalTime())
// console.log(task)


// viewTask(1,0)
// list is 0 to 2 -> NS or IP or Comp
// index is the place of it
function viewTask(list,index){
    let sprint = sys.activeSprint.sprintBacklog
    let task
    if (list==0){
        task=sprint.notStarted[index]
    } else if (list==1){
        task=sprint.started[index]
    } else if (list==2){
        task=sprint.completed[index]
    }
    
}

// ----------------------------------------------------------------------------------
// Add task to sprint backlog
let addTaskToSprintRef = document.getElementById('add-toSprint-button')
let addTaskDialogRef = document.getElementById('add-task-dialog')
addTaskToSprintRef.addEventListener('click', function() {
    addTaskDialogRef.showModal();
});

function addToSprintBacklog(i)
{
    let task = productBacklog[i]
    
    // add task to sprintBacklog
    let sprint = sys.activeSprint.sprintBacklog
    sprint.add_task(task)

    // remove the task from product backlog
    productBacklog.splice(i,1)

}


//-------------------------------------------------------------------------------------------------------
// Add sprint

function addSprint()
{
    let start = document.getElementById("start-date").value
    let end = document.getElementById("end-date").value


    let start_date = new Date(start)
    let end_Date = new Date(end)
    sys.createSprint(start_date,end_Date)

}

function addSprintConfirm()
{
    addSprint()
    addDialogRef.close()
    showSprint()
}

// -------------------------------------------------------------------------------------
// implement showSprint
function showSprint()
{
    showNotStartedSprint()
    showActiveSprint()
    showCompletedSprint()
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
                    <div class="mdl-card__title" style="background: darkgreen">
                        <h2 class="mdl-card__title-text">Iteration ${notStartedSprints[i].sprint_id}</h2>
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
                        <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" id='manage-button${i}' style="float:right">
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
        value += 
                `<div class="mdl-card__title" style="background: lightcoral">
                            <h2 class="mdl-card__title-text">${activeSprint.sprint_id}</h2>
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
                            <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" id='open-button' style="float:right" onclick = "viewActiveButton()">
                                VIEW
                            </button>
                        </div>`
    }

    sprintViewRef.innerHTML = value


}


function showCompletedSprint(){
    // get all not started prints
    let completedSprints = sys.completedSprints
    let value = ""

    // view it
    let sprintViewRef = document.getElementById("completed")
    
    for (let i = 0; i<completedSprints.length; i++)
    {
        value += 
            `
            <div class="mdl-cell mdl-cell--4-col">
            <div class="demo-card-wide mdl-card mdl-shadow--2dp" id="notstarted${i}">
                    <div class="mdl-card__title" style="background: darkgreen">
                        <h2 class="mdl-card__title-text">Iteration ${completedSprints[i].sprint_id}</h2>
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
                        <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" id='manage-button${i}' style="float:right">
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


}
// -----------------------------------------------------------------------------------------------------
// implement set active
function setActive(i)
{
    if (sys._activeSprint == null)
    {
        // make it active, add it to active
        let sprint = sys._notStartedSprints[i]
        sys._activeSprint = sprint

        // remove it from the not_started list
        sys.notStartedSprints.splice(i,1)

    }
    showSprint()
}



//-------------------------------------------------------------------------------------------------------------------------------------------
function viewActiveButton()
{
    viewDialogRef.show()
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

    sprint.sprintBacklog._started_task = []
    sprint.sprintBacklog._notStarted_task = []

    sys._productBacklog._tasks.concat(startedTask)
    sys._productBacklog._tasks.concat(not_startedTask)

    showSprint()

}




