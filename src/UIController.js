import Element from "./elementCreation.js"
import categoryManager from "./categoryManager.js";
import taskManager from "./taskManager.js";
import pubSub from "./pubsub.js";
import { format } from "date-fns";
import { parse } from "date-fns";
import { isBefore } from "date-fns";
import { getHours } from "date-fns";
import { getMinutes } from "date-fns";


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
        
        categoryItem: {
            get getButton() {
                return new Element("button");
            }, 
            get createDiv() {
                return new Element("div")
            },
            get createSpan() {
                return new Element("span").setElementAttribute({class: 'btnCategoryName'})
            }, 
            get createCategoryIcon() {
                return new Element("i").setElementAttribute({class:"fa-solid fa-layer-group", "aria-hidden": true})  
            }, 
            get createEditIcon() {
                return new Element("i").setElementAttribute({class:"fa-solid fa-pencil openEditCategoryModal", "aria-hidden": true})
            },
            get createDeleteIcon() {
                return new Element("i").setElementAttribute({class:"fa-solid fa-trash openDeleteCategoryModal", "aria-hidden": true})
            }, 
        }, 
        



        modal: {
            get createDiv() {
                return new Element("div");
            },
            get createForm() {
                return new Element("form").setElementAttribute({action: "#"});
            },
            get createFormHeader() {
                return new Element("h2");
            },
            get createWrapper() {
                return new Element("div").setElementAttribute({class: "form-question-wrapper"});
            },
            get createLabel() {
                return new Element("label");
            },
            get createInput() {
                return new Element("input");
            },
            get createTextArea() {
                return new Element("textarea");
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


    
    const domManager = (() => {
        
        const renderWelcomeWindow = (() => {
            const greetingMessage = document.querySelector('#greetingMessage');
            const numberOfTodaysTasks = document.querySelector('#numberOfTodaysTasks');
            taskManager.getTasksDueToday().length === 1 ? numberOfTodaysTasks.textContent = `(${taskManager.getTasksDueToday().length}) task due today.`: numberOfTodaysTasks.textContent = `(${taskManager.getTasksDueToday().length}) tasks due today.`;
            
            if (getHours(new Date()) >= 18 && getMinutes(new Date()) > 0) {
                greetingMessage.textContent = 'Good evening.';
            } else if (getHours(new Date()) >= 12) {
                greetingMessage.textContent = 'Good afternoon.'
            } else {
                greetingMessage.textContent = 'Good morning.'
            }
    
        })


        const buildDummyTaskItem = () => {
            const tasksWrapper = document.querySelector(".tasks-wrapper")
            
            const newTaskWrapper = uiItems.taskItem.getIndividualTaskWrapper;
            
            const taskWrapperLeft = uiItems.taskItem.createDiv;
            const taskWrapperRight = uiItems.taskItem.createDiv;
            
            const taskDot = uiItems.taskItem.createDiv;
            const taskName = uiItems.taskItem.createSpan;
            const viewTaskIcon = new Element("i").setElementAttribute({class:"fa-regular fa-eye", "aria-hidden": true})
            const editTaskIcon = new Element("i").setElementAttribute({class:"fa-solid fa-pen-to-square", "aria-hidden": true})
            const deleteTaskIcon = new Element("i").setElementAttribute({class:"fa-regular fa-trash ", "aria-hidden": true})
            
            taskName.addInnerText("Create Your First Task!")
            

            taskWrapperLeft.addChildElement([taskDot,taskName])
            taskWrapperRight.addChildElement([viewTaskIcon,editTaskIcon,deleteTaskIcon])
            newTaskWrapper.addChildElement([taskWrapperLeft,taskWrapperRight])  
            tasksWrapper.appendChild(newTaskWrapper.build());

        }
        
        const buildCategoryButton = (category) => {
            
            const categoriesWrapper = document.querySelector(".category-wrapper");                
            const newCategoryBtn = uiItems.categoryItem.getButton.setElementAttribute({"data-category-id": category.id}); 
            if (categoryManager.getActiveCategory() === category.id) {
                newCategoryBtn.setElementAttribute({class: "userCategory sidebarBtn button active"})
            } else {
                newCategoryBtn.setElementAttribute({class: "userCategory sidebarBtn button"})
            }
            const categoryWrapperLeft = uiItems.categoryItem.createDiv;
            const categoryWrapperRight = uiItems.categoryItem.createDiv;
            const categoryName = uiItems.categoryItem.createSpan.addInnerText(category.name);

            const categoryIcon = uiItems.categoryItem.createCategoryIcon;
            const editCategoryIcon = uiItems.categoryItem.createEditIcon;
            const deleteCategoryIcon = uiItems.categoryItem.createDeleteIcon;
            editCategoryIcon.setElementAttribute({"data-category-id": category.id})
            deleteCategoryIcon.setElementAttribute({"data-category-id": category.id})

            categoryWrapperLeft.addChildElement([categoryIcon,categoryName])
            categoryWrapperRight.addChildElement([editCategoryIcon,deleteCategoryIcon])
            newCategoryBtn.addChildElement([categoryWrapperLeft,categoryWrapperRight])  
            categoriesWrapper.appendChild(newCategoryBtn.build());
        }

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

        const buildUICompleteTaskItem = (completedTaskName) => {
            const tasksWrapper = document.querySelector(".tasks-wrapper");
            const newTaskWrapper = uiItems.taskItem.getIndividualTaskWrapper.setElementAttribute({class: 'individualTaskWrapper complete'});
            const taskWrapperLeft = uiItems.taskItem.createDiv;
            const taskWrapperRight = uiItems.taskItem.createDiv;
            const taskDot = uiItems.taskItem.createDiv;
            const taskName = uiItems.taskItem.createSpan;        
            taskName.addInnerText(completedTaskName)
            taskWrapperLeft.addChildElement([taskDot,taskName])
            newTaskWrapper.addChildElement([taskWrapperLeft,taskWrapperRight])  
            tasksWrapper.appendChild(newTaskWrapper.build());

        }



        const openTaskModal = ({modalType, currentTaskId}) => {
            
            const taskObject = taskManager.getTask(currentTaskId)
            
            // Initialize (Create Elements)
            const modalWrapper = uiItems.modal.createDiv.setElementAttribute({class: "modal-wrapper"});
            const modalForm = uiItems.modal.createForm;
            const formHeader = uiItems.modal.createFormHeader;
            const taskNameWrapper = uiItems.modal.createWrapper;
            const taskNameLabel = uiItems.modal.createLabel.setElementAttribute({for: "taskName"}).addInnerText("Task Name");
            const taskNameInput = uiItems.modal.createInput.setElementAttribute({id: "taskName", type: "text", required: "", placeholder: "Task Name"});
            const taskCategoryWrapper = uiItems.modal.createWrapper; 
            const taskCategoryLabel = uiItems.modal.createLabel.setElementAttribute({for: "taskCategory"}).addInnerText("Task Category");

            if (modalType !== 'delete') {
                (() => {
                    const taskCategoriesSelect = uiItems.modal.createSelectGroup.setElementAttribute({name:"categories", id:"taskCategories"});
                    if (categoryManager.getActiveCategory() === "allTasks" || categoryManager.getActiveCategory() === "todayTasks" || categoryManager.getActiveCategory() === "weekTasks" || categoryManager.getActiveCategory() === "importantTasks" || categoryManager.getActiveCategory() === "completeTasks") {
                        const taskOptionCategories = []
                        categoryManager.getCategories().forEach((category) => {
                            taskOptionCategories.push({categoryId: category.id, categoryName: category.name})
                        });
                        
                        taskOptionCategories.forEach((optionObject) => {
                            const taskCategory = uiItems.modal.createSelectOption.setElementAttribute({value: optionObject.categoryId}).addInnerText(optionObject.categoryName);
                            //if (taskObject.category)
                            taskCategoriesSelect.addChildElement(taskCategory);
                        });
                    } else {
                        const taskCategory = uiItems.modal.createSelectOption.setElementAttribute({value: categoryManager.getActiveCategory()}).addInnerText(categoryManager.getCategoryName(categoryManager.getActiveCategory()));
                        taskCategoriesSelect.addChildElement(taskCategory);
                    };
    
                    if (modalType === "view") taskCategoriesSelect.setElementAttribute({disabled: ""});
                    taskCategoryWrapper.addChildElement([taskCategoryLabel,taskCategoriesSelect]);
                    
    
                })()
            }
             
      
            
            const taskDueDateWrapper = uiItems.modal.createWrapper;
            const taskDueDateLabel = uiItems.modal.createLabel.setElementAttribute({for: "taskDueDate"}).addInnerText("Task Due Date");
            const taskDueDateInput = uiItems.modal.createInput.setElementAttribute({id: "taskDueDate", type: "date", required: "",  min: format(new Date(), "yyyy-MM-dd")});
            
            const taskDescriptionWrapper = uiItems.modal.createWrapper;
            const taskDescriptionLabel = uiItems.modal.createLabel.setElementAttribute({for: "taskDescription"}).addInnerText("Task Description");
            const taskDescriptionTextArea = uiItems.modal.createTextArea.setElementAttribute({id: "taskDescription", required: "",placeholder: "Task Description"})
            
            const taskNotesWrapper = uiItems.modal.createWrapper;
            const taskNotesLabel = uiItems.modal.createLabel.setElementAttribute({for: "taskNotes"}).addInnerText("Task Notes");
            const taskNotesTextArea = uiItems.modal.createTextArea.setElementAttribute({id: "taskNotes", required: "",placeholder: "Task Notes"})
            
            const taskImportantStatusWrapper = uiItems.modal.createWrapper;
            const taskImportantStatusLabel = uiItems.modal.createLabel.setElementAttribute({for: "taskImportantStatus"});
            const taskImportantStatusInput = uiItems.modal.createInput.setElementAttribute({id: "taskImportantStatus", type: "checkbox"});
            const markAsImportantText = uiItems.modal.createMarkAsImportantText;
            const closeIcon = uiItems.modal.createCloseIcon;

        

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
                    const formButtonWrapper = uiItems.modal.createDiv.setElementAttribute({class: "form-btn-wrapper"});
                    const formSubmitBtn = uiItems.modal.createButton.setElementAttribute({id: "createTask", type:"submit"}).addInnerText("Save");
                    const cancelBtn = uiItems.modal.createButton.setElementAttribute({class: "closeModal cancelBtn", type:"button"}).addInnerText("Cancel");
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
                    const formButtonWrapper = uiItems.modal.createDiv.setElementAttribute({class: "form-btn-wrapper"});
                    const formCompleteTaskBtn = uiItems.modal.createButton.setElementAttribute({id: "completeTask", type:"button","data-task-id": currentTaskId}).addInnerText("Complete Task");
                    const cancelBtn = uiItems.modal.createButton.setElementAttribute({class: "closeModal cancelBtn", type:"button"}).addInnerText("Cancel");
                    formButtonWrapper.addChildElement([formCompleteTaskBtn,cancelBtn]);
                    modalForm.addChildElement([formHeader,taskNameWrapper,taskCategoryWrapper,taskDueDateWrapper,taskDescriptionWrapper,taskNotesWrapper,taskImportantStatusWrapper,formButtonWrapper,closeIcon])
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
                    const formButtonWrapper = uiItems.modal.createDiv.setElementAttribute({class: "form-btn-wrapper"});
                    const formSubmitBtn = uiItems.modal.createButton.setElementAttribute({id: "editTask", type:"submit", "data-task-id": currentTaskId}).addInnerText("Save");
                    const cancelBtn = uiItems.modal.createButton.setElementAttribute({class: "closeModal cancelBtn", type:"button"}).addInnerText("Cancel");
                    formButtonWrapper.addChildElement([formSubmitBtn,cancelBtn]);
                    modalForm.addChildElement([formHeader,taskNameWrapper,taskCategoryWrapper,taskDueDateWrapper,taskDescriptionWrapper,taskNotesWrapper,taskImportantStatusWrapper,formButtonWrapper,closeIcon]);
                    break
                
                }
                case "delete": {
                    formHeader.addInnerText("Warning: This will delete the task permanently.");
                    const formButtonWrapper = uiItems.modal.createDiv.setElementAttribute({class: "form-btn-wrapper"});
                    const formSubmitBtn = uiItems.modal.createButton.setElementAttribute({id: "deleteTask", type:"button", "data-task-id": currentTaskId}).addInnerText("Delete");
                    const cancelTaskCreationBtn = uiItems.modal.createButton.setElementAttribute({class: "closeModal cancelDelete", type:"button"}).addInnerText("Cancel");
                    formButtonWrapper.addChildElement([formSubmitBtn,cancelTaskCreationBtn]);
                    modalForm.addChildElement([formHeader,formButtonWrapper,closeIcon]);
                    break
                }

            }
            
            modalWrapper.addChildElement(modalForm)
            const modalWrapperElement = modalWrapper.build()
            document.querySelector("body").appendChild(modalWrapperElement)
            if (modalType !== 'delete') colorPastDueDates()

            
            // Update textarea(s) after its creation
            if (modalType === "edit" || modalType === "view") {
                document.querySelector("#taskDescription").value = taskObject.description;
                document.querySelector("#taskNotes").value = taskObject.notes;
                if (taskObject.importantStatus) document.querySelector("#taskImportantStatus").checked = true;
            }
            
            if (modalType === "delete") document.querySelector("form").classList.add("delete");
        
            switch (categoryManager.getActiveCategory()) {
                case 'allTasks':
                    if (modalType === "edit" || modalType === "view") updateFormSelectedCategory(taskObject.category)
                    break
                case 'todayTasks':
                    if (modalType === "edit" || modalType === "view") updateFormSelectedCategory(taskObject.category)
                    break
                case 'weekTasks':
                    if (modalType === "edit" || modalType === "view") updateFormSelectedCategory(taskObject.category)
                    break
                case 'importantTasks':
                    if (modalType === "edit" || modalType === "view") updateFormSelectedCategory(taskObject.category)
                    break
                case 'completeTasks':
                    if (modalType === "edit" || modalType === "view") updateFormSelectedCategory(taskObject.category)
                    break
            }
            if (categoryManager.getActiveCategory() !== "allTasks" && categoryManager.getActiveCategory() !== "todayTasks" && categoryManager.getActiveCategory() !== "weekTasks" && categoryManager.getActiveCategory() !== "importantTasks" && categoryManager.getActiveCategory() !== "completeTasks" && modalType !== 'delete') document.querySelector('select').value = categoryManager.getActiveCategory();
            
           
            
        }
        
        const colorPastDueDates = () => {
            isBefore(parse(document.querySelector('#taskDueDate').value,"yyyy-MM-dd",new Date()), new Date()) ? document.querySelector('#taskDueDate').style.color = "red": document.querySelector('#taskDueDate').style.color = "black"

        }

        const openCategoryModal = ({modalType, categoryObject, currentCategoryId }) => {
            // Initialize (Create Elements)
            const modalWrapper = uiItems.modal.createDiv.setElementAttribute({class: "modal-wrapper"});
            const modalForm = uiItems.modal.createForm;
            const formHeader = uiItems.modal.createFormHeader;
            const categoryNameWrapper = uiItems.modal.createWrapper;
            const categoryNameLabel = uiItems.modal.createLabel.setElementAttribute({for: "categoryName"}).addInnerText("Category Name");
            const categoryNameInput = uiItems.modal.createInput.setElementAttribute({id: "categoryName", type: "text", required: "", placeholder: "Category Name"});
            
      
            
            const categoryDescriptionWrapper = uiItems.modal.createWrapper;
            const categoryDescriptionLabel = uiItems.modal.createLabel.setElementAttribute({for: "categoryDescription"}).addInnerText("Category Description");
            const categoryDescriptionTextArea = uiItems.modal.createTextArea.setElementAttribute({id: "categoryDescription", required: "",placeholder: "Category Description"})
            
            const closeIcon = uiItems.modal.createCloseIcon;

            
            

            // Add children (sub children first)
            categoryNameWrapper.addChildElement([categoryNameLabel,categoryNameInput]);
            categoryDescriptionWrapper.addChildElement([categoryDescriptionLabel,categoryDescriptionTextArea]);
            
            
            // Rendering of form depending on modal
            switch(modalType) {
                case "create": {
                    formHeader.addInnerText("Create New Category");
                    const formButtonWrapper = uiItems.modal.createDiv.setElementAttribute({class: "form-btn-wrapper"});
                    const formSubmitBtn = uiItems.modal.createButton.setElementAttribute({id: "createCategory", type:"submit"}).addInnerText("Save");
                    const cancelBtn = uiItems.modal.createButton.setElementAttribute({class: "closeModal cancelBtn", type:"button"}).addInnerText("Cancel");
                    formButtonWrapper.addChildElement([formSubmitBtn,cancelBtn]);
                    modalForm.addChildElement([formHeader,categoryNameWrapper,categoryDescriptionWrapper,formButtonWrapper,closeIcon]);
                    break;
                }

                case "edit": {
                    formHeader.addInnerText(categoryObject.name);
                    categoryNameInput.setElementAttribute({value: categoryObject.name});
                    categoryDescriptionTextArea.setElementAttribute({value: categoryObject.description});
                    const formButtonWrapper = uiItems.modal.createDiv.setElementAttribute({class: "form-btn-wrapper"});
                    const formSubmitBtn = uiItems.modal.createButton.setElementAttribute({id: "editCategory", type:"submit", "data-category-id": currentCategoryId}).addInnerText("Save");
                    const cancelBtn = uiItems.modal.createButton.setElementAttribute({class: "closeModal cancelBtn", type:"button"}).addInnerText("Cancel");
                    formButtonWrapper.addChildElement([formSubmitBtn,cancelBtn]);
                    modalForm.addChildElement([formHeader,categoryNameWrapper,categoryDescriptionWrapper,formButtonWrapper,closeIcon]);
                    break
                
                }
                case "delete": {
                    formHeader.addInnerText("Warning: This category and all it's tasks will be deleted.");
                    const formButtonWrapper = uiItems.modal.createDiv.setElementAttribute({class: "form-btn-wrapper"});
                    const formSubmitBtn = uiItems.modal.createButton.setElementAttribute({id: "deleteCategory", type:"button", "data-category-id": currentCategoryId}).addInnerText("Delete");
                    const cancelTaskCreationBtn = uiItems.modal.createButton.setElementAttribute({class: "closeModal cancelDelete", type:"button"}).addInnerText("Cancel");
                    formButtonWrapper.addChildElement([formSubmitBtn,cancelTaskCreationBtn]);
                    modalForm.addChildElement([formHeader,formButtonWrapper,closeIcon]);
                    break
                }

            }
            
            modalWrapper.addChildElement(modalForm)
            const modalWrapperElement = modalWrapper.build()
            document.querySelector("body").appendChild(modalWrapperElement)
            if (modalType === "edit" || modalType === "view") document.querySelector("#categoryDescription").value = categoryObject.description;
            if (modalType === "delete") document.querySelector("form").classList.add("delete")

            
        }
        
        const closeModal = () => {
            
            const modalWindow = document.querySelector(".modal-wrapper")
            document.querySelector("body").removeChild(modalWindow)
        }


        const getTaskValues = () => {
            const taskName = document.querySelector("#taskName").value; 
            const taskCategory = document.querySelector("select").value;
            const taskDueDate = document.querySelector("#taskDueDate").value;
            const taskDescription = document.querySelector("#taskDescription").value;
            const taskNotes = document.querySelector("#taskNotes").value;
            const taskImportantStatus = document.querySelector("#taskImportantStatus").checked;
            return { taskName: taskName , taskCategory: taskCategory , taskDescription: taskDescription, taskDueDate:taskDueDate, taskImportantStatus: taskImportantStatus, taskNotes: taskNotes }

        }

        const getCategoryValues = () => {
            const categoryName = document.querySelector("#categoryName").value; 
            const categoryDescription = document.querySelector("#categoryDescription").value;
            return { categoryName: categoryName , categoryDescription: categoryDescription }

        }

        const displayDateError = () => {
            const taskForm = document.querySelector("form");
            if (taskForm.querySelector("p")) taskForm.removeChild(taskForm.querySelector("p"))
            const errorMessage = document.createElement("p");
            errorMessage.setAttribute("class", "errorMessage")
            errorMessage.textContent = "Invalid task due date. Choose a future date";
            taskForm.appendChild(errorMessage);
        }


        const renderCategoryButtons = () => {
            const categoriesWrapper = document.querySelector('.category-wrapper');
            const categoryButtons = document.querySelectorAll('.userCategory');
            categoryButtons.forEach((button) => categoriesWrapper.removeChild(button))
            categoryManager.getCategories().forEach((category) => {
                buildCategoryButton(category)
            })
            
            if (categoryManager.getActiveCategory() === 'allTasks') {
                pubSub.publish('addCategoryEventListeners');
                dynamicallySelectButton();

            }
            document.querySelector('#numberOfCategories').textContent = `(${categoryManager.getCategories().length})`;
        }

        
        const dynamicallySelectButton = () => {
        
            const sidebar = document.querySelector("aside");
            const sidebarBtns = sidebar.querySelectorAll(".sidebarBtn");
            sidebarBtns.forEach((button) => {
                const addEventListeners = () => {
                    sidebarBtns.forEach((btn) => btn.classList.remove("active"));
                    button.classList.add("active");
                }
                button.removeEventListener('click', addEventListeners);
                button.addEventListener('click', addEventListeners);
            })
        }


        const updateFormSelectedCategory = (selectedCategoryId) => {
            document.querySelector("select").value = selectedCategoryId;
        }
        
        
        const renderDefaultCategory = (defaultCategory) => {
            switch (defaultCategory) {
                case 'all': {
                    document.querySelector('#categoryTitle').textContent = 'All Tasks';
                    document.querySelector('#categorySummary').textContent = 'View every task you’ve created, no matter the category or status.';
                    if (taskManager.getTasks().length)
                    taskManager.getTasks().forEach((task) => {
                        buildUITaskItem(task)
                    });
                    document.querySelector('#numberOfTasks').textContent = `(${taskManager.getTasks().length})`
                    break
                }
                case 'today': {
                    document.querySelector('#categoryTitle').textContent = 'Today’s Tasks';
                    document.querySelector('#categorySummary').textContent = 'Tasks due today — perfect for staying focused and on track.';
                    if (taskManager.getTasksDueToday().length) {
                        taskManager.getTasksDueToday().forEach((task) => {
                            buildUITaskItem(task)
                        });
                    }
                    
                    document.querySelector('#numberOfTasks').textContent = `(${taskManager.getTasksDueToday().length})`
                    break
                }
                case 'week': {
                    document.querySelector('#categoryTitle').textContent = 'This Week’s Tasks';
                    document.querySelector('#categorySummary').textContent = 'All tasks scheduled for this week — stay on top of what’s ahead.';
                    if (taskManager.getTasks().length) {
                        taskManager.getTasksDueThisWeek().forEach((task) => {
                            buildUITaskItem(task)
                        });
                    }
                    
                    document.querySelector('#numberOfTasks').textContent = `(${taskManager.getTasksDueThisWeek().length})`
                    break
                }
                case 'important': {
                    document.querySelector('#categoryTitle').textContent = 'Important Tasks';
                    document.querySelector('#categorySummary').textContent = 'High-priority tasks that need your attention first.';
                    if (taskManager.getTasks().length) {
                        taskManager.getImportantTasks().forEach((task) => {
                            buildUITaskItem(task);
                        });
                    }
                    
                    document.querySelector('#numberOfTasks').textContent = `(${taskManager.getImportantTasks().length})`
                    break
                }
                case 'complete': {
                    document.querySelector('#categoryTitle').textContent = 'Completed Tasks';
                    document.querySelector('#categorySummary').textContent = 'A list of tasks you’ve checked off — celebrate your progress!';
                    if (taskManager.getCompletedTasks().length) {
                        taskManager.getCompletedTasks().forEach((task) => {
                            buildUICompleteTaskItem(task);
                        });
                    } 
                    
                    
                    document.querySelector('#numberOfTasks').textContent = `(${taskManager.getCompletedTasks().length})`
                    break
                }

            }
        }

        const renderUserCategory = (categoryId) => {
            document.querySelector('#categoryTitle').textContent = categoryManager.getCategory(categoryId).name;
            document.querySelector('#categorySummary').textContent = categoryManager.getCategory(categoryId).description;
            taskManager.getTasks().forEach((task) => {
                if (task.category === categoryId) {
                    buildUITaskItem(task)
                }
            })
            document.querySelector('#numberOfTasks').textContent = `(${taskManager.getTasksByCategory(categoryId).length})`
            if (taskManager.getTasks().length === 0) buildDummyTaskItem()
        }

        const renderCategoryError = () => {
            const categoryWrapper = document.querySelector('.category-wrapper')
            categoryWrapper.classList.add('displayCategoryError')
            setTimeout(() => categoryWrapper.classList.remove('displayCategoryError'),5000)
        }

        const clearTaskItems = () => {
            const tasksWrapper = document.querySelector('.tasks-wrapper') 
            const individualTaskWrapper = document.querySelectorAll('.individualTaskWrapper') 
            
            individualTaskWrapper.forEach((taskItem) => {
                tasksWrapper.removeChild(taskItem);
            });
        }
        
        return { openTaskModal , openCategoryModal , getTaskValues , getCategoryValues , closeModal , clearTaskItems , buildDummyTaskItem , buildCategoryButton , buildUITaskItem , buildUICompleteTaskItem , displayDateError , dynamicallySelectButton , renderDefaultCategory , renderUserCategory , renderCategoryButtons , renderWelcomeWindow , updateFormSelectedCategory , colorPastDueDates , renderCategoryError}
    })();
 





    return { domManager }
})();

export default UIController