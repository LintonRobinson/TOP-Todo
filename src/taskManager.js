import  categoryManager  from "./categoryManager.js"


const taskManager = (() => {
    let tasks = [];
    document.addEventListener("DOMContentLoaded", () => {
        if (!localStorage.getItem("tasks")) {
            const tasks = [];
            localStorage.setItem("tasks",JSON.stringify(tasks))
        } else {
            tasks = JSON.parse(localStorage.getItem("tasks"))
            console.log(tasks)
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
    const createTask = ({taskName,taskDescription,taskDueDate,taskImportantStatus,taskNotes,taskId}) => {       
        const newTask = new Task({taskName,taskDescription,taskDueDate,taskImportantStatus,taskNotes,taskCategory: categoryManager.getActiveCategory()}, taskId)
        tasks.push(newTask)
        saveToLocalStorage()
        return newTask
    }
        
    const editTask = (taskId,updatedTask) => {
        const currentTaskIndex = getIndexByID(taskId)
        const taskCategory = tasks[currentTaskIndex].category;
        tasks[currentTaskIndex] = new Task(updatedTask);
        tasks[currentTaskIndex].id = taskId;
        tasks[currentTaskIndex].category = taskCategory;
        
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

    // 💭Test! new method

    const saveToLocalStorage = () => {
        localStorage.setItem("tasks",JSON.stringify(tasks));
    }

    return { getTasks, getTask , getTasksByCategory , createTask , editTask , deleteTask , deleteTasksByCategory }
})();


export default taskManager