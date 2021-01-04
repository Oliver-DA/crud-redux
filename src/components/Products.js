import React, { Fragment, useEffect } from 'react';

//Components
import Product from './Product';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { createGetProductAction } from '../redux/products/productActions';

const Products = () => {

    //Redux's store state and dispatch
    //Dispatch is always needed to call redux's actions
    const dispatch = useDispatch();
    const products = useSelector( state => state.products.products );
    const loading = useSelector( state => state.products.loading );
    const err = useSelector( state => state.products.error );

    useEffect(() => {

        const getProducts = () => dispatch( createGetProductAction() );
        getProducts();

        //eslint-disable-next-line
    }, [])

    return (
        <Fragment>
        
            <h2 className = "text-center my-5">Products</h2>
            { err && <p className = "alert alert-danger text-center mt-4">There was a problen getting the products</p>}
            { loading && <h2 className = "text-center">Loading...</h2>  }
            <table className = "table table-striped table-borderless border-primary text-center">
                <thead className = "bg-primary table-dark">
                    <tr>
                        <th scope = "col">Name</th>
                        <th scope = "col">Price</th>
                        <th scope = "col">Actions</th>
                    </tr>
                </thead>

                <tbody>
                { 
                    products.length > 0 &&
                    (
                        products.map( product => (
                            <Product
                                key = {product.id}
                                product = {product}
                            />
                        ))
                    )
                 }
                </tbody>

            </table>
            { products.length === 0 && <h2>There are no products</h2> }

        </Fragment>
    );
}
 
export default Products;