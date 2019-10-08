import restaurantsAction from "./actions";
function RestaurantsReducer(state = {
    restaurants: null,
}, action) {
    console.log("reducer==data===>", action.data)
    console.log("reducer inside restaurants ====>", action.type)

    switch (action.type) {

        case restaurantsAction.SET_RESTAURANTS:
            console.log("reducer inside restaurants ====>", action.type)

            return {
                ...state,
                restaurants: action.data
            }
        default: return state

    }
}

export default RestaurantsReducer;