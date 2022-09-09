"use strict"

// dialog and button ids
let viewDialogRef = document.getElementById('view-dialog')
let viewButtonRef = document.getElementById('open-button')
let addDialogRef = document.getElementById('add-dialog')
let addButtonRef = document.getElementById('add-button')
let closeButtonRef = document.getElementById('close-button')
let editDialogRef = document.getElementById("edit-dialog");

// error message ids
let nameErrorRef = document.getElementById('name_err');
let descErrorRef = document.getElementById('desc_err');
let storypointErrorRef = document.getElementById('storypoints_err');


viewButtonRef.addEventListener('click', function() {
    viewDialogRef.showModal();
});

viewDialogRef.querySelector('.close').addEventListener('click', function() {
    viewDialogRef.close();
});

addButtonRef.addEventListener('click', function() {
    addDialogRef.showModal();
});

addDialogRef.querySelector('.close').addEventListener('click', function() {
    addDialogRef.close();
});

///delete functionality
closeButtonRef.addEventListener('click', function() {
    close_dialog.showModal();
});

function deletequery(i){
    //
    let confirm_text = 
    `<h4 class="mdl-dialog__title" style="padding-left:30px">Delete Task</h4>
    <div class="mdl-dialog__content" style="font-family:Roboto, sans-serif">
        <div class="mdl-grid">
            <p>Are you sure you want to delete task <b> ${productBacklog._tasks[i]._name} </b>?</p>
        </div>
    <div class="mdl-dialog__actions">
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" id="delete-confirm">DELETE</button>
        <button type="button" class="mdl-button close">CANCEL</button>
    </div>
    `

    document.getElementById("close-dialog").innerHTML = confirm_text;

    let close_dialog = document.getElementById('close-dialog')
    let delete_button = document.getElementById('delete-confirm')
    close_dialog.showModal();
    
    deleteButton.addEventListener('click', function() {
        deleteTask(i);
        closeDialog.close();
    })

    closeDialog.querySelector('.close').addEventListener('click', function() {
        closeDialog.close();
    });
}

let productBacklog = sys.productBacklog;

function showCards(){
    let words='';
    for(let i=0; i<productBacklog.showTasks().length;i++){
        let task = productBacklog.showTasks()[i]
        let prio=task.priority;
        let tag=task.tags;
        let prioCSS;
        let tagCSS;
        if(prio=="low"){
            prioCSS="low-p"
        }
        else if(prio=="med"){
            prioCSS="med-p"
        }
        else if(prio=="high"){
            prioCSS="high-p"
        }
        else if(prio=="crit"){
            prioCSS="crit-p"
        }

        if(tag=="UI"){
            tagCSS= "ui-tag"
        }
        else if(tag=="CORE"){
            tagCSS="core-tag"
        }
        else if(tag=="Testing"){
            tagCSS="testing-tag"
        }
        words+=
        `<div class="mdl-cell mdl-cell--4-col">
            <div class="demo-card-wide mdl-card mdl-shadow--2dp" id="card${i}">
                <div class="mdl-card__title" style="background: lightcoral">
                    <h2 class="mdl-card__title-text">${task._name}</h2>
                </div>
                <div class="mdl-card__supporting-text" style="font-family:Roboto, sans-serif">
                    <span class="mdl-chip ${tagCSS}">
                        <span class="mdl-chip__text">${task._tag}</span>
                    </span>
                    <span class="mdl-chip ${prioCSS}">
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
                    <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" onclick="deleteQuery(${i})">
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

}



// function addTask(){
    
//     let name=document.getElementById("task-name").value;
//     let description=document.getElementById("task-desc").value;
//     let storyPoints=document.getElementById("storyp").value;
//     let priority=document.getElementById("priority").value;
//     let status=document.getElementById("cars").value;

   

//     let task = new Task(name,description,"user story",storyPoints,"UI",priority,status);

//     productBacklog.addTask(task);
//     console.log(task);
//     showCards();
//     add_dialog.close();
//     localStorage.setItem('ProductBacklog', JSON.stringify(sys))
// }

// operates when "add task" button is clicked
// resets all input fields to empty strings
function openAddTask()
{
    let newName=document.getElementById("task-name");
    newName.value = "";

    let newDescription=document.getElementById("task-desc");
    newDescription.value = "";

    let newStoryPoints=document.getElementById("storyp");
    newStoryPoints.value = "";

    let newPriority=document.getElementById("priority");
    newPriority.value = "";

    let newStatus=document.getElementById("cars");
    newStatus.value = "";
}

// operates when "add" button in add dialog is clicked
// retrieves user input to create new task 
// closes gialog box and updates product backlog view
function confirmAddTask()
{
    let nameRef=document.getElementById("task-name");
    let userName = nameRef.value;

    let descRef=document.getElementById("task-desc");
    let userDescription = descRef.value;

    let storyPointsRef=document.getElementById("storyp");
    let userStoryPoints = storyPointsRef.value;

    let tagRef = document.getElementById('tag');
    let tag = tagRef.value;

    let priorityRef=document.getElementById("priority");
    let userPriority = priorityRef.value;

    let statusRef=document.getElementById("cars");
    let userStatus = statusRef.value;

    // verify inputs
    // break if invalid, clear error messages if valid
    if (verifyInputs(userName,userDescription,userStoryPoints,tag,'prio','team','status') === 0) {
        return
    }

    let task = new Task(userName, userDescription,"user story", userStoryPoints, tag, userPriority, userStatus);
    productBacklog.addTask(task);
    showCards();
    addDialogRef.close();
    localStorage.setItem(SYSTEM_KEY, JSON.stringify(sys));
}

// verifyInputs()
//
// This function verifies the inputs entered by the user, it breaks if an issue is detected but
// if it passes all tests, returns 1.
//
// Inputs: all user inputs for the task
// Returns: 0 if invalid, 1 if valid
function verifyInputs(name, desc, storyp, tags, priority, team, status) {
    if (name === "") {
        nameErrorRef.innerText = 'Please enter a task name.';
        return 0;
    }
    nameErrorRef.innerText = '';

    if (desc === ""){
        descErrorRef.innerText = 'Please enter a task description.';
        return 0;
    }
    descErrorRef.innerText = '';

    if (storyp === ""){
        storypointErrorRef.innerText = 'Please enter a story points value.';
        return 0;
    } else if (storyp > 100){
        storypointErrorRef.innerText = 'Please enter a value between 0 and 100.';
        return 0;
    }
    storypointErrorRef.innerText = '';
    return 1;
}

function deleteTask(i){
    productBacklog.removeTask(i);
    showCards();

    // store to local storage
    localStorage.setItem(SYSTEM_KEY, JSON.stringify(sys));
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
    let viewHTMLContent = `
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
                        <span class="mdl-chip__text">${task._status}</span>
                    </span>
                </div>
            </div>
        </div>
    </div>
    <div class="mdl-dialog__actions">
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" onclick = editTask(${i}) >EDIT</button>
        <button type="button" class="mdl-button close" onclick = closeViewTask() >CLOSE</button>
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
    document.getElementById("view-dialog").innerHTML = viewHTMLContent;

    // show view dialog modal
    viewDialogRef.showModal();

}

function closeViewTask()
{
    viewDialogRef.close()
}

// ------------------------------------------------------------------------------
// edit task functionality

function editTask(i)
{
    // retrieve from local storage
    let storage = retrieve_from_local_storage("ProductBacklog");
    let backlog = JSON.parse(storage)._productBacklog;
    let task = backlog._tasks[i];

    // show edit task dialog (this is similar to add task dialog
    document.getElementById("edit-dialog").innerHTML = editTaskDialog(task,i)

    // initialise status and priority
    document.getElementById("edit-priority").value = task._priority
    document.getElementById("edit-cars").value = task._status

    // show modal
    editDialogRef.showModal();

}

function confirmEdit(i)
{
    //retrive information from edit task input field
    let name=document.getElementById("edit-task-name").value;
    let description=document.getElementById("edit-task-desc").value;
    let storyPoints=document.getElementById("edit-storyp").value;
    let priority=document.getElementById("edit-priority").value;
    let status=document.getElementById("edit-cars").value;

    //create a new task
    let updatedTask = new Task(name,description,"user story",storyPoints,"UI",priority,status);

    //update task
    productBacklog.updateTask(productBacklog.tasks[i], updatedTask)

    // store to local storage
    localStorage.setItem(SYSTEM_KEY, JSON.stringify(sys));;
    
    // show cards and close dialogs
    showCards();
    editDialogRef.close()
    viewDialogRef.close()
}

function closeEdit()
{
    editDialogRef.close()

}

// edit tasks functionality
function editTaskDialog(taskClass,i)
{
    let a = `
    <h4 class="mdl-dialog__title" style="padding-left:30px">EDIT TASK</h4>
                    <div class="mdl-dialog__content" style="font-family:Roboto, sans-serif">
                        <div class="mdl-grid" style="padding:0;">
                            <div class="mdl-cell mdl-cell--6-col">
                                <form action="#">
                                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                        <input class="mdl-textfield__input" type="text" id="edit-task-name" value = "${taskClass._name}">
                                        <label class="mdl-textfield__label" for="task-name"></label>
                                    </div>
                                </form>

                                <form action="#">
                                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                        <textarea class="mdl-textfield__input" type="text" rows= "5" id="edit-task-desc"> ${taskClass._description} </textarea>
                                        <label class="mdl-textfield__label" for="task-desc"></label>
                                    </div>
                                </form>

                                <!-- Numeric Textfield with Floating Label -->
                                <form action="#">
                                    <div style="width:50%" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                        <input class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="edit-storyp" value = "${taskClass._storyPoints}">
                                        <label class="mdl-textfield__label" for="storyp"></label>
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
                                    <select name="cars" id="edit-cars" style="font-family:Roboto, sans-serif;padding-right:10px" value = "${taskClass.status}">
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
                        <button onclick="confirmEdit(${i})" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored">CONFIRM</button>
                        <button type="button" class="mdl-button close" onclick = closeEdit() >CLOSE</button>
                    </div>
                </dialog>`


    return a;
}

//----------------------------------------------------------------------------
// filter task implementation
//add event listener for all buttons regarding filter
document.getElementById("UI-filter").addEventListener('click', function(){filterTask("UI")})
document.getElementById("core-filter").addEventListener('click', function(){filterTask("core")})
document.getElementById("test-filter").addEventListener('click', function(){filterTask("test")})
document.getElementById("clear-filter").addEventListener('click', function(){showCards()})

function filterTask(condition)
{

    // apply filter; index_array returned will be the index of the task in productBacklog that the filter applies to
    let indexArray = productBacklog.filterTasks(condition)

    // view the tasks on display screen
    let display = '';
    for ( let i =0; i < indexArray.length; i++)
    {
        // retrieve the task
        let task = productBacklog._tasks[indexArray[i]]

        // display the task
        display += 
        `<div class="mdl-cell mdl-cell--4-col">
            <div class="demo-card-wide mdl-card mdl-shadow--2dp" id="card${i}">
                <div class="mdl-card__title" style="background: lightcoral">
                    <h2 class="mdl-card__title-text">${task._name}</h2>
                </div>
                <div class="mdl-card__supporting-text" style="font-family:Roboto, sans-serif">
                    <span class="mdl-chip">
                        <span class="mdl-chip__text">${task._tag}</span>
                    </span>
                    <span class="mdl-chip">
                        <span class="mdl-chip__text">${task._priority}</span>
                    </span>
                    <span class="mdl-chip">
                        <span class="mdl-chip__text">${task._storyPoints} story points</span>
                    </span>
                </div>
                <div class="mdl-card__actions mdl-card--border" style="padding-right:15px">
                    <!-- Accent-colored raised button with ripple -->
                    <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" id='open-button' style="float:right" onclick = "view_task(${indexArray[i]})">
                        VIEW
                    </button>
                </div>
                <div class="mdl-card__menu">
                    <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" onclick="deleteQuery(${indexArray[i]})">
                        <i class="material-icons">close</i>
                    </button>
                    <div class="mdl-tooltip" data-mdl-for="close">
                        <strong>Delete Task</strong>
                    </div>
                </div>
            </div>
        </div>`

    }

    // display the html
    document.getElementById("testing").innerHTML = display;
}

// shows cards when page reloads
showCards()
