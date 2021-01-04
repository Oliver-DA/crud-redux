import React from 'react';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';

//Redux
import { useDispatch } from 'react-redux';
import { addDeleteProductAction, addEditProductAction } from '../redux/products/productActions';

const Product = ({ product }) => {

    const { name, price, id } = product;

    //Dispatch is always needed to call redux's actions
    const dispatch = useDispatch();
    const history = useHistory();

    const confirmDeleteProduct = id => {
        //Sweet alert promised base modal window
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this product!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                dispatch( addDeleteProductAction(id) )
                swal(`${name} has been deleted!`, {
                icon: "success",
              });
            }
          });
    };

    //After calling the action with dispatch to edit a product, redirect
    const redirectToEditPage = (product) => {
        dispatch( addEditProductAction(product) );
        history.push(`/products/edit/${product.id}`);
    }

    return (
        <tr>
            <td className>{ name }</td>
            <td><span className = "font-weight-bold">$</span>{ price }</td>
            <td className = "acciones">
            
                <button
                className = "btn btn-primary mr-2"
                onClick = {()=> redirectToEditPage(product)}>
                Edit
                </button>
                
                <button 
                className = "btn btn-danger"
                onClick = {()=> confirmDeleteProduct(id)}>
                Delete
                </button>
            </td>
        </tr>
    );
}
 
export default Product;