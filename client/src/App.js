import React, { useState, useEffect } from 'react';
import Products from './components/Products';
import Categories from './components/CategoryPage';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom';

import classes from './App.module.css';

const App = () => {
  const [categories, setCategories] = useState([]);
  const [limit, setLimit] = useState(10)  // default page limit

  const screenHeight = (e) => {
    e.preventDefault()

    var height = Math.floor((window.innerHeight-50) / 100)
    if (height !== limit && height >= 1) {
      setLimit(height + 1)
    }
  }

  window.addEventListener('resize', screenHeight)

  const getCategories = () => {
    axios.get('http://localhost:4000/categories').then(res => {
      setCategories(res);
    }).catch(err => {
      throw err;
    })
  }

  const addCategoryHandler = async (category) => {
    await axios.post('http://localhost:4000/add_category', {
      name: category
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      if (err) throw err;
    });
  }

  useEffect(() => {
    getCategories();
  }, [])

  return (
    <div className={classes.App}>
      <div className={classes.forms}>

        <Switch>
          <Route path="/products">
            <Products categoriesList={categories.data} limit={limit} />
          </Route>
          <Route path="/categories">
            <Categories categoriesList={categories.data} addCategory={addCategoryHandler} />
          </Route>
        </Switch>

      </div>
    </div>
  );
}

export default App;
