import React, { useState } from 'react';

// If we delete a category we should delete everything associated with it
const CategoryPage = (props) => {
  const [category, setCategory] = useState("");
  const catList = props.categoriesList || [];

  const categoryChangeHandler = (event) => {
    event.preventDefault();
    setCategory(event.target.value);
  }

  var categoriesArray = <div>No categories added yet</div>;

  if (catList.length > 0) {
    categoriesArray = Object.values(props.categoriesList).map(el => {
      return (
        <div>{el.category}</div>
      );
    })
  }

  return (
    <div>

      <form onSubmit={() => props.addCategory(category)}>
        <input
          type="text"
          value={category}
          placeholder="Category"
          required
          onChange={categoryChangeHandler} />
        <button>Add Category</button>
      </form>
      {categoriesArray}
    </div>
  );
}

export default CategoryPage;
