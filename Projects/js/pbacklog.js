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