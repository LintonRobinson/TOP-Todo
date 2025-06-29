import categoryManager from "./categoryManager";
import pubsub from "./pubsub";
import taskManager from "./taskManager";
import UIController from "./UIController";
document.addEventListener('DOMContentLoaded', () => {
    
    
    
    document.querySelector('.allTasks').addEventListener('click', () => {
        categoryManager.setActiveCategory(null);
        pubsub.publish("clearTaskItems");
        UIController.domManager.renderDefaultCategory('all');
        if (taskManager.getTasks().length === 0) UIController.domManager.buildDummyTaskItem()
    }) 
    document.querySelector('.todayTasks').addEventListener('click', () => {
        categoryManager.setActiveCategory(null)
        pubsub.publish("clearTaskItems");
        UIController.domManager.renderDefaultCategory('today')
        if (taskManager.getTasks().length === 0) UIController.domManager.buildDummyTaskItem()
    }) 
    document.querySelector('.weekTasks').addEventListener('click', () => {
        categoryManager.setActiveCategory(null);
        pubsub.publish("clearTaskItems");
        UIController.domManager.renderDefaultCategory('week')
        if (taskManager.getTasks().length === 0) UIController.domManager.buildDummyTaskItem()
    })
    document.querySelector('.importantTasks').addEventListener('click', () => {
        categoryManager.setActiveCategory(null);
        pubsub.publish("clearTaskItems");
        UIController.domManager.renderDefaultCategory('important')
        if (taskManager.getTasks().length === 0) UIController.domManager.buildDummyTaskItem()
    })
    document.querySelector('.completeTasks').addEventListener('click', () => {
        categoryManager.setActiveCategory(null);
        pubsub.publish("clearTaskItems");
        UIController.domManager.renderDefaultCategory('complete')
        if (taskManager.getTasks().length === 0) UIController.domManager.buildDummyTaskItem()
    })
    
})



const eventListenerController = (() => {
    const categoryEventListener = (event) => {
        if (event.target.matches('.userCategory')) {
            pubsub.publish('renderUserCategory', event.target.dataset.categoryId)
            categoryManager.setActiveCategory(event.target.dataset.categoryId)
        };
    };

    const addCategoryEventListeners = () => {
        const userCategoryButtons = document.querySelectorAll('.userCategory')
        userCategoryButtons.forEach((categoryButton) => {
            categoryButton.removeEventListener('click',categoryEventListener);
            categoryButton.addEventListener('click',categoryEventListener);
        })
    };



    const addDefaultEventListeners = () => {
        document.addEventListener("click", (event) => {

            if (event.target.classList.contains("openCreateTask")) pubsub.publish("openTaskModule", {modalType:"create"});
            if (event.target.id === "openCreateCategory") pubsub.publish("openCategoryModule", {modalType:"create"});
            if (event.target.classList.contains("openEditTaskModal")) pubsub.publish("openTaskModule", {modalType:"edit", currentTaskId: event.target.dataset.taskId, taskObject: taskManager.getTask(event.target.dataset.taskId)});
            if (event.target.classList.contains("openEditCategoryModal")) pubsub.publish("openCategoryModule", {modalType:"edit", currentCategoryId: event.target.dataset.categoryId, categoryObject: categoryManager.getCategory(event.target.dataset.categoryId)});
            
            if (event.target.classList.contains("viewTask")) pubsub.publish("openTaskModule", {modalType:"view", taskObject: taskManager.getTask(event.target.dataset.taskId), currentTaskId: event.target.dataset.taskId});
            if (event.target.classList.contains("openDeleteTaskModal")) pubsub.publish("openTaskModule", {modalType:"delete"})
            if (event.target.classList.contains("openDeleteCategoryModal")) pubsub.publish("openCategoryModule", {modalType:"delete", currentCategoryId: event.target.dataset.categoryId})
            if (event.target.id === "deleteTask") {
                pubsub.publish("deleteTask", event.target.dataset.taskId);
                pubsub.publish("closeModal")
            
            }
            if (event.target.id === "completeTask") {
                const taskName = document.querySelector('#taskName').value;
                pubsub.publish("completeTask", {taskId: event.target.dataset.categoryId, taskName: taskName});
                pubsub.publish("closeModal");
            } 

            if (event.target.id === "deleteCategory") {
                pubsub.publish("deleteCategory", event.target.dataset.categoryId);
                pubsub.publish("closeModal")
                pubsub.publish("renderCategoryButtons")
            } 
            
            if (event.target.classList.contains("closeModal") && event.target.matches("i")) pubsub.publish("closeModal");
            if (event.target.matches(".closeModal") && event.target.matches("button")) pubsub.publish("closeModal");
            

        })


        document.addEventListener("submit", (event) => {
            event.preventDefault()
            if (document.querySelector("#createTask")) {
                pubsub.publish("submitNewTask",UIController.domManager.getTaskValues());
                pubsub.publish("closeModal");
            }
            if (document.querySelector("#createCategory")) {
                pubsub.publish("submitNewCategory",UIController.domManager.getCategoryValues());
                pubsub.publish("closeModal");
                pubsub.publish("renderCategoryButtons")
                pubsub.publish('dynamicallySelectButton');;
                pubsub.publish('addCategoryEventListeners');
            }

    
            

            if (document.querySelector("#editTask")) {
                const taskId = document.querySelector("#editTask").dataset.taskId
                pubsub.publish("editTask", { taskId: taskId, updatedTask: UIController.domManager.getTaskValues()});
                pubsub.publish("closeModal");
            }

            if (document.querySelector("#editCategory")) {
                const categoryId = document.querySelector("#editCategory").dataset.categoryId
                console.log(categoryId)
                pubsub.publish("editCategory", { categoryId: categoryId, updatedCategory: UIController.domManager.getCategoryValues()});
                pubsub.publish('renderUserCategory', categoryId)
                pubsub.publish("renderCategoryButtons")
                pubsub.publish("closeModal");
                
                
            }
            

            
        })
    }
    return {  addDefaultEventListeners , addCategoryEventListeners }
})();

export default eventListenerController


// NEED TO PASS THE TASK ID FROM THE CLICKED EDIT ICON PER TASK CARD