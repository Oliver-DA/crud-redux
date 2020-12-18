//Types
import {
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_ERROR,
    GET_PRODUCTS_START,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_ERROR,
    DELETE_PRODUCT,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_ERROR,
    EDIT_PRODUCT,
    EDIT_PRODUCT_SUCCESS,
    EDIT_PRODUCT_ERROR
} from './productsTypes';

const initialState = {
    products: [],
    error: null,
    loading: false,
    productToDelete: null,
    productToEdit: null
};

export function productsReducer (state = initialState, action) {

    switch(action.type) {
        case GET_PRODUCTS_START:
        case ADD_PRODUCT:
            return {
                ...state,
                loading: true
            };

        case ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: [...state.products, action.payload]
            }
        case GET_PRODUCTS_ERROR:
        case ADD_PRODUCT_ERROR:
        case DELETE_PRODUCT_ERROR:
        case EDIT_PRODUCT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload,
                loading: false,
                error: null
            }

        case DELETE_PRODUCT:
            return {
                ...state,
                productToDelete: action.payload
            }
        
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                products: state.products.filter( product => product.id !== state.productToDelete),
                productToDelete: null
            }

        case EDIT_PRODUCT:
            return {
                ...state,
                productToEdit: action.payload
            }

        case EDIT_PRODUCT_SUCCESS:
            return {
                ...state,
                productToEdit: null,
                products: state.products.map( product => (
                    product.id === action.payload.id ? product = action.payload : product
                ))
            }

        default:
            return state;
    }
};
