import axios from 'axios'
import {API_URL} from '../../utils/config'
import RestaurantActions from './RestaurantsActions'
class RestaurantsMiddleware {
    static getMenues = (data) => {
        return dispatch => {
            axios.post(`${API_URL}/restaurants/getmenu`,data).then((res) => {
                console.log("response in midle ware ====>", res);
                RestaurantActions.getMenuByName(res.data.data)
            }).catch(err => {
                console.log("err", err);
            })
        }
    }
}

export default RestaurantsMiddleware;