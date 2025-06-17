import { id } from "date-fns/locale";
import Element from "./elementCreation.js"
import categoryManager from "./categoryManager.js";

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
                return new Element("i").setElementAttribute({class:"fa-solid fa-pen-to-square editTask", "aria-hidden": true})
            },
            get createDeleteIcon() {
                return new Element("i").setElementAttribute({class:"fa-regular fa-trash deleteTask", "aria-hidden": true})
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
        
        
        
        
        // UIController.domManager.buildUITaskItem(taskManager.getTask("5e5e7ee2-0922-400f-bb09-fc0c0b8ce03f"))
        
        
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
            
            console.log(newTaskWrapper)
            taskName.addInnerText(task.name)
            viewTaskIcon.setElementAttribute({"data-task-id": task.id})
            editTaskIcon.setElementAttribute({"data-task-id": task.id})
            deleteTaskIcon.setElementAttribute({"data-task-id": task.id})

            taskWrapperLeft.addChildElement([taskDot,taskName])
            taskWrapperRight.addChildElement([viewTaskIcon,editTaskIcon,deleteTaskIcon])
            newTaskWrapper.addChildElement([taskWrapperLeft,taskWrapperRight])
            
            tasksWrapper.appendChild(newTaskWrapper.build());

        } 



        
        //

        const openTaskModal = (modalType, taskObject = {}) => {
        // Initialize
            // Modal Wrapper
            const modalWrapper = uiItems.taskModal.createDiv.setElementAttribute({class: "modal-wrapper"});
            //
            const modalForm = uiItems.taskModal.createTaskForm;
            
            const formHeader = uiItems.taskModal.createFormHeader;
            
            const taskNameWrapper = uiItems.taskModal.createTaskWrapper;
            const taskNameLabel = uiItems.taskModal.createTaskLabel.setElementAttribute({for: "taskName"}).addInnerText("Task Name");
            const taskNameInput = uiItems.taskModal.createTaskInput.setElementAttribute({id: "taskName", type: "text", required: "", placeholder: "Task Name"});
            
            // Dynamically add 

            function generateSelectCategories() {
                
                const taskCategoriesSelect = uiItems.taskModal.createSelectGroup.setElementAttribute({name:"categories", id:"taskCategories"});
                // categoryManager.setActiveCategory("allTasks")
                if (categoryManager.getActiveCategory() === "allTasks") {
                    const taskOptionCategories = []
                    categoryManager.getCategories().forEach((category) => {
                        taskOptionCategories.push({categoryId: category.id, categoryName: category.name})
                    })
                    
                    taskOptionCategories.forEach((optionObject) => {
                        const taskCategory = uiItems.taskModal.createSelectOption.setElementAttribute({value: optionObject.categoryId}).addInnerText(optionObject.categoryName);
                        taskCategoriesSelect.addChildElement(taskCategory);
                    })
                } else {
                    const taskCategory = uiItems.taskModal.createSelectOption.setElementAttribute({value: categoryManager.getActiveCategory()}).addInnerText(categoryManager.getCategoryName(categoryManager.getActiveCategory()));
                    taskCategoriesSelect.addChildElement(taskCategory);
                };

                // Last step
                taskCategoryWrapper.addChildElement([taskCategoryLabel,taskCategoriesSelect]);
            }

            const taskCategoryWrapper = uiItems.taskModal.createTaskWrapper; 
            const taskCategoryLabel = uiItems.taskModal.createTaskLabel.setElementAttribute({for: "taskCategory"}).addInnerText("Task Category");

            generateSelectCategories()
        
            
            




            
            

            //categoryManager.setActiveCategory("0ce8bc09-9fb5-48bc-9dd8-af925fefd366")
            const taskDueDateWrapper = uiItems.taskModal.createTaskWrapper;
            const taskDueDateLabel = uiItems.taskModal.createTaskLabel.setElementAttribute({for: "taskDueDate"}).addInnerText("Task Due Date");
            const taskDueDateInput = uiItems.taskModal.createTaskInput.setElementAttribute({id: "taskDueDate", type: "date", required: ""});
            
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
            //
            switch(modalType) {
                case "create": 
                    formHeader.addInnerText("Create New Task");
                    const formButtonWrapper = uiItems.taskModal.createDiv.setElementAttribute({class: "form-btn-wrapper"});
                    const formSubmitBtn = uiItems.taskModal.createButton.setElementAttribute({id: "createTask", class: "closeModal", type:"button"}).addInnerText("Create Task");
                    const cancelTaskCreationBtn = uiItems.taskModal.createButton.setElementAttribute({class: "cancelTaskCreation closeModal", type:"button"}).addInnerText("Cancel");
                    formButtonWrapper.addChildElement([formSubmitBtn,cancelTaskCreationBtn]);
                    modalForm.addChildElement([formHeader,taskNameWrapper,taskCategoryWrapper,taskDueDateWrapper,taskDescriptionWrapper,taskNotesWrapper,taskImportantStatusWrapper,formButtonWrapper,closeIcon]);
                    break;
                case "view":
                    formHeader.addInnerText(taskObject.name);
                    taskNameInput.setElementAttribute({value: taskObject.name});
                    taskDueDateInput.setElementAttribute({value: taskObject.dueDate});

                    modalForm.addChildElement([formHeader,taskNameWrapper,taskCategoryWrapper,taskDueDateWrapper,taskDescriptionWrapper,taskNotesWrapper,taskImportantStatusWrapper,closeIcon])
                    taskNameInput.setElementAttribute({disabled: ""})
                    taskDueDateInput.setElementAttribute({disabled: ""})
                    taskDescriptionTextArea.setElementAttribute({disabled: ""})
                    taskNotesTextArea.setElementAttribute({disabled: ""})
                    taskImportantStatusInput.setElementAttribute({disabled: ""})

            }
            
            // UIController.domManager.buildUITaskItem(taskManager.getTask("5e5e7ee2-0922-400f-bb09-fc0c0b8ce03f"))

            modalWrapper.addChildElement(modalForm)
            document.querySelector("body").appendChild(modalWrapper.build())
            
        
        
            
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
            const taskImportantStatus = document.querySelector("#taskImportantStatus").value;
            return {taskName: taskName, taskCategory: taskCategory ,taskDescription:taskDescription,taskDueDate:taskDueDate,taskImportantStatus: taskImportantStatus,taskNotes: taskNotes}

        }

        
    
        
        return { openTaskModal , getTaskValues  , closeModal , buildUITaskItem }
    })();
 





    return { domManager }
})();

export default UIController