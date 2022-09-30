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
    viewTask(1,0)
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


//logging time
function logTimeForTask(list,index){
    let hours = document.getElementById("log-hours").value
    console.log(document.getElementById("log-date").value)
    let date = new Date(document.getElementById("log-date").value)

    let sprint = sys.activeSprint.sprintBacklog
    let task
    if (list==0){
        task=sprint.notStarted[index]
    } else if (list==1){
        task=sprint.started[index]
    } else if (list==2){
        task=sprint.completed[index]
    }
    task.logTime(hours,date)
    console.log(task)
    viewTaskDialogRef.close();

}



// STUFF BELOW THIS IS TO 
///Testing view sprints
sys.createSprint("ee",new Date("2022-09-20"),new Date("2022-09-28"))
sys.moveSprint(0,0)

let task=sys.productBacklog._tasks[1]
task._status="In Progress"
let sprint = sys.activeSprint.sprintBacklog.add_task(task)
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
                <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" onclick="logTimeForTask(${list},${index})">LOG TIME</button>
                <button type="button" class="mdl-button close">CLOSE</button>
                </div>
    </div>`

    document.getElementById('view-task-dialog').innerHTML=viewText
    
    
}