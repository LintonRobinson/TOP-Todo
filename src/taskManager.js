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

    const setTasks = (tasksToSet) => {
        tasks = tasksToSet
    }


    const setCompleteTasks = (tasksToSet) => {
        completeTasks = tasksToSet
    }

    const getTask = (taskId) => {
        return tasks[getIndexByID(taskId)];
    }

    const getIndexByID = (taskId) => {
        return tasks.findIndex((task) => task.id === taskId);
    }


    
    // categoryManager.createCategory({categoryName: "Personal",categoryDescription: "My stuff"})
        // categoryManager.setActiveCategory('90c39b47-c381-44fc-a7e6-a3c003ea4bdc')
    // taskManager.createTask({taskName: "Go to DDT",taskDescription:"Ya Mama",taskDueDate:"Now",taskImportantStatus:false,taskNotes:"Nah"})
    // taskManager.editTask("ced3988d-fee9-49bb-bc78-34174080d7fc",{taskName: "ODIN!!!!",taskDescription:"Ya Mama",taskDueDate:"Now",taskImportantStatus:false,taskNotes:"Nah"})
    // categoryManager.setActiveCategory("")
    //categoryManager.deleteCategoryandTasks("")
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
                console.log(task.dueDate)
                tasksDueToday.push(task)
            }
        }) 
        return tasksDueToday
    };

    const getTasksDueThisWeek = () => {
        const tasksDueToday = [];
        tasks.forEach((task) => {
            if (isThisWeek(parse(task.dueDate,"yyyy-MM-dd",new Date()))) {
                console.log(task.dueDate)
                tasksDueToday.push(task)
            }
        }) 
        return tasksDueToday
    };

    const getTaskCategory = (taskId) => {
        const task = tasks.find((task) => task.id = taskId)
        const categoryId = task.category
        return categoryId
    }


    const moveTaskToComplete = (taskId, taskName) => {
        completeTasks.push({taskId, taskName});
        deleteTask(taskId);
        saveToLocalStorage();
    }

    const saveToLocalStorage = () => {
        localStorage.setItem("tasks",JSON.stringify(tasks));
        localStorage.setItem("completeTasks",JSON.stringify(completeTasks));
    }



    return { getTasks, setTasks , setCompleteTasks , getTask , getTaskCategory , getTasksByCategory , getTasksDueToday , getTasksDueThisWeek , createTask , editTask , deleteTask , deleteTasksByCategory , moveTaskToComplete}
})();


export default taskManager