import RestaurantsActions from "./RestaurantsActions";

function RestaurantsReducer(state = {
    menu: null,
    isLoading: false,
}, action) {
    switch (action.type) {
        case RestaurantsActions.GET_MENU_BY_NAME:
            return {
                ...state,
                menu: action.data,
            }
        default:
            return state;

    }

}


export default RestaurantsReducer;