import taskManager from "./taskManager.js"
const categoryManager = (() => {
    let activeCategory
    let categories
  
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
        setCategories(JSON.parse(localStorage.getItem("categories")))
        const newCategory = new Category({categoryName , categoryDescription , categoryId});
        categoryManager.setActiveCategory(newCategory.id)
        categories.push(newCategory);
        saveToLocalStorage()
    }

    

    const editCategory = ({categoryId,updatedCategory}) => {
        let currentStateCategories = JSON.parse(localStorage.getItem("categories"));
        const categoryIndex = currentStateCategories.findIndex((category) => category.id === categoryId);
        currentStateCategories[categoryIndex] = new Category(updatedCategory);
        currentStateCategories[categoryIndex].id = categoryId;
        setCategories(currentStateCategories)
        categoryManager.setActiveCategory(categoryId)
        saveToLocalStorage()
    }


    const deleteCategoryandTasks = (categoryId) => {
        let currentStateCategories = JSON.parse(localStorage.getItem("categories"));
        const categoryIndex = currentStateCategories.findIndex((category) => category.id === categoryId);
        currentStateCategories.splice(categoryIndex , 1)
        setCategories(currentStateCategories);
        taskManager.deleteTasksByCategory(categoryId)
        setActiveCategory('allTasks')
        saveToLocalStorage()
    }

    
 


    const saveToLocalStorage = () => {
        localStorage.setItem("categories",JSON.stringify(categories));
    }



    return { createCategory , getCategory , setCategories , getCategoryName , editCategory , deleteCategoryandTasks , getActiveCategory, setActiveCategory , getCategories }
})();


export default categoryManager
