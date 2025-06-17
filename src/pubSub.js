const pubSub = (() => {
    const events = {};
    const publish = (eventName, ...eventData) => {
        if (events[eventName]) {
            events[eventName].forEach(callback => {
                callback(...eventData);
            });
        }
    }

    const getEvents = () => {
        return events
    }

    const subscribe = (eventName,callback) => {
        if (!events[eventName]) {
            events[eventName] = [];
            events[eventName].push(callback);

        } else {
            events[eventName].push(callback);
        }
    }

    const unsubscribe = (eventName,eventCallback) => {
        if (events[eventName]) {
            events[eventName] = events[eventName].filter((callback) => callback !== eventCallback)
        }
    }

    return { publish , subscribe , unsubscribe , getEvents }
})();


export default pubSub