import React, { useEffect } from 'react'
import { Fragment } from "react";
import MetaData from "./layouts/MetaData";
import { getProducts } from "../actions/productsActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from './layouts/Loader';
import Product from './product/Product';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export default function Home () {

  const dispatch = useDispatch();
  const {products, loading, error} = useSelector((state) => state.productsState)
  
  useEffect(()=> {
    if(error) {
      return toast.error(error,{
          position: toast.POSITION.BOTTOM_CENTER,
      })
    }
    dispatch(getProducts) 
  }, [error])
  

  
  return (
    <Fragment>
      {loading? <Loader /> :
        <Fragment>
        <MetaData title ={'Buy best products'}/>
        <h1 id="products_heading">Latest Products</h1>
        <section id="products" className="container mt-5">
          <div className="row">
            { products && products.map(product => (
                <Product product={product} />
            )) 
            }
            </div>
          
        </section>
        </Fragment>
      }
    </Fragment>
    )
}