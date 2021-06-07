import React from 'react';
import axios from 'axios';

import classes from './Category.module.css';

const Category = (props) => {

  const deleteCategoryHandler = async () => {
    await axios.post('http://localhost:4000/delete_category', {
      c_id: props.c_id
    }).then(res => {
      console.log(res);
    }).catch(err => {
      throw err;
    })
  }

  return (
    <div className={classes.category}>
      <p>{props.category}</p>
      <button className={classes.btn} onClick={deleteCategoryHandler}>X</button>
    </div>
  );
}

export default Category;
