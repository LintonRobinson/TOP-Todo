import categoryManager from "./categoryManager";
import pubsub from "./pubsub";
import taskManager from "./taskManager";
import UIController from "./UIController";
document.addEventListener('DOMContentLoaded', () => {
    
    
    
    document.querySelector('.allTasks').addEventListener('click', () => {
        categoryManager.setActiveCategory('allTasks');
        pubsub.publish("clearTaskItems");
        UIController.domManager.renderDefaultCategory('all');
        if (taskManager.getTasks().length === 0) UIController.domManager.buildDummyTaskItem()
    }) 
    document.querySelector('.todayTasks').addEventListener('click', () => {

        categoryManager.setActiveCategory('todayTasks')
        pubsub.publish("clearTaskItems");
        UIController.domManager.renderDefaultCategory('today')
        if (taskManager.getTasks().length === 0) UIController.domManager.buildDummyTaskItem()
    }) 
    document.querySelector('.weekTasks').addEventListener('click', () => {
        categoryManager.setActiveCategory('weekTasks');
        pubsub.publish("clearTaskItems");
        UIController.domManager.renderDefaultCategory('week')
        if (taskManager.getTasks().length === 0) UIController.domManager.buildDummyTaskItem()
    })
    document.querySelector('.importantTasks').addEventListener('click', () => {
        categoryManager.setActiveCategory('importantTasks');
        pubsub.publish("clearTaskItems");
        UIController.domManager.renderDefaultCategory('important')
        if (taskManager.getTasks().length === 0) UIController.domManager.buildDummyTaskItem()
    })
    document.querySelector('.completeTasks').addEventListener('click', () => {
        categoryManager.setActiveCategory('completeTasks');
        pubsub.publish("clearTaskItems");
        UIController.domManager.renderDefaultCategory('complete')
        if (taskManager.getTasks().length === 0 && taskManager.getCompletedTasks().length === 0) UIController.domManager.buildDummyTaskItem()
    })
    
})



const eventListenerController = (() => {
    const categoryEventListener = (event) => {
        if (event.target.matches('.userCategory')) {
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
            // Good
            if (event.target.matches('.userCategory')) {
                pubsub.publish("clearTaskItems");
                pubsub.publish('renderUserCategory', event.target.dataset.categoryId)
                categoryManager.setActiveCategory(event.target.dataset.categoryId)   
            } 

            // 
            if (event.target.classList.contains("openCreateTask")) pubsub.publish("openTaskModule", {modalType:"create"});
            //
            if (event.target.id === "openCreateCategory") pubsub.publish("openCategoryModule", {modalType:"create"});
            
            if (event.target.classList.contains("openEditTaskModal")) pubsub.publish("openTaskModule", {modalType:"edit", currentTaskId: event.target.dataset.taskId});
            if (event.target.classList.contains("openEditCategoryModal")) {
                pubsub.publish("openCategoryModule", {modalType:"edit", currentCategoryId: event.target.dataset.categoryId, categoryObject: categoryManager.getCategory(event.target.dataset.categoryId)});
            }  
            
            if (event.target.classList.contains("viewTask")) pubsub.publish("openTaskModule", {modalType:"view", taskObject: taskManager.getTask(event.target.dataset.taskId), currentTaskId: event.target.dataset.taskId});
            if (event.target.classList.contains("openDeleteTaskModal")) pubsub.publish("openTaskModule", {modalType:"delete", currentTaskId: event.target.dataset.taskId})
            if (event.target.classList.contains("openDeleteCategoryModal")) pubsub.publish("openCategoryModule", {modalType:"delete", currentCategoryId: event.target.dataset.categoryId})
            
            if (event.target.id === "deleteTask") {
                
                const taskCategory = taskManager.getTask(event.target.dataset.taskId).category;
                console.log(taskCategory)
                removeActiveClass();
                pubsub.publish("deleteTask", event.target.dataset.taskId);
                pubsub.publish("clearTaskItems");
                pubsub.publish('renderUserCategory', taskCategory);
                pubsub.publish("closeModal")
                
                pubsub.publish("renderCategoryButtons")
                pubsub.publish('addCategoryEventListeners');
                pubsub.publish('dynamicallySelectButton');
                pubsub.publish('renderWelcomeWindow')
            }
            if (event.target.id === "completeTask") {
                const taskName = document.querySelector('#taskName').value;
                pubsub.publish("completeTask", {taskId: event.target.dataset.taskId, taskName: taskName});
                pubsub.publish("clearTaskItems");
                UIController.domManager.renderDefaultCategory('complete')  
                removeActiveClass();
                document.querySelector('.completeTasks').classList.add('active')
                pubsub.publish("renderCategoryButtons")
                pubsub.publish('addCategoryEventListeners'); 
                pubsub.publish("closeModal");
            } 

            if (event.target.id === "deleteCategory") {
                pubsub.publish("deleteCategory", event.target.dataset.categoryId);
                pubsub.publish("clearTaskItems");
                pubsub.publish('renderDefaultCategory', 'all');
                pubsub.publish("closeModal")
                document.querySelector('.allTasks').classList.add('active')
                pubsub.publish("renderCategoryButtons")
                pubsub.publish('renderWelcomeWindow')
            } 
            
            if (event.target.classList.contains("closeModal") && event.target.matches("i")) pubsub.publish("closeModal");
            if (event.target.matches(".closeModal") && event.target.matches("button")) pubsub.publish("closeModal");
            
        })


        document.addEventListener("submit", (event) => {
            event.preventDefault()
            if (document.querySelector("#createTask")) {
                categoryManager.setActiveCategory(document.querySelector('select').value);
                pubsub.publish("submitNewTask",UIController.domManager.getTaskValues());
                removeActiveClass();
                pubsub.publish("renderCategoryButtons")
                pubsub.publish('addCategoryEventListeners');
                pubsub.publish('dynamicallySelectButton');
                pubsub.publish("clearTaskItems");
                pubsub.publish('renderUserCategory', categoryManager.getActiveCategory());
                pubsub.publish("closeModal");
                pubsub.publish('renderWelcomeWindow');
                
            }
            
            if (document.querySelector("#createCategory")) {
                pubsub.publish("submitNewCategory",UIController.domManager.getCategoryValues());
                removeActiveClass();
                pubsub.publish("closeModal"); 
                pubsub.publish("renderCategoryButtons")
                pubsub.publish('dynamicallySelectButton');
                pubsub.publish('addCategoryEventListeners');
                pubsub.publish("clearTaskItems");
                pubsub.publish('renderUserCategory', categoryManager.getActiveCategory())
            }


            if (document.querySelector("#editTask")) {
                const taskId = document.querySelector("#editTask").dataset.taskId
                pubsub.publish("editTask", { taskId: taskId, updatedTask: UIController.domManager.getTaskValues()});
                removeActiveClass();
                pubsub.publish("renderCategoryButtons")
                pubsub.publish('addCategoryEventListeners');
                pubsub.publish('dynamicallySelectButton');
                pubsub.publish("clearTaskItems"); 
                pubsub.publish('renderUserCategory', categoryManager.getActiveCategory());
                pubsub.publish('renderWelcomeWindow');
                pubsub.publish("closeModal");  
            }

            if (document.querySelector("#editCategory")) {
                const categoryId = document.querySelector("#editCategory").dataset.categoryId
                pubsub.publish("editCategory", { categoryId: categoryId, updatedCategory: UIController.domManager.getCategoryValues()});
                
                pubsub.publish("renderCategoryButtons");
                pubsub.publish("clearTaskItems");
                pubsub.publish('renderUserCategory', categoryId);
                pubsub.publish('dynamicallySelectButton');
                pubsub.publish("closeModal");
                
                
                
            }
            


            
        })

        document.addEventListener('focusout', (event) => {
            if (event.target.matches('input[type="date"]')) pubsub.publish('colorPastDueDates')
        })



        const removeActiveClass = () => {
            const sibebarBtns = document.querySelectorAll('.sidebarBtn');
            sibebarBtns.forEach((btn) => {
                btn.classList.remove('active');
            })
        }
    }
    return {  addDefaultEventListeners , addCategoryEventListeners }
})();

export default eventListenerController
