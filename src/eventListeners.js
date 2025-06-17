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
            if (element.target.classList.contains("openCreateTask")) pubsub.publish("openCreateTaskModule","create");
            if (element.target.id === "createTask") pubsub.publish("submitNewTask",UIController.domManager.getTaskValues());
            if (element.target.classList.contains("closeModal")) pubsub.publish("closeModal");
            if (element.target.classList.contains("viewTask"))  pubsub.publish("openCreateTaskModule","view", taskManager.getTask(element.target.dataset.taskId));

    
        })
    }
    return {addDynamicEventListeners , addDefaultEventListeners}
})();

export default eventListenerController