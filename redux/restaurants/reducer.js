import restaurantsAction from "./actions";
function RestaurantsReducer(state = {
    restaurants: null,
    dishes: null,
}, action) {
    switch (action.type) {
        case restaurantsAction.SET_DISHES_TAGS:
            return {
                ...state,
                dishesWithTags: action.data.data
            }
        case restaurantsAction.SET_LATEST_REVIEWS:
            return {
                ...state,
                latestReviews: action.data.data
            }
        case restaurantsAction.SET_CURRENT_RESTAURANT:
            return {
                ...state,
                currentRestaurent: action.data.data
            }
        case restaurantsAction.SET_RESTAURANTS:
            return {
                ...state,
                restaurants: action.data.data
            }
        case restaurantsAction.SET_DISHES:
            return {
                ...state,
                dishes: action.data.data,
            }

        case restaurantsAction.GET_MENUS:
            return {
                ...state,
                isLoading: action.isLoading,

            }


        case restaurantsAction.GET_MENUS_SUCCESSFUL:
            return {
                ...state,
                menus: action.data,
                isLoading: false,

            }

        case restaurantsAction.GET_MENUS_FAIL:
            return {
                ...state,
                menus: action.data,
                isLoading: false,

            }

        default: return state

    }
}

export default RestaurantsReducer;