import pubsub from "./pubsub";
export default eventListenerController = (() => {
    const addEventListeners = () => {
        document.addEventListener("click", (event) => {
            if (event.target.id === "createTask") {
                
            }
        })
    }
    return {addEventListeners}
})();