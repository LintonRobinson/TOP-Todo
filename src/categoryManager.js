import taskManager from "./taskManager.js"
const categoryManager = (() => {
    let activeCategory = "allTasks"
    let categories

    let defaultCategories = [
        {
            categoryName: "All",
            categoryDescription: "View every task you’ve created, no matter the category or status.",
        },
        {
            categoryName: "Today",
            categoryDescription: "Tasks due today — perfect for staying focused and on track.",
        },
        {
            categoryName: "Week",
            categoryDescription: "All tasks scheduled for this week — stay on top of what’s ahead.",
        },
        {
            categoryName: "Important",
            categoryDescription: "High-priority tasks that need your attention first.",
        },
        {
            categoryName: "Complete",
            categoryDescription: "A list of tasks you’ve checked off — celebrate your progress!",
        },
    ]
    // Update Storage
    document.addEventListener("DOMContentLoaded", () => {
        
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

    const setCategories = (categoriesToSet) => {
        categories = categoriesToSet
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
    }

    

    const editCategory = ({categoryId,updatedCategory}) => {
        const currentCategoryIndex = getIndexByID(categoryId)
        console.log(currentCategoryIndex)
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

    

    return { createCategory , getCategory , setCategories , getCategoryName , editCategory , deleteCategoryandTasks , getActiveCategory, setActiveCategory , getCategories }
})();


export default categoryManager


// Keep all tasks in one array and dynamically sort them and display on page 