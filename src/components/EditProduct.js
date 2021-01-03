import React,{ useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { startEditingProductAction } from '../redux/products/productActions';

const EditProduct = () => {

    //Dispatch is always needed to call redux's actions
    const history = useHistory();
    const dispatch = useDispatch();

    //State
    const [product, setProduct] = useState({
        name: "",
        price: 0
    })

    //Accessing state trough useSelector which connects directly with the redux store
    const productToEdit = useSelector( state => state.products.productToEdit );

    useEffect(() => {
        setProduct(productToEdit)

    }, [productToEdit]);
    
    const { name, price } = product;

    //Handlers
    const handleChange = e => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = e => {
        e.preventDefault();

        //Dispatching the action that starts editing a product
        dispatch( startEditingProductAction(product) );

        history.push("/");
    };

    return (
        <div className = "row justify-content-center">
        <div className = "col-md-8">
            <div className = "card">
                <div className = "card-body">
                    <h2 className = "text-center bm-4 font-weight-bold">
                        Edit Your Product
                    </h2>
                    <form onSubmit = {handleSubmit}>

                        <div className = "form-group">
                            <label>Product Name:</label>
                            <input
                            type = "text"
                            className = "form-control"
                            name = "name"
                            value = {name}
                            onChange = {handleChange}
                            />
                        </div>
                        
                        <div className = "form-group">
                            <label>Product Price:</label>
                            <input
                            type = "number"
                            className = "form-control"
                            name = "price"
                            value = {price}
                            onChange = {handleChange}
                            />
                        </div>

                        <button
                        type = "submit"
                        className = "btn btn-primary font-weight-bold text-uppercase d-blovk w-100">
                            Save Changes
                        </button>

                    </form>
                </div>
            </div>
        </div>
    </div>
    );
}
 
export default EditProduct;