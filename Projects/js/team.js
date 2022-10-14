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

let changeDateRef = document.getElementById('new-date');

// ids for test team member (Luke)
let viewButtonRef = document.getElementById('view-button');
let viewDialogRef = document.getElementById('view-dialog');

let start_display_date=new Date("1 jan 2022")
let end_display_date=new Date()
start_display_date=new Date("13 oct 2022")
end_display_date=new Date("22 oct 2022")



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

changeDateRef.addEventListener('click', function() {
    start_display_date=new Date(document.getElementById('start-date').value)
    end_display_date=new Date(document.getElementById('end-date').value)
    dateDialogRef.close()
    showTeamMembers()
});


// test team member
viewButtonRef.addEventListener('click', function() {
    viewDialogRef.showModal();
});
viewDialogRef.querySelector('.close').addEventListener('click', function() {
    viewDialogRef.close();
});


// --------------------------------------------------------------------------------
//SHOW CHART
function showChart(email){
    let people = sys.teamMembers._teamMembers;
    let person;
    for(let i=0; i<people.length; i++){
        console.log(people[i]._email)
        if (people[i]._email==email){
            person=people[i]
        }
    }
    let array = person.getTimeDuring(start_display_date,end_display_date)
    let labels =[start_display_date]
    let last = labels[labels.length]
    let next
    while(labels[labels.length-1]<end_display_date){
        last = labels[labels.length-1]
        next=new Date(last.setDate(last.getDate()+1))
        labels.push(new Date(next.setHours(0,0,0,0)))
    }
    let realLabels=[]
    let realNums=[]
    let checking=0
    console.log(array)
    for(let i=0; i<labels.length; i++){
        realLabels.push(labels[i].toDateString().slice(4))

        if (checking<array.length && new Date(array[checking][0]).toDateString()==labels[i].toDateString()){
            realNums.push(array[checking][1])
            checking+=1
        } else {
            realNums.push(0)
        }
    }
    console.log(realNums)
    console.log(realLabels)

    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: realLabels,
            datasets: [{
                label: 'Hours logged',
                data: realNums,
                backgroundColor: [
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}













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
    let system = sys
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
        let sumTime = member.getSummedTimeDuring(start_display_date, end_display_date)
        let dayNum = Math.ceil(end_display_date - start_display_date) / 1000 /60/ 60/24
        let avgTime = sumTime / dayNum

        display += `
        <tr style="height: 150px; width: 500px">
        <td class="mdl-data-table__cell--non-numeric" style="height: 150px">
            <div class="table-row">
             <b style="font-size: 15pt;">${member._name}</b>
                <br>
                E-mail: ${member._email}
                <br>
                <b>Average work this time period:</b> "${avgTime}"
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
    let system = sys
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

            console.log(member.getTimeDuring(new Date("15 OCT 2022"),new Date("20 OCT 2022")))
            
            display += `
            <div class="mdl-cell mdl-cell--12-col" style="margin: 0 0 0 10px;">
                <h4 style="font-size:2.5rem; margin: 12px 0 0 12px;">${member._name}</h4>
                <h4 style="font-size:1rem; margin: 4px 0 0 14px;">${member._email}</h4>
            </div>
            <div class="mdl-dialog__content" style="font-family:Roboto, sans-serif; padding-top:4px">
                <div class="analytics-divider">
                    <h4 style="margin: -4px 0 0;color:black; font-size:1.3rem;">Analytics</h4>
                </div>
                from ${start_display_date.toDateString()} to ${end_display_date.toDateString()}<br>
                <h4 style="font-size:1.3rem; margin:0"><b>Total time logged this sprint:</b> ${member.getTotalTime()}<br></h4>
                <h4 style="font-size:1.3rem; margin:0"><b>Total time logged this time period:</b> ${member.getSummedTimeDuring(start_display_date,end_display_date)}<br></h4>
                <canvas id="myChart" width="400" height="400"></canvas>
            </div>
            <div class="mdl-dialog__actions">
                <button type="button" class="mdl-button close" onclick = "closeViewDialog()">CLOSE</button>
                <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" onclick = "removeMember('${member._email}')">REMOVE TEAM MEMBER</button>
            </div>`
        }

    }
    viewDialog.innerHTML = display
    showChart(email)
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
