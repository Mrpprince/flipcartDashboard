import { productConstant } from "../actions/constant";

const initialState={
    products:[]
}
export default (state=initialState,action)=>{
    switch(action.type){
        case productConstant.GET_ALL_PRODUCT_SUCCESS:
            console.log(action.payload.products)
            state={
                ...state,
                products:action.payload.products
            }
            break;
    }
    return state;
}