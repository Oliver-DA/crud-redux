import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//Redux
import { createAddProductAction } from '../redux/products/productActions';
import { hideAlertAction, showAlertAction } from '../redux/alert/alertActions';

const NewProduct = ({ history }) => {

    //State
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);

    //Redux stores's state and dispatch
    //Dispatch is always needed to call redux's actions
    const dispatch = useDispatch();
    const loading = useSelector( state => state.products.loading );
    const error = useSelector( state => state.products.error );
    const alert = useSelector( state => state.alert.alert );

    //Dispatch actions to start adding a product
    const addProduct = product => dispatch( createAddProductAction(product) );

    //Handlers
    const submitHandler = e => {
        e.preventDefault();

        if(name.trim() === "" || price < 0){

            const alert = {
                msg: "Both fields are required",
                classes: "alert alert-danger text-center text-uppercase"
            }

            dispatch( showAlertAction(alert) );
            
            return;
        }

        dispatch( hideAlertAction() );

        addProduct({
            name,
            price
        });

        history.push("/")
    };

    return (
        <div className = "row justify-content-center">
            <div className = "col-md-8">
                <div className = "card">
                    <div className = "card-body">
                        <h2 className = "text-center bm-4 font-weight-bold">
                            Add New Product
                        </h2>
                        { alert && <p className = {alert.classes}>{alert.msg}</p>}
                        <form onSubmit = {submitHandler}>

                            <div className = "form-group">
                                <label>Product Name:</label>
                                <input
                                type = "text"
                                className = "form-control"
                                name = "name"
                                value = {name}
                                onChange = {e => setName(e.target.value)}
                                />
                            </div>
                            
                            <div className = "form-group">
                                <label>Product Price:</label>
                                <input
                                type = "text"
                                className = "form-control"
                                name = "price"
                                value = {price}
                                onChange = {e => setPrice( Number(e.target.value) ) }
                                />
                            </div>

                            <button
                            type = "submit"
                            className = "btn btn-primary font-weight-bold text-uppercase d-blovk w-100">
                                Add
                            </button>

                        </form>

                        { loading && <h2>Loading...</h2> }

                        {
                            error && <p
                            className = "alert alert-danger mt-4 text-center">
                            There was an error creating this product</p>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default NewProduct;