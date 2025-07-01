import { isToday, parse } from "date-fns";
import { isThisWeek } from "date-fns";
import categoryManager from "./categoryManager";


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
        return getTasks().findIndex((task) => task.id === taskId);
    }



    const createTask = ({taskName,taskDescription,taskDueDate,taskImportantStatus,taskNotes,taskId,taskCategory}) => {       
        setTasks(JSON.parse(localStorage.getItem("tasks"))); 
        categoryManager.setActiveCategory(taskCategory)
        const newTask = new Task({taskName,taskDescription,taskDueDate,taskImportantStatus,taskNotes,taskCategory, taskId});
        tasks.push(newTask)
        saveToLocalStorage()
    
        
    }
        
    const editTask = ({taskId,updatedTask}) => {
        let currentStateTasks = JSON.parse(localStorage.getItem("tasks"));
        const taskIndex = currentStateTasks.findIndex((task) => task.id === taskId);
        currentStateTasks[taskIndex] = new Task(updatedTask);
        currentStateTasks[taskIndex].id = taskId;
        currentStateTasks[taskIndex].category = updatedTask.taskCategory;   
        setTasks(currentStateTasks)  
        const taskCategory = currentStateTasks[taskIndex].category 
        
        categoryManager.setActiveCategory(taskCategory)
        console.log(categoryManager.getActiveCategory())
        saveToLocalStorage()
    }



    const deleteTask = (taskId) => {
        let currentStateTasks = JSON.parse(localStorage.getItem("tasks"))
        const taskIndex = currentStateTasks.findIndex((task) => task.id === taskId);
        const taskCategory = currentStateTasks[taskIndex].category
        currentStateTasks.splice(taskIndex, 1)
        setTasks(currentStateTasks)
        categoryManager.setActiveCategory(taskCategory)
        saveToLocalStorage()

    }


    const deleteTasksByCategory = (categoryId) => {
        let currentStateTasks = JSON.parse(localStorage.getItem("tasks"))
        const newTasks = currentStateTasks.filter((task) => task.category !== categoryId);
        setTasks(newTasks);
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
       
        completeTasks.push(taskName);
        deleteTask(taskId);
        saveToLocalStorage();
        categoryManager.setActiveCategory('complete')
    }

    const saveToLocalStorage = () => {
        localStorage.setItem("tasks",JSON.stringify(getTasks()));
        localStorage.setItem("completeTasks",JSON.stringify(getCompletedTasks()));
        //pubSub.publish("renderWelcomeWindow");
    }



    return { tasks , getTasks, getCompletedTasks , setTasks , setCompleteTasks , getTask , getTaskCategory , getTasksByCategory , getTasksDueToday , getTasksDueThisWeek , getImportantTasks , createTask , editTask , deleteTask , deleteTasksByCategory , moveTaskToComplete}
})();


export default taskManager