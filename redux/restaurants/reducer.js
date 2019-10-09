import restaurantsAction from "./actions";
function RestaurantsReducer(state = {
    restaurants: null,
    dishes:null,
}, action) {
    switch (action.type) {

        case restaurantsAction.SET_RESTAURANTS:
            return {
                ...state,
                restaurants: action.data.data
            }
        case restaurantsAction.SET_DISHES:
            return {
                ...state,
                dishes:action.data.data,
            }
        
        default: return state

    }
}

export default RestaurantsReducer;