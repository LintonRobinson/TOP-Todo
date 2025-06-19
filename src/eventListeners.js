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
        document.addEventListener("click", (element) => {
            // console.log(element.target)
            if (element.target.classList.contains("openCreateTask")) pubsub.publish("openCreateTaskModule", {modalType:"create"});
            if (element.target.classList.contains("openEditTaskModal")) pubsub.publish("openCreateTaskModule", {modalType:"edit", currentTaskId: element.target.dataset.taskId, taskObject: taskManager.getTask(element.target.dataset.taskId)});
            if (element.target.classList.contains("viewTask")) pubsub.publish("openCreateTaskModule", {modalType:"view", taskObject: taskManager.getTask(element.target.dataset.taskId), currentTaskId: element.target.dataset.taskId});
            if (element.target.classList.contains("openDeleteTaskModal")) pubsub.publish("openCreateTaskModule", {modalType:"delete"})
            if (element.target.id === "createTask") pubsub.publish("submitNewTask",UIController.domManager.getTaskValues());
            if (element.target.id === "editTask") pubsub.publish("editTask", { taskId: element.target.dataset.taskId, updatedTask: UIController.domManager.getTaskValues()});
            if (element.target.id === "deleteTask") pubsub.publish("deleteTask", element.target.dataset.taskId);
    
            
    
        })
    }
    return { addDynamicEventListeners , addDefaultEventListeners }
})();

export default eventListenerController


// NEED TO PASS THE TASK ID FROM THE CLICKED EDIT ICON PER TASK CARD