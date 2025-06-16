import pubsub from "./pubsub";
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
            if (element.target.classList.contains("openCreateTask")) pubsub.publish("openCreateTaskModule","create");
            if (element.target.id === "createTask") pubsub.publish("submitNewTask",UIController.domManager.getTaskValues());

    
        })
    }
    return {addDynamicEventListeners , addDefaultEventListeners}
})();

export default eventListenerController