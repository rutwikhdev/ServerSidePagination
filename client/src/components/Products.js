import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Product from './Product';
import axios from 'axios';

import classes from './Products.module.css';

const Products = (props) => {
  const [product, setProduct] = useState("")
  const [pcategory, setPCategory] = useState("");
  const [resultData, setResultData] = useState({});
  const [pages, setPages] = useState(1);
  const limit = props.limit;
  const catList = props.categoriesList || [];

  const productChangeHandler = (event) => {
    event.preventDefault();
    setProduct(event.target.value);
  }

  const pCategoryChangeHandler = (event) => {
    event.preventDefault();
    setPCategory(event.target.value);
  }

  const addProductHandler = async () => {

    let add = false;
    let c_id;

    catList.forEach(val => {
      if (val.category.toLowerCase() === pcategory.toLowerCase()) {
        add = true
        c_id = val.c_id
      }
    })

    if (add) {
      
      await axios.post('http://localhost:4000/add_product', {
        name: product,
        c_id: c_id
      }).then((res) => {
        console.log(res);
      }).catch((err) => {
        alert()
        throw err;
      });

    } else {
      alert('Enter valid category name.')
    }

    setPCategory("")
    setProduct("")
  }

  const getProducts = async (offset = 0) => {
    let searchLimit
    
    if (isNaN(limit)) {
      console.log('Defaulting limit to 0')
      searchLimit = 0
    } else {
      searchLimit = limit
    }

    await axios.get(`http://localhost:4000/products?offset=${offset}&limit=${searchLimit}`).then((res) => {
      setResultData(res.data);
      setPages(Math.ceil(res.data.total / limit));
    }).catch((err) => {
      throw err;
    });
  }

  const handlePageClick = (data) => {
    let offset = Math.ceil(data.selected * limit); // 5 is limit
    getProducts(offset)
  }

  var productsArray = <div>Nothing in the products database</div>;
  if (Object.keys(resultData).length > 0) {
    productsArray = Object.values(resultData.data).map(el => {
      return (
        <Product
          key={el.p_id}
          p_id={el.p_id}
          c_id={el.c_id}
          product={el.product}
          category={el.category}
        />
      );
    })
  }

  useEffect(() => {
    getProducts(0)
  }, [limit]);

  return (
    <div>

      <form onSubmit={addProductHandler}>
        <input
          type="text"
          value={product}
          required
          onChange={productChangeHandler}
          placeholder="Product" />
        <input
          type="text"
          value={pcategory}
          required
          onChange={pCategoryChangeHandler}
          placeholder="Category" />
        <button>Add Product</button>
      </form>
      <div className={classes.tags}>
        <p>Product Id:</p>
        <p>Product Name:</p>
        <p>Cateogry Id:</p>
        <p>Category Name:</p>
      </div>
      {productsArray}
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={classes.pagination}
        pageClassName={classes.lists}
        pageLinkClassName={classes.links}
        activeClassName={classes.active}
        nextClassName={classes.change}
        previousClassName={classes.change}
      />
      
    </div>
  );
}

export default Products;
