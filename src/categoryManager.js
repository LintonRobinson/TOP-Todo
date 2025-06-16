import taskManager from "./taskManager.js"
const categoryManager = (() => {
    let activeCategory
    let categories = [];
    // Update Storage
    document.addEventListener("DOMContentLoaded", () => {
        if (!localStorage.getItem("categories")) {
            const categories = [];
            localStorage.setItem("categories",JSON.stringify(categories))
        } else {
            categories = JSON.parse(localStorage.getItem("categories"))
            // console.log(categories)
        }
    })


    
    class Category {
        constructor({categoryName , categoryDescription, categoryId} ) {
            this.name = categoryName;
            this.description = categoryDescription;
            categoryId === undefined ? this.id = crypto.randomUUID(): this.id = categoryId;
        
        }

    }

    const getActiveCategory = () => {
        return activeCategory
    }


    const setActiveCategory = (categoryId) => {
        activeCategory =  categoryId;
    }

    const getCategories = () => {
        return categories;
    }

    const getCategory = (categoryId) => {
        return categories[getIndexByID(categoryId)];
    }

    const getCategoryName = (categoryId) => {
        return categories[getIndexByID(categoryId)].name;
    }
    
    const getIndexByID = (categoryId) => {
        return categories.findIndex((category) => category.id === categoryId);
    }
    
    

    const createCategory = ({categoryName , categoryDescription, categoryId}) => {
        const newCategory = new Category({categoryName , categoryDescription , categoryId});
        categories.push(newCategory);
        saveToLocalStorage()
        return newCategory;
    }

    

    const editCategory = (categoryId,updatedCategory) => {
        const currentCategoryIndex = getIndexByID(categoryId)
        categories[currentCategoryIndex] = new Category(updatedCategory);
        categories[currentCategoryIndex].id = categoryId;
        saveToLocalStorage()
    }


    const deleteCategoryandTasks = (categoryId) => {
        categories.splice(getIndexByID(categoryId), 1)
        taskManager.deleteTasksByCategory(categoryId)
        saveToLocalStorage()
    }
 


    const saveToLocalStorage = () => {
        localStorage.setItem("categories",JSON.stringify(categories));
    }

    return { createCategory , getCategory , getCategoryName , editCategory , deleteCategoryandTasks , getActiveCategory, setActiveCategory , getCategories }
})();


export default categoryManager


// Keep all tasks in one array and dynamically sort them and display on page 