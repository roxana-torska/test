const restaurantsAction = {
    SET_RESTAURANTS :"SET_RESTAURANTS",

    setRestaurants: data => ({
        type: restaurantsAction.SET_RESTAURANTS,
        data,

    })
}
export default restaurantsAction; 