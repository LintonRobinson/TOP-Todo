import Element from "./elementCreation.js"
import categoryManager from "./categoryManager.js";
import taskManager from "./taskManager.js";
import { format } from "date-fns";


const UIController = (() => { 
    const uiItems = {  
        taskItem: {
            get getIndividualTaskWrapper() {
                return new Element("div").setElementAttribute({class: "individualTaskWrapper"})
            }, 
            get createDiv() {
                return new Element("div")
            },
            get createSpan() {
                return new Element("span")
            }, 
            get createViewIcon() {
                return new Element("i").setElementAttribute({class:"fa-regular fa-eye viewTask", "aria-hidden": true})
            }, 
            get createEditIcon() {
                return new Element("i").setElementAttribute({class:"fa-solid fa-pen-to-square openEditTaskModal", "aria-hidden": true})
            },
            get createDeleteIcon() {
                return new Element("i").setElementAttribute({class:"fa-regular fa-trash openDeleteTaskModal", "aria-hidden": true})
            }, 
        }, 
        

        taskModal: {
            get createDiv() {
                return new Element("div");
            },
            get createTaskForm() {
                return new Element("form").setElementAttribute({action: "#"});
            },
            get createFormHeader() {
                return new Element("h2");
            },
            get createTaskWrapper() {
                return new Element("div").setElementAttribute({class: "form-question-wrapper"});
            },
            get createTaskLabel() {
                return new Element("label");
            },
            get createTaskInput() {
                return new Element("input");
            },
            get createTaskTextArea() {
                return new Element("textarea");
            },
            get createButton() {
                return new Element("button");
            },
            get createButton() {
                return new Element("button");
            },
            get createSelectGroup() {
                return new Element("select");
            },
            get createSelectOption() {
                return new Element("option");
            },
            get createMarkAsImportantText() {
                return new Element("span").addInnerText("Mark As Important");
            },
            get createCloseIcon() {
                return new Element("i").setElementAttribute({class:"fa-solid fa-xmark closeModal ", "aria-hidden": true});
            }
        }
    }

    // document.querySelector(".tasks-wrapper").appendChild(UIController.domManager.createUITaskItem(""))

    
    const domManager = (() => {
        
        const buildUITaskItem = (task) => {
            const tasksWrapper = document.querySelector(".tasks-wrapper")
            
            const newTaskWrapper = uiItems.taskItem.getIndividualTaskWrapper;
            
            const taskWrapperLeft = uiItems.taskItem.createDiv;
            const taskWrapperRight = uiItems.taskItem.createDiv;
            
            const taskDot = uiItems.taskItem.createDiv;
            const taskName = uiItems.taskItem.createSpan;
            const viewTaskIcon = uiItems.taskItem.createViewIcon;
            const editTaskIcon = uiItems.taskItem.createEditIcon;
            const deleteTaskIcon = uiItems.taskItem.createDeleteIcon;
            
            taskName.addInnerText(task.name)
            viewTaskIcon.setElementAttribute({"data-task-id": task.id})
            editTaskIcon.setElementAttribute({"data-task-id": task.id})
            deleteTaskIcon.setElementAttribute({"data-task-id": task.id})

            taskWrapperLeft.addChildElement([taskDot,taskName])
            taskWrapperRight.addChildElement([viewTaskIcon,editTaskIcon,deleteTaskIcon])
            newTaskWrapper.addChildElement([taskWrapperLeft,taskWrapperRight])  
            tasksWrapper.appendChild(newTaskWrapper.build());

        } 



        const openTaskModal = ({modalType, taskObject, currentTaskId }) => {
            // Initialize (Create Elements)
            const modalWrapper = uiItems.taskModal.createDiv.setElementAttribute({class: "modal-wrapper"});
            const modalForm = uiItems.taskModal.createTaskForm;
            const formHeader = uiItems.taskModal.createFormHeader;
            const taskNameWrapper = uiItems.taskModal.createTaskWrapper;
            const taskNameLabel = uiItems.taskModal.createTaskLabel.setElementAttribute({for: "taskName"}).addInnerText("Task Name");
            const taskNameInput = uiItems.taskModal.createTaskInput.setElementAttribute({id: "taskName", type: "text", required: "", placeholder: "Task Name"});
            const taskCategoryWrapper = uiItems.taskModal.createTaskWrapper; 
            const taskCategoryLabel = uiItems.taskModal.createTaskLabel.setElementAttribute({for: "taskCategory"}).addInnerText("Task Category");


            // Dynamically Create Category Dropdown
             (() => {
                const taskCategoriesSelect = uiItems.taskModal.createSelectGroup.setElementAttribute({name:"categories", id:"taskCategories"});
                if (categoryManager.getActiveCategory() === "allTasks") {
                    const taskOptionCategories = []
                    categoryManager.getCategories().forEach((category) => {
                        taskOptionCategories.push({categoryId: category.id, categoryName: category.name})
                    });
                    
                    taskOptionCategories.forEach((optionObject) => {
                        const taskCategory = uiItems.taskModal.createSelectOption.setElementAttribute({value: optionObject.categoryId}).addInnerText(optionObject.categoryName);
                        taskCategoriesSelect.addChildElement(taskCategory);
                    });
                } else {
                    const taskCategory = uiItems.taskModal.createSelectOption.setElementAttribute({value: categoryManager.getActiveCategory()}).addInnerText(categoryManager.getCategoryName(categoryManager.getActiveCategory()));
                    taskCategoriesSelect.addChildElement(taskCategory);
                };

                if (modalType === "view") taskCategoriesSelect.setElementAttribute({disabled: ""});
                taskCategoryWrapper.addChildElement([taskCategoryLabel,taskCategoriesSelect]);
            })()
      
            
            const taskDueDateWrapper = uiItems.taskModal.createTaskWrapper;
            const taskDueDateLabel = uiItems.taskModal.createTaskLabel.setElementAttribute({for: "taskDueDate"}).addInnerText("Task Due Date");
            const taskDueDateInput = uiItems.taskModal.createTaskInput.setElementAttribute({id: "taskDueDate", type: "date", required: "",  min: format(new Date(), "yyyy-MM-dd")});
            
            const taskDescriptionWrapper = uiItems.taskModal.createTaskWrapper;
            const taskDescriptionLabel = uiItems.taskModal.createTaskLabel.setElementAttribute({for: "taskDescription"}).addInnerText("Task Description");
            const taskDescriptionTextArea = uiItems.taskModal.createTaskTextArea.setElementAttribute({id: "taskDescription", required: "",placeholder: "Task Description"})
            
            const taskNotesWrapper = uiItems.taskModal.createTaskWrapper;
            const taskNotesLabel = uiItems.taskModal.createTaskLabel.setElementAttribute({for: "taskNotes"}).addInnerText("Task Notes");
            const taskNotesTextArea = uiItems.taskModal.createTaskTextArea.setElementAttribute({id: "taskNotes", required: "",placeholder: "Task Notes"})
            
            const taskImportantStatusWrapper = uiItems.taskModal.createTaskWrapper;
            const taskImportantStatusLabel = uiItems.taskModal.createTaskLabel.setElementAttribute({for: "taskImportantStatus"});
            const taskImportantStatusInput = uiItems.taskModal.createTaskInput.setElementAttribute({id: "taskImportantStatus", type: "checkbox"});
            const markAsImportantText = uiItems.taskModal.createMarkAsImportantText;
            const closeIcon = uiItems.taskModal.createCloseIcon;

            
            

            // Add children (sub children first)
            taskNameWrapper.addChildElement([taskNameLabel,taskNameInput]);
            taskDueDateWrapper.addChildElement([taskDueDateLabel,taskDueDateInput]);
            taskDescriptionWrapper.addChildElement([taskDescriptionLabel,taskDescriptionTextArea]);
            taskNotesWrapper.addChildElement([taskNotesLabel,taskNotesTextArea]);
            taskImportantStatusLabel.addChildElement([taskImportantStatusInput,markAsImportantText]);
            taskImportantStatusWrapper.addChildElement([taskImportantStatusLabel]);
            
            // Rendering of form depending on modal
            switch(modalType) {
                case "create": {
                    formHeader.addInnerText("Create New Task");
                    const formButtonWrapper = uiItems.taskModal.createDiv.setElementAttribute({class: "form-btn-wrapper"});
                    const formSubmitBtn = uiItems.taskModal.createButton.setElementAttribute({id: "createTask", type:"submit"}).addInnerText("Create Task");
                    const cancelBtn = uiItems.taskModal.createButton.setElementAttribute({class: "closeModal cancelBtn", type:"button"}).addInnerText("Cancel");
                    formButtonWrapper.addChildElement([formSubmitBtn,cancelBtn]);
                    modalForm.addChildElement([formHeader,taskNameWrapper,taskCategoryWrapper,taskDueDateWrapper,taskDescriptionWrapper,taskNotesWrapper,taskImportantStatusWrapper,formButtonWrapper,closeIcon]);
                    break;
                }
                case "view": {  
                    formHeader.addInnerText(taskObject.name);
                    taskNameInput.setElementAttribute({value: taskObject.name});
                    taskDueDateInput.setElementAttribute({value: taskObject.dueDate});
                    taskDescriptionTextArea.setElementAttribute({value: taskObject.description});
                    taskNotesTextArea.setElementAttribute({value: taskObject.notes});
                    taskImportantStatusInput.setElementAttribute({value: taskObject.importantStatus});
                    modalForm.addChildElement([formHeader,taskNameWrapper,taskCategoryWrapper,taskDueDateWrapper,taskDescriptionWrapper,taskNotesWrapper,taskImportantStatusWrapper,closeIcon])
                    taskNameInput.setElementAttribute({disabled: ""})
                    taskDueDateInput.setElementAttribute({disabled: ""})
                    taskDescriptionTextArea.setElementAttribute({disabled: ""})
                    taskNotesTextArea.setElementAttribute({disabled: ""})
                    taskImportantStatusInput.setElementAttribute({disabled: ""})
                    break
                }

                case "edit": {

                    formHeader.addInnerText(taskObject.name);
                    taskNameInput.setElementAttribute({value: taskObject.name});
                    taskDueDateInput.setElementAttribute({value: taskObject.dueDate});
                    taskDescriptionTextArea.setElementAttribute({value: taskObject.description});
                    taskNotesTextArea.setElementAttribute({value: taskObject.notes});
                    taskImportantStatusInput.setElementAttribute({value: taskObject.importantStatus});
                    const formButtonWrapper = uiItems.taskModal.createDiv.setElementAttribute({class: "form-btn-wrapper"});
                    const formSubmitBtn = uiItems.taskModal.createButton.setElementAttribute({id: "editTask", type:"submit", "data-task-id": currentTaskId}).addInnerText("Edit Task");
                    const cancelBtn = uiItems.taskModal.createButton.setElementAttribute({class: "closeModal cancelBtn", type:"button"}).addInnerText("Cancel");
                    formButtonWrapper.addChildElement([formSubmitBtn,cancelBtn]);
                    modalForm.addChildElement([formHeader,taskNameWrapper,taskCategoryWrapper,taskDueDateWrapper,taskDescriptionWrapper,taskNotesWrapper,taskImportantStatusWrapper,formButtonWrapper,closeIcon]);
                    break
                
                }
                case "delete": {
                    formHeader.addInnerText("Warning: This will delete the task permanently.");
                    const formButtonWrapper = uiItems.taskModal.createDiv.setElementAttribute({class: "form-btn-wrapper"});
                    const formSubmitBtn = uiItems.taskModal.createButton.setElementAttribute({id: "deleteTask", type:"button", "data-task-id": currentTaskId}).addInnerText("Delete Task");
                    const cancelTaskCreationBtn = uiItems.taskModal.createButton.setElementAttribute({class: "closeModal cancelDelete", type:"button"}).addInnerText("Cancel");
                    formButtonWrapper.addChildElement([formSubmitBtn,cancelTaskCreationBtn]);
                    modalForm.addChildElement([formHeader,formButtonWrapper,closeIcon]);
                    break
                }

            }
            
            modalWrapper.addChildElement(modalForm)
            const modalWrapperElement = modalWrapper.build()
            document.querySelector("body").appendChild(modalWrapperElement)
        
            if (modalType === "edit" || modalType === "view")

            // Update select after its creation
            if (modalType === "edit" || modalType === "view") document.querySelector("select").value = taskManager.getTaskCategory(currentTaskId);
            // Update textarea(s) after its creation
            if (modalType === "edit" || modalType === "view") {
                document.querySelector("#taskDescription").value = taskObject.description;
                document.querySelector("#taskNotes").value = taskObject.notes;
                if (taskObject.importantStatus) document.querySelector("#taskImportantStatus").checked = true;
            }
            
            if (modalType === "delete") document.querySelector("form").classList.add("delete")

            
        }
        
        const closeModal = () => {
            
            const modalWindow = document.querySelector(".modal-wrapper")
            document.querySelector("body").removeChild(modalWindow)
        }

// create category before you create a task
        const getTaskValues = () => {
            const taskName = document.querySelector("#taskName").value; 
            const taskCategory = document.querySelector("select").value;
            const taskDueDate = document.querySelector("#taskDueDate").value;
            const taskDescription = document.querySelector("#taskDescription").value;
            const taskNotes = document.querySelector("#taskNotes").value;
            const taskImportantStatus = document.querySelector("#taskImportantStatus").checked;
            return { taskName: taskName , taskCategory: taskCategory , taskDescription: taskDescription, taskDueDate:taskDueDate, taskImportantStatus: taskImportantStatus, taskNotes: taskNotes }

        }

        const displayDateError = () => {
            const taskForm = document.querySelector("form");
            if (taskForm.querySelector("p")) taskForm.removeChild(taskForm.querySelector("p"))
            const errorMessage = document.createElement("p");
            errorMessage.setAttribute("class", "errorMessage")
            errorMessage.textContent = "Invalid task due date. Choose a future date";
            taskForm.appendChild(errorMessage);
        }

        
        const dynamicallySelectButton = () => {
            const sidebar = document.querySelector("aside");
            const sidebarBtns = sidebar.querySelectorAll(".sidebarBtn");
            sidebarBtns.forEach((button) => {
                button.addEventListener('click',() => {
                    sidebarBtns.forEach((btn) => btn.classList.remove("active"))
                    button.classList.add("active")
                });
            })
            // identify by buttons in aside
        }
        
        return { openTaskModal , getTaskValues  , closeModal , buildUITaskItem , displayDateError , dynamicallySelectButton}
    })();
 





    return { domManager }
})();

export default UIController