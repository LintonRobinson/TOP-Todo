import "./style.css"
import  categoryManager  from "./categoryManager.js"
import  taskManager  from "./taskManager.js"
import  Element  from "./elementCreation.js"
import UIController from "./UIController.js"
import pubsub from "./pubsub.js"
import eventListenerController from "./eventListeners.js"


window.categoryManager = categoryManager;
window.taskManager = taskManager;
window.Element = Element;
window.UIController = UIController;
window.pubsub = pubsub;

document.addEventListener("DOMContentLoaded", () => {
    eventListenerController.addDefaultEventListeners();
    pubsub.subscribe("openCreateTaskModule", UIController.domManager.openTaskModal);
    pubsub.subscribe("submitNewTask", taskManager.createTask);
    pubsub.subscribe("submitNewTask", UIController.domManager.closeModal );


});

// const yaMamasProject = categoryManager.createCategory("Ya Mama") 
//window.yaMamasProject = yaMamasProject;