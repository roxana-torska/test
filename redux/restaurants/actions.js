const restaurantsAction = {
    //set restaurants data to the store 
    SET_RESTAURANTS: "SET_RESTAURANTS",
    // set dishes to store
    SET_DISHES:"SET_DISHES",


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
    }
}
export default restaurantsAction; 