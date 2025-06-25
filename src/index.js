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
        taskManager.setTasks(JSON.parse(localStorage.getItem("tasks")));  
    }

    if (!localStorage.getItem("completeTasks")) {
        const completeTaskstasks = [];
        localStorage.setItem("completeTasks", JSON.stringify(completeTaskstasks))
    } else {
        taskManager.setCompleteTasks(JSON.parse(localStorage.getItem("completeTasks")));  
    }

    if (!localStorage.getItem("categories")) {
        const categories = [];
        localStorage.setItem("categories",JSON.stringify(categories))
    } else {
        categoryManager.setCategories(JSON.parse(localStorage.getItem("categories")))
        // console.log(categories)
    }



    eventListenerController.addDefaultEventListeners();
    pubSub.subscribe("openTaskModule", UIController.domManager.openTaskModal);
    pubSub.subscribe("openCategoryModule", UIController.domManager.openCategoryModal); 
    pubSub.subscribe("submitNewTask", taskManager.createTask);
    pubSub.subscribe("submitNewCategory", categoryManager.createCategory);
    pubSub.subscribe("editTask", taskManager.editTask);
    pubSub.subscribe("editCategory", categoryManager.editCategory);
    pubSub.subscribe("deleteTask", taskManager.deleteTask);
    pubSub.subscribe("deleteCategory", categoryManager.deleteCategoryandTasks);
    pubSub.subscribe("closeModal", UIController.domManager.closeModal );
    pubSub.subscribe("invalidDate", UIController.domManager.displayDateError );
    UIController.domManager.dynamicallySelectButton()
    
    UIController.domManager.buildUITaskItem(taskManager.getTask("a9fa148b-684d-4e42-a4ce-71a0cf92b388"))
});

window.categoryManager = categoryManager;
window.taskManager = taskManager;
window.Element = Element;
window.UIController = UIController;
window.pubsub = pubSub;