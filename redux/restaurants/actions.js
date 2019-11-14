const restaurantsAction = {
    //set restaurants data to the store 
    SET_RESTAURANTS: "SET_RESTAURANTS",
    // set dishes to store
    SET_DISHES: "SET_DISHES",
    SET_DISHES_TAGS: "SET_DISHES_TAGS",
    SET_DISH_RATING: "SET_DISH_RATING",

    SET_LATEST_REVIEWS:"SET_LATEST_REVIEWS",

    GET_MENUS: "GET_MENUS",
    GET_MENUS_SUCCESSFUL: "GET_MENUS_SUCCESSFUL",
    GET_MENUS_FAIL: "GET_MENUS_FAIL",




    SET_CURRENT_RESTAURANT: "SET_CURRENT_RESTAURANT",

    setLatestReviews: data => {
        return {
            type: restaurantsAction.SET-SET_LATEST_REVIEWS,
            data
        }
    },
    setDishesWithTags: data => {
        return {
            type: restaurantsAction.SET_DISHES_TAGS,
            data
        }
    },
    setCurrentResuarant: data => {
        return {
            type: restaurantsAction.SET_CURRENT_RESTAURANT,
            data
        }
    },



    setRestaurants: data => {
        return {
            type: restaurantsAction.SET_RESTAURANTS,
            data,
        }
    },

    setDishes: data => {
        return {
            type: restaurantsAction.SET_DISHES,
            data
        }
    },

    getMenus: data => {
        return {
            type: restaurantsAction.GET_MENUS,
            data,
            isLoading: true,
        }
    },
    getMenusSuccessful: data => {
        return {
            type: restaurantsAction.GET_MENUS_SUCCESSFUL,
            data,
            success: true,

        }
    },
    getMenusFail: data => {
        return {
            type: restaurantsAction.GET_MENUS_FAIL,
            data,
            success: false
        }
    },

    setDishRating: data => {
        return {
            type: restaurantsAction.SET_DISH_RATING,
            data,
        }
    }
}
export default restaurantsAction; 