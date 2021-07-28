import { categoryConstant, initialData, productConstant } from "./constant"
import axios from '../healpers/axios'
export const getInitialData = () => {
    return async dispatch => {
        const res = await axios.post('/initialData')
        const { categories, products } = res.data;

        if (res.status === 200) {
            dispatch({
                type: categoryConstant.GET_ALL_CATEGORY_SUCCESS,
                payload: { categories }
            });
            dispatch({
                type: productConstant.GET_ALL_PRODUCT_SUCCESS,
                payload: { products }
            });
        }
        console.log(res)
    }
}