class RestaurantActions  {
     static GET_MENU_BY_NAME = "GET_MENU_BY_NAME";

    static getMenuByName = (data)=>{
        return {
            type:this.GET_MENU_BY_NAME,
            data,
        }
    }

}
export default RestaurantActions;