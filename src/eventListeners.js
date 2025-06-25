import categoryManager from "./categoryManager";
import pubsub from "./pubsub";
import taskManager from "./taskManager";
import UIController from "./UIController";
const eventListenerController = (() => {
    const addDynamicEventListeners = () => {
        document.addEventListener("click", (event) => {
            if (event.target.id === "createTask") {
                
            }
        })
    }
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
            }

            //createCategory
            

            if (document.querySelector("#editTask")) {
                const taskId = document.querySelector("#editTask").dataset.taskId
                pubsub.publish("editTask", { taskId: taskId, updatedTask: UIController.domManager.getTaskValues()});
                pubsub.publish("closeModal");
            }

            if (document.querySelector("#editCategory")) {
                const categoryId = document.querySelector("#editCategory").dataset.categoryId
                console.log(categoryId)
                pubsub.publish("editCategory", { categoryId: categoryId, updatedCategory: UIController.domManager.getCategoryValues()});
                pubsub.publish("closeModal");
            }
            

            
        })
    }
    return { addDynamicEventListeners , addDefaultEventListeners }
})();

export default eventListenerController


// NEED TO PASS THE TASK ID FROM THE CLICKED EDIT ICON PER TASK CARD