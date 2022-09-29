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
burndownButtonRef.addEventListener('click', function() {
    burndownDialogRef.showModal();
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
viewTaskDialogRef.querySelector('.close').addEventListener('click', function() {
    viewTaskDialogRef.close();
});
burndownDialogRef.querySelector('.close').addEventListener('click', function() {
    burndownDialogRef.close();
});