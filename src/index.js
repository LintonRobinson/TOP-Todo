import "./style.css"
import  categoryManager  from "./categoryManager.js"
import  taskManager  from "./taskManager.js"
import  Element  from "./elementCreation.js"
import UIController from "./UIController.js"
import pubSub from "./pubsub.js"
import eventListenerController from "./eventListeners.js"




document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem("tasks")) {
        const tasks = [];
        localStorage.setItem("tasks",JSON.stringify(tasks))
    } else {
        taskManager.setTasks(JSON.parse(localStorage.getItem("tasks")))  
        // console.log(tasks)
    }
    eventListenerController.addDefaultEventListeners();
    pubSub.subscribe("openCreateTaskModule", UIController.domManager.openTaskModal);
    pubSub.subscribe("submitNewTask", taskManager.createTask);
    pubSub.subscribe("editTask", taskManager.editTask);
    pubSub.subscribe("deleteTask", taskManager.deleteTask);
    pubSub.subscribe("closeModal", UIController.domManager.closeModal );
    pubSub.subscribe("invalidDate", UIController.domManager.displayDateError );
    UIController.domManager.dynamicallySelectButton()
    
    UIController.domManager.buildUITaskItem(taskManager.getTask("ed8be9dc-04f4-4746-830f-11dbadda9532"))
});

window.categoryManager = categoryManager;
window.taskManager = taskManager;
window.Element = Element;
window.UIController = UIController;
window.pubsub = pubSub;