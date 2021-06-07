import axios from 'axios';
import React from 'react';

import classes from './Product.module.css';

const Product = (props) => {
  const deleteProductHandler = async () => {

    await axios.post('http://localhost:4000/delete_product', {
      pid: props.p_id
    }).then(res => {
      console.log(res);
    }).catch(err => {
      throw err;
    });

  }

  return (
    <div className={classes.item}>
      <div className={classes.pid}>{props.p_id}</div>
      <div className={classes.product_name}>{props.product}</div>
      <div className={classes.cid}>{props.c_id}</div>
      <div className={classes.category_name}>{props.category}</div>
      <button className={classes.btn} onClick={deleteProductHandler}>X</button>
    </div>
  );
}

export default Product;