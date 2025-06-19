import  categoryManager  from "./categoryManager.js"
import { isThisWeek } from "date-fns";
import { isToday } from "date-fns";
import { isFuture } from "date-fns";
import { parse } from "date-fns";
import pubSub from "./pubsub.js";


const taskManager = (() => {
    let tasks = [];
    document.addEventListener("DOMContentLoaded", () => {
        if (!localStorage.getItem("tasks")) {
            const tasks = [];
            localStorage.setItem("tasks",JSON.stringify(tasks))
        } else {
            tasks = JSON.parse(localStorage.getItem("tasks"))
            // console.log(tasks)
        }

        
    })

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
        if (isFuture(parse(taskDueDate, "yyyy-MM-dd", new Date()))) {
            const newTask = new Task({taskName,taskDescription,taskDueDate,taskImportantStatus,taskNotes,taskCategory, taskId});
            tasks.push(newTask)
            pubSub.publish("closeModal");
            saveToLocalStorage()
            
        } else {
            pubSub.publish("invalidDate");
            
        }
        
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

    const getTaskCategory = (taskId) => {
        const task = tasks.find((task) => task.id = taskId)
        const categoryId = task.category
        return categoryId
    }

    // 💭Test! new method

    const saveToLocalStorage = () => {
        localStorage.setItem("tasks",JSON.stringify(tasks));
    }

    return { getTasks, getTask , getTaskCategory , getTasksByCategory , createTask , editTask , deleteTask , deleteTasksByCategory }
})();


export default taskManager