import pubsub from "./pubsub";
const eventListenerController = (() => {
    const addDynamicEventListeners = () => {
        document.addEventListener("click", (event) => {
            if (event.target.id === "createTask") {
                
            }
        })
    }
    const addDefaultEventListeners = () => {
        document.addEventListener("click", (element) => {
            if (element.target.id === "openCreateTask") pubsub.publish("openCreateTaskModule","create");
            // if (element.target.contains("openCreateTask")) pubsub.publish("submitNewTask","get");

    
        })
    }
    return {addDynamicEventListeners, addDefaultEventListeners}
})();

export default eventListenerController