const categoryManager = (() => {
    let activeCategory
    const categories = [];
    class Category {
        constructor({categoryName , categoryDescription = undefined, categoryId} ) {
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

    const logCategories = () => {
        console.log(categories);
    }

    
    const getIndexByID = (categoryId) => {
        return categories.findIndex((category) => category.id === categoryId);
    }
    

    const createCategory = ({categoryName , categoryDescription, categoryId}) => {
        const newCategory = new Category({categoryName , categoryDescription , categoryId});
        categories.push(newCategory);
        return newCategory;
    }

    const getCategory = (categoryId) => {
        return categories[getIndexByID(categoryId)];
    }

    const editCategory = (categoryId,updatedCategory) => {
        const currentCategoryIndex = getIndexByID(categoryId)
        categories[currentCategoryIndex] = new Category(updatedCategory);
        categories[currentCategoryIndex].id = categoryId;
    }


    const deleteCategory = (categoryId) => {
        categories.splice(getIndexByID(categoryId), 1)
        
    }

    return { createCategory , getCategory , editCategory ,deleteCategory , getActiveCategory, setActiveCategory ,logCategories }
})();


export default categoryManager


// Keep all tasks in one array and dynamically sort them and display on page 