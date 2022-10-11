"use strict"
/*
    FIT2101: Assignment 4
    Agile Iteration 3

    This file contains the JavaScript code necessary to run the functionality of the Team Members page.
 */

// document ids
let dateButtonRef = document.getElementById('date-button');
let dateDialogRef = document.getElementById('date-dialog');
let addButtonRef = document.getElementById('add-button');
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