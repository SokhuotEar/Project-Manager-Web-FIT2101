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

burnDownButtonRef.addEventListener('click', function() {
    burnDownRef.showModal();
    viewDialogRef.close();
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


///Testing view sprints
console.log(sys)
sys.createSprint("ee",new Date("2022-09-20"),new Date("2022-09-28"))
sys.moveSprint(0,0)

let task=sys.productBacklog._tasks[1]
task._status="prog"
let sprint = sys.activeSprint.sprintBacklog.add_task(task)


console.log(sys)
console.log(task)
//console.log(task.getTotalTime())
console.log(task.getTotalTime())
task.logTime(10,new Date("2022-09-25"))
console.log(task.getTotalTime())
task.logTime(5,new Date("2022-09-24"))
console.log(task.getTotalTime())
console.log(task)


viewTask(1,0)
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