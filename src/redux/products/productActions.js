import swal from 'sweetalert';

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
    EDIT_PRODUCT_ERROR,
    EDIT_PRODUCT_START
} from './productsTypes';

//Axios client
import axiosClient from '../../config/axios';

/////////////////////////////////////////
///ACTION CREATOR TO CREATE A PRODUCT///
////////////////////////////////////////
export function createAddProductAction (product) {
    //This action creator gets acess to the dispatch property thanks to the thunk middleware
    return async (dispatch) => {
        dispatch( addProduct() );

        try {
            await axiosClient.post("/products", product);
            dispatch( addProductSuccess(product) );
            //Sweet alert library to display a succes message within a modal
            swal({
                title: "Success",
                text: "Your product was added correctly",
                icon: "success",
                button:"Done",
                timer: 2000
            })

        }catch (error) {
            dispatch( addProductError(true) );
            //Sweet alert library to display an error message within a modal
            swal({
                title: "Error",
                text: "Your product couldn't be added :(",
                icon: "error",
                button: "OK"
            });
        }
    }
};

//Action that Starts the adding product proccess
const addProduct = () => ({
    type: ADD_PRODUCT
});

//Action that completes adding the product proccess
const addProductSuccess = product => ({
    type: ADD_PRODUCT_SUCCESS,
    payload: product
});

//Action that handles when an error happens adding the product
const addProductError = () => ({
    type: ADD_PRODUCT_ERROR,
    payload: true
});

/////////////////////////////////////////
///ACTION CREATOR TO GET THE PRODUCTS///
////////////////////////////////////////
export function createGetProductAction() {
    //This action creator gets acess to the dispatch property thanks to the thunk middleware
    return async (dispatch) => {
        dispatch( getProductsStart() );

        try {
            const response = await axiosClient.get("/products");
            const products = response.data;
            dispatch ( getProductsSuccess(products) );

        } catch(err) {
            dispatch( getProductsError() )
        }
    }
};

//Action that starts the proccess of getting the products
const getProductsStart = () => ({
    type: GET_PRODUCTS_START
});

//Action that finishes the proccess of getting the products
const getProductsSuccess = products => ({
    type: GET_PRODUCTS_SUCCESS,
    payload: products
});

//Acction that handles errors while getting the products
const getProductsError = () => ({
    type: GET_PRODUCTS_ERROR,
    payload: true
});

///////////////////////////////////////
///ACTION CREATOR TO DELETE PRODUCTS///
//////////////////////////////////////
export function addDeleteProductAction (id) {
    //This action creator gets acess to the dispatch property thanks to the thunk middleware
    return async (dispatch) => {
        dispatch( deleteProduct (id) );

        try{ 
            await axiosClient.delete(`/products/${id}`);
            dispatch( deleteProductSuccess() );

        } catch(err){
            dispatch( deleteProductError() );
        }

    }
};

//Action that starts the proccess of deleting a product
const deleteProduct = id => ({
    type: DELETE_PRODUCT,
    payload: id
});

//Action that completes the proccess of deleting a product
const deleteProductSuccess = () => ({
    type: DELETE_PRODUCT_SUCCESS
});

//Action that handles any erros while deleting the produtc
const deleteProductError = () => ({
    type: DELETE_PRODUCT_ERROR,
    payload: true
});


///////////////////////////////////////
///ACTION CREATOR TO EDIT A PRODUCT///
//////////////////////////////////////
export function addEditProductAction (product) {
    //This action creator gets acess to the dispatch property thanks to the thunk middleware
    return (dispatch) => {
        dispatch ( editProduct(product) );
    }
};

//Action that sets the productToEdit property of the state to the current product to edit
const editProduct = (product) => ({
    type: EDIT_PRODUCT,
    payload: product
});

///////////////////////////////////////////////
///ACTION CREATOR TO START EDITING A PRODUCT///
///////////////////////////////////////////////
export function startEditingProductAction (product) {
    //This action creator gets acess to the dispatch property thanks to the thunk middleware
    return async (dispatch) => {

        try {
            await axiosClient.put(`/products/${product.id}`, product);
            dispatch( editingProductSuccess(product) );

        } catch (err) {
            dispatch( editingProductError() );
        }
    }
};

//Action that takes care of editing the product and switch it it for the old product
const editingProductSuccess = (product) => ({
    type: EDIT_PRODUCT_SUCCESS,
    payload: product
});

//Action that takes care of handling any error while editing a product
const editingProductError = () => ({
    type: EDIT_PRODUCT_ERROR,
    payload: true
})
