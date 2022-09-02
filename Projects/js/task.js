"use strict";
function retrieve_from_local_storage()
{
    retrieve_system = localStorage.getItem("key");
}


function view(task_id)
{
    backlog = retrieve_system.productBacklog;
    
    //loop through all tasks to find the relevant task id
    for (i=0; i<backlog.tasks.length; i++)
    {
        if (backlog.tasks.id = task_id)
        {
            //display it on html
            html_view = 
            `
            <div class="mdl-grid"  id="testing">
            <div class="mdl-cell mdl-cell--4-col">
                <div class="demo-card-wide mdl-card mdl-shadow--2dp" id="card1">
                    <div class="mdl-card__title" style="background: lightcoral">
                        <h2 class="mdl-card__title-text">Change Page Colours</h2>
                    </div>
                    <div class="mdl-card__supporting-text" style="font-family:Roboto, sans-serif">
                        <span class="mdl-chip ui-tag">
                            <span class="mdl-chip__text">UI</span>
                        </span>
                        <span class="mdl-chip low-p">
                            <span class="mdl-chip__text">Low Priority</span>
                        </span>
                        <span class="mdl-chip">
                            <span class="mdl-chip__text">20 story points</span>
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
            </div>
            
            `
        }
    }



}

