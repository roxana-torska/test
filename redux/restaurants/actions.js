const restaurantsAction = {
    //set restaurants data to the store 
    SET_RESTAURANTS: "SET_RESTAURANTS",
    // set dishes to store
    SET_DISHES:"SET_DISHES",

    SET_DISH_RATING:"SET_DISH_RATING",

    GET_MENUS:"GET_MENUS",
    GET_MENUS_SUCCESSFUL :"GET_MENUS_SUCCESSFUL", 
    GET_MENUS_FAIL :"GET_MENUS_FAIL",
    setRestaurants: data => {
        return {
            type: restaurantsAction.SET_RESTAURANTS,
            data,
        }
    },

    setDishes: data=>{
        return {
            type:restaurantsAction.SET_DISHES,
            data
        }
    },

    getMenus :data=>{
        return {
            type:restaurantsAction.GET_MENUS,
            data,
            isLoading:true,
        }
    },
    getMenusSuccessful :data=>{
        return {
            type: restaurantsAction.GET_MENUS_SUCCESSFUL,
            data,
            success:true,

        }
    },
    getMenusFail :data =>{
        return {
            type:restaurantsAction.GET_MENUS_FAIL,
            data,
            success :false
        }
    },

    setDishRating:data=>{
        return {
            type:restaurantsAction.SET_DISH_RATING,
            data,
        }
    }
}
export default restaurantsAction; 