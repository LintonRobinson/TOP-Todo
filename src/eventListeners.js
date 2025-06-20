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
            if (event.target.classList.contains("openCreateTask")) pubsub.publish("openCreateTaskModule", {modalType:"create"});
            if (event.target.classList.contains("openEditTaskModal")) pubsub.publish("openCreateTaskModule", {modalType:"edit", currentTaskId: event.target.dataset.taskId, taskObject: taskManager.getTask(event.target.dataset.taskId)});
            if (event.target.classList.contains("viewTask")) pubsub.publish("openCreateTaskModule", {modalType:"view", taskObject: taskManager.getTask(event.target.dataset.taskId), currentTaskId: event.target.dataset.taskId});
            if (event.target.classList.contains("openDeleteTaskModal")) pubsub.publish("openCreateTaskModule", {modalType:"delete"})
            if (event.target.id === "deleteTask") pubsub.publish("deleteTask", event.target.dataset.taskId);
            if (event.target.classList.contains("closeModal") && event.target.matches("i")) pubsub.publish("closeModal");
            if (event.target.matches("#deleteTask")) pubsub.publish("closeModal");
            if (event.target.matches(".closeModal") && event.target.matches("button")) pubsub.publish("closeModal");
        })

        document.addEventListener("submit", (event) => {
            if (document.querySelector("#createTask")) {
                pubsub.publish("submitNewTask",UIController.domManager.getTaskValues());
                pubsub.publish("closeModal");
            }

            

            if (document.querySelector("#editTask")) {
                const taskId = document.querySelector("#editTask").dataset.taskId
                pubsub.publish("editTask", { taskId: taskId, updatedTask: UIController.domManager.getTaskValues()});
                pubsub.publish("closeModal");
            }
            event.preventDefault()

            
        })
    }
    return { addDynamicEventListeners , addDefaultEventListeners }
})();

export default eventListenerController


// NEED TO PASS THE TASK ID FROM THE CLICKED EDIT ICON PER TASK CARD