import "./style.css"
import  categoryManager  from "./categoryManager.js"
import  taskManager  from "./taskManager.js"
import  Element  from "./elementCreation.js"
import UIController from "./UIController.js"
import pubSub from "./pubsub.js"
import eventListenerController from "./eventListeners.js"


window.categoryManager = categoryManager;
window.taskManager = taskManager;
window.Element = Element;
window.UIController = UIController;
window.pubsub = pubSub;

document.addEventListener("DOMContentLoaded", () => {
    eventListenerController.addDefaultEventListeners();
    pubSub.subscribe("openCreateTaskModule", UIController.domManager.openTaskModal);
    pubSub.subscribe("submitNewTask", taskManager.createTask);
    pubSub.subscribe("editTask", taskManager.editTask);
    pubSub.subscribe("deleteTask", taskManager.deleteTask);
    pubSub.subscribe("closeModal", UIController.domManager.closeModal );
    pubSub.subscribe("invalidDate", UIController.domManager.displayDateError );
    
    // UIController.domManager.buildUITaskItem(taskManager.getTask(""))
});

