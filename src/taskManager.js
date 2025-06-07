import  categoryManager  from "./categoryManager.js"

const taskManager = (() => {
    const tasks = [];
    class Task {
        constructor({taskName,taskDescription,taskDueDate,taskImportantStatus,taskNotes,taskCategory}) {
            this.name = taskName;
            this.description = taskDescription;
            this.dueDate = taskDueDate;
            this.importantStatus = taskImportantStatus;
            this.notes = taskNotes;
            this.category = taskCategory;
            this.id = crypto.randomUUID();
        }
    }

    const logTasks = () => {
        console.log(tasks);
    }

    const getIndexByID = (taskId) => {
        return tasks.findIndex((task) => task.id === taskId);
    }
    
    // Pass category manager 
    const createTask = ({taskName,taskDescription,taskDueDate,taskImportantStatus,taskNotes}) => {       
        const newTask = new Task({taskName,taskDescription,taskDueDate,taskImportantStatus,taskNotes,taskCategory: categoryManager.getActiveCategory()})
        tasks.push(newTask)
        return newTask
    }
        
    const deleteTask = (taskId) => {
        tasks.splice(getIndexByID(taskId),1)
    }




    return {logTasks, createTask , deleteTask }
})();


export default taskManager