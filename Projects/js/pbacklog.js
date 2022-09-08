"use strict"

let view_dialog = document.getElementById('view-dialog')
let view_button = document.getElementById('open-button')
let add_dialog = document.getElementById('add-dialog')
let add_button = document.getElementById('add-button')
let close_button = document.getElementById('close-button')
let edit_dialog = document.getElementById("edit-dialog");

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

///delete functionality
close_button.addEventListener('click', function() {
    close_dialog.showModal();
});

function deletequery(i){
    let close_dialog = document.getElementById('close-dialog')
    let delete_button = document.getElementById('delete-confirm')
    close_dialog.showModal();
    
    delete_button.addEventListener('click', function() {
        deleteTask(i);
        close_dialog.close();
    })

    close_dialog.querySelector('.close').addEventListener('click', function() {
        close_dialog.close();
    });
}



let productBacklog = sys.productBacklog;

function showCards(){
    let words='';
    for(let i=0; i<productBacklog.showTasks().length;i++){
        let task = productBacklog.showTasks()[i]
        let prio=task.priority;
        let tag=task.tags;
        let prio_css;
        let tag_css;
        if(prio=="low"){
            prio_css="low-p"
        }
        else if(prio=="med"){
            prio_css="med-p"
        }
        else if(prio=="high"){
            prio_css="high-p"
        }
        else if(prio=="crit"){
            prio_css="crit-p"
        }

        if(tag=="UI"){
            tag_css= "ui-tag"
        }
        else if(tag=="CORE"){
            tag_css="core-tag"
        }
        else if(tag=="Testing"){
            tag_css="testing-tag"
        }
        words+=
        `<div class="mdl-cell mdl-cell--4-col">
            <div class="demo-card-wide mdl-card mdl-shadow--2dp" id="card${i}">
                <div class="mdl-card__title" style="background: lightcoral">
                    <h2 class="mdl-card__title-text">${task._name}</h2>
                </div>
                <div class="mdl-card__supporting-text" style="font-family:Roboto, sans-serif">
                    <span class="mdl-chip ${tag_css}">
                        <span class="mdl-chip__text">${task._tag}</span>
                    </span>
                    <span class="mdl-chip ${prio_css}">
                        <span class="mdl-chip__text">${task._priority}</span>
                    </span>
                    <span class="mdl-chip">
                        <span class="mdl-chip__text">${task._storyPoints} story points</span>
                    </span>
                </div>
                <div class="mdl-card__actions mdl-card--border" style="padding-right:15px">
                    <!-- Accent-colored raised button with ripple -->
                    <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" id='open-button' style="float:right" onclick = "view_task(${i})">
                        VIEW
                    </button>
                </div>
                <div class="mdl-card__menu">
                    <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" onclick="deletequery(${i})">
                        <i class="material-icons">close</i>
                    </button>
                    <div class="mdl-tooltip" data-mdl-for="close">
                        <strong>Delete Task</strong>
                    </div>
                </div>
            </div>
        </div>`
    }
    document.getElementById("testing").innerHTML = words;

    localStorage.setItem(SYSTEM_KEY, JSON.stringify(sys));
    console.log(sys)

}


function addTask(){
    let name=document.getElementById("task-name").value;
    let description=document.getElementById("task-desc").value;
    let storyPoints=document.getElementById("storyp").value;
    let priority=document.getElementById("priority").value;
    let status=document.getElementById("cars").value;
    
    let task = new Task(name,description,"user story",storyPoints,"UI",priority,status);
    productBacklog.addTask(task);
    showCards();
    add_dialog.close();
    localStorage.setItem(SYSTEM_KEY, JSON.stringify(sys));
}

function deleteTask(i){
    productBacklog.removeTask(productBacklog.tasks[i]);
    showCards();
}


//-----------------------------------------------------------------------------------
// view functionality
function retrieve_from_local_storage()
{
    return localStorage.getItem(SYSTEM_KEY);
    
}


function view_task(i)
{
    // first retrieve information from local storage
    let storage = retrieve_from_local_storage("ProductBacklog");
    let backlog = JSON.parse(storage)._productBacklog;
    let task = backlog._tasks[i];
    
    
    //show modal()
    // edit the html content in the modal first
    let view_html_content = `
    <h4 class="mdl-dialog__title" style="padding-left:30px">${task._name}</h4>
    <div class="mdl-dialog__content" style="font-family:Roboto, sans-serif">
        <div class="mdl-grid" style="padding:0;">
            <div class="mdl-cell mdl-cell--6-col">
                <p>
                    ${task._description}
                </p>
                <br>
                <b>Story points:</b> ${task._storyPoints}
                <div style="padding-top:5px"><b style="position:absolute;margin-top:8px">Tags:</b>
                    <span class="mdl-chip" style="background-color:orange;margin-left:40px">
                        <span class="mdl-chip__text">${task._tag}</span>
                    </span>
                </div>
                <div><b style="position:absolute;margin-top:8px">Priority:</b>
                    <span class="mdl-chip" style="background-color:lightskyblue;margin-left:58px">
                        <span class="mdl-chip__text">${task._priority}</span>
                    </span>
                </div>
            </div>
            <div class="mdl-cell mdl-cell--6-col">
                <p><b>Team Members:</b></p>
                <ul class="demo-list-icon mdl-list" style="border-style: solid;">
                    <! -- for team members !>
                </ul>
                <div><b style="position:absolute;margin-top:8px">Status:</b>
                    <span class="mdl-chip" style="margin-left:58px">
                        <span class="mdl-chip__text">Not Started</span>
                    </span>
                </div>
            </div>
        </div>
    </div>
    <div class="mdl-dialog__actions">
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" onclick = edit_task(${i}) >EDIT</button>
        <button type="button" class="mdl-button close" onclick = close_viewtask() >CLOSE</button>
    </div> `;

    //TO DO: implement team member feild
    /*
    // get team member's information
    for (i = 0; i< task._teammembers.length; i++)
    {
        //create a team member html content
        document.getElementById().innerHTML = 
        `
        <li class="mdl-list__item">
        <span class="mdl-list__item-primary-content">
        <i class="material-icons mdl-list__item-icon">person</i>
        ${task._teammembers.}
        </span>
        </li>
        `
    }
    */

    //add content to the model
    document.getElementById("view-dialog").innerHTML = view_html_content;

    // show modal
    let view_dialog = document.getElementById("view-dialog");
    view_dialog.showModal();

}

function close_viewtask()
{
    view_dialog.close()
}

// ------------------------------------------------------------------------------
// edit task functionality

function edit_task(i)
{
    let storage = retrieve_from_local_storage("ProductBacklog");
    let backlog = JSON.parse(storage)._productBacklog;
    let task = backlog._tasks[i];

    // show edit task dialog (this is similar to add task dialog
    document.getElementById("edit-dialog").innerHTML = edit_task_dialog(task,i)

    // show modal
    edit_dialog.showModal();

}

function confirm_edit(i)
{
    //retrive information from edit task input field
    let name=document.getElementById("edit-task-name").value;
    let description=document.getElementById("edit-task-desc").value;
    let storyPoints=document.getElementById("edit-storyp").value;
    let priority=document.getElementById("edit-priority").value;
    let status=document.getElementById("edit-cars").value;

    //create a new task
    let updated_task = new Task(name,description,"user story",storyPoints,"UI",priority,status);

    //update task
    productBacklog.updateTask(productBacklog.tasks[i], updated_task)

    // store to local storage
    localStorage.setItem(SYSTEM_KEY, JSON.stringify(sys));;
    
    // show cards and close dialogs
    showCards();
    edit_dialog.close()
    view_dialog.close()
}

// edit tasks functionality
function edit_task_dialog(task_class,i)
{
    let a = `
    <h4 class="mdl-dialog__title" style="padding-left:30px">EDIT TASK</h4>
                    <div class="mdl-dialog__content" style="font-family:Roboto, sans-serif">
                        <div class="mdl-grid" style="padding:0;">
                            <div class="mdl-cell mdl-cell--6-col">
                                <form action="#">
                                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                        <input class="mdl-textfield__input" type="text" id="edit-task-name" value = "${task_class._name}">
                                        <label class="mdl-textfield__label" for="task-name">Enter task name...</label>
                                    </div>
                                </form>

                                <form action="#">
                                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                        <textarea class="mdl-textfield__input" type="text" rows= "5" id="edit-task-desc"> ${task_class._description} </textarea>
                                        <label class="mdl-textfield__label" for="task-desc">Enter task description...</label>
                                    </div>
                                </form>

                                <!-- Numeric Textfield with Floating Label -->
                                <form action="#">
                                    <div style="width:50%" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                        <input class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="edit-storyp" value = "${task_class._storyPoints}">
                                        <label class="mdl-textfield__label" for="storyp">Enter story points (0-100)...</label>
                                        <span class="mdl-textfield__error">Input is not a number!</span>
                                    </div>
                                </form>

                                <div style="padding-top:5px"><b style="position:absolute;margin-top:8px">Tags:</b>
                                    <span class="mdl-chip" style="background-color:orange;margin-left:40px">
                                        <span class="mdl-chip__text">UI</span>
                                    </span>
                                    <span class="mdl-chip" style="background-color:lightgreen;margin-left:5px">
                                        <span class="mdl-chip__text">Testing</span>
                                    </span>
                                    <span class="mdl-chip" style="background-color:hotpink;margin-left:5px">
                                        <span class="mdl-chip__text">Core</span>
                                    </span>
                                </div>

                                <div style="padding-top:5px"><b style="padding-right:5px">Priority:   </b>
                                    <select name="priority" id="edit-priority" style="font-family:Roboto, sans-serif;padding-right:10px">
                                        <option value="low">Low</option>
                                        <option value="med">Medium</option>
                                        <option value="high">High</option>
                                        <option value="crit">Critical</option>
                                    </select>
                                </div>
                            </div>
                            <div style="height:48vh" class="mdl-cell mdl-cell--6-col">
                                <p><b>Team Members:</b></p>
                                <ul class="demo-list-icon mdl-list" id="edit-team-list">
                                </ul>

                                <div style="padding-top:5px"><b style="padding-right:5px">Status:   </b>
                                    <select name="cars" id="edit-cars" style="font-family:Roboto, sans-serif;padding-right:10px" value = "${task_class.status}">
                                        <option value="N/S">Not Started</option>
                                        <option value="prog">In Progress</option>
                                        <option value="dev">Developing</option>
                                        <option value="test">Testing</option>
                                        <option value="comp">Completed</option>
                                    </select>
                                </div>


                            </div>
                        </div>
                    </div>
                    <div class="mdl-dialog__actions">
                        <button onclick="confirm_edit(${i})" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored">CONFIRM</button>
                        <button type="button" class="mdl-button close">CLOSE</button>
                    </div>
                </dialog>`

    return a;
}

showCards()