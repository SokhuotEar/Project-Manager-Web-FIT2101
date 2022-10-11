"use strict"
/*
    FIT2101: Assignment 4
    Agile Iteration 3

    This file contains the JavaScript code necessary to run the functionality of the Team Members page.
 */

// document ids
let dateButtonRef = document.getElementById('date-button');
let dateDialogRef = document.getElementById('date-dialog');
let addButtonRef = document.getElementById('add-teamMember-button');
let addDialogRef = document.getElementById('add-dialog');
let removeButtonRef = document.getElementById('remove-button');
let removeDialogRef = document.getElementById('remove-dialog');
let confirmRemoveButtonRef = document.getElementById('remove-confirm-button');

// ids for test team member (Luke)
let viewButtonRef = document.getElementById('view-button');
let viewDialogRef = document.getElementById('view-dialog');

// button to open dialog event listeners
dateButtonRef.addEventListener('click', function() {
    dateDialogRef.showModal();
});
addButtonRef.addEventListener('click', function() {
    addDialogRef.showModal();
});
removeButtonRef.addEventListener('click', function() {
    removeDialogRef.showModal();
});

// close dialog event listeners
dateDialogRef.querySelector('.close').addEventListener('click', function() {
    dateDialogRef.close();
});
addDialogRef.querySelector('.close').addEventListener('click', function() {
    addDialogRef.close();
});
removeDialogRef.querySelector('.close').addEventListener('click', function() {
    removeDialogRef.close();
});

// test team member
viewButtonRef.addEventListener('click', function() {
    viewDialogRef.showModal();
});
viewDialogRef.querySelector('.close').addEventListener('click', function() {
    viewDialogRef.close();
});


// --------------------------------------------------------------------------------
//Add team member
function addTeamMember()
{
    let new_name = document.getElementById("new-member-name").value

    let new_email = document.getElementById("new-email").value

    // verfication
    if (new_name == ''){
        alert("Name cannot be null!")
        return
    }
    if (new_email == ''){
        alert("Email cannot be null!")
        return;
    }
    if (!new_email.includes('@') || !new_email.includes('.com'))
    {
        alert('Email is not in the correct format!')
        return;
    }
    // verify if team member already exists
    for (let i=0; i<sys._teamMembers._teamMembers.length; i++)
    {
        if (sys._teamMembers._teamMembers[i]._email == new_email)
        {
            alert("The member with this email already exists!")
            return;
        }
    }


    let developper = new Developer(new_name, new_email)
    sys._teamMembers._teamMembers.push(developper)
    addDialogRef.close()

    localStorage.setItem(SYSTEM_KEY,JSON.stringify(sys))
    showTeamMembers()
}


//--------------------------------------------------------------------------------
// show all team member in a list
function showTeamMembers()
{
    let system = localStorage.getItem(SYSTEM_KEY)
    system = JSON.parse(system)
    let table = document.getElementById("table")
    let display = ''
    
    for (let i=0; i<system._teamMembers._teamMembers.length; i++)
    {
        let member = system._teamMembers._teamMembers[i]

        //find total hours worked
        let totalHr = 0
        for (let j = 0; j< member._hoursWorked.length; j++)
        {
            totalHr = totalHr + member._hoursWorked[j]
        }


        display += `
        <tr style="height: 150px; width: 500px">
        <td class="mdl-data-table__cell--non-numeric" style="height: 150px">
            <div class="table-row">
             <b style="font-size: 15pt;">${member._name}</b>
                <br>
                E-mail: ${member._email}
                <br>
                <b>Average work this time period:</b> "to be done"
        </td>
        <td style="height: 150px">
            <button id='view-button' class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onclick = "viewTeamMember('${member._email}')">
                View
            </button>
        </td>
        </tr>`

    }

    table.innerHTML = display
    return 'done'
}
showTeamMembers()

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// view a summary of each team member
function viewTeamMember(email)
{

    // retrieve from local storage
    let system = localStorage.getItem(SYSTEM_KEY)
    system = JSON.parse(system)
    let viewDialog = document.getElementById("view-dialog")
    let display = ''

    viewDialog.showModal()

    //loop through team member to find the team member to view
    for (let i=0; i<system._teamMembers._teamMembers.length; i++)
    {
        // find the team member to view. Done by using email as identification
        if (system._teamMembers._teamMembers[i]._email == email)
        {   
            let member = system._teamMembers._teamMembers[i]

            //find total hours worked
            let totalHr = 0
            for (let j = 0; j< member._hoursWorked.length; j++)
            {
                totalHr = totalHr + member._hoursWorked[j]
            }

            
            display += `
            <div class="mdl-cell mdl-cell--12-col" style="margin: 0 0 0 10px;">
                <h4 style="font-size:2.5rem; margin: 12px 0 0 12px;">${member._name}</h4>
                <h4 style="font-size:1rem; margin: 4px 0 0 14px;">${member._email}</h4>
            </div>
            <div class="mdl-dialog__content" style="font-family:Roboto, sans-serif; padding-top:4px">
                <div class="analytics-divider">
                    <h4 style="margin: -4px 0 0;color:black; font-size:1.3rem;">Analytics</h4>
                </div>
                from [selected start date] to [selected end date]<br>
                <h4 style="font-size:1.3rem; margin:0"><b>Total time logged this sprint:</b> 50 hours<br></h4>
                <h4 style="font-size:1.3rem; margin:0"><b>Total time logged this time period:</b> ${totalHr}<br></h4>
                [insert bar graph here]
            </div>
            <div class="mdl-dialog__actions">
                <button type="button" class="mdl-button close" onclick = "closeViewDialog()">CLOSE</button>
                <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" onclick = "removeMember('${member._email}')">REMOVE TEAM MEMBER</button>
            </div>`
        }

    }
    viewDialog.innerHTML = display
}

function closeViewDialog()
{
    document.getElementById("view-dialog").close()
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// remove team member
function removeMember(email)
{
    if (!confirm("Are you sure you want to delete this member?"))
    {
        return;
    }
    for (let i=0; i<sys._teamMembers._teamMembers.length; i++)
    {
        if (sys._teamMembers._teamMembers[i]._email == email)
        {
            sys._teamMembers._teamMembers.splice(i,1)
            console.log("ok")
        }

    }


    localStorage.setItem(SYSTEM_KEY, JSON.stringify(sys))
    showTeamMembers()
    
    // close modal
    let viewDialog = document.getElementById("view-dialog")
    viewDialog.close()

}

// -------------------------------------------------------------------------------------------------------------------------------------------------
