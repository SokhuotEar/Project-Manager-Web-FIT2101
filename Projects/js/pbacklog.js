"use strict"

let view_dialog = document.getElementById('view-dialog')
let view_button = document.getElementById('open-button')
let add_dialog = document.getElementById('add-dialog')
let add_button = document.getElementById('add-button')
let close_dialog = document.getElementById('close-dialog')
let close_button = document.getElementById('close-button')

view_button.addEventListener('click', function() {
    view_dialog.showModal();
});

view_dialog.querySelector('.close').addEventListener('click', function() {
    view_dialog.close();
});

add_button.addEventListener('click', function() {
    add_dialog.showModal();
});

add_dialog.querySelector('.close').addEventListener('click', function() {
    add_dialog.close();
});

close_button.addEventListener('click', function() {
    close_dialog.showModal();
});

close_dialog.querySelector('.close').addEventListener('click', function() {
    close_dialog.close();
});

let productBacklog = sys.productBacklog;

function showCards(){
    let words=''
    for(let i=0; i<productBacklog.showTasks().length;i++){
        let task = productBacklog.showTasks()[i]
        console.log(task)
        words+=
        `<div class="mdl-cell mdl-cell--4-col">
            <div class="demo-card-wide mdl-card mdl-shadow--2dp" id="card${i}">
                <div class="mdl-card__title" style="background: lightcoral">
                    <h2 class="mdl-card__title-text">${task.name}</h2>
                </div>
                <div class="mdl-card__supporting-text" style="font-family:Roboto, sans-serif">
                    <span class="mdl-chip ui-tag">
                        <span class="mdl-chip__text">${task.tag}</span>
                    </span>
                    <span class="mdl-chip low-p">
                        <span class="mdl-chip__text">${task.priority}</span>
                    </span>
                    <span class="mdl-chip">
                        <span class="mdl-chip__text">${task.storyPoints} story points</span>
                    </span>
                </div>
                <div class="mdl-card__actions mdl-card--border" style="padding-right:15px">
                    <!-- Accent-colored raised button with ripple -->
                    <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" id='open-button' style="float:right">
                        VIEW
                    </button>
                </div>
                <div class="mdl-card__menu">
                    <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" id="close-button">
                        <i class="material-icons">close</i>
                    </button>
                    <div class="mdl-tooltip" data-mdl-for="close">
                        <strong>Delete Task</strong>
                    </div>
                </div>
            </div>
        </div>`
    }
    console.log(words)
    document.getElementById("testing").innerHTML = words;
}


function addTask(){
    let name=document.getElementById("task-name").value;
    let description=document.getElementById("task-desc").value;
    let storyPoints=document.getElementById("storyp").value;
    let priority=document.getElementById("priority").value;
    let status=document.getElementById("cars").value;
    
    let task = new Task(name,description,"user story",storyPoints,"UI",priority,status);
    productBacklog.addTask(task);
    console.log(task);
    showCards();
    add_dialog.close();
    localStorage.setItem('ProductBacklog',JSON.stringify(sys))
}