/**
 * File Name: pbacklog.js
 * File purpose: This file is designed to create neccessary and working functionalities for the produt backlog page.
 * Authors: Dasun, Sok Ear, Luke, Parul, Laetitia
 * Date modified: 29/09/2022
 */

// dialog and button ids
let viewDialogRef = document.getElementById('view-dialog')
let viewButtonRef = document.getElementById('open-button')
let addDialogRef = document.getElementById('add-dialog')
let addButtonRef = document.getElementById('add-button')
let closeButtonRef = document.getElementById('close-button')
let editDialogRef = document.getElementById("edit-dialog");
let closeDialogRef = document.getElementById('close-dialog')

// error message ids
let nameErrorRef = document.getElementById('name_err');
let descErrorRef = document.getElementById('desc_err');
let storypointErrorRef = document.getElementById('storypoints_err');
let tagErrorRef = document.getElementById('tag_err');
let typeErrorRef = document.getElementById('type_err');
let prioErrorRef = document.getElementById('prio_err');
let teamErrorRef = document.getElementById('team_err');
let statusErrorRef = document.getElementById('status_err');

let productBacklog = sys._productBacklog


//old colours based on the story points
//let colours=["darkgray","greenyellow","green","darkolivegreen","lightskyblue","lightseagreen","dodgerblue","tomato","indianred","red","maroon"]

let colours=["orange","hotpink","lightgreen"]

// Predefined error messages
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
    closeDialogRef.showModal();
});

//set global variable
let teamMembers=sys.teamMembers

/**
 * This function allows the user to confirm that they want to delete the task
 * @param i index of task to remove from productbacklog array
 */

function deleteQuery(i){
    /* This function is an auxiliary function aiding with the delete task function */
    // html code for dialog box
    let confirmText =
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
    // associating the html code for the corresponsing tag
    document.getElementById("close-dialog").innerHTML = confirmText;

    // showing confirm message
    let deleteButton = document.getElementById('delete-confirm')
    closeDialogRef.showModal();
    
    // deleting task after action is confirmed
    deleteButton.addEventListener('click', function() {
        deleteTask(i);
        closeDialogRef.close();
    })

    // closing message if user does not want to delete task
    closeDialogRef.querySelector('.close').addEventListener('click', function() {
        closeDialogRef.close();
    });
}




/* 
    This function updates the product backlog page every time a task is added or deleted so the user is able 
    to see the dynamic progress of the product backlog.
    This functions is called every time a task is added, deleted, edited or when the page is refreshed.

*/
function showCards(){
    // This function shows all the tasks and its summary on the HTML page
    // defining words as empty string so it inputs can be added in
    let words='';

    // creating a for loop for task details
    for(let i=0; i<productBacklog.showTasks().length;i++){
        let task = productBacklog.showTasks()[i]
        let prio=task.priority;
        let tag=task.tags;
        let type = task.type;
        let typeCSS;
        let prioCSS;
        let tagCSS;
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

        let intensity
        if(tag=="UI"){
            tagCSS= "ui-tag"
            intensity=0
        }
        else if(tag=="Core"){
            tagCSS="core-tag"
            intensity=1
        }
        else if(tag=="Testing"){
            tagCSS="testing-tag"
            intensity=2
        }

        if (type === "userStory"){
            typeCSS = 'userstory';
        } 
        else if (type == "bug"){
            typeCSS = 'bug';
        }

    
        // adding in input details with html code
        words+=
        `<div class="mdl-cell mdl-cell--4-col">
            <div class="demo-card-wide mdl-card mdl-shadow--2dp" id="card${i}">
                <div class="mdl-card__title" style="background: ${colours[intensity]}">
                    <h2 class="mdl-card__title-text">${task._name}</h2>
                </div>
                <div class="mdl-card__supporting-text" style="font-family:Roboto, sans-serif">
                    <span class="mdl-chip" style = "position: relative; right: 5px;">
                    <span class="mdl-chip__text">${task._storyPoints} story points</span>
                    </span>
                    <br><br>
                    <b style = "position: relative; top: 4px;">Tags:</b>
                    <span class="mdl-chip ${tagCSS}" style = "position: relative; left: 20px;">
                        <span class="mdl-chip__text">${tag}</span>
                    </span>
                    <br>
                    <b style = "position: relative; top: 4px;">Type:</b>
                    <span class="mdl-chip ${typeCSS}" style = "position: relative; left: 20px;">
                        <span class="mdl-chip__text">${type}</span>
                    </span>
                    <br>
                    <b style = "position: relative; top: 4px;">Priority:</b>
                    <span class="mdl-chip ${prioCSS}" style = "position: relative; left: 5px;">
                        <span class="mdl-chip__text">${task._priority}</span>
                    </span>
                </div>
                <div class="mdl-card__actions mdl-card--border" style="padding-right:15px;">
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

    // saving it into local storage
    localStorage.setItem(SYSTEM_KEY, JSON.stringify(sys));
}


/* This function operates when "add task" button is clicked
    resets all input fields to empty strings
*/
function openAddTask()
{
    // defining variable as the input contents 
    // redefining variables as an empty string so that previous input is not retained
    let nameRef=document.getElementById("task-name");
    
    nameRef.value = "";

    let descRef=document.getElementById("task-desc");
    descRef.value = "";

    let tagsRef=document.getElementById("tag");
    tagsRef.value = "";

    let typeRef=document.getElementById("task_type");
    typeRef.value = "";

    let prioRef = document.getElementById('priority');
    prioRef.value = "";

    let storyPointsRef=document.getElementById("storyp");
    storyPointsRef.value = "";

    let newStatus=document.getElementById("cars");
    newStatus.value = "Not Started";

    //code to show members
    let teamList =""
    for(let i=0; i<teamMembers.teamMembers.length; i++){
        let developer=teamMembers.teamMembers[i];
        teamList+=
        `<li class="mdl-list__item">
    <span class="mdl-list__item-primary-content">
        <i class="material-icons mdl-list__item-icon">person</i>
            ${developer.name}
    </span>
    <span class="mdl-list__item-secondary-action">
        <label class="demo-list-radio mdl-radio mdl-js-radio mdl-js-ripple-effect" for="list-radio-${i}">
            <input type="radio" id="list-radio-${i}" class="mdl-radio__button" name="add_button"/>
        </label>
    </span>
    </li>`;
    }

    document.getElementById("team-list").innerHTML=teamList
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
    let userTag = tagRef.value;

    let typeRef = document.getElementById('task_type');
    let userType = typeRef.value;

    let priorityRef=document.getElementById("priority");
    let userPriority = priorityRef.value;

    let statusRef=document.getElementById("cars");
    let userStatus = statusRef.value;

    // verify inputs
    // break if invalid, clear error messages if valid
    let team = 0;
    for(let i=0; i<teamMembers.teamMembers.length; i++){
        if (document.getElementById(`list-radio-${i}`).checked){
            team+=1
        }
    }

    if (verifyInputs(userName,userDescription,userStoryPoints,userTag,userType,userPriority,team,userStatus,"add") === 0) {
        return
    }

    let task = new Task(userName, userDescription,userType, userStoryPoints, userTag, userPriority, userStatus);
    for(let i=0; i<teamMembers.teamMembers.length; i++){
        if (document.getElementById(`list-radio-${i}`).checked){
            task.addMember(teamMembers.teamMembers[i])
        }
    }


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
function verifyInputs(name, desc, storyp, tags, taskType, priority, team, status,verification) {
    if(verification=="edit"){
        let nameErrorRefEdit = document.getElementById('name_err_edit');
        let descErrorRefEdit = document.getElementById('desc_err_edit');
        let storypointErrorRefEdit = document.getElementById('storypoints_err_edit');
        let tagErrorRefEdit = document.getElementById('tag_err_edit');
        let typeErrorRefEdit = document.getElementById('type_err_edit');
        let prioErrorRefEdit = document.getElementById('prio_err_edit');
        let teamErrorRefEdit = document.getElementById('team_err_edit');
        let statusErrorRefEdit = document.getElementById('status_err_edit');


        if (name === "") {
            nameErrorRefEdit.innerText = 'Please enter a task name.';
            return 0;
        }
        nameErrorRefEdit.innerText = '';

        // task description
        if (desc === ""){
            descErrorRefEdit.innerText = 'Please enter a task description.';
            return 0;
        }
        descErrorRefEdit.innerText = '';

        // story points
        if (storyp === ""){
            storypointErrorRefEdit.innerText = 'Please enter a story points value.';
            return 0;
        } else if (storyp > 100){
            storypointErrorRefEdit.innerText = 'Please enter a value between 0 and 100.';
            return 0;
        }
        storypointErrorRefEdit.innerText = '';

        // tag
        if (tags === ""){
            tagErrorRefEdit.innerText = 'Please select a tag.';
            return 0;
        }
        tagErrorRefEdit.innerText = '';

        // task type
        if (taskType === ""){
            typeErrorRefEdit.innerText = 'Please select a task type.';
            return 0;
        }
        typeErrorRefEdit.innerText = '';

        // priority
        if (priority === "") {
            prioErrorRefEdit.innerText = "Please select a priority.";
            return 0;
        }
        prioErrorRefEdit.innerText = "";

        // priority
        if (team === 0) {
            teamErrorRefEdit.innerText = "Please select a team member.";
            return 0;
        }
        prioErrorRefEdit.innerText = "";

        // status
        if (status === "") {
            statusErrorRefEdit.innerText = "Please select a status.";
            return 0;
        }
        statusErrorRefEdit.innerText = "";
        return 1;
    }
    else{
        
        // task name
        if (name === "") {
            nameErrorRef.innerText = 'Please enter a task name.';
            return 0;
        }
        nameErrorRef.innerText = '';

        // task description
        if (desc === ""){
            descErrorRef.innerText = 'Please enter a task description.';
            return 0;
        }
        descErrorRef.innerText = '';

        // story points
        if (storyp === ""){
            storypointErrorRef.innerText = 'Please enter a story points value.';
            return 0;
        } else if (storyp > 100){
            storypointErrorRef.innerText = 'Please enter a value between 0 and 100.';
            return 0;
        }
        storypointErrorRef.innerText = '';

        // tag
        if (tags === ""){
            tagErrorRef.innerText = 'Please select a tag.';
            return 0;
        }
        tagErrorRef.innerText = '';

        // task type
        if (taskType === ""){
            typeErrorRef.innerText = 'Please select a task type.';
            return 0;
        }
        typeErrorRef.innerText = '';

        // priority
        if (priority === "") {
            prioErrorRef.innerText = "Please select a priority.";
            return 0;
        }
        prioErrorRef.innerText = "";

        // priority
        if (team === 0) {
            teamErrorRef.innerText = "Please select a team member.";
            return 0;
        }
        prioErrorRef.innerText = "";

        // status
        if (status === "") {
            statusErrorRef.innerText = "Please select a status.";
            return 0;
        }
        statusErrorRef.innerText = "";
        return 1;
    }
}

// deletes a task
function deleteTask(i){
    productBacklog.removeTask(i);
    showCards();

    // store to local storage
    localStorage.setItem(SYSTEM_KEY, JSON.stringify(sys));
}


//-----------------------------------------------------------------------------------
// view functionality
function retrieve_from_local_storage() {
    return localStorage.getItem(SYSTEM_KEY);
    
}

/**
    Associated with the view button on a task
    opens up the dialog box to see that task
    @param i index of the productbacklog array that the dialog box opens
*/
function view_task(i) {
    let task = productBacklog.tasks[i]

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
                    <span class="mdl-chip" style="background-color:orange;margin-left:58px">
                        <span class="mdl-chip__text">${task._tags}</span>
                    </span>
                </div>
                <div><b style="position:absolute;margin-top:8px">Type:</b>
                    <span class="mdl-chip" style="background-color:chartreuse;margin-left:58px">
                        <span class="mdl-chip__text">${task._type}</span>
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
                <ul id="display-names" class="demo-list-icon mdl-list" style="border-style: solid;">
                </ul>
                <div><b style="position:absolute;margin-top:8px">Status:</b>
                    <span class="mdl-chip" style="margin-left:58px">
                        <span class="mdl-chip__text">${task._status}</span>
                    </span>
                </div>
                <div>  <span id="comp_err" class="mdl-textfield__error" style='font-family: "Roboto",sans-serif; visibility: visible;'></span> </div>
            </div>
        </div>
    </div>
    <div class="mdl-dialog__actions">
        <button id = "edit-button" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" onclick = editTask(${i}) >EDIT</button>
        <button type="button" class="mdl-button close" onclick = closeViewTask() >CLOSE</button>
    </div> `;




    //add content to the model
    document.getElementById("view-dialog").innerHTML = viewHTMLContent;
    

    // get team member's information
    let displayNames=''

    for (i = 0; i< task._developers.length; i++)
    {
        //create a team member html content
        displayNames+= `
        <li class="mdl-list__item">
        <span class="mdl-list__item-primary-content">
        <i class="material-icons mdl-list__item-icon">person</i>
            ${task._developers[i]._name}
        </span>
        </li>
        `
        ;
    }
    document.getElementById("display-names").innerHTML = displayNames;

    // show view dialog modal
    viewDialogRef.showModal();

}

/** 
 * closing view task dialog
 */
function closeViewTask()
{
    viewDialogRef.close()
}

// ------------------------------------------------------------------------------
// edit task functionality
/**
 * Associated with the EDIT button in the view task dialog box
 * Opens up the dialog box to edit a task for
 * @param {*} i index of the product backlog array to open the edit task dialog box for
 */
function editTask(i)
{
    // retrieve from local storage
    let task = productBacklog.tasks[i];

    if (task._status == "Completed")
    {
        document.getElementById("edit-button").disabled = true;

        
        let compErrorRef = document.getElementById('comp_err');
        compErrorRef.innerText = 'Completed tasks are not editable.';
        return 0
    }
    else
    {
        // show edit task dialog (this is similar to add task dialog
        document.getElementById("edit-dialog").innerHTML = editTaskDialog(task,i)

        // initialise status and priority
        document.getElementById("edit-priority").value = task._priority
        document.getElementById("edit-cars").value = task._status

        // show modal
        editDialogRef.showModal();

        // show team members
        // get team member's information
        let displayMember= ''
        for (i = 0; i< teamMembers.teamMembers.length; i++)
        {
            //create a team member html content

            if(task.checkMember(teamMembers.teamMembers[i])){
                displayMember+= 
                `<li class="mdl-list__item">
                <span class="mdl-list__item-primary-content">
                <i class="material-icons mdl-list__item-icon">person</i>
                    ${teamMembers.teamMembers[i].name}
                </span>
                <span class="mdl-list__item-secondary-action">
                    <label class="mdl-radio mdl-js-radio mdl-js-ripple-effect" for="list-radio-${i}">
                        <input type="radio" id="edit-list-radio-${i}" class="mdl-radio__input" name="edit_button" checked/>
                    </label>
                </span>
                </li>
                `;
            }
            else{
                displayMember+= 
                `<li class="mdl-list__item">
                <span class="mdl-list__item-primary-content">
                <i class="material-icons mdl-list__item-icon">person</i>
                    ${teamMembers.teamMembers[i].name}
                </span>
                <span class="mdl-list__item-secondary-action">
                    <label class="mdl-radio mdl-js-radio mdl-js-ripple-effect" for="list-radio-${i}">
                        <input type="radio" id="edit-list-radio-${i}" class="mdl-radio__input" name="edit_button"/>
                    </label>
                </span>
                </li>
                `;
            }
        }
        
        document.getElementById("edit-teammembers").innerHTML = displayMember;

    }

    
}

/**
 * Associated with the CONFIRM button on the edit task dialog box
 * Verifies the input parameters then changes the task accordingly before closing all dialog boxes
 * @param i the index of of the task being edited
 */
function confirmEdit(i)
{
    //retrive information from edit task input field
    let name=document.getElementById("edit-task-name").value;
    let description=document.getElementById("edit-task-desc").value;
    let storyPoints=document.getElementById("edit-storyp").value;
    let priority=document.getElementById("edit-priority").value;
    let status=document.getElementById("edit-cars").value;
    let userStoryType = document.getElementById("edit-story-type").value;
    let userStoryTag = document.getElementById("edit-story-tag").value;

    let team = 0;
    for(let i=0; i<teamMembers.teamMembers.length; i++){
        if (document.getElementById(`edit-list-radio-${i}`).checked){
            team+=1
        }
    }

    if (verifyInputs(name,description,storyPoints,userStoryTag,userStoryType,priority,team,status,"edit") === 0) {
        return
    }


    //create a new task
    let updatedTask = new Task(name,description,userStoryType,storyPoints,userStoryTag,priority,status);
    updatedTask._developers = []
    // check team members
    for(let i=0; i<teamMembers.teamMembers.length; i++){
        if (document.getElementById(`edit-list-radio-${i}`).checked){
            updatedTask.addMember(teamMembers.teamMembers[i])
        }
    }


    //update task
    productBacklog.updateTask(productBacklog.tasks[i], updatedTask)

    // store to local storage
    localStorage.setItem(SYSTEM_KEY, JSON.stringify(sys));;
    
    // show cards and close dialogs
    showCards();
    editDialogRef.close()
    viewDialogRef.close()

 
}

/**
 * Associated with the CLOSE button on the edit task dialog box
 * Closes the dialog boxes
 */
function closeEdit()
{
    editDialogRef.close()

}

/**
 * Middle man function to clean up the editTask function
 * outputs the HTML for a given task and its index in the product backlog
 * @param {*} taskClass an instance of the task class
 * @param {*} i index in the product backlog array
 */
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
                                        <span id="name_err_edit" class="mdl-textfield__error" style='font-family: "Roboto",sans-serif; visibility: visible;'></span>
                                    </div>
                                </form>

                                <form action="#">
                                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                        <textarea class="mdl-textfield__input" type="text" rows= "5" id="edit-task-desc"> ${taskClass._description} </textarea>
                                        <label class="mdl-textfield__label" for="task-desc"></label>
                                        <span id="desc_err_edit" class="mdl-textfield__error" style='font-family: "Roboto",sans-serif; visibility: visible;'></span>
                                    </div>
                                </form>

                                <!-- Numeric Textfield with Floating Label -->
                                <form action="#">
                                    <div style="width:50%" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                        <input class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="edit-storyp" value = "${taskClass._storyPoints}">
                                        <label class="mdl-textfield__label" for="storyp"></label>
                                        <span class="mdl-textfield__error">Input is not a number!</span>
                                        <span id="storypoints_err_edit" class="mdl-textfield__error" style='font-family: "Roboto",sans-serif; visibility: visible;'></span>
                                    </div>
                                </form>

                                <div style="padding-top:5px"><b style="padding-right:5px">Priority:   </b>
                                    <select name="tags" id="edit-story-tag" style="font-family:Roboto, sans-serif;padding-right:10px">
                                        <option value="UI">UI</option>
                                        <option value="Testing">Testing</option>
                                        <option value="Core">Core</option>
                                    </select>
                                    <span id="tag_err_edit" class="mdl-textfield__error" style='font-family: "Roboto",sans-serif; visibility: visible; display:inline; padding-left:5px; margin-top:0;'></span>
                                </div>
                                <div style="padding-top:5px"><b style="padding-right:5px">Type:   </b>
                                    <select name="type_task" id="edit-story-type" style="font-family:Roboto, sans-serif;padding-right:10px">
                                        <option value="userStory">User Story</option>
                                        <option value="bug">Bug</option>
                                    </select>
                                    <span id="type_err_edit" class="mdl-textfield__error" style='font-family: "Roboto",sans-serif; visibility: visible; display:inline; padding-left:5px; margin-top:0;'></span>  
                                </div>

                                <div style="padding-top:5px"><b style="padding-right:5px">Priority:   </b>
                                    <select name="priority" id="edit-priority" style="font-family:Roboto, sans-serif;padding-right:10px">
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                        <option value="Critical">Critical</option>
                                    </select>
                                    <span id="prio_err_edit" class="mdl-textfield__error" style='font-family: "Roboto",sans-serif; visibility: visible; display:inline; padding-left:5px; margin-top:0;'></span>
                                </div>
                            </div>
                            <div style="height:48vh" class="mdl-cell mdl-cell--6-col">

                                <p><b>Team Members:</b></p>
                                <ul id="edit-teammembers" class="demo-list-icon mdl-list" style="border-style: solid;">
                                </ul>
                                <span id="team_err_edit" class="mdl-textfield__error" style="font-family: &quot;Roboto&quot;,sans-serif; visibility: visible; display:inline; padding-left:5px; margin-top:0;"></span>
                                <div style="padding-top:20px"><b style="padding-right:5px">Status:   </b>
                                    <select name="cars" id="edit-cars" style="font-family:Roboto, sans-serif;padding-right:10px" value = "${taskClass.status}">
                                        <option value="Not Started">Not Started</option>
                                    </select>
                                    <span id="status_err_edit" class="mdl-textfield__error" style='font-family: "Roboto",sans-serif; visibility: visible; display:inline; padding-left:5px; margin-top:0;'></span>
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
document.getElementById("core-filter").addEventListener('click', function(){filterTask("Core")})
document.getElementById("test-filter").addEventListener('click', function(){filterTask("Testing")})
document.getElementById("clear-filter").addEventListener('click', function(){showCards()})
/**
 * Associated with the tags in the filter drop down
 * When clicked only tasks which match the filter conditions will be displayed
 * the actual product backlog array is not affected
 * @param {*} condition the condition to filter for, as a string
 */
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
        let prio = task._priority
        let tag = task._tags
        let type = task._type
        let prioCSS = "";
        let tagCSS = "";
        let typeCSS = "";

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
        let intensity
        if(tag=="UI"){
            tagCSS= "ui-tag"
            intensity=0
        }
        else if(tag=="Core"){
            tagCSS="core-tag"
            intensity=1
        }
        else if(tag=="Testing"){
            tagCSS="testing-tag"
            intensity=2
        }

        if (type === "userStory"){
            typeCSS = 'userstory';
        } 
        else if (type == "bug"){
            typeCSS = 'bug';
        }

        
        display += 
        `<div class="mdl-cell mdl-cell--4-col">
            <div class="demo-card-wide mdl-card mdl-shadow--2dp" id="card${i}">
                <div class="mdl-card__title" style="background: ${colours[intensity]}">
                    <h2 class="mdl-card__title-text">${task._name}</h2>
                </div>
                <div class="mdl-card__supporting-text" style="font-family:Roboto, sans-serif">
                    <span class="mdl-chip" style = "position: relative; right: 5px;">
                    <span class="mdl-chip__text">${task._storyPoints} story points</span>
                    </span>
                    <br><br>
                    <b style = "position: relative; top: 4px;">Tags:</b>
                    <span class="mdl-chip ${tagCSS}" style = "position: relative; left: 20px;">
                        <span class="mdl-chip__text">${tag}</span>
                    </span>
                    <br>
                    <b style = "position: relative; top: 4px;">Type:</b>
                    <span class="mdl-chip ${typeCSS}" style = "position: relative; left: 20px;">
                        <span class="mdl-chip__text">${type}</span>
                    </span>
                    <br>
                    <b style = "position: relative; top: 4px;">Priority:</b>
                    <span class="mdl-chip ${prioCSS}" style = "position: relative; left: 5px;">
                        <span class="mdl-chip__text">${task._priority}</span>
                    </span>
                </div>
                <div class="mdl-card__actions mdl-card--border" style="padding-right:15px;">
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

    // display the html
    document.getElementById("testing").innerHTML = display;

}

// shows cards when page reloads
showCards()
