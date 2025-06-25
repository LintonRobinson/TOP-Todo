import { isToday, parse } from "date-fns";
import { isThisWeek } from "date-fns";


const taskManager = (() => {
    let tasks
    let completeTasks

    class Task {
        constructor({taskName,taskDescription,taskDueDate,taskImportantStatus,taskNotes,taskCategory, taskId}) {
            this.name = taskName;
            this.description = taskDescription;
            this.dueDate = taskDueDate;
            this.importantStatus = taskImportantStatus;
            this.notes = taskNotes;
            this.category = taskCategory;
            taskId === undefined ? this.id = crypto.randomUUID(): this.id = taskId;
        }
    }


    const getTasks = () => {
        return tasks;
    }

    const getCompletedTasks = () => {
        return completeTasks;
    }

    const setTasks = (tasksToSet) => {
        tasks = tasksToSet
    }


    const setCompleteTasks = (tasksToSet) => {
        completeTasks = tasksToSet;
    }

    const getTask = (taskId) => {
        return tasks[getIndexByID(taskId)];
    }

    const getIndexByID = (taskId) => {
        return tasks.findIndex((task) => task.id === taskId);
    }



    const createTask = ({taskName,taskDescription,taskDueDate,taskImportantStatus,taskNotes,taskId,taskCategory}) => {       
        const newTask = new Task({taskName,taskDescription,taskDueDate,taskImportantStatus,taskNotes,taskCategory, taskId});
        tasks.push(newTask)
        saveToLocalStorage()
    
        
    }
        
    const editTask = ({taskId,updatedTask}) => {
        const currentTaskIndex = getIndexByID(taskId)    
        tasks[currentTaskIndex] = new Task(updatedTask);
        tasks[currentTaskIndex].id = taskId;
        tasks[currentTaskIndex].category = updatedTask.taskCategory;     
        saveToLocalStorage()
    }



    const deleteTask = (taskId) => {
        tasks.splice(getIndexByID(taskId),1)
        saveToLocalStorage()
    }

    const deleteTasksByCategory = (categoryId) => {
        const newTasks = tasks.filter((task) => task.category !== categoryId);
        tasks = newTasks;
        saveToLocalStorage();
    }

    const getTasksByCategory = (categoryId) => {
        const categoryTasks = [];
        tasks.forEach((task) => {
            if (task.category === categoryId) categoryTasks.push(task)

        }) 
        return categoryTasks
    };

    const getTasksDueToday = () => {
        const tasksDueToday = [];
        tasks.forEach((task) => {
            if (isToday(parse(task.dueDate,"yyyy-MM-dd",new Date()))) {
                tasksDueToday.push(task)
            }
        }) 
        return tasksDueToday
    };

    const getTasksDueThisWeek = () => {
        const tasksDueToday = [];
        tasks.forEach((task) => {
            if (isThisWeek(parse(task.dueDate,"yyyy-MM-dd",new Date()))) {
                tasksDueToday.push(task)
            }
        }) 
        return tasksDueToday
    };

    const getImportantTasks = () => {
        const importantTasks = [];
        tasks.forEach((task) => {
            if (task.importantStatus) {
                importantTasks.push(task)
            }
        }) 
        return importantTasks
    };


    const getTaskCategory = (taskId) => {
        const task = tasks.find((task) => task.id = taskId)
        const categoryId = task.category
        return categoryId
    }


    const moveTaskToComplete = ({taskId, taskName}) => {
        console.log(taskName)
        completeTasks.push(taskName);
        deleteTask(taskId);
        saveToLocalStorage();
    }

    const saveToLocalStorage = () => {
        localStorage.setItem("tasks",JSON.stringify(tasks));
        localStorage.setItem("completeTasks",JSON.stringify(completeTasks));
    }



    return { getTasks, getCompletedTasks , setTasks , setCompleteTasks , getTask , getTaskCategory , getTasksByCategory , getTasksDueToday , getTasksDueThisWeek , getImportantTasks , createTask , editTask , deleteTask , deleteTasksByCategory , moveTaskToComplete}
})();


export default taskManager